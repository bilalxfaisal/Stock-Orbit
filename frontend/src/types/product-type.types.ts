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
    name?: string;
    category?: string;
    categoryId?: number;
    page?: number;
    limit?: number;
}
