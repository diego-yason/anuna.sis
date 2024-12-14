import { relations } from "drizzle-orm/relations";
import { users, schedules, terms, refPrograms, courses, courseEquivalences, curriculums, personalSchedules, courseRequisites, sections, sectionSchedules } from "./schema";

export const schedulesRelations = relations(schedules, ({one, many}) => ({
	user: one(users, {
		fields: [schedules.owner],
		references: [users.uid]
	}),
	term: one(terms, {
		fields: [schedules.term],
		references: [terms.term]
	}),
	personalSchedules: many(personalSchedules),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	schedules: many(schedules),
	refProgram_major: one(refPrograms, {
		fields: [users.major],
		references: [refPrograms.name],
		relationName: "users_major_refPrograms_name"
	}),
	refProgram_minor: one(refPrograms, {
		fields: [users.minor],
		references: [refPrograms.name],
		relationName: "users_minor_refPrograms_name"
	}),
}));

export const termsRelations = relations(terms, ({many}) => ({
	schedules: many(schedules),
	sections: many(sections),
}));

export const refProgramsRelations = relations(refPrograms, ({many}) => ({
	users_major: many(users, {
		relationName: "users_major_refPrograms_name"
	}),
	users_minor: many(users, {
		relationName: "users_minor_refPrograms_name"
	}),
	curriculums: many(curriculums),
}));

export const courseEquivalencesRelations = relations(courseEquivalences, ({one}) => ({
	course_courseA: one(courses, {
		fields: [courseEquivalences.courseA],
		references: [courses.courseCode],
		relationName: "courseEquivalences_courseA_courses_courseCode"
	}),
	course_courseB: one(courses, {
		fields: [courseEquivalences.courseB],
		references: [courses.courseCode],
		relationName: "courseEquivalences_courseB_courses_courseCode"
	}),
}));

export const coursesRelations = relations(courses, ({many}) => ({
	courseEquivalences_courseA: many(courseEquivalences, {
		relationName: "courseEquivalences_courseA_courses_courseCode"
	}),
	courseEquivalences_courseB: many(courseEquivalences, {
		relationName: "courseEquivalences_courseB_courses_courseCode"
	}),
	curriculums: many(curriculums),
	courseRequisites_requisite: many(courseRequisites, {
		relationName: "courseRequisites_requisite_courses_courseCode"
	}),
	courseRequisites_incoming: many(courseRequisites, {
		relationName: "courseRequisites_incoming_courses_courseCode"
	}),
	sections: many(sections),
}));

export const curriculumsRelations = relations(curriculums, ({one}) => ({
	course: one(courses, {
		fields: [curriculums.courseCode],
		references: [courses.courseCode]
	}),
	refProgram: one(refPrograms, {
		fields: [curriculums.program],
		references: [refPrograms.name]
	}),
}));

export const personalSchedulesRelations = relations(personalSchedules, ({one}) => ({
	schedule: one(schedules, {
		fields: [personalSchedules.schedule],
		references: [schedules.id]
	}),
}));

export const courseRequisitesRelations = relations(courseRequisites, ({one}) => ({
	course_requisite: one(courses, {
		fields: [courseRequisites.requisite],
		references: [courses.courseCode],
		relationName: "courseRequisites_requisite_courses_courseCode"
	}),
	course_incoming: one(courses, {
		fields: [courseRequisites.incoming],
		references: [courses.courseCode],
		relationName: "courseRequisites_incoming_courses_courseCode"
	}),
}));

export const sectionSchedulesRelations = relations(sectionSchedules, ({one}) => ({
	section: one(sections, {
		fields: [sectionSchedules.classNumber],
		references: [sections.classNumber]
	}),
}));

export const sectionsRelations = relations(sections, ({one, many}) => ({
	sectionSchedules: many(sectionSchedules),
	term: one(terms, {
		fields: [sections.term],
		references: [terms.term]
	}),
	course: one(courses, {
		fields: [sections.courseCode],
		references: [courses.courseCode]
	}),
}));