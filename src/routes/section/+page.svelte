<script lang="ts">
    import Section from "./Section.svelte";

    import SectionDataArr from "./SectionData.json";
</script>

<div class="m-5">
    {#each SectionDataArr as SectionData}
        <Section {...SectionData}></Section>
    {/each}
</div>
