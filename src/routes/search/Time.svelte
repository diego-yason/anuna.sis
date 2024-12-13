<script lang="ts">
    let { time: minutesSince730 }: { time: number } = $props();

    // 7:30 is the start of the day. Time is normalized to 7:30.
    const time = minutesSince730 + (7 * 60 + 30);
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    const hour12 = hour > 12 ? hour - 12 : hour;
    let isAm = hour < 12;
</script>

<div class="font-funnel-display flex items-center align-middle font-roboto-mono">
    <span class:text-gray-300={minutesSince730 == -450} class="text-3xl font-semibold">
        {hour12.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}
    </span>
    <div class="text-md flex flex-col leading-4">
        <span
            class:text-black={isAm && minutesSince730 != -450}
            class:text-gray-300={!isAm || minutesSince730 == -450}
        >
            am
        </span>
        <span
            class:text-black={!isAm && minutesSince730 != -450}
            class:text-gray-300={isAm || minutesSince730 == -450}>pm</span
        >
    </div>
</div>
