CREATE TABLE "Inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"container_id" integer NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Inventory_product_id_container_id_unique" UNIQUE("product_id","container_id")
);
--> statement-breakpoint
ALTER TABLE "Product" DROP CONSTRAINT "Product_container_id_Container_id_fk";
--> statement-breakpoint
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_product_id_Product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_container_id_Container_id_fk" FOREIGN KEY ("container_id") REFERENCES "public"."Container"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Product" DROP COLUMN "quantity";--> statement-breakpoint
ALTER TABLE "Product" DROP COLUMN "container_id";