<script lang="ts">
    import data from "$lib/localStorage/calendar";

    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import Day from "./Day.svelte";

    const dayArray = ["M", "T", "W", "H", "F", "S"];
</script>

<div class="mx-6 mt-3 flex h-[55rem] flex-col p-3">
    <div class="grid grid-cols-6 gap-3 px-3">
        {#each dayArray as day}
            <p>{day}</p>
        {/each}
    </div>
    <ScrollArea class="px-3">
        <div class="grid grid-cols-6 gap-3">
            {#each dayArray as day}
                <div class="">
                    <Day {day} subjects={data}></Day>
                </div>
            {/each}
        </div>
    </ScrollArea>
</div>
