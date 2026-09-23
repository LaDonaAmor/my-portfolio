<script lang="ts">
	import { ArrowRight, ArrowUpRight, CheckCircle2, Mail } from 'lucide-svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Assistant from '$lib/components/Assistant.svelte';

	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	const { data }: { data: PageData } = $props();

	const strengths = [
		'Accessible, keyboard-friendly interfaces',
		'Responsive layouts for desktop, tablet, and mobile',
		'Reusable components with thoughtful local state',
		'Performance-conscious motion and asset loading'
	];
</script>

<svelte:head>
	<title>Racheal Ogunmodede — Frontend Developer</title>
	<meta
		name="description"
		content="Racheal Ogunmodede is a frontend developer with a healthcare background, building accessible and thoughtful digital products."
	/>
</svelte:head>

<!-- Keep your existing interactive hero and floating console card. -->
<Hero />

<section class="section-space border-t border-line">
	<div class="flex flex-wrap items-end justify-between gap-5">
		<div>
			<p class="eyebrow">Selected work · 01—03</p>
			<h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">Made with intent.</h2>
			<p class="mt-3 max-w-xl leading-7 text-muted">
				A focused selection of frontend projects where clear interfaces, useful details, and solid
				implementation meet.
			</p>
		</div>

		<a
			class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition hover:bg-surface hover:text-accent"
			href={resolve('/projects')}
		>
			All projects
			<ArrowRight size={15} />
		</a>
	</div>

	<div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#if data.projects.length}
			{#each data.projects.slice(0, 3) as project, index (project.slug)}
				<ProjectCard {...project} {index} />
			{/each}
		{:else}
			<p class="text-muted">Selected projects are being updated. Please check back soon.</p>
		{/if}
	</div>
</section>

<section class="section-space grid gap-10 border-t border-line lg:grid-cols-[0.8fr_1.2fr]">
	<div>
		<p class="eyebrow">The person behind the pixels</p>
		<h2 class="mt-4 font-display text-4xl leading-tight sm:text-5xl">
			From patient care to product care.
		</h2>
	</div>

	<div>
		<p class="text-lg leading-8 text-muted">
			My healthcare experience taught me to listen closely, communicate clearly, and take details
			seriously. I bring that same care to building digital products, especially tools that need to
			work well for many different people.
		</p>

		<a
			class="mt-6 inline-flex items-center gap-2 font-semibold text-accent transition hover:gap-3"
			href={resolve('/about')}
		>
			More about my path
			<ArrowRight size={16} />
		</a>
	</div>
</section>

<!-- Keeps your AI assistant as a major portfolio feature. -->
<div class="border-t border-line">
	<Assistant />
</div>

<section class="section-space border-t border-line">
	<div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
		<div>
			<p class="eyebrow">How I work</p>
			<h2 class="mt-4 font-display text-4xl leading-tight sm:text-5xl">
				Useful design, disciplined code.
			</h2>
			<p class="mt-4 max-w-md leading-7 text-muted">
				I care about the small implementation details that make a product feel dependable,
				inclusive, and easy to use.
			</p>
		</div>

		<div class="grid gap-3 sm:grid-cols-2">
			{#each strengths as item (item)}
				<div class="paper-card p-5 transition hover:-translate-y-1 hover:border-accent/50">
					<CheckCircle2 class="text-accent" size={20} />
					<p class="mt-4 leading-6 font-medium">{item}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="section-space border-t border-line">
	<div
		class="paper-card flex flex-col items-start justify-between gap-8 p-7 sm:p-10 lg:flex-row lg:items-center"
	>
		<div>
			<p class="eyebrow">Open conversation</p>
			<h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">
				Let’s make something useful.
			</h2>
			<p class="mt-3 max-w-2xl leading-7 text-muted">
				Have a product, team, or frontend challenge in mind? Tell me what you’re working on.
			</p>
		</div>

		<a
			class="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-ink transition hover:brightness-110"
			href={resolve('/contact')}
		>
			Contact me
			<Mail size={16} />
			<ArrowUpRight size={15} />
		</a>
	</div>
</section>
