import { timestamp, pgEnum } from "drizzle-orm/pg-core";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { UserRole } from "../enums";

export const roleEnum = pgEnum(
    "user_role",
    Object.values(UserRole) as [string, ...string[]],
);

export const User = pgTable("User", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    phoneNumber: text("phone-number").notNull().unique(),
    role: roleEnum("role").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull()
})