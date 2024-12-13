import { db } from "$lib/db";
import type { SectionData, Schedule } from "$types/SectionData";

function convertTime(time: string | null): number | null {
    if (time === null) return null;

    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes - 450; // normalize to 7:30 AM
}

export const load = async () => {
    return {
        sections: new Promise<SectionData[]>((resolve, reject) => {
            db.query.sections
                .findMany({
                    with: {
                        sectionSchedules: true,
                    },
                })
                .then((data) => {
                    const sections: SectionData[] = data.map((section) => {
                        const schedule: Schedule[] = [];

                        for (const sectionSchedule of section.sectionSchedules) {
                            const start = convertTime(sectionSchedule.start);
                            const end = convertTime(sectionSchedule.end);

                            const index = schedule.findIndex(
                                (s) =>
                                    s.start === start &&
                                    s.end === end &&
                                    s.room === sectionSchedule.room
                            );
                            if (index === -1) {
                                schedule.push({
                                    day: [sectionSchedule.day],
                                    start,
                                    end,
                                    room: sectionSchedule.room,
                                });
                            } else {
                                schedule[index].day.push(sectionSchedule.day);
                            }
                        }

                        return {
                            courseCode: section.courseCode,
                            section: section.section,
                            classNumber: section.classNumber,
                            faculty: section.faculty,
                            schedule,
                            capacity: section.capacity,
                            enrolled: section.enrolled,
                            remarks: section.remarks,
                        };
                    });

                    resolve(sections);
                })
                .catch((error) => {
                    reject(error);
                });
        }),
    };
};
