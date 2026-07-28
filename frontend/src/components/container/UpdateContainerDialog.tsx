import { useEffect, useState } from "react";
import { toast } from "sonner";

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

interface Props {
    container: Container;
}

export default function UpdateContainerDialog({
    container,
}: Props) {
    const updateWarehouse = useUpdateContainers();

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");
    const [maximumCapacity, setMaximumCapacity] = useState(0);

    useEffect(() => {
        setCode(container.code);
        setMaximumCapacity(container.maximumCapacity);
    }, [container]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await updateWarehouse.mutateAsync({
                id: container.id,
                data: {
                    code,
                    maximumCapacity,
                },
            });

            toast.success("Container updated.");
            setOpen(false);
        } catch {
            toast.error("Failed to update container.");
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
                        onChange={(e) => (e.target.value)}
                    />

                    <InputField
                        label="Maximum Capacity"
                        type="text"
                        placeholder="Maximum Capacity"
                        value={maximumCapacity}
                        onChange={(e) => (Number(e.target.value))}
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