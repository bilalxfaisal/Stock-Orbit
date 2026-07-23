import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db/db';
import { eq, and, SQL, ilike, asc, desc, gte, lte } from "drizzle-orm"
import { Product, ProductType } from "src/db/schema"
import { SearchProductDto, StockInProductDto, StockOutProductDto, UpdatePriceDto } from './dto';
import { AuditService } from 'src/audit/audit.service';
import { ProductHelper } from './product.helper';

@Injectable()
export class ProductService {

    constructor(
        private readonly auditService: AuditService,
        private readonly helper: ProductHelper
    ) { }

    // Getters

    async searchProducts(query: SearchProductDto) {

        const conditions: SQL[] = [];

        // ---------- Filters ----------

        if (query.categoryId) {
            conditions.push(
                eq(ProductType.categoryId, Number(query.categoryId))
            );
        }

        if (query.productTypeId) {
            conditions.push(
                eq(Product.productTypeId, Number(query.productTypeId))
            );
        }

        if (query.containerId) {
            conditions.push(
                eq(Product.containerId, Number(query.containerId))
            );
        }

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

        if (query.minPrice) {
            conditions.push(
                gte(Product.price, query.minPrice)
            );
        }

        if (query.maxPrice) {
            conditions.push(
                lte(Product.price, query.maxPrice)
            );
        }

        if (query.minQuantity) {
            conditions.push(
                gte(Product.quantity, query.minQuantity)
            );
        }

        if (query.maxQuantity) {
            conditions.push(
                lte(Product.quantity, query.maxQuantity)
            );
        }

        // ---------- Pagination ----------

        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

        // ---------- Sorting ----------

        let orderBy = asc(Product.id);

        if (query.sortBy) {

            const direction = query.order === "desc" ? desc : asc;

            switch (query.sortBy) {
                case "brand":
                    orderBy = direction(Product.brand);
                    break;

                case "model":
                    orderBy = direction(Product.model);
                    break;

                case "price":
                    orderBy = direction(Product.price);
                    break;

                case "quantity":
                    orderBy = direction(Product.quantity);
                    break;
            }
        }

        // ---------- Query ----------

        const products = await db
            .select()
            .from(Product)
            .innerJoin(
                ProductType,
                eq(Product.productTypeId, ProductType.id),
            )
            .where(
                conditions.length ? and(...conditions) : undefined,
            )
            .orderBy(orderBy)
            .limit(limit)
            .offset(offset);

        return products;
    }

    async getProductById(id: number) {
        const [product] = await db.select().from(Product)
            .where(
                eq(Product.id, id)
            );

        if (!product) {
            throw new NotFoundException("Product not found.")
        }

        return product;
    }

    async updateProductPrice(id: number, price: number) {

        const [product] = await db
            .select()
            .from(Product)
            .where(eq(Product.id, id));

        if (!product) {
            throw new NotFoundException("Product not found.");
        }

        if (product.price === price) {
            throw new BadRequestException("Product already has this price.")
        }

        const [updatedProduct] = await db
            .update(Product)
            .set({
                price: price,
            })
            .where(eq(Product.id, id))
            .returning();

        return updatedProduct;
    }
    // Stock In and Stock Out 

    async stockIn(dto: StockInProductDto) {

        return db.transaction(async (tx) => {

            const productType = await this.helper.getProductTypeOrThrow(tx, dto.productTypeId);
            const container = await this.helper.getContainerOrThrow(tx, dto.containerId);
            this.helper.validateContainer(container, productType);
            this.helper.validateCapacity(container, dto.quantity);
            const existing = await this.helper.findExistingProduct(tx, dto);
            if (existing) {
                const updated = await this.helper.increaseQuantity(tx, existing, dto.quantity);
                await this.helper.updateContainerCapacity(tx, container.id, dto.quantity);
                await this.helper.logStockIn(updated, dto.quantity);
                return updated;
            }
            const product = await this.helper.createProduct(tx, dto);
            await this.helper.updateContainerCapacity(tx, container.id, dto.quantity);
            await this.helper.logStockIn(product, dto.quantity);
            return product;
        });
    }

    async stockOut(stockOutDto: StockOutProductDto) {

        return await db.transaction(async (tx) => {

            const product = await this.helper.getProductOrThrow(tx, stockOutDto.productId);
            this.helper.validateStockOutQuantity(product, stockOutDto.quantity);
            const container = await this.helper.getContainerOrThrow(tx, product.containerId);
            const removedProduct = {
                ...product,
                quantity: stockOutDto.quantity,
                reason: stockOutDto.reason,
            };
            await this.helper.removeProductQuantity(tx, product, stockOutDto.quantity);
            await this.helper.updateContainerCapacity(tx, container.id, -stockOutDto.quantity);
            await this.helper.logStockOut(removedProduct, stockOutDto.quantity, stockOutDto.reason);
            return {
                message: "Stock out completed successfully.",
                reason: stockOutDto.reason,
                product: removedProduct,
            };
        });
    }
}
