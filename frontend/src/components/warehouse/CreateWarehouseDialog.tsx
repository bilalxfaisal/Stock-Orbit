import { useState } from "react";
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

import { useCreateWarehouse } from "@/hooks/useWarehouses";
import { InputField } from "../InputField";
import { usePermission } from "@/hooks/usePermission";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

const schema = z.object({
    code: z.string().trim().min(1, "Warehouse code is required."),
    name: z.string().trim().min(1, "Warehouse name is required."),
    location: z.string().trim().min(1, "Location is required."),
});

export default function CreateWarehouseDialog() {

    const { can } = usePermission();
    const createWarehouse = useCreateWarehouse();

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    function resetForm() {
        setCode("");
        setName("");
        setLocation("");
        setErrors({});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = schema.safeParse({ code, name, location });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await createWarehouse.mutateAsync(result.data);

            toast.success("Warehouse created.");
            resetForm();
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to create warehouse."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
            <DialogTrigger
                render={<Button disabled={!can("createWarehouse")} />}
            >
                Create Warehouse
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Warehouse</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <InputField
                        label="Code"
                        placeholder="WH001"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); clearError("code"); }}
                        error={errors.code}
                    />

                    <InputField
                        label="Name"
                        placeholder="Main Warehouse"
                        value={name}
                        onChange={(e) => { setName(e.target.value); clearError("name"); }}
                        error={errors.name}
                    />

                    <InputField
                        label="Location"
                        placeholder="Islamabad"
                        value={location}
                        onChange={(e) => { setLocation(e.target.value); clearError("location"); }}
                        error={errors.location}
                    />

                    <Button
                        className="w-full"
                        disabled={createWarehouse.isPending}
                        type="submit"
                    >
                        {
                            createWarehouse.isPending
                                ? "Creating..."
                                : "Create"
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
