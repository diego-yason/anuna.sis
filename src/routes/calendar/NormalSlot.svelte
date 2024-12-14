<script lang="ts">
    import { onMount } from "svelte";
    import type { SectionData, Schedule } from "$types/SectionData";

    let { data, daySchedule }: { data: SectionData; daySchedule: Schedule } = $props();

    const { courseCode, section, faculty, schedule } = data;

    const denormalizeTime = (time: number) => {
        time += 450;
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const pm = hours >= 12;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${pm ? "pm" : "am"}`;
    };

    const totalTime = daySchedule.end! - daySchedule.start!;

    // 810 mins in a day
    // 1 min = 0.12%
    let element: HTMLElement;
    const size = (totalTime / 810) * 100;

    onMount(() => {
        const style = element.style;
        style.height = `${size - 1}%`;
        style.top = `${(daySchedule.start! / 810) * 100}%`;
    });

    import { removeSection } from "$lib/localStorage/calendar";

    function removeClass() {
        clicked = true;
        removeSection(data);

        clicked = false;
        dialogOpen = false;
    }

    let dialogOpen = $state(false);
    let clicked = $state(false);

    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
    import * as Table from "$lib/components/ui/table";
</script>

<!-- aria stuff -->
<div
    role="button"
    tabindex="0"
    onclick={(e) => (dialogOpen = true)}
    onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") dialogOpen = true;
    }}
    bind:this={element}
    class="absolute flex w-full flex-col justify-between bg-slate-300 p-1"
>
    <div class="flex items-start justify-between">
        <p class="text-xl font-semibold">{courseCode}</p>
        <p>{denormalizeTime(daySchedule.start!) ?? ""}</p>
    </div>
    <p class="mb-1 leading-none">{section}</p>
    {#if daySchedule.room == "*"}
        <p class="text-xl font-medium">ONLINE (maybe)</p>
    {:else}
        <p class="text-xl font-medium">{daySchedule.room ?? ""}</p>
    {/if}
    <div class="flex items-end justify-between">
        <p class="text-lg">{faculty?.split(",")[0] ?? "Unknown"}</p>
        <p class="">{denormalizeTime(daySchedule.end!) ?? ""}</p>
    </div>
</div>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>
                {courseCode} - {section}
            </Dialog.Title>
        </Dialog.Header>
        <div>
            <div class="">
                <p class="text-lg font-semibold">Schedule</p>
                <Table.Root>
                    <Table.Header>
                        <Table.Row class="font-medium">
                            <Table.Cell>Day</Table.Cell>
                            <Table.Cell>Time Start</Table.Cell>
                            <Table.Cell>Time End</Table.Cell>
                            <Table.Cell>Room</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each schedule as { day, start, end, room }}
                            <Table.Row>
                                <Table.Cell>{day}</Table.Cell>
                                <Table.Cell>{denormalizeTime(start!)}</Table.Cell>
                                <Table.Cell>{denormalizeTime(end!)}</Table.Cell>
                                <Table.Cell>{room}</Table.Cell>
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>
            </div>
            <div class="">
                <p class="text-lg font-semibold">Faculty</p>
                <p>{faculty}</p>
            </div>
            <div class="">
                <p class="text-lg font-semibold">Friends in class</p>
                <!-- svelte-ignore a11y_distracting_elements -->
                <marquee behavior="alternate">
                    <!-- {#each Array(5)} -->
                    <span class="">IN DEVELOPMENT!</span>
                    <!-- {/each} -->
                </marquee>
            </div>
        </div>
        <Dialog.Footer>
            <Button href="/search/{courseCode}">View other classes</Button>
            <Button onclick={removeClass} disabled={clicked} variant="destructive">
                Remove from schedule
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
