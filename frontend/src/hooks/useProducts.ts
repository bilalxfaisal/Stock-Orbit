import { getProducts, stockInProduct, stockOutProduct } from "@/api/product.api";
import type { SearchProductDto } from "@/types/products.types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
            toast.success("Product stocked in successfully.");

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Failed to stock in product.");
        },
    });
}

export function useStockOutProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: stockOutProduct,

        onSuccess: () => {
            toast.success("Product stocked out successfully.");

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Failed to stock out product.");
        },
    });
}