import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { config } from 'dotenv';
import { getFirestore } from 'firebase-admin/firestore';
config();

const app = initializeApp({
	credential: applicationDefault(),
	databaseURL: 'https://anunasis.firebaseio.com'
});
export const db = getFirestore(app);
