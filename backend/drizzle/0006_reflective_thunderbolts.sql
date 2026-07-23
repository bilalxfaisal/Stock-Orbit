CREATE TABLE "product_type" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "product_type_id_unique" UNIQUE("id")
);
