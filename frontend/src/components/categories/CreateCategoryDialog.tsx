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

import { useCreateCategory } from "@/hooks/useCategories";
import { InputField } from "../InputField";

export default function CreateCategoryDialog() {
    const createCategory = useCreateCategory();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await createCategory.mutateAsync({ name });
            toast.success("Category created.");
            setName("");
            setOpen(false);
        } catch {
            toast.error("Failed to create category.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}>Create Category</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputField
                        label="Name"
                        placeholder="Electronics"
                        className="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button className="w-full" disabled={createCategory.isPending} type="submit">
                        {createCategory.isPending ? "Creating..." : "Create"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
