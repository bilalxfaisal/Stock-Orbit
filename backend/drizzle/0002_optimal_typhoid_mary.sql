ALTER TABLE "Category" ADD COLUMN "productCount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "Container" ADD COLUMN "full" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "Warehouse" ADD COLUMN "containerQty" integer DEFAULT 0 NOT NULL;