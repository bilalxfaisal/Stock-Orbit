export interface Container {
    id: number;
    code: string;
    maximumCapacity: number;
    currentCapacity: number;
    category: string;
    warehouse: string;
}

export interface CreateContainerDto {
    code: string;
    maximumCapacity: number;
    warehouseId: number;
    categoryId: number;
}

export interface UpdateContainerDto {
    code?: string;
    maximumCapacity?: number;
    warehouseId?: number;
    categoryId?: number;
}

export interface SearchContainerDto {
    code?: string;
    warehouseId?: number;
    categoryId?: number;

    minCapacity?: number;
    maxCapacity?: number;

    page?: number;
    limit?: number;
}