import {
    integer,
    pgTable,
    serial,
    varchar,
    boolean,
    date,
    timestamp
} from "drizzle-orm/pg-core";
import { Warehouse, Category } from "src/db/schema"

export const Container = pgTable("Container", {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 5 }).notNull().unique(),
    maximumCapacity: integer("maximum_capacity").notNull(),
    currentCapacity: integer("current_capacity").default(0).notNull(),
    categoryId: integer("category_id").notNull()
        .references(() => Category.id),
    warehouseId: integer("warehouse_id").notNull()
        .references(() => Warehouse.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull()
});