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

import { useUpdateWarehouse } from "@/hooks/useWarehouses";
import type { Warehouse } from "@/types/warehouse.types";
import { usePermission } from "@/hooks/usePermission";
import { InputField } from "../InputField";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

interface Props {
    warehouse: Warehouse;
}

const schema = z.object({
    code: z.string().trim().min(1, "Warehouse code is required."),
    name: z.string().trim().min(1, "Warehouse name is required."),
    location: z.string().trim().min(1, "Location is required."),
});

export default function UpdateWarehouseDialog({
    warehouse,
}: Props) {
    const { can } = usePermission();
    const updateWarehouse = useUpdateWarehouse();

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setCode(warehouse.code);
        setName(warehouse.name);
        setLocation(warehouse.location);
    }, [warehouse]);

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = schema.safeParse({ code, name, location });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await updateWarehouse.mutateAsync({
                id: warehouse.id,
                data: result.data,
            });

            toast.success("Warehouse updated.");
            setErrors({});
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to update warehouse."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={<Button disabled={!can("updateWarehouse")} />}
            >
                Edit
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Warehouse</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <InputField
                        label="Code"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); clearError("code"); }}
                        error={errors.code}
                    />

                    <InputField
                        label="Name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); clearError("name"); }}
                        error={errors.name}
                    />

                    <InputField
                        label="Location"
                        value={location}
                        onChange={(e) => { setLocation(e.target.value); clearError("location"); }}
                        error={errors.location}
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
