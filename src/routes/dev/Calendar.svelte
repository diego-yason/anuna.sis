<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Schedule, Section } from '$types/Section';

	let { hover }: { hover: Writable<Section | null> } = $props();

	// params are time in minutes since 7:30am, time range is 7:30am to 9:15pm
	const normalize = (start: number, end: number) => {
		const timeRange = 825; // 825 minutes from 7:30am to 9:15pm
		const startTime = (start / timeRange) * 100; // percentage of the time range
		const endTime = (end / timeRange) * 100; // percentage of the time range
		const height = endTime - startTime; // height of the block in percentage
		return { startTime, endTime, height };
	};
</script>

<div class="grid h-full grid-cols-6 gap-2">
	{#each ['M', 'T', 'W', 'H', 'F', 'S'] as day}
		{@const findDay = (schedule: Schedule) => schedule.day.includes(day)}
		<div class="flex flex-col">
			<div class="flex items-center justify-center bg-gray-200 font-bold text-gray-700">
				{day}
			</div>
			<div class="relative grow bg-blue-500">
				{#if $hover && $hover.schedule.find(findDay)}
					{@const { start, end } = $hover.schedule.find(findDay)!}
					{@const { startTime, height } = normalize(start, end)}
					<div class="absolute bg-black" style="top: {startTime}%; height: {height}%;">aaa</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
