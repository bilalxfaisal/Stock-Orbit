ALTER TABLE "Category" ADD COLUMN "containerCount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "Container" ADD COLUMN "category_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Container" DROP COLUMN "number";