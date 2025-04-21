import { scrape } from './index';

import { writeFile, readFile } from 'node:fs/promises';
const raw = await readFile('courses.txt', 'utf-8');
const courses = raw
	.split('\n')
	.map((course) => course.trim())
	.filter((course) => course && course.length > 0);

const data = await scrape(...courses);

await writeFile('data.json', JSON.stringify(data, null, 2));

import { db } from '../firebase';
for (const section of data) {
	db.doc(`terms/124B/classes/${section.classNumber}`).set(section);
	console.log('CREATED', section.courseCode, section.classNumber);
}
