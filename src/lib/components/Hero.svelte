<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		ArrowRight,
		Code2,
		Download,
		FileCode,
		HelpCircle,
		Layers3,
		Mail,
		ShieldCheck,
		Terminal,
		UserRound
	} from 'lucide-svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Particles from './Particles.svelte';

	type TabName = 'Profile.ts' | 'Stack.json';
	type TerminalLine = {
		id: number;
		text: string;
		type: 'system' | 'user' | 'success' | 'error' | 'muted';
	};

	const socials = [
		{ label: 'GitHub', href: 'https://github.com/LaDonaAmor', icon: Code2 },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/rachealogunmodede/', icon: ArrowRight },
		{ label: 'Email', href: 'mailto:rachealogunmodede6@gmail.com', icon: Mail }
	];

	const subtitleWords = [
		{ word: 'building', accent: false },
		{ word: 'fast,', accent: true },
		{ word: 'accessible,', accent: false },
		{ word: '&', accent: false },
		{ word: 'beautiful', accent: true },
		{ word: 'web', accent: false },
		{ word: 'experiences.', accent: false }
	];

	const statValues = ['3+', 'Keyboard-first', 'Mobile-ready'];
	const statLabels = ['Selected projects', 'Accessibility approach', 'Responsive design'];

	const codeFiles: Record<TabName, string[]> = {
		'Profile.ts': [
			'<span class="text-indigo-500 dark:text-indigo-400">const</span> <span class="text-blue-600 dark:text-blue-400">developer</span> = &#123;',
			'  <span class="text-sky-600 dark:text-sky-400">name</span>: <span class="text-emerald-600 dark:text-emerald-400">"Racheal Ogunmodede"</span>,',
			'  <span class="text-sky-600 dark:text-sky-400">role</span>: <span class="text-emerald-600 dark:text-emerald-400">"Frontend Developer"</span>,',
			'  <span class="text-sky-600 dark:text-sky-400">background</span>: <span class="text-emerald-600 dark:text-emerald-400">"Healthcare → Technology"</span>,',
			'  <span class="text-sky-600 dark:text-sky-400">focus</span>: [<span class="text-emerald-600 dark:text-emerald-400">"Accessible UI"</span>, <span class="text-emerald-600 dark:text-emerald-400">"Responsive design"</span>],',
			'  <span class="text-sky-600 dark:text-sky-400">stack</span>: <span class="text-emerald-600 dark:text-emerald-400">"React, SvelteKit, TypeScript"</span>',
			'&#125;;'
		],
		'Stack.json': [
			'&#123;',
			'  <span class="text-sky-600 dark:text-sky-400">"languages"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"TypeScript"</span>, <span class="text-emerald-600 dark:text-emerald-400">"JavaScript"</span>],',
			'  <span class="text-sky-600 dark:text-sky-400">"frameworks"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"React"</span>, <span class="text-emerald-600 dark:text-emerald-400">"SvelteKit"</span>],',
			'  <span class="text-sky-600 dark:text-sky-400">"styling"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"Tailwind CSS"</span>, <span class="text-emerald-600 dark:text-emerald-400">"CSS"</span>],',
			'  <span class="text-sky-600 dark:text-sky-400">"tools"</span>: [<span class="text-emerald-600 dark:text-emerald-400">"Git"</span>, <span class="text-emerald-600 dark:text-emerald-400">"GitHub"</span>, <span class="text-emerald-600 dark:text-emerald-400">"Figma"</span>, <span class="text-emerald-600 dark:text-emerald-400">"Vercel"</span>]',
			'&#125;'
		]
	};

	const tabs = Object.keys(codeFiles) as TabName[];

	const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
	const finalName = "Hi, I'm Racheal Ogunmodede.";

	let cursorX = $state(-300);
	let cursorY = $state(-300);
	let ctaHovered = $state(false);
	let nameEl: HTMLElement | null = null;

	let activeTab = $state<TabName>('Profile.ts');
	let commandInput = $state('');
	let terminalId = 0;
	let terminalHistory = $state<TerminalLine[]>([
		{
			id: terminalId++,
			text: 'Portfolio console ready. Type "help" to explore.',
			type: 'system'
		}
	]);

	let terminalScrollEl: HTMLDivElement | null = null;

	$effect(() => {
		const lineCount = terminalHistory.length;
		if (terminalScrollEl && lineCount >= 0) {
			terminalScrollEl.scrollTop = terminalScrollEl.scrollHeight;
		}
	});

	let tabFlash = $state(false);

	function flashTab() {
		tabFlash = true;
		setTimeout(() => (tabFlash = false), 700);
	}

	function addLine(text: string, type: TerminalLine['type']) {
		terminalHistory = [...terminalHistory, { id: terminalId++, text, type }];
	}

	function scramble(el: HTMLElement, text: string, duration = 900) {
		const frames = Math.ceil(duration / 16);
		let frame = 0;

		const tick = () => {
			el.textContent = text
				.split('')
				.map((character, index) => {
					if (character === ' ' || character === ',' || character === '.') return character;
					if (frame / frames > index / text.length) return character;
					return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
				})
				.join('');

			if (++frame < frames) {
				requestAnimationFrame(tick);
			} else {
				el.textContent = text;
			}
		};

		requestAnimationFrame(tick);
	}

	function runCommand() {
		const command = commandInput.trim().toLowerCase();

		if (!command) return;

		addLine(`➜ ~ ${commandInput}`, 'user');
		commandInput = '';

		if (command === 'help') {
			addLine('Available commands:', 'system');
			addLine('projects  — open selected work', 'muted');
			addLine('about     — open experience and skills', 'muted');
			addLine('contact   — open contact page', 'muted');
			addLine('stack     — open Stack.json', 'muted');
			addLine('profile   — open Profile.ts', 'muted');
			addLine('clear     — clear console output', 'muted');
			return;
		}

		if (command === 'stack') {
			activeTab = 'Stack.json';
			flashTab();
			addLine('Opened Stack.json.', 'success');
			return;
		}

		if (command === 'profile') {
			activeTab = 'Profile.ts';
			flashTab();
			addLine('Opened Profile.ts.', 'success');
			return;
		}

		if (command === 'clear') {
			terminalHistory = [];
			return;
		}

		if (command === 'projects' || command === 'cd projects') {
			addLine('Opening selected work…', 'success');
			void goto(resolve('/projects'));
			return;
		}

		if (command === 'about' || command === 'cd about') {
			addLine('Opening experience and skills…', 'success');
			void goto(resolve('/about'));
			return;
		}

		if (command === 'contact' || command === 'cd contact') {
			addLine('Opening contact page…', 'success');
			void goto(resolve('/contact'));
			return;
		}

		addLine(`Command not found: ${command}. Type "help" for options.`, 'error');
	}

	function handleCommandKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			runCommand();
		}

		if (event.key === 'Escape') {
			commandInput = '';
		}
	}

	function onMagnetMove(event: MouseEvent) {
		const button = event.currentTarget as HTMLElement;
		const bounds = button.getBoundingClientRect();

		button.style.transform = `translate(
			${(event.clientX - bounds.left - bounds.width / 2) * 0.28}px,
			${(event.clientY - bounds.top - bounds.height / 2) * 0.28}px
		)`;
	}

	function onMagnetLeave(event: MouseEvent) {
		const button = event.currentTarget as HTMLElement;
		button.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
		button.style.transform = '';

		setTimeout(() => {
			button.style.transition = '';
		}, 450);
	}

	onMount(() => {
		const nameTimer = setTimeout(() => {
			if (nameEl) scramble(nameEl, finalName);
		}, 350);

		document.querySelectorAll<HTMLElement>('.hero-entrance').forEach((element, index) => {
			element.style.opacity = '0';
			element.style.transform = 'translateY(22px)';

			setTimeout(
				() => {
					element.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
					element.style.opacity = '1';
					element.style.transform = 'translateY(0)';
				},
				80 + index * 90
			);
		});

		return () => clearTimeout(nameTimer);
	});

	onDestroy(() => {
		// Kept for lifecycle clarity if future hero effects need cleanup.
	});
</script>

<section
	class="hero-root relative isolate flex min-h-[95vh] items-center overflow-hidden px-6 pt-16 pb-20 md:px-14 md:pt-20 md:pb-28"
	onmousemove={(event) => {
		cursorX = event.clientX;
		cursorY = event.clientY;
	}}
	aria-label="Hero section"
>
	<div
		class="cursor-glow pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height] duration-300"
		style={`left: ${cursorX}px; top: ${cursorY}px; --glow-size: ${ctaHovered ? '140px' : '70px'};`}
	></div>

	<div
		class="orb orb-a pointer-events-none absolute -z-10 rounded-full opacity-[0.16] blur-[90px]"
	></div>
	<div
		class="orb orb-b pointer-events-none absolute -z-10 rounded-full opacity-[0.16] blur-[90px]"
	></div>
	<div
		class="orb orb-c pointer-events-none absolute -z-10 rounded-full opacity-[0.16] blur-[90px]"
	></div>

	<div class="grid-veil pointer-events-none absolute inset-0 -z-10"></div>
	<div class="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"></div>
	<Particles className="absolute inset-0 -z-10 pointer-events-none" refresh={true} />

	<div class="relative z-10 mx-auto w-full max-w-7xl">
		<div class="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="flex flex-col items-start">
				<div class="hero-entrance mb-5">
					<span
						class="badge inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] uppercase backdrop-blur-sm"
					>
						<span class="pulse-dot" aria-hidden="true"></span>
						<ShieldCheck size={12} strokeWidth={2.5} />
						TechNurse — Frontend Developer
					</span>
				</div>

				<h1
					class="hero-entrance font-display text-5xl leading-[1.02] font-black tracking-tight md:text-[4.5rem]"
				>
					<span class="name-grad bg-clip-text text-transparent" bind:this={nameEl}>
						{finalName}
					</span>
				</h1>

				<div class="hero-entrance mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
					{#each subtitleWords as item, index (item.word)}
						<span
							class="sub-word font-display text-xl font-bold md:text-2xl"
							class:sub-accent={item.accent}
							style={`animation-delay: ${0.55 + index * 0.09}s`}
						>
							{item.word}
						</span>
					{/each}
				</div>

				<p class="hero-entrance mt-5 max-w-120 text-sm leading-relaxed text-muted md:text-base">
					I work with <span class="pill">React</span>, <span class="pill">TypeScript</span>,
					<span class="pill">Tailwind</span>, and <span class="pill">SvelteKit</span> to craft interfaces
					that are accessible, responsive, and enjoyable to use.
				</p>

				<div class="hero-entrance mt-8 flex flex-col gap-3 sm:flex-row">
					<a
						href={`${base}/projects`}
						class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold tracking-wide"
						onmousemove={onMagnetMove}
						onmouseenter={() => (ctaHovered = true)}
						onmouseleave={(event) => {
							onMagnetLeave(event);
							ctaHovered = false;
						}}
					>
						Explore Projects
						<ArrowRight
							size={15}
							strokeWidth={2.5}
							class="transition-transform duration-300 group-hover:translate-x-1"
						/>
					</a>

					<a
						href={`${base}/resume.pdf`}
						class="btn-secondary group inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-bold tracking-wide"
						onmousemove={onMagnetMove}
						onmouseleave={onMagnetLeave}
					>
						<Download
							size={15}
							class="transition-transform duration-300 group-hover:-translate-y-0.5"
						/>
						Download Resume
					</a>
				</div>

				<div class="hero-entrance mt-6 flex flex-wrap gap-2" aria-label="Professional profiles">
					{#each socials as social (social.href)}
						<a
							href={social.href}
							rel="noopener noreferrer"
							target="_blank"
							class="chip inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
						>
							<social.icon size={12} />
							{social.label}
						</a>
					{/each}
				</div>

				<dl
					class="hero-entrance stats-row mt-8 grid w-full max-w-md grid-cols-3 gap-4 border-t pt-6"
				>
					{#each statValues as value, index (value)}
						<div class="stat-item">
							<dt class="stat-num font-display text-2xl font-black md:text-3xl">{value}</dt>
							<dd class="mt-1 text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
								{statLabels[index]}
							</dd>
						</div>
					{/each}
				</dl>
			</div>

			<div class="hero-entrance console-wrap relative">
				<div class="console-card rounded-2xl border p-px">
					<div class="console-body overflow-hidden rounded-[14px] backdrop-blur-xl">
						<div class="flex items-center justify-between border-b border-line/70 px-4 py-3">
							<div class="flex items-center gap-2" aria-hidden="true">
								<Terminal size={14} class="text-accent" />
								<span class="font-mono text-[10px] font-bold tracking-[0.18em] text-muted uppercase"
									>bash</span
								>
							</div>

							<span class="font-mono text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
								portfolio.console
							</span>

							<span
								class="badge-live flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
							>
								<span class="size-1.5 animate-pulse rounded-full bg-accent"></span>
								Interactive
							</span>
						</div>

						<div class="flex border-b border-line/70 bg-surface/30 font-mono text-xs">
							{#each tabs as tab (tab)}
								<button
									type="button"
									onclick={() => (activeTab = tab)}
									class={`relative flex items-center gap-2 border-r border-line/70 px-4 py-3 transition ${
										activeTab === tab
											? 'bg-surface-2 font-semibold text-fg'
											: 'text-muted hover:bg-surface hover:text-fg'
									}`}
									aria-pressed={activeTab === tab}
								>
									{#if activeTab === tab}
										<span class="absolute inset-x-0 top-0 h-0.5 bg-accent"></span>
									{/if}

									{#if tab === 'Profile.ts'}
										<UserRound size={13} class={activeTab === tab ? 'text-accent' : 'text-muted'} />
									{:else}
										<Layers3 size={13} class={activeTab === tab ? 'text-accent' : 'text-muted'} />
									{/if}

									{tab}
								</button>
							{/each}
						</div>

						<div
							class="code-panel min-h-62 bg-surface/20 p-5 font-mono text-[12px] leading-7 transition-shadow duration-500 md:p-6 md:text-[13px]"
							class:panel-flash={tabFlash}
						>
							<div
								class="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-muted uppercase"
							>
								<FileCode size={13} class="text-accent" />
								{activeTab}
							</div>

							{#each codeFiles[activeTab] as line, index (index)}
								<div class="flex gap-4">
									<span class="w-4 text-right text-muted/40 select-none">{index + 1}</span>
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									<code class="tracking-wide text-fg/90">{@html line}</code>
								</div>
							{/each}

							<div class="mt-1 flex gap-4">
								<span class="w-4 text-right text-muted/40 select-none">
									{codeFiles[activeTab].length + 1}
								</span>
								<span class="mt-1 h-4 w-1.5 animate-pulse bg-accent"></span>
							</div>
						</div>

						<div class="border-t border-line/70 bg-surface/40 p-4">
							<div class="mb-3 flex items-center justify-between">
								<span
									class="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-muted uppercase"
								>
									<Terminal size={12} class="text-accent" />
									Command line
								</span>

								<button
									type="button"
									class="inline-flex items-center gap-1 text-[10px] text-muted transition hover:text-accent"
									onclick={() => {
										commandInput = 'help';
										runCommand();
									}}
								>
									<HelpCircle size={12} />
									Help
								</button>
							</div>

							<div
								bind:this={terminalScrollEl}
								class="console-scroll mb-3 max-h-40 min-h-20 space-y-1.5 overflow-y-auto pr-1 font-mono text-[11px] leading-5"
								aria-live="polite"
								aria-label="Terminal output"
							>
								{#each terminalHistory as line (line.id)}
									<p
										class:text-accent={line.type === 'system'}
										class:text-muted={line.type === 'muted'}
										class:text-fg={line.type === 'user'}
										class:text-emerald-400={line.type === 'success'}
										class:text-red-400={line.type === 'error'}
									>
										{line.text}
									</p>
								{/each}
							</div>

							<div
								class="command-bar flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs"
							>
								<span class="font-bold text-accent">➜</span>
								<span class="text-sky-400">~</span>

								<label class="sr-only" for="hero-command">Portfolio command</label>
								<input
									id="hero-command"
									type="text"
									bind:value={commandInput}
									onkeydown={handleCommandKeydown}
									class="flex-1 border-0 bg-transparent p-0 text-fg caret-accent outline-none placeholder:text-muted/60"
									placeholder="Type a command and press Enter..."
									spellcheck="false"
									autocomplete="off"
								/>

								<button
									type="button"
									class="run-btn inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-bold tracking-wide uppercase transition"
									aria-label="Run command"
									onclick={runCommand}
								>
									Run <span class="hidden sm:inline">↵</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div
					class="card-glow pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-3xl"
				></div>
			</div>
		</div>
	</div>
</section>

<style>
	.cursor-glow {
		width: var(--glow-size, 70px);
		height: var(--glow-size, 70px);
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--color-accent) 22%, transparent) 0%,
			transparent 70%
		);
	}

	.orb-a {
		width: 520px;
		height: 520px;
		background: var(--color-accent);
		top: -160px;
		right: -120px;
		animation: orb-a 13s ease-in-out infinite;
	}

	.orb-b {
		width: 380px;
		height: 380px;
		background: #7c3aed;
		bottom: -60px;
		left: -100px;
		animation: orb-b 16s ease-in-out infinite;
	}

	.orb-c {
		width: 280px;
		height: 280px;
		background: color-mix(in srgb, var(--color-accent) 55%, #06b6d4);
		top: 42%;
		left: 42%;
		animation: orb-c 11s ease-in-out infinite;
	}

	@keyframes orb-a {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(-70px, 90px) scale(1.15);
		}
	}

	@keyframes orb-b {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(90px, -70px) scale(1.12);
		}
	}

	@keyframes orb-c {
		0%,
		100% {
			transform: translate(0, 0);
		}
		33% {
			transform: translate(50px, -45px);
		}
		66% {
			transform: translate(-45px, 25px);
		}
	}

	.grid-veil {
		background-image:
			linear-gradient(color-mix(in srgb, var(--color-accent) 4%, transparent) 1px, transparent 1px),
			linear-gradient(
				90deg,
				color-mix(in srgb, var(--color-accent) 4%, transparent) 1px,
				transparent 1px
			);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 65% 65% at 50% 45%, black 40%, transparent);
	}

	.grain {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 220px 220px;
	}

	.badge {
		border-color: color-mix(in srgb, var(--color-accent) 35%, transparent);
		background: color-mix(in srgb, var(--color-accent) 7%, transparent);
		color: var(--color-accent);
	}

	.badge-live {
		border-color: color-mix(in srgb, var(--color-accent) 30%, transparent);
		background: color-mix(in srgb, var(--color-accent) 8%, transparent);
		color: var(--color-accent);
	}

	.pulse-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-accent);
		animation: dot-pulse 1.6s ease-in-out infinite;
	}

	@keyframes dot-pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.45;
			transform: scale(0.75);
		}
	}

	.name-grad {
		background: linear-gradient(
			130deg,
			var(--color-fg) 40%,
			color-mix(in srgb, var(--color-accent) 85%, var(--color-fg)) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.sub-word {
		color: var(--color-muted);
		opacity: 0;
		transform: translateY(14px);
		animation: word-in 0.5s ease forwards;
	}

	.sub-accent {
		color: var(--color-accent);
	}

	@keyframes word-in {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.pill {
		display: inline;
		border: 1px solid color-mix(in srgb, var(--color-accent) 28%, transparent);
		border-radius: 5px;
		background: color-mix(in srgb, var(--color-accent) 10%, transparent);
		padding: 0.1em 0.42em;
		font-family: monospace;
		font-size: 0.82em;
		font-weight: 700;
		color: var(--color-accent);
	}

	.btn-primary {
		background: var(--color-accent);
		color: var(--color-ink, #000);
		box-shadow:
			0 0 32px color-mix(in srgb, var(--color-accent) 38%, transparent),
			0 4px 16px color-mix(in srgb, var(--color-accent) 22%, transparent);
		transition:
			box-shadow 0.3s ease,
			filter 0.3s ease;
	}

	.btn-primary:hover {
		filter: brightness(1.1);
		box-shadow:
			0 0 55px color-mix(in srgb, var(--color-accent) 55%, transparent),
			0 8px 28px color-mix(in srgb, var(--color-accent) 35%, transparent);
	}

	.btn-secondary {
		border-color: color-mix(in srgb, var(--color-accent) 28%, var(--color-line, #333));
		background: color-mix(in srgb, var(--color-surface) 55%, transparent);
		color: var(--color-fg);
		backdrop-filter: blur(8px);
	}

	.chip {
		border-color: var(--color-line, #333);
		background: color-mix(in srgb, var(--color-surface) 45%, transparent);
		color: var(--color-muted);
	}

	.chip:hover {
		border-color: color-mix(in srgb, var(--color-accent) 55%, transparent);
		background: color-mix(in srgb, var(--color-accent) 9%, transparent);
		color: var(--color-accent);
	}

	.stats-row {
		border-color: color-mix(in srgb, var(--color-line, #333) 55%, transparent);
	}

	.stat-num {
		color: var(--color-fg);
	}

	.stat-item:hover .stat-num {
		color: var(--color-accent);
		transition: color 0.3s ease;
	}

	.console-scroll {
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--color-accent) 45%, transparent) transparent;
	}
	.console-scroll::-webkit-scrollbar {
		width: 5px;
	}
	.console-scroll::-webkit-scrollbar-thumb {
		background: color-mix(in srgb, var(--color-accent) 40%, transparent);
		border-radius: 999px;
	}

	.console-wrap {
		animation: console-float 8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
	}

	@keyframes console-float {
		0%,
		100% {
			transform: perspective(1400px) rotateX(2.5deg) rotateY(-5deg) translateY(0);
		}
		50% {
			transform: perspective(1400px) rotateX(4.5deg) rotateY(3deg) translateY(-14px);
		}
	}

	.console-card {
		border-color: color-mix(in srgb, var(--color-accent) 28%, var(--color-line, #333));
		background: color-mix(in srgb, var(--color-surface) 70%, transparent);
	}

	.console-body {
		background: color-mix(in srgb, var(--color-surface-2, #111) 82%, transparent);
	}

	.card-glow {
		background: radial-gradient(
			ellipse at center,
			color-mix(in srgb, var(--color-accent) 16%, transparent),
			transparent 70%
		);
	}

	.panel-flash {
		box-shadow:
			inset 0 0 0 1px color-mix(in srgb, var(--color-accent) 55%, transparent),
			0 0 24px color-mix(in srgb, var(--color-accent) 18%, transparent);
		background: color-mix(in srgb, var(--color-accent) 4%, var(--color-surface));
	}

	@media (max-width: 720px), (prefers-reduced-motion: reduce) {
		.console-wrap,
		.orb-a,
		.orb-b,
		.orb-c,
		.pulse-dot {
			animation: none;
		}

		.console-wrap {
			transform: none;
		}

		.sub-word {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.orb-a,
		.orb-b,
		.orb-c {
			display: none;
		}
	}

	/* Editorial visual treatment: preserves the floating console, softens the dashboard feel. */
	.hero-root {
		min-height: clamp(42rem, 78vh, 54rem);
	}

	.cursor-glow {
		opacity: 0.35;
	}

	.grid-veil {
		opacity: 0.28;
	}

	.orb-a,
	.orb-b,
	.orb-c {
		opacity: 0.09;
	}

	.console-wrap {
		animation: console-float 9s ease-in-out infinite;
	}

	@keyframes console-float {
		0%,
		100% {
			transform: translateY(0) rotate(1deg);
		}
		50% {
			transform: translateY(-10px) rotate(-0.5deg);
		}
	}

	.console-card {
		border-radius: 1.5rem;
		border-color: color-mix(in srgb, var(--color-line) 82%, var(--color-accent));
		background: var(--color-surface);
		box-shadow:
			12px 12px 0 color-mix(in srgb, var(--color-accent) 10%, transparent),
			0 18px 48px rgba(0, 0, 0, 0.16);
	}

	.console-body {
		border-radius: calc(1.5rem - 1px);
		background: color-mix(in srgb, var(--color-surface) 96%, var(--color-bg));
	}

	.card-glow {
		opacity: 0.35;
	}

	.badge,
	.badge-live {
		border-radius: 999px;
	}

	.stats-row {
		border-color: var(--color-line);
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor-glow,
		.grid-veil {
			display: none;
		}
	}
</style>
