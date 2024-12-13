CREATE TYPE "public"."requisiteEnum" AS ENUM('H', 'S', 'C');
--> statement-breakpoint
CREATE TABLE "courseEquivalences" (
	"courseA" varchar(7),
	"courseB" varchar(7)
);
--> statement-breakpoint
ALTER TABLE "courseEquivalences" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "courseRequisites" (
	"requisite" varchar(7),
	"courseCode" varchar(7),
	"type" "requisiteEnum" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courseRequisites" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "courses" (
	"courseCode" varchar(7) PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"units" integer NOT NULL,
	"academic" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "courses" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "curriculums" (
	"courseCode" varchar(7) NOT NULL,
	"program" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "curriculums" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "personalSchedules" ("schedule" integer, "classNumber" integer);
--> statement-breakpoint
ALTER TABLE "personalSchedules" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "REF_programs" ("name" text PRIMARY KEY NOT NULL);
--> statement-breakpoint
ALTER TABLE "REF_programs" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner" uuid NOT NULL,
	"name" text,
	"term" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schedules" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "sectionSchedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"classNumber" integer NOT NULL,
	"term" integer NOT NULL,
	"day" varchar NOT NULL,
	"start" time NOT NULL,
	"end" time NOT NULL,
	"room" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"classNumber" integer,
	"term" integer,
	"section" varchar NOT NULL,
	"courseCode" varchar(7) NOT NULL,
	"capacity" integer NOT NULL,
	"enrolled" integer NOT NULL,
	"faculty" text NOT NULL,
	"remarks" text
);
--> statement-breakpoint
ALTER TABLE "sections" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "terms" (
	"term" integer PRIMARY KEY NOT NULL,
	"start" date NOT NULL,
	"end" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "terms" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE TABLE "users" (
	"uid" uuid PRIMARY KEY NOT NULL,
	"idNumber" integer,
	"username" text NOT NULL,
	"displayName" text,
	"major" text,
	"minor" text
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "courseEquivalences"
ADD CONSTRAINT "courseEquivalences_courseA_courses_courseCode_fk" FOREIGN KEY ("courseA") REFERENCES "public"."courses"("courseCode") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "courseEquivalences"
ADD CONSTRAINT "courseEquivalences_courseB_courses_courseCode_fk" FOREIGN KEY ("courseB") REFERENCES "public"."courses"("courseCode") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "courseRequisites"
ADD CONSTRAINT "courseRequisites_requisite_courses_courseCode_fk" FOREIGN KEY ("requisite") REFERENCES "public"."courses"("courseCode") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "courseRequisites"
ADD CONSTRAINT "courseRequisites_courseCode_courses_courseCode_fk" FOREIGN KEY ("courseCode") REFERENCES "public"."courses"("courseCode") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "curriculums"
ADD CONSTRAINT "curriculums_courseCode_courses_courseCode_fk" FOREIGN KEY ("courseCode") REFERENCES "public"."courses"("courseCode") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "curriculums"
ADD CONSTRAINT "curriculums_program_REF_programs_name_fk" FOREIGN KEY ("program") REFERENCES "public"."REF_programs"("name") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "personalSchedules"
ADD CONSTRAINT "personalSchedules_schedule_schedules_id_fk" FOREIGN KEY ("schedule") REFERENCES "public"."schedules"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "personalSchedules"
ADD CONSTRAINT "personalSchedules_classNumber_sections_classNumber_fk" FOREIGN KEY ("classNumber") REFERENCES "public"."sections"("classNumber") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "schedules"
ADD CONSTRAINT "schedules_owner_users_uid_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "schedules"
ADD CONSTRAINT "schedules_term_terms_term_fk" FOREIGN KEY ("term") REFERENCES "public"."terms"("term") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "sectionSchedules"
ADD CONSTRAINT "sectionSchedules_classNumber_sections_classNumber_fk" FOREIGN KEY ("classNumber") REFERENCES "public"."sections"("classNumber") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "sectionSchedules"
ADD CONSTRAINT "sectionSchedules_term_sections_term_fk" FOREIGN KEY ("term") REFERENCES "public"."sections"("term") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "sections"
ADD CONSTRAINT "sections_term_terms_term_fk" FOREIGN KEY ("term") REFERENCES "public"."terms"("term") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "sections"
ADD CONSTRAINT "sections_courseCode_courses_courseCode_fk" FOREIGN KEY ("courseCode") REFERENCES "public"."courses"("courseCode") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "users"
ADD CONSTRAINT "users_major_REF_programs_name_fk" FOREIGN KEY ("major") REFERENCES "public"."REF_programs"("name") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "users"
ADD CONSTRAINT "users_minor_REF_programs_name_fk" FOREIGN KEY ("minor") REFERENCES "public"."REF_programs"("name") ON DELETE no action ON UPDATE no action;