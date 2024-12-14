CREATE UNIQUE INDEX sectionday ON public."sectionSchedules" USING btree (section_id, day);

create policy "Enable read access for all users"
on "public"."sectionSchedules"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."sections"
as permissive
for select
to public
using (true);



