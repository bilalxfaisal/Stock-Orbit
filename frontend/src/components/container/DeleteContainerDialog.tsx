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

import { useDeleteContainer } from "@/hooks/useContainers";
import { usePermission } from "@/hooks/usePermission";

interface Props {
    id: number;
}

export default function DeleteContainerDialog({
    id,
}: Props) {

    const {can} = usePermission();
    const deleteContainer = useDeleteContainer();

    async function handleDelete() {
        try {
            await deleteContainer.mutateAsync(id);

            toast.success("Container deleted.");
        } catch {
            toast.error("Failed to delete container.");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button disabled={!can("deleteContainer")}/>}
            >
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Container?
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