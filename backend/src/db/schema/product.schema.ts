import {
    date,
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { Container, ProductType } from "src/db/schema"

export const Product = pgTable("Product", {
    id: serial("id").primaryKey(),
    brand: varchar("brand", { length: 100}).notNull(),
    model: varchar("model", { length: 100 }).notNull(),
    price: integer("price").notNull(),
    quantity: integer("quantity").default(0).notNull(),
    productTypeId: integer("productTypeId").notNull()
        .references(() => ProductType.id),
    containerId: integer("container_id").notNull()
        .references(() => Container.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});