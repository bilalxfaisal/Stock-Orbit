import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type {User} from "@/types/user.types"
import DeleteUserDialog from "./DeleteUserDialog";

interface Props {
    users: User[];
}

export default function UsersTable({ users }: Props) {
    if (!users.length) {
        return <p className="text-muted-foreground">No users found.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users.map((users) => (
                    <TableRow key={users.id}>
                        <TableCell>{users.name}</TableCell>
                        <TableCell>{users.email}</TableCell>
                        <TableCell>{users.phoneNumber}</TableCell>
                        <TableCell>{users.role}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                            <DeleteUserDialog id={users.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
