import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import type { CreateUserDto, SearchUserDto } from "@/types/user.types";
import { createUser, deleteUser, getUsers } from "@/api/user.api";

export function useUsers(query?: SearchUserDto) {
    return useQuery({
        queryKey: ["users", query],
        queryFn: () => getUsers(query),
        placeholderData: keepPreviousData,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateUserDto) => createUser(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}
