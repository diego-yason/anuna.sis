<script lang="ts">
    import { Button } from "$lib/components/ui/button";

    let { data } = $props();

    let user = $derived(data.session?.user);
</script>

<p>Current user: {user?.id}</p>

<form action="?/anon" method="POST">
    <Button type="submit">Anon Login</Button>
</form>
<Button>Google Login</Button>
