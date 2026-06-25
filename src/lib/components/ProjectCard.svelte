<script lang="ts">
	import { ArrowUpRight, Code2 } from 'lucide-svelte';
	import { base } from '$app/paths';

	let {
		slug,
		title,
		desc,
		impact,
		category,
		tech,
		screenshot,
		demo,
		repo,
		index = 0
	}: {
		slug: string;
		title: string;
		desc: string;
		impact: string;
		category: string;
		tech: string[];
		screenshot: string;
		demo: string;
		repo: string;
		index?: number;
	} = $props();

	let imageLoaded = $state(false);
	let imageError = $state(false);

	// Only prepend base for local paths
	const resolveAsset = (path: string) => (path.startsWith('http') ? path : `${base}${path}`);

	const resolveLink = (path: string) => (path.startsWith('http') ? path : `${base}${path}`);
</script>

<article
	id={slug}
	class="project-card group overflow-hidden rounded-xl border border-line bg-surface/82 shadow-[0_18px_50px_rgba(2,8,23,0.18)] transition duration-300 hover:border-accent/50"
	style="animation-delay: {index * 80}ms"
>
	<div class="project-shot relative block w-full overflow-hidden border-b border-line bg-[#081526]">
		{#if !imageLoaded && !imageError}
			<span class="absolute inset-0 grid place-items-center text-sm text-muted">
				Loading preview...
			</span>
		{/if}
		{#if imageError}
			<span class="absolute inset-0 grid place-items-center p-4 text-sm text-muted">
				Preview unavailable
			</span>
		{/if}
		<img
			src={resolveAsset(screenshot)}
			alt={`${title} product screenshot`}
			decoding="async"
			width="1200"
			height="760"
			class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
			class:opacity-0={!imageLoaded && !imageError}
			onload={() => (imageLoaded = true)}
			onerror={() => (imageError = true)}
		/>
	</div>

	<div class="p-5">
		<div class="flex items-center justify-between gap-3">
			<p class="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{impact}</p>
			<span class="rounded-full border border-line px-2.5 py-1 text-xs text-muted">{category}</span>
		</div>
		<h3 class="mt-2 text-xl font-semibold">{title}</h3>
		<p class="mt-3 text-sm leading-6 text-muted">{desc}</p>

		<ul class="mt-5 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
			{#each tech as t (t)}
				<li class="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted">
					{t}
				</li>
			{/each}
		</ul>

		<div class="mt-6 flex flex-wrap gap-3 text-sm font-medium">
			<a
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				href={resolveLink(demo)}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-2 transition hover:border-accent/50 hover:text-accent"
			>
				Live Demo
				<ArrowUpRight size="15" />
			</a>
			<a
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				href={resolveLink(repo)}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-2 transition hover:border-accent/50 hover:text-accent"
			>
				<Code2 size="15" />
				GitHub Repo
			</a>
		</div>
	</div>
</article>

<style>
	.project-card {
		transform-style: preserve-3d;
		animation: fadeUp 0.6s ease backwards;
	}

	.project-card:hover {
		transform: perspective(1100px) rotateX(1.8deg) rotateY(-2.2deg) translateY(-4px);
	}

	.project-shot {
		aspect-ratio: 1.58;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.project-card {
			animation: none;
		}
		.project-card:hover {
			transform: none;
		}
	}
</style>
