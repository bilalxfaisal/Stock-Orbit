export interface Category {
    id: number;
    name: string;
    containerCount: number;
    productCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryDto {
    name: string;
}

export interface SearchCategoryDto {
    name?: string;
    page?: number;
    limit?: number;
}
