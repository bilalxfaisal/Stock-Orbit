CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'MANAGER', 'STAFF', 'AUDITOR');--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'LOG_IN';--> statement-breakpoint
ALTER TABLE "Audit" ADD COLUMN "role" "user_role_enum";