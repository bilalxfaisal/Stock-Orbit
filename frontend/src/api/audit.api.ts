import api from "./axios";

import type { Audit, AuditStats } from "@/types/audit.types";

export async function getAuditHistory(): Promise<Audit[]> {
    const response = await api.get("/audit");
    return response.data;
}

export async function getAuditStats(): Promise<AuditStats> {
    const response = await api.get("/audit/stats");
    return response.data;
}
