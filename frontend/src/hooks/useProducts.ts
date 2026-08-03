import { getProducts, stockInProduct, stockOutProduct } from "@/api/product.api";
import type { SearchProductDto } from "@/types/products.types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(query?: SearchProductDto) {
    return useQuery({
        queryKey: ["products", query],
        queryFn: () => getProducts(query),
        placeholderData: keepPreviousData,
    });
}

export function useStockInProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: stockInProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}

export function useStockOutProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: stockOutProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}