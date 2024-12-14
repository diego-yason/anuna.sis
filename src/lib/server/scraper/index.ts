import { SCRAPER_DLSU_ID } from "$env/static/private"; // ID number private for privacy
import { PythonShell } from "python-shell";
import { readFile, unlink } from "node:fs/promises";

import type { SectionData, Schedule } from "$types/SectionData";
import type { TablesInsert } from "$types/database";
import { admin } from "../supabase";

function normalizeTime(time: string): number {
    time = time.trim();
    if (time.length == 0) return -450;

    return parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(2)) - 450; // 7:30 AM
}

function denormalizeTime(time: number): string {
    time += 450;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
}

function getSchedule(row: string[]): Schedule {
    // go with day stuff
    const isSpecial = row[0].match(/[0-9]+$/);
    const day = isSpecial ? [row[0]] : row[0].split("");

    const [start, end] = row[2].split("-").map(normalizeTime);

    const room = row[4].trim().length != 0 ? row[4] : null;
    return {
        day,
        start,
        end,
        room,
    };
}

const pathHead = "src/lib/server/scraper";

export async function scrape(...courseCodes: string[]): Promise<void> {
    const msgs = await PythonShell.run(`${pathHead}/scraper.py`, {
        args: [SCRAPER_DLSU_ID, ...courseCodes],
    });

    console.log(msgs);

    const promises: Promise<SectionData[] | void>[] = [];
    async function parse(courseCode: string): Promise<SectionData[]> {
        const json = JSON.parse(
            await readFile(`${pathHead}/raw/${courseCode.toLowerCase()}.json`, "utf-8")
        ) as string[];
        json.splice(0, 23); // remove headers, go to first line

        const sections: SectionData[] = [];
        let currentSection: Partial<SectionData>;
        let nextSectionIndex: number | undefined = 0;
        while (nextSectionIndex != -1) {
            if (json.length < 16) break;
            currentSection = {
                classNumber: parseInt(json[0]),
                courseCode: json[2].trim(),
                section: json[4].trim(),
                capacity: parseInt(json[12]),
                enrolled: parseInt(json[14]),
                remarks: json[16].trim(),
            };

            currentSection.schedule = [getSchedule(json.slice(6, 11))];

            nextSectionIndex = json.findIndex((v, i) => {
                if (json.length <= i + 3) return false;
                if (i < 16) return false; // implement minimum distance

                return (
                    json[i].length == 0 &&
                    json[i + 1].length == 0 &&
                    json[i + 2].length == 0 &&
                    json[i + 3].match(/[0-9]+/)
                );
            });
            if (nextSectionIndex != -1) nextSectionIndex += 3;

            const subJson = json.slice(17, nextSectionIndex);
            for (let i = 0; i < subJson.length; i += 1) {
                if (subJson[i].length === 0) continue;
                if (subJson[i].length > 6) {
                    currentSection.faculty = subJson[i];
                    continue;
                }
                currentSection.schedule.push(getSchedule(subJson.slice(i, i + 5)));
                i += 4;
            }

            if (currentSection.faculty === undefined) currentSection.faculty = null;
            sections.push(currentSection as SectionData);
            currentSection = {};
            json.splice(0, nextSectionIndex);
        }
        unlink(`${pathHead}/raw/${courseCode.toLowerCase()}.json`); // dont need to wait for this

        return sections;
    }

    // parse the files
    courseCodes.forEach((courseCode) =>
        promises.push(
            parse(courseCode).catch((e) =>
                console.error(`Failed to parse ${courseCode}`, e)
            )
        )
    );

    const results = await Promise.all(promises).catch();
    // filter out void values (from fails)
    const validResults = results.filter(
        (result): result is SectionData[] => result !== undefined
    );

    // merge into one
    const merged: SectionData[] = validResults.reduce((acc, val) => acc.concat(val), []);

    // TODO: REMOVE
    // TEMPORARY: add courseCodes to courses table
    const codes: string[] = [];
    merged.forEach((v) => {
        if (!codes.includes(v.courseCode)) codes.push(v.courseCode);
    });

    // add to db
    const { error: courseError } = await admin.from("courses").upsert(
        codes.map(
            (v): TablesInsert<"courses"> => ({
                course_code: v,
                units: 3,
            })
        ),
        { ignoreDuplicates: true }
    );
    if (courseError) console.error("Courses: ", courseError);

    // insert into db
    const { error: sectionError } = await admin.from("sections").upsert(
        merged.map(
            ({
                capacity,
                classNumber,
                courseCode,
                enrolled,
                faculty,
                remarks,
                section,
            }): TablesInsert<"sections"> => ({
                term: 1242, // hardcoded for now
                capacity,
                class_number: classNumber,
                course_code: courseCode,
                enrolled,
                section,
                remarks,
                faculty,
            })
        ),
        {
            onConflict: "class_number, term",
        }
    );
    if (sectionError) console.error("Sections: ", sectionError);

    const scheduleInsert: Promise<unknown>[] = [];

    for (const { schedule: schedules, classNumber } of merged) {
        for (const schedule of schedules) {
            const { data } = await admin
                .from("sections")
                .select("id")
                .eq("class_number", classNumber)
                .eq("term", 1242) // temporarily hardcoded
                .single();
            for (const day of schedule.day) {
                admin
                    .from("sectionSchedules")
                    .upsert(
                        {
                            section_id: data!.id,
                            start:
                                schedule.start == -450 || schedule.start == null
                                    ? null
                                    : denormalizeTime(schedule.start),
                            end:
                                schedule.end == -450 || schedule.end == null
                                    ? null
                                    : denormalizeTime(schedule.end),
                            room: schedule.room,
                            day,
                        } as TablesInsert<"sectionSchedules">,
                        {
                            onConflict: "section_id, day",
                        }
                    )
                    .then(({ error }) => {
                        if (error) console.error("Section Schedule", error);
                    }); // force run
            }
        }
    }

    await Promise.all(scheduleInsert);
}
