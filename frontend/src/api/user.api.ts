import type { CreateUserDto, SearchUserDto, UpdateUserDto, User } from "@/types/user.types"
import api from "./axios"

export async function getUsers(query?: SearchUserDto): Promise<User[]> {
    const response = await api.get("/users", { params: query });
    return response.data;
}

export async function createUser(dto: CreateUserDto) {
    const response = await api.post("/users", dto);
    return response.data;
}

export async function deleteUser(id: number) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}

// export async function updateUser(id: number, dto: UpdateUserDto) {
//     const response = await api.patch(`/users/${id}`, dto)
// }