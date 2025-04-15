import type { Schedule, SectionData } from "$types/SectionData";
import course from "./raw/caleng1.json";

import { writeFileSync } from "fs";

function normalizeTime(time: string): number {
    time = time.trim();
    if (time.length == 0) return -450;

    return parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(2)) - 450; // 7:30 AM
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

const json = course;
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
    if (currentSection.classNumber == 1395) console.log(json);

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
    if (currentSection.classNumber == 1395) console.log("nxt: ", nextSectionIndex);

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

// console.log(sections);
// console.log(sections[0]);
// console.log(sections[0].schedule);
writeFileSync("src/lib/server/simplified.json", JSON.stringify(sections));
