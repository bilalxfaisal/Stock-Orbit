import { relations } from "drizzle-orm";
import { Warehouse, Container, Category, Product, ProductType, Inventory } from "src/db/schema"

export const warehouseRelations = relations(Warehouse, ({ many }) => ({
    containers: many(Container)
}))

export const categoryRelations = relations(Category, ({ many }) => ({
    containers: many(Container),
    product_types: many(ProductType),
}))

export const productRelations = relations(Product, ({ one, many }) => ({
    product_type: one(ProductType, {
        fields: [Product.productTypeId],
        references: [ProductType.id]
    }),
    inventories: many(Inventory)
}))

export const containerRelations = relations(Container, ({ one, many }) => ({
    warehouse: one(Warehouse, {
        fields: [Container.warehouseId],
        references: [Warehouse.id]
    }),
    category: one(Category, {
        fields: [Container.categoryId],
        references: [Category.id]
    }),
    inventories: many(Inventory)
}))

export const inventoryRelations = relations(Inventory, ({ one }) => ({
    product: one(Product, {
        fields: [Inventory.productId],
        references: [Product.id]
    }),
    container: one(Container, {
        fields: [Inventory.containerId],
        references: [Container.id]
    })
}))

export const productTypeRelations = relations(ProductType, ({ one, many }) => ({
    category: one(Category, {
        fields: [ProductType.categoryId],
        references: [Category.id]
    }),
    products: many(Product)
}))