<script lang="ts">
    import type { Schedule } from "./SectionData";

    let { day, end, room, start }: Schedule = $props();

    import Time from "./Time.svelte";
</script>

<!-- TODO: add support for non-day schedule (ex. LASARE) -->
<div class="flex flex-col items-center">
    <div class="flex justify-center">
        {#each ["M", "T", "W", "H", "F", "S"] as elemDay}
            {@const isInSchedule = day.some((v) => v === elemDay)}
            <span
                class="font-roboto-mono text-sm tracking-widest"
                class:text-black={isInSchedule}
                class:text-gray-300={!isInSchedule}
                class:dark:text-white={isInSchedule}
                class:dark:text-gray-800={!isInSchedule}
            >
                {elemDay}
            </span>
        {/each}
    </div>
    <Time time={start}></Time>
    <div class="text-center">- to -</div>
    <Time time={end}></Time>
</div>
