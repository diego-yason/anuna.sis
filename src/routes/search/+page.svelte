<script lang="ts">
    import Section from "./Section.svelte";

    // import SectionDataArr from "./SectionData.json";
    let { data } = $props();
    let { sections } = $derived(data);
</script>

<div class="m-5">
    {#await sections}
        <p>Loading</p>
    {:then SectionDataArr}
        {#each SectionDataArr as SectionData}
            <Section {...SectionData}></Section>
        {/each}
    {/await}
</div>
