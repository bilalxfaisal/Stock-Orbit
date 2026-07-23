CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "container" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(4) NOT NULL,
	"number" integer NOT NULL,
	"maximum_capacity" integer NOT NULL,
	"current_capacity" integer DEFAULT 0 NOT NULL,
	"warehouse_id" integer NOT NULL,
	CONSTRAINT "container_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"category_id" integer NOT NULL,
	"container_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouse" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(5) NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	CONSTRAINT "warehouse_code_unique" UNIQUE("code"),
	CONSTRAINT "warehouse_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "container" ADD CONSTRAINT "container_warehouse_id_warehouse_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouse"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_container_id_container_id_fk" FOREIGN KEY ("container_id") REFERENCES "public"."container"("id") ON DELETE no action ON UPDATE no action;