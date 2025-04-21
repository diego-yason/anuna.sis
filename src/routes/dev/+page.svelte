<script lang="ts">
	import type { Section } from '$types/Section';
	import Calendar from './Calendar.svelte';
	import Options from './Options.svelte';

	import { writable } from 'svelte/store';

	let hover = writable<Section | null>(null);
</script>

<div class="flex h-screen gap-2">
	<div class="basis-4/5">
		<Calendar {hover}></Calendar>
	</div>
	<Options {hover}></Options>
</div>
