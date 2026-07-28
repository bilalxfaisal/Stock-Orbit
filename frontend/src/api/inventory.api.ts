import type { Inventory, SearchInventoryDto } from "@/types/inventory.types";
import api from "./axios";

export async function displayInventory(query?: SearchInventoryDto): Promise<Inventory[]>{
    const response = await api.get("/inventory", {params: query})
    return response.data;
}