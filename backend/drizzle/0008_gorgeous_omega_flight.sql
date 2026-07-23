ALTER TABLE "Product_Type" RENAME TO "ProductType";--> statement-breakpoint
ALTER TABLE "ProductType" DROP CONSTRAINT "Product_Type_id_unique";--> statement-breakpoint
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_id_unique" UNIQUE("id");