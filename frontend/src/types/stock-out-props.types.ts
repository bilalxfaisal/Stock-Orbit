import type { ProductResponse } from "./products.types";

export type StockOutProps = {
  product: ProductResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};