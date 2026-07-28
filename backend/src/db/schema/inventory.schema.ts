import {
    integer,
    pgTable,
    serial,
    timestamp,
    unique,
} from "drizzle-orm/pg-core";

import { Product } from "./product.schema";
import { Container } from "./container.schema";

export const Inventory = pgTable("Inventory", {
    id: serial("id").primaryKey(),

    productId: integer("product_id")
        .notNull()
        .references(() => Product.id, {
            onDelete: "cascade",
        }),

    containerId: integer("container_id")
        .notNull()
        .references(() => Container.id, {
            onDelete: "cascade",
        }),

    quantity: integer("quantity").notNull().default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
},
    (table) => ({
        uniqueProductContainer: unique().on(
            table.productId,
            table.containerId
        ),
    })
);