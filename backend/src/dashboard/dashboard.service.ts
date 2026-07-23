import { Injectable } from "@nestjs/common";
import { Product, Category, ProductType, Container, Warehouse, Audit, User } from "src/db/schema";
import { db } from "src/db/db";
import { AuditAction, AuditEntity, StockOutReason, UserRole } from "src/db/enums";
import { and, eq, lte, gte, gt, lt, count } from "drizzle-orm";

@Injectable()
export class DashboardService {

    async dashboard() {

        const products = await this.getProductStats();
        const containers = await this.getContainerStats();
        const warehouses = await this.getWarehouseStats();
        const categories = await this.getCategoryStats();
        const productTypes = await this.getProductTypeStats();
        const today = await this.getTodayStats();
        const users = await this.getUserStats();

        return {
            products,
            containers,
            warehouses,
            categories,
            productTypes,
            users,
            today,
        };
    }

    private async getProductStats() {

        const [{ count: totalProducts }] = await db
            .select({ count: count() })
            .from(Product);

        const [{ count: productsSold }] = await db
            .select({ count: count() })
            .from(Audit)
            .where(
                and(
                    eq(Audit.entity, AuditEntity.PRODUCT),
                    eq(Audit.action, AuditAction.STOCK_OUT),
                    eq(Audit.reason, StockOutReason.SOLD),
                ),
            );

        return {
            totalProducts,
            productsSold,
        };
    }

    private async getContainerStats() {

        const [{ count: totalContainers }] = await db
            .select({ count: count() })
            .from(Container);

        const [{ count: fullContainers }] = await db
            .select({ count: count() })
            .from(Container)
            .where(
                gte(Container.currentCapacity, Container.maximumCapacity),
            );

        const [{ count: emptyContainers }] = await db
            .select({ count: count() })
            .from(Container)
            .where(
                lte(Container.currentCapacity, 0),
            );

        return {
            totalContainers,
            fullContainers,
            emptyContainers,
        };
    }

    private async getWarehouseStats() {

        const [{ count: totalWarehouses }] = await db
            .select({ count: count() })
            .from(Warehouse);

        const [{ count: emptyWarehouses }] = await db
            .select({ count: count() })
            .from(Warehouse)
            .where(
                lte(Warehouse.containerQty, 0),
            );

        return {
            totalWarehouses,
            emptyWarehouses,
        };
    }

    private async getCategoryStats() {

        const [{ count: totalCategories }] = await db
            .select({ count: count() })
            .from(Category);

        return {
            totalCategories,
        };
    }

    private async getProductTypeStats() {

        const [{ count: totalProductTypes }] = await db
            .select({ count: count() })
            .from(ProductType);

        return {
            totalProductTypes,
        };
    }

    private async getTodayStats() {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [{ count: stockInToday }] = await db
            .select({ count: count() })
            .from(Audit)
            .where(
                and(
                    eq(Audit.action, AuditAction.STOCK_IN),
                    gte(Audit.createdAt, today),
                ),
            );

        const [{ count: stockOutToday }] = await db
            .select({ count: count() })
            .from(Audit)
            .where(
                and(
                    eq(Audit.action, AuditAction.STOCK_OUT),
                    gte(Audit.createdAt, today),
                ),
            );

        return {
            stockInToday,
            stockOutToday,
        };
    }

    private async getUserStats() {

        const totalUsers = await db
            .select({ count: count() })
            .from(User);

        const totalAdmins = await db
            .select({ count: count() })
            .from(User)
            .where(eq(User.role, UserRole.ADMIN));

        const totalManagers = await db
            .select({ count: count() })
            .from(User)
            .where(eq(User.role, UserRole.MANAGER));

        const totalStaff = await db
            .select({ count: count() })
            .from(User)
            .where(eq(User.role, UserRole.STAFF));

        const totalAuditors = await db
            .select({ count: count() })
            .from(User)
            .where(eq(User.role, UserRole.AUDITOR));

        return {
            totalUsers: totalUsers[0].count,
            totalAdmins: totalAdmins[0].count,
            totalManagers: totalManagers[0].count,
            totalStaff: totalStaff[0].count,
            totalAuditors: totalAuditors[0].count,
        };
    }
}