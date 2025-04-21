import { firekitCollection } from 'svelte-firekit';

export async function AwaitableCollection<T extends ReturnType<typeof firekitCollection>>(
	collectionObject: T
): Promise<T> {
	return new Promise((resolve, reject) => {
		console.log('awaiting');
		while (collectionObject.loading) {
			// Wait for the collection to load
			console.log('waiting');
			// wait for a few milliseconds to avoid blocking the main thread
			// and to allow the collection to update
			setTimeout(() => {}, 100);
		}
		console.log('awaited');
		if (collectionObject.error) {
			reject(collectionObject.error);
		} else {
			resolve(collectionObject);
		}
	});
}
