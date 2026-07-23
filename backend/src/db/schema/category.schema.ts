import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const Category = pgTable("Category", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull().unique(),
    containerCount: integer("containerCount").default(0).notNull(),
    productCount: integer("productCount").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull()
});