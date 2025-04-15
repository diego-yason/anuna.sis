export interface SectionData {
	courseCode: string;
	section: string;
	classNumber: number;
	faculty: string | null;
	schedule: Schedule[];
	capacity: number;
	enrolled: number;
	remarks: string | null;
}

export interface Schedule {
	day: string[];
	start: number | null;
	end: number | null;
	room: string | null;
}
