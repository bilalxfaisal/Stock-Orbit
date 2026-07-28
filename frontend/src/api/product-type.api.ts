import api from "./axios";

import type {
    ProductType,
    CreateProductTypeDto,
    SearchProductTypeDto,
} from "@/types/product-type.types";

export async function getProductTypes(query?: SearchProductTypeDto): Promise<ProductType[]> {
    console.log("API Query : ", query)
    const response = await api.get("/product-type", { params: query });
    return response.data;
}

export async function createProductType(dto: CreateProductTypeDto): Promise<ProductType> {
    const response = await api.post("/product-type", dto);
    return response.data;
}

export async function deleteProductType(id: number): Promise<void> {
    await api.delete(`/product-type/${id}`);
}
