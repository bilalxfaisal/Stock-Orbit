import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createProductType,
    deleteProductType,
    getProductTypes,
} from "@/api/product-type.api";

import type {
    CreateProductTypeDto,
    SearchProductTypeDto,
} from "@/types/product-type.types";

export function useProductTypes(query?: SearchProductTypeDto) {
    console.log("Use Query : ", query)
    return useQuery({
        queryKey: ["productTypes", query],
        queryFn: () => getProductTypes(query),
        placeholderData: keepPreviousData,
    });
}

export function useCreateProductType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateProductTypeDto) => createProductType(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productTypes"] });
        },
    });
}

export function useDeleteProductType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteProductType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productTypes"] });
        },
    });
}
