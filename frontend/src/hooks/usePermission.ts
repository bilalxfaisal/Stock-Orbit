import { useAuth } from "@/providers/AuthProvider";
import { permissions, type Permission } from "@/types/permission.types";

export function usePermission() {

    const { user } = useAuth();

    function can(permission: Permission): boolean {

        if (!user) {
            return false;
        }

        return permissions[user.role].includes(permission);
    }

    return { can };
}