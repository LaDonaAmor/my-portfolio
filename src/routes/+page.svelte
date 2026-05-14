<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/data/projects';
</script>
<svelte:head><title>Your Name — Frontend Engineer</title>
  <meta name="description" content="Interactive developer portfolio built with SvelteKit." /></svelte:head>
<Hero />
<section class="max-w-6xl mx-auto px-6 py-24">
  <h2 class="text-3xl font-bold mb-10">Selected work</h2>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each projects as p, i (p.slug)}<ProjectCard {...p} index={i} />{/each}
  </div>
</section>
