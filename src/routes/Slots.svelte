<script lang="ts">
	import { getClass } from '$lib/archer';

	getClass('CCPROG3').then((res) => {
		console.table(res);
	});
</script>
