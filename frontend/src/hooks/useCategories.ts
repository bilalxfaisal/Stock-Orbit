import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createCategory,
    deleteCategory,
    getCategories,
} from "@/api/category.api";

import type {
    CreateCategoryDto,
    SearchCategoryDto,
} from "@/types/category.types";

export function useCategories(query?: SearchCategoryDto) {
    return useQuery({
        queryKey: ["categories", query],
        queryFn: () => getCategories(query),
        placeholderData: keepPreviousData,
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateCategoryDto) => createCategory(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}
