import type { DashboardStats } from "@/types/dashboard.types";
import api from "./axios";

export async function getDashboard(): Promise<DashboardStats> {
    const response = await api.get("/dashboard");
    return response.data;
}