export interface SectionData {
    courseCode: string;
    section: string;
    classNumber: number;
    faculty: string;
    schedule: Schedule[];
    capacity: number;
    enrolled: number;
    remarks: string;
}

export interface Schedule {
    // day: Days[];
    day: string[];
    start: number;
    end: number;
    room: string;
}
