import type { CourseSection, ArcherResponse } from './Archer.d'; // Was the .d ever included? Someone confirm if they see this comment.

const classes: CourseSection[] = [];

export async function getClass(courseCode: string): Promise<CourseSection[]> {
	try {
		const data = (await (
			await fetch(`https://api.berde.co/course/${courseCode}?limit=100`)
		).json()) as ArcherResponse;

		for (const doc of data.docs) {
			// parse data
			const partialData: Partial<CourseSection> = {
				capacity: parseInt(doc.max_slots, 10),
				classNumber: doc.class_id,
				courseCode,
				enrolled: parseInt(doc.current_slots, 10),
				faculty: doc.schedules[0].prof,
				// TODO: Once anuna.sis has an in-house API, use the actual remarks from MLS
				remarks: doc.type,
				section: doc.section
			};

			partialData.schedule = doc.schedules.map((s) => {
				const stringTime = s.time.split(' - ');

				// convert time to minutes
				const startTime =
					parseInt(stringTime[0].slice(0, 2), 10) * 60 + parseInt(stringTime[0].slice(2, 4), 10);
				const endTime =
					parseInt(stringTime[1].slice(0, 2), 10) * 60 + parseInt(stringTime[1].slice(2, 4), 10);

				return {
					// NOTE: This is more of for future proofing. Current API only returns one day
					day: s.days.split('') as ('M' | 'T' | 'W' | 'H' | 'F' | 'S')[],
					endTime,
					room: s.room,
					startTime
				};
			});

			const section = partialData as CourseSection; // for typescript
			// check if the class already exists
			if (classes.some((c) => c.classNumber === doc.class_id)) {
				// replace data
				const index = classes.findIndex((c) => c.classNumber === doc.class_id);
				classes[index] = section;
			} else {
				// add data
				classes.push(section);
			}
		}
	} catch (e) {
		console.error('Error fetching data from Archer API');
		console.error(e);
	}

	return classes.filter((c) => c.courseCode === courseCode);
}
