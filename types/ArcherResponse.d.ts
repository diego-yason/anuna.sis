export interface Response {
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
    nextPage: null;
}

export interface Doc {
    _id: string;
    class: string;
    section: string;
    type: string;
    max_slots: string;
    current_slots: string;
    schedules: Schedule[];
    class_id: string;
}

export interface Schedule {
    _id: string;
    days: string;
    time: string;
    room: string;
    prof: string;
}
