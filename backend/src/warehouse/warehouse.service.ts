import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db/db';
import { eq, ilike, SQL, and } from 'drizzle-orm';
import { Warehouse, Container } from "src/db/schema"
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto';
import { AuditService } from 'src/audit/audit.service';
import { AuditAction, AuditEntity } from 'src/db/enums';
import { SearchWarehouseDto } from './dto/search-warehouse.dto';

@Injectable()
export class WarehouseService {

    constructor(private readonly auditService: AuditService) { }

    async searchWarehouses(query: SearchWarehouseDto) {

        const conditions: SQL[] = [];

        if (query.code) {
            conditions.push(
                ilike(Warehouse.code, `%${query.code}%`)
            );
        }

        if (query.name) {
            conditions.push(
                ilike(Warehouse.name, `%${query.name}%`)
            );
        }

        if (query.location) {
            conditions.push(
                ilike(Warehouse.location, `%${query.location}%`)
            );
        }

        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        return db
            .select()
            .from(Warehouse)
            .where(
                conditions.length
                    ? and(...conditions)
                    : undefined
            )
            .limit(limit)
            .offset(offset);
    }

    async createWarehouse(createWarehouseDto: CreateWarehouseDto) {

        const [existingWarehouse] = await db
            .select()
            .from(Warehouse)
            .where(
                eq(Warehouse.code, createWarehouseDto.code)
            )

        if (existingWarehouse) {
            throw new BadRequestException("Warehouse already exists.")
        }

        const [newWarehouse] = await db
            .insert(Warehouse)
            .values(createWarehouseDto)
            .returning()

        this.auditService.log({
            action: AuditAction.CREATE,
            entity: AuditEntity.WAREHOUSE,
            entityId: newWarehouse.id,
            description: `Created Warehouse '${newWarehouse.name}'`
        })

        return newWarehouse
    }

    async getWarehouseById(id: number) {

        const [category] = await db
            .select()
            .from(Warehouse)
            .where(eq(Warehouse.id, id));

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return category;
    }

    async getAllWarehouses() {
        return await db.select().from(Warehouse);
    }

    async updateWarehouse(id: number, updateWarehouseDto: UpdateWarehouseDto) {

        const [existingWarehouse] = await db
            .select()
            .from(Warehouse)
            .where(eq(Warehouse.id, id));

        if (!existingWarehouse) {
            throw new NotFoundException("Warehouse not found.");
        }

        const [updatedWarehouse] = await db
            .update(Warehouse)
            .set(updateWarehouseDto)
            .where(eq(Warehouse.id, id))
            .returning();

        this.auditService.log({
            action: AuditAction.UPDATE,
            entity: AuditEntity.WAREHOUSE,
            entityId: updatedWarehouse.id,
            description: `Updated Warehouse '${updatedWarehouse.name}'`
        })

        return updatedWarehouse;
    }

    async deleteWarehouse(id: number) {

        const [existingWarehouse] = await db
            .select()
            .from(Warehouse)
            .where(eq(Warehouse.id, id));

        if (!existingWarehouse) {
            throw new NotFoundException("Warehouse not found.");
        }

        const containers = await db
            .select()
            .from(Container)
            .where(eq(Container.warehouseId, id));

        if (containers.length > 0) {
            throw new BadRequestException(
                "Cannot delete warehouse because it contains containers."
            );
        }

        const [deletedWarehouse] = await db
            .delete(Warehouse)
            .where(eq(Warehouse.id, id))
            .returning();

        this.auditService.log({
            action: AuditAction.DELETE,
            entity: AuditEntity.WAREHOUSE,
            entityId: deletedWarehouse.id,
            description: `Deleted Warehouse '${deletedWarehouse.name}'`
        })

        return deletedWarehouse;
    }
}
