import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { stockInProduct } from "@/api/product.api";

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