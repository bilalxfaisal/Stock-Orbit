import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db/db';
import { eq, and, SQL, ilike, asc, desc, gte, lte } from "drizzle-orm"
import { Category, Container, Inventory, Product, ProductType } from "src/db/schema"
import { SearchProductDto, StockInProductDto, StockOutProductDto, UpdatePriceDto } from './dto';
import { AuditService } from 'src/audit/audit.service';
import { ProductHelper } from './product.helper';
import { stockConfig } from 'src/config/stock.config';

@Injectable()
export class ProductService {

    constructor(
        private readonly auditService: AuditService,
        private readonly helper: ProductHelper
    ) { }

    // Getters

    async searchProducts(query: SearchProductDto) {

        const conditions: SQL[] = [];

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

        // if (query.minQuantity) {
        //     conditions.push(
        //         gte(Inventory.quantity, query.minQuantity)
        //     );
        // }

        // if (query.maxQuantity) {
        //     conditions.push(
        //         lte(Inventory.quantity, query.maxQuantity)
        //     );
        // }

        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;

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

                // case "quantity":
                //     orderBy = direction(Inventory.quantity);
                //     break;
            }
        }

        const products = await db
            .select({
                id: Product.id,
                model: Product.model,
                brand: Product.brand,
                price: Product.price,
                category: Category.name,
                productType: ProductType.name,
            })
            .from(Product)
            .innerJoin(ProductType, eq(ProductType.id, Product.productTypeId))
            .innerJoin(Category, eq(Category.id, ProductType.categoryId))
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

    async stockIn(dto: StockInProductDto) {

        return db.transaction(async (tx) => {
            const productType = await this.helper.getProductTypeOrThrow(tx, dto.productTypeId);

            // Container selection depends on the stockConfig flag:
            //  - manual: caller-provided containerId is used as-is.
            //  - automatic: containerId (if any) is ignored, and a random
            //    eligible container in the same category is assigned.

            const container = stockConfig.allowManualContainerSelection
                ? await this.helper.resolveManualContainer(tx, dto.containerId)
                : await this.helper.getRandomContainer(tx, productType.categoryId, dto.quantity);

            this.helper.validateContainer(container, productType);
            this.helper.validateCapacity(container, dto.quantity);

            let product = await this.helper.findExistingProduct(tx, dto);

            if (!product) {
                product = await this.helper.createProduct(tx, dto);
            }

            let inventory = await this.helper.findInventoryByProductAndContainer(tx, product.id, container.id);

            if (!inventory) {
                inventory = await this.helper.createInventory(tx, product.id, container.id, dto.quantity);
            } else {
                inventory = await this.helper.increaseInventoryQuantity(tx, inventory, dto.quantity);
            }

            await this.helper.updateContainerCapacity(tx, container.id, dto.quantity);
            await this.helper.updateCategoryAndTypeCount(tx, productType.id, dto.quantity)
            await this.helper.logStockIn(product, dto.quantity);

            return {
                message: "Stock in completed successfully.",
                product,
                inventory,
                container,
            };
        });
    }

    async stockOut(stockOutDto: StockOutProductDto) {

        return await db.transaction(async (tx) => {
            const inventory = await this.helper.getInventoryOrThrow(tx, stockOutDto.productId, stockOutDto.containerId);
            const product = await this.helper.getProductOrThrow(tx, inventory.productId);
            const productType = await this.helper.getProductTypeOrThrow(tx, product.productTypeId)
            this.helper.validateStockOutQuantity(inventory, stockOutDto.quantity);
            const container = await this.helper.getContainerOrThrow(tx, inventory.containerId);

            const updatedInventory = await this.helper.decreaseInventoryQuantity(tx, inventory, stockOutDto.quantity);
            const responseInventory = updatedInventory ?? { ...inventory, quantity: 0 };

            await this.helper.updateContainerCapacity(tx, container.id, -stockOutDto.quantity);
            await this.helper.updateCategoryAndTypeCount(tx, productType.id, -stockOutDto.quantity)
            await this.helper.logStockOut(product, stockOutDto.quantity, stockOutDto.reason);

            return {
                message: "Stock out completed successfully.",
                reason: stockOutDto.reason,
                product,
                inventory: responseInventory,
            };
        });
    }
}
