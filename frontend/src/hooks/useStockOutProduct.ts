import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { stockOutProduct } from "@/api/product.api";

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