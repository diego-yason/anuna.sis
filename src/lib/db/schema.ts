import { pgTable, foreignKey, smallint, uuid, text, varchar, boolean, date, unique, integer, primaryKey, bigint, time } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const schedules = pgTable("schedules", {
	id: smallint().primaryKey().generatedByDefaultAsIdentity({ name: "schedules_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 32767, cache: 1 }),
	owner: uuid().notNull(),
	name: text(),
	term: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.owner],
			foreignColumns: [users.uid],
			name: "schedules_owner_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.term],
			foreignColumns: [terms.term],
			name: "schedules_term_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const courses = pgTable("courses", {
	courseCode: varchar().primaryKey().notNull(),
	fullName: text(),
	units: smallint().notNull(),
	academic: boolean().default(true),
});

export const refPrograms = pgTable("REF_programs", {
	name: text().primaryKey().notNull(),
});

export const terms = pgTable("terms", {
	term: smallint().primaryKey().generatedByDefaultAsIdentity({ name: "terms_term_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 32767, cache: 1 }),
	start: date().notNull(),
	end: date().notNull(),
});

export const users = pgTable("users", {
	uid: uuid().primaryKey().notNull(),
	idNumber: integer().notNull(),
	username: text().notNull(),
	displayName: text(),
	major: text(),
	minor: text(),
}, (table) => [
	foreignKey({
			columns: [table.major],
			foreignColumns: [refPrograms.name],
			name: "users_major_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.minor],
			foreignColumns: [refPrograms.name],
			name: "users_minor_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	unique("users_username_key").on(table.username),
]);

export const courseEquivalences = pgTable("courseEquivalences", {
	courseA: varchar().notNull(),
	courseB: varchar().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseA],
			foreignColumns: [courses.courseCode],
			name: "courseEquivalences_courseA_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.courseB],
			foreignColumns: [courses.courseCode],
			name: "courseEquivalences_courseB_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.courseA, table.courseB], name: "courseEquivalences_pkey"}),
]);

export const curriculums = pgTable("curriculums", {
	courseCode: varchar().notNull(),
	program: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseCode],
			foreignColumns: [courses.courseCode],
			name: "curriculums_courseCode_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.program],
			foreignColumns: [refPrograms.name],
			name: "curriculums_program_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.courseCode, table.program], name: "curriculums_pkey"}),
]);

export const personalSchedules = pgTable("personalSchedules", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	schedule: bigint({ mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classNumber: bigint({ mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.schedule],
			foreignColumns: [schedules.id],
			name: "personalSchedules_schedule_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.schedule, table.classNumber], name: "personalSchedules_pkey"}),
]);

export const courseRequisites = pgTable("courseRequisites", {
	requisite: varchar().notNull(),
	incoming: varchar().notNull(),
	type: varchar().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.requisite],
			foreignColumns: [courses.courseCode],
			name: "courseRequisites_requisite_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.incoming],
			foreignColumns: [courses.courseCode],
			name: "courseRequisites_incoming_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.requisite, table.incoming], name: "courseRequisites_pkey"}),
]);

export const sectionSchedules = pgTable("sectionSchedules", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classNumber: bigint({ mode: "number" }).notNull(),
	term: smallint().notNull(),
	day: varchar().notNull(),
	start: time(),
	end: time(),
	room: text(),
}, (table) => [
	foreignKey({
			columns: [table.classNumber, table.term],
			foreignColumns: [sections.classNumber, sections.term],
			name: "sectionSchedules_term_classNumber_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.classNumber, table.term, table.day], name: "sectionSchedules_pkey"}),
]);

export const sections = pgTable("sections", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classNumber: bigint({ mode: "number" }).notNull(),
	term: smallint().notNull(),
	section: text().notNull(),
	courseCode: varchar().notNull(),
	capacity: smallint().notNull(),
	enrolled: smallint().notNull(),
	faculty: text(),
	remarks: text(),
}, (table) => [
	foreignKey({
			columns: [table.term],
			foreignColumns: [terms.term],
			name: "sections_term_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.courseCode],
			foreignColumns: [courses.courseCode],
			name: "sections_courseCode_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.classNumber, table.term], name: "sections_pkey"}),
]);
