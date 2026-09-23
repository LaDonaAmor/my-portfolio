<script lang="ts">
	import { ArrowRight, CheckCircle2 } from 'lucide-svelte';
	import { resolve } from '$app/paths';

	const skillGroups = [
		{
			title: 'Build',
			skills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS']
		},
		{
			title: 'Design for use',
			skills: ['Responsive Design', 'Accessible UI', 'UI/UX Principles', 'API Integration']
		},
		{
			title: 'Work with others',
			skills: [
				'Git & GitHub',
				'Reusable components',
				'Clear communication',
				'Structured problem-solving'
			]
		}
	];

	const principles = [
		{
			title: 'Clarity',
			body: 'I aim to make the next action easy to understand, whether someone is seeing a product for the first time or returning to complete a task.'
		},
		{
			title: 'Accessibility',
			body: 'I treat keyboard access, readable structure, and responsive behavior as part of the interface—not as finishing touches.'
		},
		{
			title: 'Care',
			body: 'My healthcare background shaped how I approach details: they matter because they affect how supported and capable people feel.'
		}
	];

	const timeline = [
		{
			year: '2026 – Present',
			title: 'Frontend Development Intern — HNG',
			body: 'Building production-focused frontend applications with React, emphasizing reusable components, API integration, responsive design, and scalable UI architecture.'
		},
		{
			year: '2026 – Present',
			title: 'Frontend Developer Intern — Digital Health Africa',
			body: 'Building UI components, onboarding flows, and profile systems for a professional healthcare directory platform.'
		},
		{
			year: '2024 – Present',
			title: 'Frontend Development (Project-Based Learning)',
			body: 'Building React-based applications focused on reusable components, API integration, and responsive UI systems.'
		},
		{
			year: '2024 – 2025',
			title: 'Clinical Practice — FMC Owo',
			body: 'Worked in a high-responsibility healthcare environment strengthening precision, teamwork, and structured problem-solving.'
		}
	];
</script>

<svelte:head>
	<title>About | Racheal Ogunmodede</title>
	<meta
		name="description"
		content="Learn about Racheal Ogunmodede, a frontend developer bringing healthcare-informed care and precision to accessible digital products."
	/>
</svelte:head>

<section class="section-space">
	<p class="eyebrow">About</p>

	<div class="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
		<h1 class="font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
			I turn product ideas into interfaces people can trust.
		</h1>

		<div>
			<p class="max-w-2xl text-lg leading-8 text-muted">
				I started in healthcare, where small details can change how safe and supported someone
				feels. I now bring that same attention to frontend work: clear paths through a product,
				accessible interactions, and interfaces that earn trust.
			</p>

			<div class="paper-card mt-8 p-5 sm:p-6">
				<p class="eyebrow">My path</p>

				<ol class="mt-5 grid gap-4 sm:grid-cols-3">
					<li>
						<p class="font-mono text-xs text-accent">01</p>
						<p class="mt-2 font-semibold">Healthcare</p>
						<p class="mt-1 text-sm leading-6 text-muted">Precision, empathy, and responsibility.</p>
					</li>

					<li>
						<p class="font-mono text-xs text-accent">02</p>
						<p class="mt-2 font-semibold">Frontend learning</p>
						<p class="mt-1 text-sm leading-6 text-muted">
							Building clear and responsive interfaces.
						</p>
					</li>

					<li>
						<p class="font-mono text-xs text-accent">03</p>
						<p class="mt-2 font-semibold">Product-minded work</p>
						<p class="mt-1 text-sm leading-6 text-muted">Making digital tools easier to use.</p>
					</li>
				</ol>
			</div>
		</div>
	</div>
</section>

<section class="section-space border-t border-line">
	<p class="eyebrow">How I work</p>
	<h2 class="mt-3 font-display text-4xl sm:text-5xl">Careful by design.</h2>

	<div class="mt-10 grid gap-4 md:grid-cols-3">
		{#each principles as principle (principle.title)}
			<article class="paper-card p-6">
				<CheckCircle2 size={20} class="text-accent" />
				<h3 class="mt-5 font-display text-2xl">{principle.title}</h3>
				<p class="mt-3 leading-7 text-muted">{principle.body}</p>
			</article>
		{/each}
	</div>
</section>

<section class="section-space border-t border-line">
	<p class="eyebrow">Skills</p>
	<h2 class="mt-3 font-display text-4xl sm:text-5xl">What I bring to the work.</h2>

	<div class="mt-10 grid gap-5 lg:grid-cols-3">
		{#each skillGroups as group (group.title)}
			<section class="paper-card p-6">
				<h3 class="font-display text-2xl">{group.title}</h3>

				<ul class="mt-5 space-y-3">
					{#each group.skills as skill (skill)}
						<li class="flex items-center gap-2 text-sm text-muted">
							<span class="size-1.5 rounded-full bg-accent"></span>
							{skill}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</section>

<section class="section-space border-t border-line">
	<p class="eyebrow">Experience</p>
	<h2 class="mt-3 font-display text-4xl sm:text-5xl">Learning through real work.</h2>

	<div class="relative mt-10 ml-2 border-l border-line pl-7 sm:ml-4 sm:pl-10">
		{#each timeline as item (item.title)}
			<article class="relative pb-10 last:pb-0">
				<span
					class="absolute top-1 left-[-2.15rem] size-3 rounded-full border-2 border-bg bg-accent sm:left-[-2.9rem]"
					aria-hidden="true"
				></span>

				<time class="font-mono text-xs tracking-wider text-accent uppercase">{item.year}</time>
				<h3 class="mt-2 font-display text-2xl">{item.title}</h3>
				<p class="mt-3 max-w-3xl leading-7 text-muted">{item.body}</p>
			</article>
		{/each}
	</div>
</section>

<section class="section-space border-t border-line">
	<div
		class="paper-card flex flex-col items-start justify-between gap-6 p-7 sm:p-10 lg:flex-row lg:items-center"
	>
		<div>
			<p class="eyebrow">Next step</p>
			<h2 class="mt-3 font-display text-4xl">See the work, then start a conversation.</h2>
		</div>

		<div class="flex flex-wrap gap-3">
			<a
				class="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink"
				href={resolve('/projects')}
			>
				View projects
				<ArrowRight size={16} />
			</a>

			<a
				class="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-semibold transition hover:bg-surface-2"
				href={resolve('/contact')}
			>
				Get in touch
				<ArrowRight size={16} />
			</a>
		</div>
	</div>
</section>
