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

import { useDeleteWarehouse } from "@/hooks/useWarehouses";
import { usePermission } from "@/hooks/usePermission";

interface Props {
    id: number;
}

export default function DeleteWarehouseDialog({
    id,
}: Props) {

    const {can} = usePermission();
    const deleteWarehouse = useDeleteWarehouse();

    async function handleDelete() {
        try {
            await deleteWarehouse.mutateAsync(id);

            toast.success("Warehouse deleted.");
        } catch {
            toast.error("Failed to delete warehouse.");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button disabled={!can("deleteWarehouse")}/>}
            >
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Warehouse?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}