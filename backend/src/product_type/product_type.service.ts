import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { eq } from 'drizzle-orm';
import { db } from 'src/db/db';
import { Category, Product, ProductType } from "src/db/schema"

import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { AuditService } from 'src/audit/audit.service';
import { AuditAction, AuditEntity } from 'src/db/enums';

@Injectable()
export class ProductTypeService {

    constructor(private readonly auditService: AuditService) { }

    async createProductType(createTypeDto: CreateProductTypeDto) {

        // Check if category exists
        const [category] = await db
            .select()
            .from(Category)
            .where(eq(Category.id, createTypeDto.categoryId));

        if (!category) {
            throw new NotFoundException("Category not found.");
        }

        // Check duplicate name in same category
        const existingTypes = await db
            .select()
            .from(ProductType)
            .where(eq(ProductType.categoryId, createTypeDto.categoryId));

        const duplicate = existingTypes.find(
            type => type.name.toLowerCase() === createTypeDto.name.toLowerCase()
        );

        if (duplicate) {
            throw new BadRequestException(
                "Product type already exists in this category."
            );
        }

        const [newType] = await db
            .insert(ProductType)
            .values(createTypeDto)
            .returning();

        this.auditService.log({
            action: AuditAction.CREATE,
            entity: AuditEntity.PRODUCT_TYPE,
            entityId: newType.id,
            description: `Created Product Type '${newType.name}'`
        })

        return newType;
    }

    async getAllProductTypes() {
        return await db.select().from(ProductType);
    }

    async getProductTypeById(id: number) {

        const [productType] = await db
            .select()
            .from(ProductType)
            .where(eq(ProductType.id, id));

        if (!productType) {
            throw new NotFoundException("Product type not found.");
        }

        return productType;
    }

    async deleteProductType(id: number) {

        const [existingType] = await db
            .select()
            .from(ProductType)
            .where(eq(ProductType.id, id));

        if (!existingType) {
            throw new NotFoundException("Product type not found.");
        }

        const [product] = await db
            .select()
            .from(Product)
            .where(eq(Product.productTypeId, id));

        if (product) {
            throw new BadRequestException(
                "Cannot delete product type because it contains products."
            );
        }

        const [deletedType] = await db
            .delete(ProductType)
            .where(eq(ProductType.id, id))
            .returning();

        this.auditService.log({
            action: AuditAction.DELETE,
            entity: AuditEntity.PRODUCT_TYPE,
            entityId: deletedType.id,
            description: `Created Product Type '${deletedType.name}'`
        })

        return deletedType;
    }
}