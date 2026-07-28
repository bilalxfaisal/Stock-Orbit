export interface Product {
    id: number,
    model: string,
    brand: string,
    price: number,
    category: string,
    productType: string,
}

export interface StockOutProductDto{
    productId: number,
    containerId: number,
    quantity: number,
    reason: string,
}

export interface StockInProductDto {
    brand: string,
    model: string,
    price: number,
    quantity: number,
    productTypeId: number,
    containerId: number,
}

export interface SearchProductDto{
    brand?: string, 
    model?: string,
    categoryId?: number,
    productTypeId?: number,
}

export const StockOutReason = {
    SOLD: "SOLD",
    DAMAGED: "DAMAGED",
    EXPIRED: "EXPIRED",
    OUTDATED: "OUTDATED",
} as const;

export type StockOutReason =
    typeof StockOutReason[keyof typeof StockOutReason];