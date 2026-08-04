import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db/db';
import { AuditService } from 'src/audit/audit.service';
import { Container, Category, ProductType } from "src/db/schema"
import { AuditAction, AuditEntity, UserRole } from 'src/db/enums';
import { UpdateCategoryDto, CreateCategoryDto } from './dto';
import { log } from 'console';

@Injectable()
export class CategoryService {

    constructor(private readonly auditService: AuditService) { }

    async createCategory(createCategoryDto: CreateCategoryDto, role?: UserRole) {

        const [existingCategory] = await db
            .select()
            .from(Category)
            .where(eq(Category.name, createCategoryDto.name));

        if (existingCategory) {
            throw new BadRequestException('Category already exists.');
        }

        const [newCategory] = await db
            .insert(Category)
            .values(createCategoryDto)
            .returning();

        await this.auditService.log({
            action: AuditAction.CREATE,
            entity: AuditEntity.CATEGORY,
            entityId: newCategory.id,
            role,
            description: `Created category '${newCategory.name}'.`,
        });

        return newCategory;
    }

    async getAllCategories() {
        return await db.select().from(Category);
    }

    async getCategoryById(id: number) {

        const [category] = await db
            .select()
            .from(Category)
            .where(eq(Category.id, id));

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return category;
    }

    async deleteCategory(id: number, role?: UserRole) {

        const [existingCategory] = await db
            .select()
            .from(Category)
            .where(eq(Category.id, id));

        if (!existingCategory) {
            throw new NotFoundException("Category not found.");
        }

        const [container] = await db
            .select()
            .from(Container)
            .where(eq(Container.categoryId, id));

        if (container) {
            throw new BadRequestException(
                "Cannot delete category because it contains containers.",
            );
        }

        const [productType] = await db
            .select()
            .from(ProductType)
            .where(eq(ProductType.categoryId, id));

        if (productType) {
            throw new BadRequestException(
                "Cannot delete category because it contains product types.",
            );
        }

        const [deletedCategory] = await db
            .delete(Category)
            .where(eq(Category.id, id))
            .returning();

        await this.auditService.log({
            action: AuditAction.DELETE,
            entity: AuditEntity.CATEGORY,
            entityId: deletedCategory.id,
            role,
            description: `Deleted category '${deletedCategory.name}'.`,
        });

        return deletedCategory;
    }
}