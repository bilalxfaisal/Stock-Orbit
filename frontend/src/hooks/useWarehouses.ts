import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
} from "@/api/warehouse.api";

import type {
    CreateWarehouseDto,
    SearchWarehouseDto,
    UpdateWarehouseDto,
} from "@/types/warehouse.types";

export function useWarehouses(query?: SearchWarehouseDto) {
    return useQuery({
        queryKey: ["warehouses", query],
        queryFn: () => getWarehouses(query),
        placeholderData: keepPreviousData,
    });
}

export function useCreateWarehouse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateWarehouseDto) =>
            createWarehouse(dto),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["warehouses"],
            });
        },
    });
}

export function useUpdateWarehouse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: UpdateWarehouseDto;
        }) => updateWarehouse(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["warehouses"],
            });
        },
    });
}

export function useDeleteWarehouse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            deleteWarehouse(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["warehouses"],
            });
        },
    });
}