import { Users as UsersIcon } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DataTableCard from "@/components/DataTableCard";
import { EmptyState } from "@/components/PageStates";
import StatusBadge from "@/components/StatusBadge";

import type { User } from "@/types/user.types"
import DeleteUserDialog from "./DeleteUserDialog";

interface Props {
    users: User[];
}

export default function UsersTable({ users }: Props) {
    if (!users.length) {
        return (
            <EmptyState
                icon={UsersIcon}
                title="No users found"
                description="Try adjusting your search, or create a new user."
            />
        );
    }

    return (
        <DataTableCard>
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
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                            <TableCell className="text-muted-foreground">{user.phoneNumber}</TableCell>
                            <TableCell><StatusBadge value={user.role} /></TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <DeleteUserDialog id={user.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DataTableCard>
    );
}
