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
import { useDeleteProductType } from "@/hooks/useProductTypes";
import { usePermission } from "@/hooks/usePermission";

interface Props {
    id: number;
}

export default function DeleteProductTypeDialog({ id }: Props) {
    const {can} = usePermission();
    const deleteProductType = useDeleteProductType();

    async function handleDelete() {
        try {
            await deleteProductType.mutateAsync(id);
            toast.success("Product type deleted.");
        } catch {
            toast.error("Failed to delete product type.");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button disabled={!can("deleteProductType")}/>}>Delete</AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product Type?</AlertDialogTitle>
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
