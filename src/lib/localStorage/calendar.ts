import { writable } from "svelte/store";
import type { SectionData } from "$types/SectionData";
import { browser } from "$app/environment";

import _ from "lodash";

let storedData: SectionData[] = [];
if (browser) {
    storedData = JSON.parse(localStorage.getItem("calendar") ?? "[]");
}

const data = writable<SectionData[]>(storedData);

if (browser) {
    data.subscribe((value) => {
        localStorage.setItem("calendar", JSON.stringify(value));
    });
}

export default data;

export function removeSection(section: SectionData) {
    data.update((classes) => {
        const index = classes.findIndex((c) => _.isEqual(c, section));
        if (index !== -1) {
            classes.splice(index, 1);
        }
        return classes;
    });
}

export function addSection(section: SectionData) {
    data.update((classes) => {
        classes.push(_.cloneDeep(section)); // deep copy instead of reference
        return classes;
    });
}
