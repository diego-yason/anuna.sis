drop index if exists "public"."sectionday";

CREATE UNIQUE INDEX sectiondaystart ON public."sectionSchedules" USING btree (section_id, day, start);


