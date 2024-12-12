CREATE TABLE "REF_programs" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "REF_programs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "id" TO "uid";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "name" TO "displayName";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "idNumber" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "major" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "minor" text;