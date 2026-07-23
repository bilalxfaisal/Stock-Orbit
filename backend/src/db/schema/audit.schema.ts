import {
    pgTable,
    serial,
    text,
    timestamp,
    integer,
    pgEnum,
} from "drizzle-orm/pg-core";
import { AuditAction, AuditEntity, StockOutReason, UserRole } from "../enums";

export const auditActionEnum = pgEnum("audit_action", Object.values(AuditAction) as [string, ...string[]]);

export const auditEntityEnum = pgEnum("audit_entity", Object.values(AuditEntity) as [string, ...string[]]);

export const stockOutReasonEnum = pgEnum(
    "stock_out_reason",
    Object.values(StockOutReason) as [string, ...string[]],
);

export const userRoleEnum = pgEnum(
    "user_role_enum",
    Object.values(UserRole) as [string, ...string[]],
);

export const Audit = pgTable("Audit", {
    id: serial("id").primaryKey(),
    action: auditActionEnum("action").notNull(),
    entity: auditEntityEnum("entity").notNull(),
    entityId: integer("entity_id").notNull(),
    quantity: integer("quantity"),
    reason: stockOutReasonEnum("reason"),
    role: userRoleEnum("role"),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});