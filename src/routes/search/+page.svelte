<script lang="ts">
	let { data } = $props();
</script>

{#await data.sections}
	<p>Loading...</p>
{:then sections}
	{#each sections.data as section}
		<h2>{section.classNumber}</h2>
	{/each}
{:catch error}
	<p>Error: {error.message}</p>
{/await}
