CREATE TYPE "public"."audit_action" AS ENUM('STOCK_IN', 'STOCK_OUT', 'CREATE', 'UPDATE', 'DELETE');--> statement-breakpoint
CREATE TYPE "public"."audit_entity" AS ENUM('PRODUCT', 'PRODUCT_TYPE', 'CONTAINER', 'CATEGORY', 'WAREHOUSE');--> statement-breakpoint
CREATE TYPE "public"."stock_out_reason" AS ENUM('SOLD', 'DAMAGED', 'EXPIRED', 'OUTDATED');--> statement-breakpoint
CREATE TABLE "Audit" (
	"id" serial PRIMARY KEY NOT NULL,
	"action" "audit_action" NOT NULL,
	"entity" "audit_entity" NOT NULL,
	"entity_id" integer NOT NULL,
	"quantity" integer,
	"reason" "stock_out_reason",
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Container" DROP COLUMN "full";