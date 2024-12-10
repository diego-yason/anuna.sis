import { z } from "zod";

export const schema = z.object({
    courseCode: z.string(),
    section: z.string(),
    faculty: z.string(),
    schedule: z
        .object({
            day: z.string().array(),
            start: z.number().min(0).max(990),
            end: z.number().min(0).max(990),
            room: z.string(),
        })
        .strict()
        .array(),
});

export type Schema = typeof schema;
