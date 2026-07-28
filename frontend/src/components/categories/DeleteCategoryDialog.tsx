import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/hooks/useCategories";

interface Props {
    id: number;
}

export default function DeleteCategoryDialog({ id }: Props) {
    const deleteCategory = useDeleteCategory();

    async function handleDelete() {
        try {
            await deleteCategory.mutateAsync(id);
            toast.success("Category deleted.");
        } catch {
            toast.error("Failed to delete category.");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button />}>Delete</AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
