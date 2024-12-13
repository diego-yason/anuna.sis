import type { SectionData } from "$types/SectionData";
import type { Response as ArcherResponse } from "$types/ArcherResponse";

export const actions = {
    querySections: async ({ fetch, request }) => {
        const courseCode = (await request.formData()).get("courseCode");
        const data: SectionData[] = [];

        // TODO: add reoccurrence checks
        let hasNext: boolean;
        let page = 1;
        do {
            const archerApi = await fetch(
                `https://api.berde.co/course/${courseCode}?page=${page++}`
            );
            const archerResponse: ArcherResponse = await archerApi.json();

            hasNext = Boolean(archerResponse.hasNextPage);

            for (const {
                class: courseCode,
                class_id,
                current_slots,
                max_slots,
                schedules,
                section,
                type,
            } of archerResponse.docs) {
                // some schedules.prof can be empty, get first non empty
                const faculty =
                    schedules
                        .find((schedule) => schedule.prof.trim() !== "")
                        ?.prof.trim() ?? "";

                data.push({
                    capacity: Number(max_slots),
                    courseCode,
                    classNumber: Number(class_id),
                    enrolled: Number(current_slots),
                    faculty,
                    schedule: schedules.map(({ days, time, room }) => {
                        const [start, end] = time.split(" - ").map((time) => {
                            if (time.length === 0) return -450;

                            const hours = Number(time.slice(0, 2));
                            const minutes = Number(time.slice(2, 4));

                            return hours * 60 + minutes - 450; // 7:30 AM
                        });

                        let day;

                        // check if day is MTWHFS or not
                        if (days.match(/^[MTWHFS]+$/)) day = days.split("");
                        else day = [days];

                        return {
                            day,
                            start,
                            end,
                            room,
                        };
                    }),
                    remarks: type,
                    section,
                });
            }
        } while (hasNext);

        return data;
    },
};
