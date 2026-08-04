import type { StockOutReason } from "./products.types";
import type { UserRole } from "./user.types";

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
export const AuditAction = {
    STOCK_IN: "STOCK_IN",
    STOCK_OUT: "STOCK_OUT",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    LOG_IN: "LOG_IN",
} as const;

export type AuditAction =
    typeof AuditAction[keyof typeof AuditAction];

export const AuditEntity = {
    PRODUCT: "PRODUCT",
    PRODUCT_TYPE: "PRODUCT_TYPE",
    CONTAINER: "CONTAINER",
    CATEGORY: "CATEGORY",
    WAREHOUSE: "WAREHOUSE",
    USER: "USER",
} as const;

export type AuditEntity =
    typeof AuditEntity[keyof typeof AuditEntity];

export interface AuditSearchDto { }

export interface SearchAuditDto {
    action?: AuditAction,
    entity?: AuditEntity,
    reason?: StockOutReason,
    role?: UserRole
}