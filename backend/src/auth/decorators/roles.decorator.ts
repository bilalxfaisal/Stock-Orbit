import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/db/enums";

export const ROLES_KEY = "roles"
export function Roles(...roles: UserRole[]) {
    return SetMetadata(ROLES_KEY, roles);
}