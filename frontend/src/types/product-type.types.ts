export interface ProductType {
    id: number;
    name: string;
    productCount: number, 
    category: string;
    categoryId: number,
}

export interface CreateProductTypeDto {
    name: string;
    categoryId: number;
}

export interface SearchProductTypeDto {
    categoryId?: number;
    name?: string;
    category?: string;
    page?: number;
    limit?: number;
}
