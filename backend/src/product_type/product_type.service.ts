import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { count, eq, and, ilike, SQL } from 'drizzle-orm';
import { db } from 'src/db/db';
import { Category, Product, ProductType } from "src/db/schema"

import { CreateProductTypeDto, SearchProductTypeDto } from './dto';
import { AuditService } from 'src/audit/audit.service';
import { AuditAction, AuditEntity, UserRole } from 'src/db/enums';

@Injectable()
export class ProductTypeService {

    constructor(private readonly auditService: AuditService) { }

    async createProductType(createTypeDto: CreateProductTypeDto, role?: UserRole) {

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
            role,
            description: `Created Product Type '${newType.name}'`
        })

        return newType;
    }

    async getAllProductTypes(dto?: SearchProductTypeDto) {
        console.log("Backend Query : ", dto);
        const {
            name,
            category,
            categoryId,
            page = 1,
            limit = 10,
        } = dto ?? {};

        const offset = (page - 1) * limit;

        const conditions: SQL[] = [];

        if (name) {
            conditions.push(
                ilike(ProductType.name, `%${name}%`)
            );
        }

        if (category) {
            conditions.push(
                ilike(Category.name, `%${category}%`)
            );
        }

        if(categoryId) {
            conditions.push(
                eq(Category.id, categoryId)
            )
        }

        const whereCondition =
            conditions.length > 0
                ? and(...conditions)
                : undefined;

        const [productTypes] = await ([
            db.select({
                id: ProductType.id,
                name: ProductType.name,
                category: Category.name,
                categoryId: ProductType.categoryId,
                productCount: ProductType.productCount,
            })
                .from(ProductType)
                .innerJoin(
                    Category,
                    eq(Category.id, ProductType.categoryId),
                )
                .where(whereCondition)
                .limit(limit)
                .offset(offset),

            // db.select({
            //     total: count(),
            // })
            //     .from(ProductType)
            //     .innerJoin(
            //         Category,
            //         eq(Category.id, ProductType.categoryId),
            //     )
            //     .where(whereCondition),
        ]);

        //const total = totalResult[0]?.total ?? 0;

        return productTypes
    }

    async getProductTypeById(id: number) {

        const [productType] = await db.select({
            id: ProductType.id,
            name: ProductType.name,
            category: Category.name,
            categoryId: ProductType.categoryId,
            productCount: ProductType.productCount
        })
            .from(ProductType)
            .innerJoin(Category, eq(Category.id, ProductType.categoryId))
            .where(eq(ProductType.id, id));

        if (!productType) {
            throw new NotFoundException("Product type not found.");
        }

        return productType;
    }

    async deleteProductType(id: number, role?: UserRole) {

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
            console.log(product);
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
            role,
            description: `Deleted Product Type '${deletedType.name}'`
        })

        return deletedType;
    }
}