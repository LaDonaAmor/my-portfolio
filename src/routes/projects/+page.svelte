<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const PAGE_SIZE = 6;

	let page = $state(1);
	let search = $state('');
	let selectedLang = $state('All');
	let showArchived = $state(false);

	const languages = $derived([
		'All',
		...new Set(data.projects.map((p) => p.impact || 'Unknown').filter(Boolean))
	]);

	const filtered = $derived(
		data.projects.filter((p) => {
			const query = search.toLowerCase();
			const matchesSearch =
				p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
			const matchesLang = selectedLang === 'All' || (p.impact || 'Unknown') === selectedLang;
			const matchesArchived = showArchived || !p.archived;
			return matchesSearch && matchesLang && matchesArchived;
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

	function clearFilters() {
		search = '';
		selectedLang = 'All';
		showArchived = false;
		resetPage();
	}
</script>

<svelte:head>
	<title>Projects | Racheal Ogunmodede</title>
	<meta name="description" content="All GitHub projects by Racheal Ogunmodede." />
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<section class="section-space">
	<div class="max-w-3xl">
		<p class="eyebrow">All work</p>
		<h1 class="mt-3 font-display text-5xl sm:text-6xl">Projects</h1>
	</div>

	<div class="mt-10 border-y border-line py-6">
		<div class="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]">
			<div>
				<label for="project-search" class="mb-2 block text-sm font-semibold text-fg">
					Search projects
				</label>
				<input
					id="project-search"
					type="search"
					placeholder="Search projects..."
					bind:value={search}
					oninput={resetPage}
					class="min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-fg outline-none focus:border-accent"
				/>
			</div>

			<div>
				<p class="mb-2 text-sm font-semibold text-fg">Language</p>

				<div class="flex flex-wrap gap-2">
					{#each languages as lang (lang)}
						<button
							type="button"
							aria-pressed={selectedLang === lang}
							onclick={() => {
								selectedLang = lang;
								resetPage();
							}}
							class="min-h-11 rounded-full border px-4 text-sm transition
							{selectedLang === lang
								? 'border-accent bg-accent/10 text-accent'
								: 'border-line text-muted hover:border-accent/50 hover:text-fg'}"
						>
							{lang}
						</button>
					{/each}

					<button
						type="button"
						aria-pressed={showArchived}
						onclick={() => {
							showArchived = !showArchived;
							resetPage();
						}}
						class="min-h-11 rounded-full border px-4 text-sm transition
						{showArchived
							? 'border-accent bg-accent/10 text-accent'
							: 'border-line text-muted hover:border-accent/50 hover:text-fg'}"
					>
						{showArchived ? 'Hide archived' : 'Show archived'}
					</button>
				</div>
			</div>
		</div>

		<p class="mt-5 text-sm text-muted">
			Showing {paginated.length} of {filtered.length} matching projects
			{#if filtered.length !== data.projects.length}
				({data.projects.length} total).
			{:else}
				.
			{/if}
		</p>
	</div>

	{#if paginated.length}
		<div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
			{#each paginated as p, i (p.slug)}
				<ProjectCard {...p} index={i} />
			{/each}
		</div>
	{:else}
		<div class="paper-card mt-10 max-w-xl p-6">
			<h2 class="font-display text-2xl">No projects match your search.</h2>
			<p class="mt-2 leading-7 text-muted">
				Try another search term, choose a different language, or include archived projects.
			</p>
			<button
				type="button"
				class="mt-5 min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-ink"
				onclick={clearFilters}
			>
				Clear search and filters
			</button>
		</div>
	{/if}

	{#if hasMore}
		<div class="mt-10 flex justify-center">
			<button
				type="button"
				onclick={loadMore}
				class="min-h-11 rounded-full border border-line px-6 text-sm font-semibold transition hover:border-accent/50 hover:text-accent"
			>
				Load more ({filtered.length - paginated.length} remaining)
			</button>
		</div>
	{/if}
</section>
