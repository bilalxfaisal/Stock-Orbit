import { displayInventory } from "@/api/inventory.api";
import type { SearchInventoryDto } from "@/types/inventory.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useInventory(query?: SearchInventoryDto) {
    return useQuery({
        queryKey: ["inventory", query],
        queryFn: () => displayInventory(query),
        placeholderData: keepPreviousData
    });
}