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

import { useCreateCategory } from "@/hooks/useCategories";
import { InputField } from "../InputField";
import { usePermission } from "@/hooks/usePermission";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

const schema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Category name is required.")
        .min(2, "Category name must be at least 2 characters."),
});

export default function CreateCategoryDialog() {
    const { can } = usePermission();
    const createCategory = useCreateCategory();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    function resetForm() {
        setName("");
        setErrors({});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = schema.safeParse({ name });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await createCategory.mutateAsync({ name: result.data.name });
            toast.success("Category created.");
            resetForm();
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to create category."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
            <DialogTrigger render={<Button disabled={!can("createCategory")} />}>Create Category</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputField
                        label="Name"
                        placeholder="Electronics"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        error={errors.name}
                    />

                    <Button className="w-full" disabled={createCategory.isPending} type="submit">
                        {createCategory.isPending ? "Creating..." : "Create"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
