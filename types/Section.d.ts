export interface Section {
	classNumber: number;
	courseCode: string;
	section: string;
	capacity: number;
	enrolled: number;
	remarks: string;
	schedule: Schedule[];
	faculty: string | null;
}

export interface Schedule {
	day: (Days | string)[];
	start: number;
	end: number;
	room: null;
}

export type Days = 'M' | 'T' | 'W' | 'TH' | 'F' | 'S';
