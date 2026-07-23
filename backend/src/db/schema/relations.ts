import { relations } from "drizzle-orm";
import { Warehouse, Container, Category, Product, ProductType } from "src/db/schema"

export const warehouseRelations = relations(Warehouse, ({ many }) => ({
    containers: many(Container)
}))

export const categoryRelations = relations(Category, ({ many }) => ({
    containers: many(Container),
    product_types: many(ProductType),
}))

export const productRelations = relations(Product, ({ one }) => ({
    container: one(Container, {
        fields: [Product.containerId],
        references: [Container.id]
    }),

    product_type: one(ProductType, {
        fields: [Product.productTypeId],
        references: [ProductType.id]
    })
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
    products: many(Product)
}))

export const productTypeRelations = relations(ProductType, ({ one, many }) => ({
    category: one(Category, {
        fields: [ProductType.categoryId],
        references: [Category.id]
    }),
    products: many(Product)
}))