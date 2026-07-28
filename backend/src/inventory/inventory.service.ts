import { Injectable, NotFoundException } from "@nestjs/common";
import {
    and,
    asc,
    eq,
    gte,
    ilike,
    lte,
    SQL,
} from "drizzle-orm";

import { db } from "src/db/db";
import {
    Category,
    Container,
    Inventory,
    Product,
    ProductType,
} from "src/db/schema";

import { SearchInventoryDto } from "./dto/search-inventory.dto";

@Injectable()
export class InventoryService {

    private baseSelect() {
        return db
            .select({
                id: Inventory.id,
                productId: Product.id,
                containerId: Container.id,

                brand: Product.brand,
                model: Product.model,
                price: Product.price,
                quantity: Inventory.quantity,

                container: Container.code,
                category: Category.name,
                productType: ProductType.name,
            })
            .from(Inventory)
            .innerJoin(Product, eq(Product.id, Inventory.productId))
            .innerJoin(Container, eq(Container.id, Inventory.containerId))
            .innerJoin(ProductType, eq(Product.productTypeId, ProductType.id))
            .innerJoin(Category, eq(Category.id, ProductType.categoryId));
    }

    async findAll(query: SearchInventoryDto) {

        const conditions: SQL[] = [];

        if (query.brand) {
            conditions.push(
                ilike(Product.brand, `%${query.brand}%`)
            );
        }

        if (query.model) {
            conditions.push(
                ilike(Product.model, `%${query.model}%`)
            );
        }

        if (query.productId) {
            conditions.push(
                eq(Product.id, query.productId)
            );
        }

        if (query.containerId) {
            conditions.push(
                eq(Container.id, query.containerId)
            );
        }

        if (query.categoryId) {
            conditions.push(
                eq(Category.id, query.categoryId)
            );
        }

        if (query.productTypeId) {
            conditions.push(
                eq(ProductType.id, query.productTypeId)
            );
        }

        if (query.minQuantity !== undefined) {
            conditions.push(
                gte(Inventory.quantity, query.minQuantity)
            );
        }

        if (query.maxQuantity !== undefined) {
            conditions.push(
                lte(Inventory.quantity, query.maxQuantity)
            );
        }

        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        return this.baseSelect()
            .where(
                conditions.length
                    ? and(...conditions)
                    : undefined
            )
            .orderBy(asc(Inventory.id))
            .limit(limit)
            .offset(offset);
    }

    async findOne(id: number) {

        const [item] = await this.baseSelect()
            .where(eq(Inventory.id, id));

        if (!item) {
            throw new NotFoundException(
                "Inventory item not found."
            );
        }

        return item;
    }

    async findByProduct(productId: number) {

        const items = await this.baseSelect()
            .where(eq(Inventory.productId, productId));

        if (!items.length) {
            throw new NotFoundException(
                "No inventory found for this product."
            );
        }

        return items;
    }

    async findByContainer(containerId: number) {

        const items = await this.baseSelect()
            .where(eq(Inventory.containerId, containerId));

        if (!items.length) {
            throw new NotFoundException(
                "No inventory found for this container."
            );
        }

        return items;
    }
}