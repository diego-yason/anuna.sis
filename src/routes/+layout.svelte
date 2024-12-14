<script lang="ts">
    import "../app.css";
    let { data, children } = $props();

    import { Button } from "$lib/components/ui/button";
    import { Toaster } from "$lib/components/ui/sonner";

    import links from "./links.json";

    // auth - from supabase auth guide
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";

    let { session, supabase } = $derived(data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }
        });

        return () => data.subscription.unsubscribe();
    });
    // auth - from supabase auth guide
</script>

<nav class="flex gap-2">
    <p>Link bar:</p>
    {#each links as { name, href }}
        <Button {href}>{name}</Button>
    {/each}
    {#if session}
        <Button onclick={() => supabase.auth.signOut()}>Sign out</Button>
    {/if}
</nav>

<Toaster></Toaster>

{@render children()}
