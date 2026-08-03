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

import { useCreateProductType } from "@/hooks/useProductTypes";
import { InputField } from "../InputField";
import { useCategories } from "@/hooks/useCategories";
import FilterSelect from "../FilterSelect";
import { Label } from "../ui/label";
import { usePermission } from "@/hooks/usePermission";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

const schema = z.object({
    name: z.string().trim().min(1, "Product type name is required."),
    categoryId: z
        .number({ error: "Please select a category." })
        .refine((value) => value !== 0, "Please select a category."),
});

export default function CreateProductTypeDialog() {

    const { can } = usePermission();
    const createProductType = useCreateProductType();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const {
        data: categories = [],
        isLoading: isCategoryLoading,
    } = useCategories();

    const categoryOptions = categories.map((category) => ({
        id: category.id,
        label: category.name,
    }))

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    function resetForm() {
        setName("");
        setCategoryId(0);
        setErrors({});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = schema.safeParse({ name, categoryId });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await createProductType.mutateAsync(result.data);
            toast.success("Product type created.");
            resetForm();
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to create product type."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
            <DialogTrigger render={<Button disabled={!can("createProductType")} />}>Create Product Type</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Product Type</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Name"
                        placeholder="Laptops"
                        value={name}
                        onChange={(e) => { setName(e.target.value); clearError("name"); }}
                        error={errors.name}
                    />

                    <div className="space-y-1.5">
                        <Label>Category</Label>
                        <FilterSelect
                            value={categoryId === 0 ? undefined : categoryId}
                            onValueChange={(value) => { setCategoryId(value ?? 0); clearError("categoryId"); }}
                            options={categoryOptions}
                            allLabel={
                                isCategoryLoading ?
                                    "Loading Categories ..." :
                                    "Select category"
                            }
                            error={errors.categoryId}
                        />
                    </div>

                    <Button className="w-full" disabled={createProductType.isPending} type="submit">
                        {createProductType.isPending ? "Creating..." : "Create"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
