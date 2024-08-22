<script lang="ts">
	import { getClass } from '$lib/archer';
	import type { CourseSection } from '$lib/Archer.d';
	import { writable, type Writable } from 'svelte/store';

	let code = '',
		isFetching = false;
	const sections: Writable<CourseSection[]> = writable([]);

	async function fetchSections() {
		isFetching = true;
		sections.set(await getClass(code));
		isFetching = false;
	}
</script>

<form on:submit|preventDefault={fetchSections}>
	<input type="text" placeholder="Course Code" bind:value={code} />
	<button disabled={isFetching} type="submit">Submit</button>
</form>

<div>
	{#each $sections as section}
		{section.classNumber}
	{/each}
</div>
