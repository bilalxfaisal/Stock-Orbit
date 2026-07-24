import type { ProductResponse } from "@/types/products.types";
import api from "./axios";
import type { StockInProductDto } from "@/types/stock-in-product.dto";
import type { StockOutProductDto } from "@/types/stock-out-product.dto";

export async function getProducts(): Promise<ProductResponse[]> {
    const response = await api.get("/products")
    return response.data;
}

export async function stockInProduct(dto: StockInProductDto){
    const response = await api.post("/products/stock-in", dto)
    return response.data;
}

export async function stockOutProduct(dto: StockOutProductDto) {
    const response = await api.post("products/stock-out", dto)
    return response.data;
}