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

import { useCreateContainer } from "@/hooks/useContainers";
import { InputField } from "../InputField";
import { useCategories } from "@/hooks/useCategories";
import { useWarehouses } from "@/hooks/useWarehouses";
import FilterSelect from "@/components/FilterSelect";
import { Label } from "../ui/label";
import { usePermission } from "@/hooks/usePermission";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

const schema = z.object({
    code: z.string().trim().min(1, "Container code is required."),
    maximumCapacity: z
        .number({ error: "Maximum capacity is required." })
        .int("Maximum capacity must be a whole number.")
        .positive("Maximum capacity must be greater than 0."),
    categoryId: z
        .number({ error: "Please select a category." })
        .refine((value) => value !== 0, "Please select a category."),
    warehouseId: z
        .number({ error: "Please select a warehouse." })
        .refine((value) => value !== 0, "Please select a warehouse."),
});

export default function CreateContainerDialog() {
    const { can } = usePermission();
    const createContainer = useCreateContainer();

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState("");
    const [maximumCapacity, setMaximumCapacity] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [warehouseId, setWarehouseId] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const {
        data: warehouses = [],
        isLoading: isWarehouseLoading,
    } = useWarehouses();

    const warehouseOptions = warehouses.map((warehouse) => ({
        id: warehouse.id,
        label: warehouse.name,
    }))

    const {
        data: categories = [],
        isLoading: isCategoryLoading,
    } = useCategories()

    const categoryOptions = categories.map((category) => ({
        id: category.id,
        label: category.name,
    }))

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    function resetForm() {
        setCode("");
        setMaximumCapacity(0);
        setCategoryId(0);
        setWarehouseId(0);
        setErrors({});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = schema.safeParse({
            code,
            maximumCapacity,
            categoryId,
            warehouseId,
        });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await createContainer.mutateAsync(result.data);

            toast.success("Container created.");
            resetForm();
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to create container."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
            <DialogTrigger
                render={<Button disabled={!can("createContainer")} />}
            >
                Create Container
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Container</DialogTitle>
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

                    <div className="space-y-1.5">
                        <Label>Category</Label>
                        <FilterSelect
                            value={categoryId === 0 ? undefined : categoryId}
                            onValueChange={(value) => { setCategoryId(value ?? 0); clearError("categoryId"); }}
                            options={categoryOptions}
                            allLabel={
                                isCategoryLoading ?
                                    "Loading Category ..." :
                                    "Select category"
                            }
                            error={errors.categoryId}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Warehouse</Label>
                        <FilterSelect
                            value={warehouseId === 0 ? undefined : warehouseId}
                            onValueChange={(value) => { setWarehouseId(value ?? 0); clearError("warehouseId"); }}
                            options={warehouseOptions}
                            allLabel={
                                isWarehouseLoading ?
                                    "Loading Warehouses ..." :
                                    "Select warehouse"
                            }
                            error={errors.warehouseId}
                        />
                    </div>

                    <Button
                        className="w-full"
                        disabled={createContainer.isPending}
                        type="submit"
                    >
                        {
                            createContainer.isPending
                                ? "Creating..."
                                : "Create"
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
