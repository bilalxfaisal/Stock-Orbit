import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateContainerDto, UpdateContainerDto } from './dto';
import { db } from 'src/db/db';
import { Category, Container, Inventory, Warehouse } from "src/db/schema"
import { eq, SQL, and, ilike, gte, lte, sql } from 'drizzle-orm';
import { AuditService } from 'src/audit/audit.service';
import { AuditAction, AuditEntity } from 'src/db/enums';
import { SearchContainerDto } from './dto/search-container.dto';

@Injectable()
export class ContainerService {

    constructor(private readonly auditService: AuditService) { }

    async createContainer(createContainerDto: CreateContainerDto) {

        const [existingContainer] = await db
            .select()
            .from(Container)
            .where(
                eq(Container.code, createContainerDto.code)
            )

        if (existingContainer) {
            throw new BadRequestException("Category already exists.")
        }

        const [newContainer] = await db
            .insert(Container)
            .values(createContainerDto)
            .returning()

        await db
            .update(Category)
            .set({
                containerCount: sql`${Category.containerCount} + 1`
            })
            .where(eq(Category.id, newContainer.categoryId));

        await db
            .update(Warehouse)
            .set({
                containerQty: sql`${Warehouse.containerQty} + 1`
            })
            .where(eq(Warehouse.id, newContainer.warehouseId));

        await this.auditService.log({
            action: AuditAction.CREATE,
            entity: AuditEntity.CONTAINER,
            entityId: newContainer.id,
            description: `Created container '${newContainer.code}'.`,
        });

        return newContainer
    }

    async getAllContainers(query: SearchContainerDto) {

        const conditions: SQL[] = [];

        if (query.code) {
            conditions.push(
                ilike(Container.code, `%${query.code}%`)
            );
        }

        if (query.warehouseId) {
            conditions.push(
                eq(Container.warehouseId, query.warehouseId)
            );
        }

        if (query.categoryId) {
            conditions.push(
                eq(Container.categoryId, query.categoryId)
            );
        }

        if (query.minCapacity) {
            conditions.push(
                gte(Container.maximumCapacity, query.minCapacity)
            );
        }

        if (query.maxCapacity) {
            conditions.push(
                lte(Container.maximumCapacity, query.maxCapacity)
            );
        }

        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        return await db
            .select({
                id: Container.id,
                code: Container.code,
                maximumCapacity: Container.maximumCapacity,
                currentCapacity: Container.currentCapacity,
                category: Category.name,
                warehouse: Warehouse.code,
            })
            .from(Container)
            .innerJoin(
                Category,
                eq(Category.id, Container.categoryId),
            )
            .innerJoin(
                Warehouse,
                eq(Warehouse.id, Container.warehouseId),
            )
            .where(
                conditions.length
                    ? and(...conditions)
                    : undefined,
            )
            .limit(limit)
            .offset(offset);
    }

    async getContainerById(id: number) {
        return await db.select().from(Container).where(
            eq(Container.id, id)
        )
    }

    async updateContainer(id: number, updateContainerDto: UpdateContainerDto) {

        const [existingContainer] = await db
            .select()
            .from(Container)
            .where(eq(Container.id, id));

        if (!existingContainer) {
            throw new NotFoundException("Container not found.");
        }

        const [updatedContainer] = await db
            .update(Container)
            .set(updateContainerDto)
            .where(eq(Container.id, id))
            .returning();

        await this.auditService.log({
            action: AuditAction.UPDATE,
            entity: AuditEntity.CONTAINER,
            entityId: updatedContainer.id,
            description: `Updated container '${updatedContainer.code}'.`,
        });

        return updatedContainer;
    }

    async deleteContainer(id: number) {

        const [existingContainer] = await db
            .select()
            .from(Container)
            .where(eq(Container.id, id));

        if (!existingContainer) {
            throw new NotFoundException("Container not found.");
        }

        const inventories = await db
            .select()
            .from(Inventory)
            .where(eq(Inventory.containerId, id));

        if (inventories.length > 0) {
            throw new BadRequestException(
                "Cannot delete container because it contains inventory records."
            );
        }

        const [deletedContainer] = await db
            .delete(Container)
            .where(eq(Container.id, id))
            .returning();

        await db
            .update(Category)
            .set({
                containerCount: sql`${Category.containerCount} - 1`
            })
            .where(eq(Category.id, deletedContainer.categoryId));

        await db
            .update(Warehouse)
            .set({
                containerQty: sql`${Warehouse.containerQty} - 1`
            })
            .where(eq(Warehouse.id, deletedContainer.warehouseId));

        await this.auditService.log({
            action: AuditAction.UPDATE,
            entity: AuditEntity.CONTAINER,
            entityId: deletedContainer.id,
            description: `Deleted container '${deletedContainer.code}'.`,
        });

        return deletedContainer;
    }
}
