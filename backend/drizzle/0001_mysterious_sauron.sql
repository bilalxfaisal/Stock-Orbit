ALTER TABLE "category" RENAME TO "Category";--> statement-breakpoint
ALTER TABLE "container" RENAME TO "Container";--> statement-breakpoint
ALTER TABLE "product" RENAME TO "Product";--> statement-breakpoint
ALTER TABLE "warehouse" RENAME TO "Warehouse";--> statement-breakpoint
ALTER TABLE "Category" DROP CONSTRAINT "category_name_unique";--> statement-breakpoint
ALTER TABLE "Container" DROP CONSTRAINT "container_code_unique";--> statement-breakpoint
ALTER TABLE "Warehouse" DROP CONSTRAINT "warehouse_code_unique";--> statement-breakpoint
ALTER TABLE "Warehouse" DROP CONSTRAINT "warehouse_name_unique";--> statement-breakpoint
ALTER TABLE "Container" DROP CONSTRAINT "container_warehouse_id_warehouse_id_fk";
--> statement-breakpoint
ALTER TABLE "Product" DROP CONSTRAINT "product_category_id_category_id_fk";
--> statement-breakpoint
ALTER TABLE "Product" DROP CONSTRAINT "product_container_id_container_id_fk";
--> statement-breakpoint
ALTER TABLE "Container" ADD CONSTRAINT "Container_warehouse_id_Warehouse_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."Warehouse"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_Category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_container_id_Container_id_fk" FOREIGN KEY ("container_id") REFERENCES "public"."Container"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Category" ADD CONSTRAINT "Category_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "Container" ADD CONSTRAINT "Container_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_name_unique" UNIQUE("name");