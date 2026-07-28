import api from "./axios";

import type {
    Warehouse,
    CreateWarehouseDto,
    UpdateWarehouseDto,
    SearchWarehouseDto,
} from "@/types/warehouse.types";

export async function getWarehouses(query?: SearchWarehouseDto,): Promise<Warehouse[]> {
    const response = await api.get("/warehouse", { params: query });
    return response.data;
}

export async function getWarehouse(id: number,): Promise<Warehouse> {
    const response = await api.get(`/warehouse/${id}`);
    return response.data;
}

export async function createWarehouse(dto: CreateWarehouseDto,): Promise<Warehouse> {
    const response = await api.post("/warehouse", dto);
    console.log(response);
    return response.data;
}

export async function updateWarehouse(id: number, dto: UpdateWarehouseDto): Promise<Warehouse> {
    const response = await api.patch(`/warehouse/${id}`, dto);
    return response.data;
}

export async function deleteWarehouse(id: number): Promise<void> {
    await api.delete(`/warehouse/${id}`);
}