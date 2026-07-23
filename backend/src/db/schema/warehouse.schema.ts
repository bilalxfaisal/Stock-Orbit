import { pgTable, serial, varchar, text, integer, date, timestamp } from "drizzle-orm/pg-core";

export const Warehouse = pgTable("Warehouse", {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 5 }).notNull().unique(),
    name: text("name").notNull().unique(),
    containerQty: integer("containerQty").default(0).notNull(),
    location: text("location").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});