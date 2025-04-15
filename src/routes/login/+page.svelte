<script lang="ts">
	import { goto } from '$app/navigation';
	import { firekitAuth } from 'svelte-firekit';

	const onclick = async () => {
		await firekitAuth.signInWithGoogle();
		goto('/');
	};
</script>

<button {onclick}>Login with Google</button>
