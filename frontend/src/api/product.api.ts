import type {
    Product,
    StockInProductDto,
    StockOutProductDto,
    SearchProductDto
} from "@/types/products.types";
import api from "./axios";

export async function getProducts(query?: SearchProductDto): Promise<Product[]> {
    const response = await api.get("/products", { params: query })
    return response.data;
}

export async function stockInProduct(dto: StockInProductDto) {
    const response = await api.post("/products/stock-in", dto)
    return response.data;
}

export async function stockOutProduct(dto: StockOutProductDto) {
    const response = await api.post("products/stock-out", dto)
    return response.data;
}

//export async function editProduct(dto: )