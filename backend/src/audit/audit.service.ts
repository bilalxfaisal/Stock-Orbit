import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { Warehouse, Container, Category, Product, Audit, ProductType } from "src/db/schema"
import { AuditEntity, AuditAction, StockOutReason } from 'src/db/enums';
import { AuditLogDto } from './dto/audit-log.dto';
import { and, eq, desc, gte, count, sum } from 'drizzle-orm';

@Injectable()
export class AuditService {

    async log(auditLogDto: AuditLogDto) {
        const [audit] = await db
            .insert(Audit)
            .values(auditLogDto)
            .returning();

        console.log(`[AUDIT] ${auditLogDto.description}`);

        return audit;
    }

    async history() {

        return await db.select().from(Audit).orderBy(desc(Audit.createdAt));
    }

    async getHistory(entity: AuditEntity, entityId?: number) {

        if (entityId !== undefined) {
            return await db
                .select()
                .from(Audit)
                .where(
                    and(
                        eq(Audit.entity, entity),
                        eq(Audit.entityId, entityId),
                    ),
                )
                .orderBy(desc(Audit.createdAt));
        }

        return await db
            .select()
            .from(Audit)
            .where(eq(Audit.entity, entity))
            .orderBy(desc(Audit.createdAt));
    }

    async stats() {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [
            warehouses,
            categories,
            containers,
            productTypes,
            products,
            stockInToday,
            stockOutToday,
        ] = await Promise.all([

            db.select({ count: count() }).from(Warehouse),
            db.select({ count: count() }).from(Category),
            db.select({ count: count() }).from(Container),
            db.select({ count: count() }).from(ProductType),
            db.select({ count: count() }).from(Product),
            db.select({ sum: sum(Audit.quantity) }).from(Audit)
                .where(
                    and(
                        eq(Audit.action, AuditAction.STOCK_IN),
                        gte(Audit.createdAt, today),
                    ),
                ),
            db.select({ sum: sum(Audit.quantity) }).from(Audit)
                .where(
                    and(
                        eq(Audit.action, AuditAction.STOCK_OUT),
                        gte(Audit.createdAt, today),
                    ),
                ),

        ]);

        return {
            totalWarehouses: warehouses[0].count,
            totalCategories: categories[0].count,
            totalContainers: containers[0].count,
            totalProductTypes: productTypes[0].count,
            totalProducts: products[0].count,
            stockInToday: stockInToday[0].sum,
            stockOutToday: stockOutToday[0].sum,
        };
    }
    async getContainerHistory(containerId?: number) {

        if (containerId) {
            return await db
                .select().from(Audit).where(
                    and(
                        eq(Audit.entity, AuditEntity.CONTAINER),
                        eq(Audit.entityId, containerId),
                    ),
                )
                .orderBy(desc(Audit.createdAt));
        }

        return await db.select().from(Audit)
            .where(
                eq(Audit.entity, AuditEntity.CONTAINER)
            ).orderBy(desc(Audit.createdAt));
    }
}
