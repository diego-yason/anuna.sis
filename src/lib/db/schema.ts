import { relations } from "drizzle-orm";
import {
    boolean,
    date,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    time,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { eq } from "lodash";

export const programsTable = pgTable("REF_programs", {
    name: text("name").primaryKey(),
}).enableRLS();

export const programRelations = relations(programsTable, ({ one }) => ({
    major: one(usersTable, {
        fields: [programsTable.name],
        references: [usersTable.major],
    }),
    minor: one(usersTable, {
        fields: [programsTable.name],
        references: [usersTable.minor],
    }),
    curriculum: one(curriculumTable, {
        fields: [programsTable.name],
        references: [curriculumTable.program],
    }),
}));

export const usersTable = pgTable("users", {
    uid: uuid("uid").primaryKey(),
    idNumber: integer("idNumber"),
    username: text("username").notNull(),
    displayName: text("displayName"),
    major: text("major"),
    minor: text("minor"),
}).enableRLS();

export const userRelations = relations(usersTable, ({ many, one }) => ({
    programs: many(programsTable),
    schedules: one(scheduleTable, {
        fields: [usersTable.uid],
        references: [scheduleTable.owner],
    }),
}));

export const curriculumTable = pgTable("curriculums", {
    courseCode: varchar("courseCode", { length: 7 }).primaryKey(),
    program: text("program").notNull(),
}).enableRLS();

export const curriculumRelations = relations(curriculumTable, ({ many }) => ({
    programs: many(programsTable),
    courses: many(courseTable),
}));

export const courseTable = pgTable("courses", {
    courseCode: varchar("courseCode", { length: 7 }).primaryKey(),
    fullName: text("fullName").notNull(),
    units: integer("units").notNull(),
    academic: boolean("academic").default(true),
}).enableRLS();

export const courseRelations = relations(courseTable, ({ one }) => ({
    curriculum: one(curriculumTable, {
        fields: [courseTable.courseCode],
        references: [curriculumTable.courseCode],
    }),
    requisite: one(courseRequisiteTable, {
        fields: [courseTable.courseCode],
        references: [courseRequisiteTable.requisite],
    }),
    toRequesite: one(courseRequisiteTable, {
        fields: [courseTable.courseCode],
        references: [courseRequisiteTable.courseCode],
    }),
    equivalenceA: one(courseEquivalenceTable, {
        fields: [courseTable.courseCode],
        references: [courseEquivalenceTable.courseA],
    }),
    equivalenceB: one(courseEquivalenceTable, {
        fields: [courseTable.courseCode],
        references: [courseEquivalenceTable.courseB],
    }),
}));

export const requisiteEnum = pgEnum("requisiteEnum", ["H", "S", "C"]);

export const courseRequisiteTable = pgTable("courseRequisites", {
    requisite: varchar("requisite", { length: 7 }).primaryKey(),
    courseCode: varchar("courseCode", { length: 7 }).primaryKey(),
    type: requisiteEnum().notNull(),
}).enableRLS();

export const courseRequisiteRelations = relations(courseRequisiteTable, ({ many }) => ({
    courses: many(courseTable),
}));

export const courseEquivalenceTable = pgTable("courseEquivalences", {
    courseA: varchar("courseA", { length: 7 }).primaryKey(),
    courseB: varchar("courseB", { length: 7 }).primaryKey(),
}).enableRLS();

export const courseEquivalenceRelations = relations(
    courseEquivalenceTable,
    ({ many }) => ({
        courses: many(courseTable),
    })
);

export const sectionTable = pgTable("sections", {
    classNumber: integer("classNumber").primaryKey(),
    term: integer("term").primaryKey(),
    section: varchar("section").notNull(),
    courseCode: varchar("courseCode", { length: 7 }).notNull(),
    capacity: integer("capacity").notNull(),
    enrolled: integer("enrolled").notNull(),
    faculty: text("faculty").notNull(),
    remarks: text("remarks"),
}).enableRLS();

export const sectionRelations = relations(sectionTable, ({ one, many }) => ({
    courseCode: many(courseTable),
    term: many(termTable),
    schedulesSection: one(sectionScheduleTable, {
        fields: [sectionTable.classNumber, sectionTable.term],
        references: [sectionScheduleTable.classNumber, sectionScheduleTable.term],
    }),
    schedulePerson: one(personalScheduleTable, {
        fields: [sectionTable.classNumber],
        references: [personalScheduleTable.classNumber],
    }),
}));

export const termTable = pgTable("terms", {
    term: integer("term").primaryKey(),
    start: date("start").notNull(),
    end: date("end").notNull(),
}).enableRLS();

export const termRelations = relations(termTable, ({ one }) => ({
    sections: one(sectionTable, {
        fields: [termTable.term],
        references: [sectionTable.term],
    }),
    schedules: one(scheduleTable, {
        fields: [termTable.term],
        references: [scheduleTable.term],
    }),
}));

export const sectionScheduleTable = pgTable("sectionSchedules", {
    id: serial("id").primaryKey(),
    classNumber: integer("classNumber").notNull(),
    term: integer("term").notNull(),
    day: varchar("day").notNull(),
    start: time("start").notNull(),
    end: time("end").notNull(),
    room: text("room").notNull(),
});

export const sectionScheduleRelations = relations(sectionScheduleTable, ({ many }) => ({
    section: many(sectionTable),
}));

export const scheduleTable = pgTable("schedules", {
    id: serial("id").primaryKey(),
    owner: uuid("owner").notNull(),
    name: text("name"),
    term: integer("term").notNull(),
}).enableRLS();

export const scheduleRelations = relations(scheduleTable, ({ one, many }) => ({
    users: many(usersTable),
    term: many(termTable),
    scheduleList: one(personalScheduleTable, {
        fields: [scheduleTable.id],
        references: [personalScheduleTable.schedule],
    }),
}));

export const personalScheduleTable = pgTable("personalSchedules", {
    schedule: integer("schedule").primaryKey(),
    classNumber: integer("classNumber").primaryKey(),
}).enableRLS();

export const scheduleScheduleSectionListRelations = relations(
    personalScheduleTable,
    ({ many }) => ({
        schedule: many(scheduleTable),
        section: many(sectionTable),
    })
);
