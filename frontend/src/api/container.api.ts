import type { Container, CreateContainerDto, SearchContainerDto, UpdateContainerDto } from "@/types/container.types";
import api from "./axios";

export async function getContainers(query?: SearchContainerDto): Promise<Container[]> {

    console.log(
        "Container query:",
        query,
    );
    const response = await api.get("/containers", {params: query});
    return response.data;
}

export async function getContainer(id: number,): Promise<Container> {
    const response = await api.get(`/containers/${id}`);
    return response.data;
}

export async function createContainer(dto: CreateContainerDto): Promise<Container[]> {
    const response = await api.post("/containers", dto);
    return response.data;
}

export async function updateContainer(id: number, dto: UpdateContainerDto): Promise<Container[]> {
    const response = await api.patch(`/containers/${id}`, dto);
    return response.data;
}

export async function deleteContainer(id: number): Promise<void> {
    const response = await api.delete(`/containers/${id}`);
    return response.data;
}