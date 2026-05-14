<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import CommandPalette from '$lib/components/CommandPalette.svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
</script>

<a href="#main" class="sr-only focus:not-sr-only fixed top-2 left-2 bg-accent text-black px-3 py-1 rounded">Skip to content</a>
<Nav />
<CommandPalette />
{#key $page.url.pathname}
  <main id="main" in:fade={{ duration: 250 }}>
    <slot />
  </main>
{/key}
