<script lang="ts">
    import NormalSlot from "./NormalSlot.svelte";

    import { type Writable } from "svelte/store";
    import type { SectionData } from "$types/SectionData";
    let {
        subjects: allSubjects,
        day,
    }: {
        subjects: Writable<SectionData[]>;
        day: string;
    } = $props();

    let subjects: SectionData[] = $state([]);

    allSubjects.subscribe((v) => {
        const filtered = v.filter((v) => v.schedule.some((v) => v.day.includes(day)));

        filtered.sort((a, b) => {
            const aStart = a.schedule.find((v) => v.day.includes(day))?.start ?? 0;
            const bStart = b.schedule.find((v) => v.day.includes(day))?.start ?? 0;
            return aStart - bStart;
        });

        subjects = filtered;
    });
</script>

<div class="relative h-[90rem] bg-gray-400">
    {#each subjects as data}
        {@const daySchedule = data.schedule.filter((v) => v.day.includes(day))}
        {#key data}
            <!-- filter in case of double schedule on the same day -->
            {#each daySchedule as x}
                <NormalSlot {data} daySchedule={x}></NormalSlot>
            {/each}
            <!-- Maybe allow conflicts? not sure yet -->
        {/key}
    {/each}
</div>
