import api from "./axios";

import type { Audit, AuditStats, SearchAuditDto } from "@/types/audit.types";

export async function getAuditHistory(query?: SearchAuditDto): Promise<Audit[]> {
    const response = await api.get("/audit", {params: query});
    return response.data;
}

export async function getAuditStats(): Promise<AuditStats> {
    const response = await api.get("/audit/stats");
    return response.data;
}
