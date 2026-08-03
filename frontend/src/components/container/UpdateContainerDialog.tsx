import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useUpdateContainers } from "@/hooks/useContainers";
import type { Container } from "@/types/container.types";
import { InputField } from "../InputField";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

interface Props {
    container: Container;
}

const schema = z.object({
    code: z.string().trim().min(1, "Container code is required."),
    maximumCapacity: z
        .number({ error: "Maximum capacity is required." })
        .int("Maximum capacity must be a whole number.")
        .positive("Maximum capacity must be greater than 0."),
});

export default function UpdateContainerDialog({
    container,
}: Props) {
    const updateWarehouse = useUpdateContainers();

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");
    const [maximumCapacity, setMaximumCapacity] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setCode(container.code);
        setMaximumCapacity(container.maximumCapacity);
    }, [container]);

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = schema.safeParse({ code, maximumCapacity });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await updateWarehouse.mutateAsync({
                id: container.id,
                data: result.data,
            });

            toast.success("Container updated.");
            setErrors({});
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to update container."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={<Button />}
            >
                Edit
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Container</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <InputField
                        label="Code"
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); clearError("code"); }}
                        error={errors.code}
                    />

                    <InputField
                        label="Maximum Capacity"
                        type="number"
                        placeholder="Maximum Capacity"
                        value={maximumCapacity}
                        onChange={(e) => { setMaximumCapacity(Number(e.target.value)); clearError("maximumCapacity"); }}
                        error={errors.maximumCapacity}
                    />

                    <Button
                        className="w-full"
                        disabled={updateWarehouse.isPending}
                        type="submit"
                    >
                        {updateWarehouse.isPending
                            ? "Updating..."
                            : "Update"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
