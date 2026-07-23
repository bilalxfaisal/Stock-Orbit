import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateContainerDto, UpdateContainerDto } from './dto';
import { db } from 'src/db/db';
import { Container, Product } from "src/db/schema"
import { eq } from 'drizzle-orm';
import { AuditService } from 'src/audit/audit.service';
import { AuditAction, AuditEntity } from 'src/db/enums';

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

        await this.auditService.log({
            action: AuditAction.CREATE,
            entity: AuditEntity.CONTAINER,
            entityId: newContainer.id,
            description: `Created container '${newContainer.code}'.`,
        });

        return newContainer
    }

    async getAllContainers() {
        return await db.select().from(Container);
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

        const products = await db
            .select()
            .from(Product)
            .where(eq(Product.containerId, id));

        if (products.length > 0) {
            throw new BadRequestException(
                "Cannot delete container because it contains products."
            );
        }

        const [deletedContainer] = await db
            .delete(Container)
            .where(eq(Container.id, id))
            .returning();

        await this.auditService.log({
            action: AuditAction.UPDATE,
            entity: AuditEntity.CONTAINER,
            entityId: deletedContainer.id,
            description: `Deleted container '${deletedContainer.code}'.`,
        });

        return deletedContainer;
    }
}
