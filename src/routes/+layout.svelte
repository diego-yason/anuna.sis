<script lang="ts">
    import "../app.css";
    let { children } = $props();

    import { Button } from "$lib/components/ui/button";
    import { Toaster } from "$lib/components/ui/sonner";
</script>

<nav class="flex gap-2">
    <p>Link bar:</p>
    <Button href="/section">Section (dev)</Button>
    <Button href="/calendar">Calendar</Button>
</nav>

<Toaster></Toaster>

{@render children()}
