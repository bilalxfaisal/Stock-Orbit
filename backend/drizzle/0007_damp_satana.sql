ALTER TABLE "product_type" RENAME TO "Product_Type";--> statement-breakpoint
ALTER TABLE "Product_Type" DROP CONSTRAINT "product_type_id_unique";--> statement-breakpoint
ALTER TABLE "Product_Type" ADD CONSTRAINT "Product_Type_id_unique" UNIQUE("id");