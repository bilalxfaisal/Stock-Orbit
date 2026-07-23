ALTER TABLE "Product" ADD COLUMN "brand" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "model" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "Product" DROP COLUMN "company";--> statement-breakpoint
ALTER TABLE "Product" DROP COLUMN "name";