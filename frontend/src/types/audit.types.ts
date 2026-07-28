export interface Audit {
    id: number;
    action: string;
    entity: string;
    entityId: number;
    quantity: number | null;
    reason: string | null;
    role: string | null;
    description: string | null;
    createdAt: string;
}

export interface AuditStats {
    totalWarehouses: number;
    totalCategories: number;
    totalContainers: number;
    totalProductTypes: number;
    totalProducts: number;
    stockInToday: number | null;
    stockOutToday: number | null;
}

export interface AuditSearchDto {}
