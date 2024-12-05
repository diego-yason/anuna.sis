<script lang="ts">
    import type { SectionData } from "./SectionData";

    let {
        courseCode,
        section,
        classNumber,
        faculty,
        schedule,
        capacity,
        enrolled,
        remarks,
    }: SectionData = $props();

    import Schedule from "./Schedule.svelte";
</script>

<!-- classes here are taken from shadcn source code -->
<div
    class="bg-card text-card-foreground flex flex-col gap-3
    rounded-xl border p-2 shadow"
>
    <p class="font-semibold leading-none tracking-tight">
        {courseCode} - {section} / {classNumber}
    </p>
    <div class="flex gap-2">
        <div class="">
            <div class="flex">
                <span
                    class="font-iceland rotate-180 text-center font-semibold [writing-mode:vertical-lr]"
                >
                    SCHEDULE
                </span>
                <div class="flex gap-2">
                    {#each schedule as day}
                        <Schedule {...day}></Schedule>
                    {/each}
                    <!-- show at least 3 schedules -->
                    {#if !(schedule.length >= 3)}
                        {#each { length: 3 - schedule.length }}
                            <!-- dead schedule information -->
                            <Schedule day={[]} end={-450} start={-450} room={""}
                            ></Schedule>
                        {/each}
                    {/if}
                </div>
            </div>
            <div class="">
                <p class="text-xl font-semibold">{faculty}</p>
                <p>faculty</p>
            </div>
        </div>
        <div class="">
            <p>enrolled</p>
            <p>capacity</p>
            <p>remarks</p>
            <p>quick actions</p>
        </div>
    </div>
</div>
