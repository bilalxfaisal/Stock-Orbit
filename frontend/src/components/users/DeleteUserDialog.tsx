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
import { useDeleteUser } from "@/hooks/userUsers";

interface Props {
    id: number;
}

export default function DeleteUserDialog({ id }: Props) {
    const deleteUser = useDeleteUser();

    async function handleDelete() {
        try {
            await deleteUser.mutateAsync(id);
            toast.success("User deleted.");
        } catch {
            toast.error("Failed to delete user.");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button />}>Delete</AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User?</AlertDialogTitle>
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
