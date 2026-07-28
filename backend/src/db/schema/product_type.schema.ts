import { pgTable, serial, text, integer, date, timestamp } from "drizzle-orm/pg-core";
import { Category } from "../schema";

export const ProductType = pgTable("ProductType", {
    id: serial("id").notNull().unique(),
    name: text("name").notNull(),
    productCount: integer("product_count").default(0).notNull(),
    categoryId: integer("category_id").notNull()
        .references(() => Category.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
})