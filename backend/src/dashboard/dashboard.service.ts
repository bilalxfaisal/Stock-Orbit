import { Injectable } from "@nestjs/common";
import { Product, Category, ProductType, Container, Warehouse, Audit, User } from "src/db/schema";
import { db } from "src/db/db";
import { AuditAction, AuditEntity, StockOutReason, UserRole } from "src/db/enums";
import { and, eq, lte, gte, gt, lt, count, sum, inArray, desc } from "drizzle-orm";

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

        const stockActivity = await this.getStockActivity();
        const categoryDistribution = await this.getCategoryDistribution();
        const warehouseUtilization = await this.getWarehouseUtilization();
        const recentActivity = await this.getRecentActivity();

        return {
            products,
            containers,
            warehouses,
            categories,
            productTypes,
            users,
            today,
            stockActivity,
            categoryDistribution,
            warehouseUtilization,
            recentActivity,
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

    // Daily stock-in / stock-out totals for the last 14 days, for the
    // dashboard trend chart.

    private async getStockActivity() {

        const since = new Date();
        since.setHours(0, 0, 0, 0);
        since.setDate(since.getDate() - 13);

        const rows = await db
            .select({
                action: Audit.action,
                quantity: Audit.quantity,
                createdAt: Audit.createdAt,
            })
            .from(Audit)
            .where(
                and(
                    gte(Audit.createdAt, since),
                    inArray(Audit.action, [
                        AuditAction.STOCK_IN,
                        AuditAction.STOCK_OUT,
                    ]),
                ),
            );

        const buckets = new Map<
            string,
            { stockIn: number; stockOut: number }
        >();

        for (let i = 0; i < 14; i++) {
            const day = new Date(since);
            day.setDate(since.getDate() + i);

            buckets.set(day.toISOString().slice(0, 10), {
                stockIn: 0,
                stockOut: 0,
            });
        }

        for (const row of rows) {
            const key = row.createdAt.toISOString().slice(0, 10);
            const bucket = buckets.get(key);

            if (!bucket) continue;

            const quantity = row.quantity ?? 0;

            if (row.action === AuditAction.STOCK_IN) {
                bucket.stockIn += quantity;
            } else {
                bucket.stockOut += quantity;
            }
        }

        return Array.from(buckets.entries()).map(([date, value]) => ({
            date,
            stockIn: value.stockIn,
            stockOut: value.stockOut,
        }));
    }

    // Product count per category, for the distribution chart. Categories
    // already keep a running productCount, so no join needed.

    private async getCategoryDistribution() {

        const rows = await db
            .select({
                name: Category.name,
                productCount: Category.productCount,
            })
            .from(Category)
            .orderBy(desc(Category.productCount))
            .limit(8);

        return rows;
    }

    // Capacity used vs available per warehouse, for the utilization chart.

    private async getWarehouseUtilization() {

        const rows = await db
            .select({
                code: Warehouse.code,
                name: Warehouse.name,
                currentCapacity: sum(Container.currentCapacity),
                maximumCapacity: sum(Container.maximumCapacity),
            })
            .from(Warehouse)
            .leftJoin(Container, eq(Container.warehouseId, Warehouse.id))
            .groupBy(Warehouse.id, Warehouse.code, Warehouse.name)
            .orderBy(Warehouse.name);

        return rows.map((row) => {
            const current = Number(row.currentCapacity ?? 0);
            const maximum = Number(row.maximumCapacity ?? 0);

            return {
                code: row.code,
                name: row.name,
                currentCapacity: current,
                maximumCapacity: maximum,
                utilization:
                    maximum > 0
                        ? Math.round((current / maximum) * 100)
                        : 0,
            };
        });
    }

    // Latest audit entries, for the live activity feed. This lives on the
    // dashboard (rather than reusing /audit) because the dashboard is
    // visible to every role, including AUDITOR, who can't hit /audit.

    private async getRecentActivity() {

        return await db
            .select({
                id: Audit.id,
                action: Audit.action,
                entity: Audit.entity,
                quantity: Audit.quantity,
                reason: Audit.reason,
                description: Audit.description,
                createdAt: Audit.createdAt,
            })
            .from(Audit)
            .orderBy(desc(Audit.createdAt))
            .limit(8);
    }
}