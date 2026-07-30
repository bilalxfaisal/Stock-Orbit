import { useState } from "react";
import { toast } from "sonner";

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

export default function CreateProductTypeDialog() {

    const {can} = usePermission();
    const createProductType = useCreateProductType();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState(1);

    const {
        data: categories = [],
        isLoading: isCategoryLoading,
    } = useCategories();

    const categoryOptions = categories.map((category) => ({
        id: category.id,
        label: category.name,
    }))

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await createProductType.mutateAsync({ name, categoryId });
            toast.success("Product type created.");
            setName("");
            setCategoryId(1);
            setOpen(false);
        } catch {
            toast.error("Failed to create product type.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button disabled={!can("createProductType")}/>}>Create Product Type</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Product Type</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Name"
                        placeholder="Laptops"
                        className="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Label>Category</Label>
                    <FilterSelect 
                    value={categoryId === 0 ? undefined : categoryId}
                    onValueChange={(value)=> {setCategoryId(value ?? 0)}}
                    options={categoryOptions}
                    allLabel={
                        isCategoryLoading ? 
                        "Loading Categories ..." :
                        "Select category"
                    }
                    />

                    <Button className="w-full" disabled={createProductType.isPending} type="submit">
                        {createProductType.isPending ? "Creating..." : "Create"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
