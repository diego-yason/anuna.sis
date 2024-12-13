<script lang="ts">
    import type { Schedule } from "$types/SectionData";

    let { day, end, room, start }: Schedule = $props();

    import Time from "./Time.svelte";
</script>

<!-- TODO: add support for non-day schedule (ex. LASARE) -->
<div class="flex flex-col items-center">
    <div class="flex justify-center">
        {#each ["M", "T", "W", "H", "F", "S"] as elemDay}
            {@const isInSchedule = day.some((v) => v === elemDay)}
            <span
                class="text-md font-roboto-mono tracking-wider"
                class:text-black={isInSchedule}
                class:text-gray-300={!isInSchedule}
                class:dark:text-white={isInSchedule}
                class:dark:text-gray-800={!isInSchedule}
            >
                {elemDay}
            </span>
        {/each}
    </div>
    {#if start === null}
        <Time time={-450}></Time>
    {:else}
        <Time time={start}></Time>
    {/if}
    <div
        class="my-1 text-center leading-5"
        class:text-gray-300={start === -450 || start === null}
    >
        to
    </div>
    {#if end === null}
        <Time time={-450}></Time>
    {:else}
        <Time time={end}></Time>
    {/if}
    <div class="text-lg font-semibold">{room}</div>
</div>
