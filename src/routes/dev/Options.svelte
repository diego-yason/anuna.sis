<script lang="ts">
	import data from './data.json';
	import type { Writable } from 'svelte/store';
	import type { Section } from '$types/Section';
	const classes = data as Section[];

	let { hover }: { hover: Writable<Section | null> } = $props();
</script>

<div class="max-h-screen grow overflow-y-scroll">
	{#each classes as course}
		{@const { courseCode, section } = course}
		<div
			onmouseover={() => ($hover = course)}
			onfocus={() => ($hover = course)}
			onmouseout={() => ($hover = null)}
			onblur={() => ($hover = null)}
			role="list"
		>
			<div class="">{courseCode} - {section}</div>
		</div>
	{/each}
</div>
