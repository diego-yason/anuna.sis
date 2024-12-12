<script lang="ts">
    import type { SectionData } from "$types/SectionData";

    let sec: SectionData = $props();

    const {
        courseCode,
        section,
        classNumber,
        faculty,
        schedule,
        capacity,
        enrolled,
        remarks,
    } = sec;

    import Schedule from "./Schedule.svelte";
    import calendarData, { addSection } from "$lib/localStorage/calendar";
    import { toast } from "svelte-sonner";
    function addSectionToCalendar() {
        // validate
        for (const { day: days, start, end } of schedule) {
            for (const day of days) {
                if (["M", "T", "W", "H", "F", "S"].indexOf(day) === -1) {
                    // special schedule
                    return;
                }

                for (const section of $calendarData) {
                    for (const {
                        day: secdays,
                        start: secstart,
                        end: secend,
                    } of section.schedule) {
                        if (secdays.includes(day)) {
                            if (start >= secstart && start <= secend) {
                                toast.error("Time conflict");
                                return;
                            }
                            if (end >= secstart && end <= secend) {
                                toast.error("Time conflict");
                                return;
                            }
                        }
                    }
                }
            }
        }

        addSection(sec);
        toast.success("Added to calendar");
    }

    import { Button } from "$lib/components/ui/button/index";
</script>

<!-- classes here are taken from shadcn source code -->
<div
    class="flex w-[39rem] flex-col gap-3 rounded-xl
    border bg-card p-2 text-2xl text-card-foreground shadow"
>
    <div class="flex justify-between gap-3">
        <div class="flex flex-col">
            <p class="text-center text-2xl font-semibold leading-none tracking-tight">
                {courseCode}
            </p>
            <div class="grid grid-cols-2">
                <div class="flex flex-col text-center">
                    <span class="text-3xl font-bold">{section}</span>
                    <span class="text-xl">{classNumber}</span>
                </div>
                <div>
                    <span class="font-roboto-mono text-5xl">{enrolled}</span>
                    <span class="font-mono text-xl">/{capacity}</span>
                    <!-- <span class="text-xl">enrolled</span> -->
                </div>
            </div>
            <div class="flex flex-grow flex-col p-3">
                <p class="flex flex-grow items-center justify-center text-xl font-medium">
                    {remarks}
                </p>
                <p class="text-center text-lg">Remarks</p>
            </div>
        </div>
        <div class="flex flex-col justify-center gap-3">
            <div class="flex gap-1">
                <span
                    class="mr-1 rotate-180 text-center text-lg
                    font-semibold tracking-widest [writing-mode:vertical-lr]"
                >
                    SCHEDULE
                </span>
                <div class="flex gap-3">
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
        </div>
    </div>
    <div class="flex justify-between">
        <div class="">
            <p class="truncate text-ellipsis text-xl font-semibold">{faculty}</p>
            <p class="text-lg">Faculty</p>
        </div>
        <div class="flex gap-1">
            <Button onclick={addSectionToCalendar}>Add to Schedule</Button>
            <Button variant="secondary">Preview in Schedule</Button>
        </div>
    </div>
</div>
