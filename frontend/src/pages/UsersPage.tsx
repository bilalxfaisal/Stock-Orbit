import { useState } from "react";

import { useUsers } from "@/hooks/userUsers";
import CreateUserDialog from "@/components/users/CreateUserDialog";
import UsersTable from "@/components/users/UserTable";
import { UserRole } from "@/types/user.types";
import FilterSelect from "@/components/FilterSelect";
import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import SearchInput from "@/components/SearchInput";
import { PageLoadingState, ErrorState } from "@/components/PageStates";

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState<UserRole | undefined>(undefined);

    const {
        data: users = [],
        isLoading,
        error,
    } = useUsers({
        name: search,
        role,
    });

    if (isLoading) {
        return <PageLoadingState />;
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Users"
                description="Manage all users."
                action={<CreateUserDialog />}
            />

            {error ? (
                <ErrorState description="We couldn't load users. Try adjusting your filters or refreshing the page." />
            ) : (
                <>
                    <FilterToolbar>
                        <SearchInput
                            placeholder="Search user..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            containerClassName="flex-1 min-w-[200px]"
                        />

                        <FilterSelect
                            value={role}
                            onValueChange={setRole}
                            options={Object.values(UserRole).map(
                                (role) => ({
                                    id: role,
                                    label: role,
                                }),
                            )}
                            allLabel="Select role"
                            showAllOption={true}
                        />
                    </FilterToolbar>

                    <UsersTable users={users} />
                </>
            )}
        </div>
    );
}
