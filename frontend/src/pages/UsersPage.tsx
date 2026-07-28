import { useState } from "react";

import { useUsers } from "@/hooks/userUsers";
import CreateUserDialog from "@/components/users/CreateUserDialog";
import UsersTable from "@/components/users/UserTable";

export default function UsersPage() {
    const [search, setSearch] = useState("");

    const {
        data: users = [],
        isLoading,
        error,
    } = useUsers({
        name: search
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
    }

    console.log(users)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="text-muted-foreground">Manage all users.</p>
                </div>

                <CreateUserDialog />
            </div>

            <input
                className="border rounded px-3 py-2"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <UsersTable users={users} />
        </div>
    );
}
