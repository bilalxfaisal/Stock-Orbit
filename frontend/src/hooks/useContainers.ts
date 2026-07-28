import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createContainer,
    updateContainer,
    deleteContainer,
    getContainers,
} from "@/api/container.api";

import type {
    CreateContainerDto,
    SearchContainerDto,
    UpdateContainerDto,
} from "@/types/container.types";

export function useContainers(query?: SearchContainerDto) {

    console.log(query);
    return useQuery({
        queryKey: ["containers", query],
        queryFn: () => getContainers(query),
        placeholderData: keepPreviousData
    });
}

export function useCreateContainer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateContainerDto) =>
            createContainer(dto),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["containers"],
            });
        },
    });
}

export function useUpdateContainers() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: UpdateContainerDto;
        }) => updateContainer(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["containers"],
            });
        },
    });
}

export function useDeleteContainer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            deleteContainer(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["containers"],
            });
        },
    });
}