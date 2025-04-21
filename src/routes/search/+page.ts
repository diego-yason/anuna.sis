import { firekitCollection } from 'svelte-firekit';
import { AwaitableCollection } from '$lib/AwaitableCollection';
import type { Section } from '$types/Section';

export const load = async () => {
	// TODO: this is hardcoded term
	const sections = AwaitableCollection(firekitCollection<Section>('terms/124B/classes'));
	return { sections };
};
