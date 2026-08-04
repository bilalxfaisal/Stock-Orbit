import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductType, Container, Product, Inventory, Category } from "src/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { StockInProductDto } from "./dto";
import { AuditAction, AuditEntity, StockOutReason, UserRole } from "src/db/enums";
import { AuditService } from "src/audit/audit.service";

@Injectable()
export class ProductHelper {
    constructor(private readonly auditService: AuditService) { }

    async getProductTypeOrThrow(
        tx: any,
        productTypeId: number,
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

    // Used when stockConfig.allowManualContainerSelection is true.
    // The caller must have supplied a containerId.
    async resolveManualContainer(
        tx: any,
        containerId: number | undefined,
    ) {
        if (!containerId) {
            throw new BadRequestException(
                "containerId is required.",
            );
        }

        return this.getContainerOrThrow(tx, containerId);
    }

    // Used when stockConfig.allowManualContainerSelection is false.
    // Randomly assigns one of the containers that belong to the
    // product's category and has enough free capacity for the quantity.
    async getRandomContainer(
        tx: any,
        categoryId: number,
        quantity: number,
    ) {
        const containers = await tx
            .select()
            .from(Container)
            .where(eq(Container.categoryId, categoryId));

        const eligible = containers.filter(
            (container: typeof Container.$inferSelect) =>
                container.maximumCapacity - container.currentCapacity >= quantity,
        );

        if (eligible.length === 0) {
            throw new BadRequestException(
                "No container in this category has enough free capacity for this quantity.",
            );
        }

        const randomIndex = Math.floor(Math.random() * eligible.length);

        return eligible[randomIndex];
    }

    validateContainer(
        container: typeof Container.$inferSelect,
        productType: typeof ProductType.$inferSelect,
    ) {
        if (container.currentCapacity >= container.maximumCapacity) {
            throw new BadRequestException("Container is full.");
        }

        if (container.categoryId !== productType.categoryId) {
            throw new BadRequestException("Container belongs to another category.");
        }
    }

    validateCapacity(
        container: typeof Container.$inferSelect,
        quantity: number,
    ) {
        const remaining = container.maximumCapacity - container.currentCapacity;

        if (quantity > remaining) {
            throw new BadRequestException("Container does not have enough capacity.");
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
                ),
            );

        return product;
    }

    async createProduct(
        tx: any,
        dto: StockInProductDto,
    ) {
        const [product] = await tx
            .insert(Product)
            .values({
                brand: dto.brand,
                model: dto.model,
                price: dto.price,
                productTypeId: dto.productTypeId,
            })
            .returning();

        return product;
    }

    async findInventoryByProductAndContainer(
        tx: any,
        productId: number,
        containerId: number,
    ) {
        const [inventory] = await tx
            .select()
            .from(Inventory)
            .where(
                and(
                    eq(Inventory.productId, productId),
                    eq(Inventory.containerId, containerId),
                ),
            );

        return inventory;
    }

    async createInventory(
        tx: any,
        productId: number,
        containerId: number,
        quantity: number,
    ) {
        const [inventory] = await tx
            .insert(Inventory)
            .values({
                productId,
                containerId,
                quantity,
            })
            .returning();

        return inventory;
    }

    async increaseInventoryQuantity(
        tx: any,
        inventory: typeof Inventory.$inferSelect,
        quantity: number,
    ) {
        const [updated] = await tx
            .update(Inventory)
            .set({
                quantity: inventory.quantity + quantity,
            })
            .where(eq(Inventory.id, inventory.id))
            .returning();

        return updated;
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
        role?: UserRole,
    ) {
        await this.auditService.log({
            action: AuditAction.STOCK_IN,
            entity: AuditEntity.PRODUCT,
            entityId: product.id,
            quantity,
            role,
            description: `Stocked in ${quantity} x product '${product.brand} ${product.model}'.`,
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

    async getInventoryOrThrow(
        tx: any,
        productId: number,
        containerId: number
    ) {
        const [inventory] = await tx
            .select()
            .from(Inventory)
            .where(
                and(
                    eq(Inventory.productId, productId),
                    eq(Inventory.containerId, containerId)
                ));

        if (!inventory) {
            throw new NotFoundException("Inventory record not found.");
        }

        return inventory;
    }

    validateStockOutQuantity(
        inventory: typeof Inventory.$inferSelect,
        quantity: number,
    ) {
        if (inventory.quantity < quantity) {
            throw new BadRequestException("Not enough stock available.");
        }
    }

    async decreaseInventoryQuantity(
        tx: any,
        inventory: typeof Inventory.$inferSelect,
        quantity: number,
    ) {
        const remainingQuantity = inventory.quantity - quantity;

        if (remainingQuantity <= 0) {
            await tx.delete(Inventory).where(eq(Inventory.id, inventory.id));
            return null;
        }

        const [updatedInventory] = await tx
            .update(Inventory)
            .set({
                quantity: remainingQuantity,
            })
            .where(eq(Inventory.id, inventory.id))
            .returning();

        return updatedInventory;
    }

    async logStockOut(
        product: typeof Product.$inferSelect,
        quantity: number,
        reason: StockOutReason,
        role?: UserRole,
    ) {
        await this.auditService.log({
            action: AuditAction.STOCK_OUT,
            entity: AuditEntity.PRODUCT,
            entityId: product.id,
            quantity,
            reason,
            role,
            description: `Stocked out ${quantity} x product '${product.brand} ${product.model}'.`,
        });
    }
    async updateCategoryAndTypeCount(
        tx: any,
        productTypeId: number,
        quantity: number
    ) {
        const [productType] = await tx
            .select({
                categoryId: ProductType.categoryId,
            })
            .from(ProductType)
            .where(eq(ProductType.id, productTypeId));

        if (!productType) {
            throw new Error("Product type not found");
        }

        await tx
            .update(ProductType)
            .set({
                productCount: sql`${ProductType.productCount} + ${quantity}`
            })
            .where(eq(ProductType.id, productTypeId))

        await tx
            .update(Category)
            .set({
                productCount: sql`${Category.productCount} + ${quantity}`,
            })
            .where(eq(Category.id, productType.categoryId));
    }
}