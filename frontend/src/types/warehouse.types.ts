export interface Warehouse {
    id: number;
    code: string;
    name: string;
    location: string;
    containerQty: number;
}

export interface CreateWarehouseDto {
    code: string;
    name: string;
    location: string;
}

export interface UpdateWarehouseDto {
    code?: string;
    name?: string;
    location?: string;
}

export interface SearchWarehouseDto {
    code?: string;
    name?: string;
    location?: string;
    page?: number;
    limit?: number;
}