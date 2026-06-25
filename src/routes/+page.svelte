<script lang="ts">
	import { ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Assistant from '$lib/components/Assistant.svelte';
	import DevConsole from '$lib/components/DevConsole.svelte';

	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	const { data }: { data: PageData } = $props();

	const strengths = [
		'Accessible, keyboard-friendly interfaces',
		'Responsive layouts tuned for desktop, tablet, and mobile',
		'Reusable components with safe local state handling',
		'Performance-conscious animation and lazy assets'
	];
</script>

<svelte:head>
	<title>TechNurse | Svelte Developer Portfolio</title>
	<meta
		name="description"
		content="A production-ready interactive SvelteKit portfolio with polished motion, project screenshots, terminal, assistant, and responsive UI."
	/>
</svelte:head>

<Hero />

<section class="py-12">
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
		<div>
			<p class="text-accent text-sm font-semibold tracking-[0.18em] uppercase">Selected Work</p>
			<h2 class="mt-3 font-display text-3xl font-semibold md:text-4xl">Recent product builds</h2>
		</div>
		<a
			href={resolve('/projects')}
			class="text-accent inline-flex items-center gap-2 text-sm font-semibold"
		>
			View all projects
			<ArrowRight size="16" />
		</a>
	</div>

	<div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#if data.projects.length}
			{#each data.projects as p, i (p.slug)}
				<ProjectCard {...p} index={i} />
			{/each}
		{:else}
			<p class="text-muted">
				No featured projects yet. Add a <code>featured</code> topic to your GitHub repos.
			</p>
		{/if}
	</div>
</section>

<Assistant />

<DevConsole />

<section class="grid gap-6 py-14 lg:grid-cols-[0.82fr_1.18fr]">
	<div>
		<p class="text-accent text-sm font-semibold tracking-[0.18em] uppercase">Quality Bar</p>
		<h2 class="mt-3 font-display text-3xl font-semibold md:text-4xl">
			Useful design, disciplined code.
		</h2>
	</div>

	<div class="grid gap-3 sm:grid-cols-2">
		{#each strengths as item (item)}
			<div class="rounded-xl border border-line bg-surface/78 p-5">
				<CheckCircle2 class="text-accent" size="20" />
				<p class="mt-4 font-medium">{item}</p>
			</div>
		{/each}
	</div>
</section>
