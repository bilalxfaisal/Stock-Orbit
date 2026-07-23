ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_Category_id_fk";
--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "company" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "productTypeId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Container" ADD CONSTRAINT "Container_category_id_Category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_ProductType_id_fk" FOREIGN KEY ("productTypeId") REFERENCES "public"."ProductType"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_category_id_Category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Product" DROP COLUMN "category_id";