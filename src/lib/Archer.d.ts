export interface ArcherResponse {
	status: string;
	docs: Doc[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: null;
	nextPage: number;
}

interface Doc {
	_id: string;
	class: string;
	section: string;
	type: string;
	max_slots: string;
	current_slots: string;
	schedules: Schedule[];
	class_id: string;
}

interface Schedule {
	_id: string;
	days: string;
	time: string;
	room: string;
	prof: string;
}

export interface CourseSection {
	classNumber: string; // No need to be treated as a number
	courseCode: string;
	section: string;

	/*
	 * Technically, faculty should fall under schedules since its declared
	 * under per schedule, but there has *literally* been never a case where
	 * its different.
	 *
	 * DLSU is totally known for updating their systems.
	 */
	faculty: string;
	remarks: string;
	enrolled: number;
	capacity: number;
	schedule: {
		day: ('M' | 'T' | 'W' | 'H' | 'F' | 'S')[];
		/** Minutes from Midnight */
		startTime: number;
		/** Minutes from Midnight */
		endTime: number;
		room: string;
	}[];
}
