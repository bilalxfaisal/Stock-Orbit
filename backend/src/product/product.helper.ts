import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductType, Container, Product } from "src/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { StockInProductDto } from "./dto";
import { AuditAction, AuditEntity, StockOutReason } from "src/db/enums";
import { AuditService } from "src/audit/audit.service";

@Injectable()
export class ProductHelper {
    constructor(private readonly auditService: AuditService) { }

    async getProductTypeOrThrow(
        tx: any, 
        productTypeId: number
    ) {
        const [productType] = await tx
            .select()
            .from(ProductType)
            .where(eq(ProductType.id, productTypeId));

        if (!productType) {
            throw new NotFoundException("Product type not found.");
        }

        return productType;
    }

    async getContainerOrThrow(
        tx: any,
        containerId: number,
    ) {
        const [container] = await tx
            .select()
            .from(Container)
            .where(eq(Container.id, containerId));

        if (!container) {
            throw new NotFoundException("Container not found.");
        }

        return container;
    }

    validateContainer(
        container: typeof Container.$inferSelect,
        productType: typeof ProductType.$inferSelect,
    ) {

        if (
            container.currentCapacity >=
            container.maximumCapacity
        ) {
            throw new BadRequestException("Container is full.");
        }

        if (
            container.categoryId !==
            productType.categoryId
        ) {
            throw new BadRequestException(
                "Container belongs to another category.",
            );
        }
    }

    validateCapacity(
        container: typeof Container.$inferSelect,
        quantity: number,
    ) {
        const remaining =
            container.maximumCapacity -
            container.currentCapacity;

        if (quantity > remaining) {
            throw new BadRequestException(
                "Container does not have enough capacity.",
            );
        }
    }

    async findExistingProduct(
        tx: any,
        dto: StockInProductDto,
    ) {
        const [product] = await tx
            .select()
            .from(Product)
            .where(
                and(
                    eq(Product.productTypeId, dto.productTypeId),
                    eq(Product.brand, dto.brand),
                    eq(Product.model, dto.model),
                    eq(Product.price, dto.price),
                    eq(Product.containerId, dto.containerId),
                ),
            );

        return product;
    }

    async increaseQuantity(
        tx: any,
        product: typeof Product.$inferSelect,
        quantity: number,
    ) {
        const [updated] = await tx
            .update(Product)
            .set({
                quantity: product.quantity + quantity,
            })
            .where(eq(Product.id, product.id))
            .returning();

        return updated;
    }

    async createProduct(
        tx: any,
        dto: StockInProductDto,
    ) {
        const [product] = await tx
            .insert(Product)
            .values(dto)
            .returning();

        return product;
    }

    async updateContainerCapacity(
        tx: any,
        containerId: number,
        quantity: number,
    ) {
        await tx
            .update(Container)
            .set({
                currentCapacity: sql`${Container.currentCapacity} + ${quantity}`,
            })
            .where(eq(Container.id, containerId));
    }

    async logStockIn(
        product: typeof Product.$inferSelect,
        quantity: number,
    ) {
        await this.auditService.log({
            action: AuditAction.STOCK_IN,
            entity: AuditEntity.PRODUCT,
            entityId: product.id,
            quantity,
            description:
                `Stocked in ${quantity} x product '${product.brand} ${product.model}'.`,
        });
    }

    async getProductOrThrow(
        tx: any,
        productId: number,
    ) {
        const [product] = await tx
            .select()
            .from(Product)
            .where(eq(Product.id, productId));

        if (!product) {
            throw new NotFoundException("Product doesn't exist.");
        }

        return product;
    }

    validateStockOutQuantity(
        product: typeof Product.$inferSelect,
        quantity: number,
    ) {
        if (product.quantity < quantity) {
            throw new BadRequestException(
                "Not enough stock available.",
            );
        }
    }

    async removeProductQuantity(
        tx: any,
        product: typeof Product.$inferSelect,
        quantity: number,
    ) {
        const remainingQuantity = product.quantity - quantity;

        if (remainingQuantity === 0) {

            await tx
                .delete(Product)
                .where(eq(Product.id, product.id));

            return null;
        }

        const [updatedProduct] = await tx
            .update(Product)
            .set({
                quantity: remainingQuantity,
            })
            .where(eq(Product.id, product.id))
            .returning();

        return updatedProduct;
    }
    async logStockOut(
        product: typeof Product.$inferSelect,
        quantity: number,
        reason: StockOutReason,
    ) {
        await this.auditService.log({
            action: AuditAction.STOCK_OUT,
            entity: AuditEntity.PRODUCT,
            entityId: product.id,
            quantity,
            reason,
            description:
                `Stocked out ${quantity} x product '${product.brand} ${product.model}'.`,
        });
    }
}