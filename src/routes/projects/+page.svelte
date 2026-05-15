<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();

  const PAGE_SIZE = 6;

  let page = $state(1);
  let search = $state('');
  let selectedLang = $state('All');

  const languages = $derived([
    'All',
    ...new Set(data.projects.map((p) => p.impact || 'Unknown').filter(Boolean))
  ]);

  const filtered = $derived(
    data.projects.filter((p) => {
      const query = search.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query);
      const matchesLang =
        selectedLang === 'All' || (p.impact || 'Unknown') === selectedLang;
      return matchesSearch && matchesLang;
    })
  );

  const paginated = $derived(filtered.slice(0, page * PAGE_SIZE));
  const hasMore = $derived(paginated.length < filtered.length);

  function loadMore() {
    page += 1;
  }

  function resetPage() {
    page = 1;
  }
</script>

<svelte:head>
  <title>Projects | TechNurse</title>
  <meta name="description" content="All GitHub projects by TechNurse." />
</svelte:head>

<section class="py-12">
  <div class="mb-8">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-accent">All Work</p>
    <h1 class="mt-3 text-3xl font-semibold md:text-4xl">Projects</h1>
  </div>

  <!-- Search + Filter -->
  <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
    <input
      type="search"
      placeholder="Search projects..."
      bind:value={search}
      oninput={resetPage}
      class="w-full rounded-lg border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-accent sm:max-w-xs"
    />

    <div class="flex flex-wrap gap-2">
      {#each languages as lang (lang)}
        <button
          type="button"
          onclick={() => { selectedLang = lang; resetPage(); }}
          class="rounded-full border px-3 py-1 text-xs font-medium transition
            {selectedLang === lang
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-line text-muted hover:border-accent/50 hover:text-accent'}"
        >
          {lang}
        </button>
      {/each}
    </div>
  </div>

  <!-- Grid -->
  {#if paginated.length}
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each paginated as p, i (p.slug)}
        <ProjectCard {...p} index={i} />
      {/each}
    </div>
  {:else}
    <p class="text-muted">No projects match your search.</p>
  {/if}

  <!-- Load More -->
  {#if hasMore}
    <div class="mt-10 flex justify-center">
      <button
        type="button"
        onclick={loadMore}
        class="rounded-lg border border-line px-6 py-2.5 text-sm font-medium transition hover:border-accent/50 hover:text-accent"
      >
        Load more ({filtered.length - paginated.length} remaining)
      </button>
    </div>
  {/if}
</section>