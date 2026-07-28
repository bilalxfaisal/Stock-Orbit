import api from "./axios";

import type {
    Category,
    CreateCategoryDto,
    SearchCategoryDto,
} from "@/types/category.types";

export async function getCategories(query?: SearchCategoryDto): Promise<Category[]> {
    const response = await api.get("/category", { params: query });
    return response.data;
}

export async function createCategory(dto: CreateCategoryDto): Promise<Category> {
    const response = await api.post("/category", dto);
    return response.data;
}

export async function deleteCategory(id: number): Promise<void> {
    await api.delete(`/category/${id}`);
}
