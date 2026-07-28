export interface User{
    id: number, 
    name: string,
    email: string, 
    phoneNumber: string,
    role: string,
}

export interface CreateUserDto{
    name: string, 
    email: string, 
    password: string,
    phoneNumber: string, 
    role: string
}

export interface UpdateUserDto{
    oldPassword: string, 
    newPassword: string,
}

export interface SearchUserDto{
    name: string, 
}

export const UserRole = {
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    STAFF: "STAFF",
    AUDITOR: "AUDITOR",
} as const;

export type UserRole =
    typeof UserRole[keyof typeof UserRole];