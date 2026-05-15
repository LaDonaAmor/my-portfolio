<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		ArrowRight,
		Code2,
		Download,
		Mail,
		ShieldCheck,
		Sparkles,
		Activity
	} from 'lucide-svelte';
	import { base } from '$app/paths';
	import Particles from './Particles.svelte';

	const socials = [
		{ label: 'GitHub', href: 'https://github.com/LaDonaAmor', icon: Code2 },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/rachealogunmodede/', icon: ArrowRight },
		{ label: 'Email', href: 'mailto:rachealogunmodede6@gmail.com', icon: Mail }
	];

	// ── Cursor glow ──────────────────────────────────────────────────
	let cursorX = -300;
	let cursorY = -300;
	let ctaHovered = false;

	// ── Name scramble ────────────────────────────────────────────────
	const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
	const FINAL_NAME = "Hi, I'm Racheal,";
	let nameEl: HTMLElement | null = null;

	function scramble(el: HTMLElement, text: string, ms = 900) {
		const frames = Math.ceil(ms / 16);
		let f = 0;
		const tick = () => {
			el.textContent = text
				.split('')
				.map((ch, i) => {
					if (ch === ' ' || ch === ',') return ch;
					if (f / frames > i / text.length) return ch;
					return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
				})
				.join('');
			if (++f < frames) requestAnimationFrame(tick);
			else el.textContent = text;
		};
		requestAnimationFrame(tick);
	}

	// ── Subtitle words ───────────────────────────────────────────────
	const subtitleWords: { w: string; accent: boolean }[] = [
		{ w: 'building', accent: false },
		{ w: 'fast,', accent: true },
		{ w: 'accessible,', accent: false },
		{ w: '&', accent: false },
		{ w: 'beautiful', accent: true },
		{ w: 'web', accent: false },
		{ w: 'experiences.', accent: false }
	];

	// ── Stats count-up ───────────────────────────────────────────────
	const STAT_TARGETS = [3, 100, 98];
	const STAT_SUFFIXES = ['+', '%', ''];
	const STAT_LABELS = ['Featured Builds', 'Responsive', 'A11y Score'];
	let statVals = [0, 0, 0];
	let statsStarted = false;

	function easeOut(t: number) {
		return 1 - Math.pow(1 - t, 3);
	}

	function countUp(i: number, target: number, dur = 1400) {
		const t0 = performance.now();
		const tick = (now: number) => {
			const p = Math.min((now - t0) / dur, 1);
			statVals[i] = Math.round(easeOut(p) * target);
			statVals = [...statVals];
			if (p < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}

	// ── Console live metrics ─────────────────────────────────────────
	let renderPct = 82;
	let cachePct = 67;
	let metricsTimer: ReturnType<typeof setInterval>;

	// ── Magnetic buttons ─────────────────────────────────────────────
	function onMagnetMove(e: MouseEvent) {
		const btn = e.currentTarget as HTMLElement;
		const r = btn.getBoundingClientRect();
		btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
	}
	function onMagnetLeave(e: MouseEvent) {
		const btn = e.currentTarget as HTMLElement;
		btn.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
		btn.style.transform = '';
		setTimeout(() => (btn.style.transition = ''), 450);
	}

	let statsRowEl: HTMLElement | null = null;
	let statsObs: IntersectionObserver;

	onMount(() => {
		// Scramble name after short delay
		setTimeout(() => nameEl && scramble(nameEl, FINAL_NAME), 350);

		// Staggered entrance for hero lines
		document.querySelectorAll<HTMLElement>('.hl').forEach((el, i) => {
			Object.assign(el.style, { opacity: '0', transform: 'translateY(22px)' });
			setTimeout(
				() => {
					el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
					el.style.opacity = '1';
					el.style.transform = 'translateY(0)';
				},
				80 + i * 90
			);
		});

		// Live metrics pulse
		metricsTimer = setInterval(() => {
			renderPct = 62 + Math.floor(Math.random() * 32);
			cachePct = 50 + Math.floor(Math.random() * 38);
		}, 2400);

		// Count-up stats when visible
		if (statsRowEl) {
			statsObs = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && !statsStarted) {
						statsStarted = true;
						STAT_TARGETS.forEach((t, i) => countUp(i, t, 1500));
					}
				},
				{ threshold: 0.6 }
			);
			statsObs.observe(statsRowEl);
		}
	});

	onDestroy(() => {
		clearInterval(metricsTimer);
		statsObs?.disconnect();
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<section
	class="hero-root relative isolate flex min-h-[95vh] items-center overflow-hidden px-6 pt-16 pb-20 md:px-14 md:pt-20 md:pb-28"
	on:mousemove={(e) => {
		cursorX = e.clientX;
		cursorY = e.clientY;
	}}
	role="region"
	aria-label="Hero section"
>
	<!-- ── Cursor glow ───────────────────────────────────────── -->
	<div
		class="cursor-glow pointer-events-none fixed -z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
		style="left:{cursorX}px;top:{cursorY}px;--sz:{ctaHovered ? '140px' : '70px'}"
	></div>

	<!-- ── Ambient orbs ──────────────────────────────────────── -->
	<div class="orb orb-a pointer-events-none absolute -z-10"></div>
	<div class="orb orb-b pointer-events-none absolute -z-10"></div>
	<div class="orb orb-c pointer-events-none absolute -z-10"></div>

	<!-- ── Subtle grid ───────────────────────────────────────── -->
	<div class="grid-veil pointer-events-none absolute inset-0 -z-10"></div>

	<!-- ── Grain overlay ─────────────────────────────────────── -->
	<div class="grain pointer-events-none absolute inset-0 -z-10"></div>

	<Particles className="absolute inset-0 -z-10 pointer-events-none" refresh={true} />

	<!-- ════════════════════════════════════════════════════════ -->
	<div class="relative z-10 mx-auto w-full max-w-7xl">
		<div class="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
			<!-- ── LEFT: Content ─────────────────────────────── -->
			<div class="flex flex-col items-start">
				<!-- Role badge -->
				<div class="hl mb-5">
					<span
						class="badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] uppercase"
					>
						<span class="pulse-dot" aria-hidden="true"></span>
						<ShieldCheck size={12} strokeWidth={2.5} />
						TechNurse &mdash; Frontend Developer
					</span>
				</div>

				<!-- Name (scramble reveal) -->
				<h1
					class="hl font-display text-5xl leading-[1.02] font-black tracking-tight md:text-[4.5rem]"
				>
					<span class="name-grad" bind:this={nameEl}>{FINAL_NAME}</span>
				</h1>

				<!-- Animated subtitle -->
				<div class="hl mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
					{#each subtitleWords as { w, accent }, i}
						<span
							class="sub-word font-display text-xl font-bold md:text-2xl"
							class:sub-accent={accent}
							style="animation-delay:{0.55 + i * 0.09}s">{w}</span
						>
					{/each}
				</div>

				<!-- Description -->
				<p class="hl mt-5 max-w-[480px] text-sm leading-relaxed text-muted md:text-base">
					I work with
					<span class="pill">React</span>,
					<span class="pill">TypeScript</span>,
					<span class="pill">Tailwind</span>, and
					<span class="pill">SvelteKit</span>
					to craft interfaces that feel as good as they look — smooth interactions, thoughtful animations,
					and pixel-perfect details.
				</p>

				<!-- CTA row -->
				<div class="hl mt-8 flex flex-col gap-3 sm:flex-row">
					<a
						href="{base}/projects"
						class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold tracking-wide"
						on:mousemove={onMagnetMove}
						on:mouseleave={onMagnetLeave}
						on:mouseenter={() => (ctaHovered = true)}
						on:mouseleave={() => (ctaHovered = false)}
					>
						Explore Projects
						<ArrowRight
							size={15}
							strokeWidth={2.5}
							class="transition-transform duration-300 group-hover:translate-x-1"
						/>
					</a>
					<a
						href="{base}/resume.pdf"
						class="btn-secondary group inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-bold tracking-wide"
						on:mousemove={onMagnetMove}
						on:mouseleave={onMagnetLeave}
					>
						<Download
							size={15}
							class="transition-transform duration-300 group-hover:-translate-y-0.5"
						/>
						Download Resume
					</a>
				</div>

				<!-- Social chips -->
				<div class="hl mt-6 flex flex-wrap gap-2" aria-label="Professional profiles">
					{#each socials as s}
						<a
							href={s.href}
							rel="noopener noreferrer"
							target="_blank"
							class="chip inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-200"
						>
							<svelte:component this={s.icon} size={12} />
							{s.label}
						</a>
					{/each}
				</div>

				<!-- Stats -->
				<dl
					bind:this={statsRowEl}
					class="hl stats-row mt-10 grid w-full max-w-md grid-cols-3 gap-5 border-t pt-8"
				>
					{#each statVals as val, i}
						<div class="stat-item">
							<dt class="stat-num font-display text-3xl font-black tabular-nums md:text-4xl">
								{val}{STAT_SUFFIXES[i]}
							</dt>
							<dd class="mt-1 text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
								{STAT_LABELS[i]}
							</dd>
						</div>
					{/each}
				</dl>
			</div>

			<!-- ── RIGHT: Console card ───────────────────────── -->
			<div class="hl console-wrap relative">
				<div class="console-card rounded-2xl border p-px">
					<div class="console-body rounded-[14px] p-5 md:p-6">
						<!-- Titlebar -->
						<div class="mb-5 flex items-center justify-between">
							<div class="flex gap-1.5" aria-hidden="true">
								<div
									class="h-3 w-3 rounded-full bg-red-500/75 transition-all hover:bg-red-400"
								></div>
								<div
									class="h-3 w-3 rounded-full bg-yellow-500/75 transition-all hover:bg-yellow-400"
								></div>
								<div
									class="h-3 w-3 rounded-full bg-emerald-500/75 transition-all hover:bg-emerald-400"
								></div>
							</div>
							<span class="font-mono text-[10px] font-bold tracking-[0.22em] text-accent uppercase">
								portfolio.os — v1.0
							</span>
							<div class="flex items-center gap-1.5">
								<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
								<span class="font-mono text-[10px] text-emerald-400 uppercase">Live</span>
							</div>
						</div>

						<!-- Engine block -->
						<div class="c-block mb-4 rounded-xl p-4">
							<div class="flex items-start justify-between">
								<div>
									<span class="c-label">Current Engine</span>
									<p class="mt-2 text-base leading-snug font-bold text-fg md:text-lg">
										Immersive Svelte<br />Product Framework
									</p>
								</div>
								<Sparkles size={17} class="flex-shrink-0 text-accent" />
							</div>
						</div>

						<!-- Stack row -->
						<div class="mb-4 grid grid-cols-2 gap-3">
							<div class="c-block rounded-xl p-3.5">
								<span class="c-label">Core Stack</span>
								<p class="mt-1.5 font-mono text-sm font-bold text-fg">SvelteKit + TS</p>
							</div>
							<div class="c-block rounded-xl p-3.5">
								<span class="c-label">Styling</span>
								<p class="mt-1.5 font-mono text-sm font-bold text-fg">Tailwind v4</p>
							</div>
						</div>

						<!-- Live metrics -->
						<div class="c-block rounded-xl p-4">
							<div class="mb-3.5 flex items-center justify-between">
								<span class="c-label flex items-center gap-1.5">
									<Activity size={11} aria-hidden="true" />
									System Metrics
								</span>
								<span class="font-mono text-[10px] text-emerald-400 uppercase">● Nominal</span>
							</div>

							<div class="space-y-3.5">
								<div>
									<div class="mb-1.5 flex justify-between font-mono text-[11px]">
										<span class="text-muted uppercase">Render Engine</span>
										<span class="font-semibold text-fg">{renderPct}%</span>
									</div>
									<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface">
										<div
											class="metric-a h-full rounded-full transition-all duration-700 ease-out"
											style="width:{renderPct}%"
										></div>
									</div>
								</div>
								<div>
									<div class="mb-1.5 flex justify-between font-mono text-[11px]">
										<span class="text-muted uppercase">Component Cache</span>
										<span class="font-semibold text-fg">{cachePct}%</span>
									</div>
									<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface">
										<div
											class="metric-b h-full rounded-full transition-all duration-700 ease-out"
											style="width:{cachePct}%"
										></div>
									</div>
								</div>
							</div>
						</div>

						<!-- Skill tags -->
						<div class="mt-4 flex flex-wrap gap-2">
							{#each ['React', 'TypeScript', 'SvelteKit', 'Tailwind', 'A11y', 'Motion'] as sk}
								<span class="s-tag font-mono text-[11px]">{sk}</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- Card ambient glow -->
				<div
					class="card-glow pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-3xl"
				></div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Cursor glow ─────────────────────────────────────────────── */
	.cursor-glow {
		width: var(--sz, 70px);
		height: var(--sz, 70px);
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--color-accent) 22%, transparent) 0%,
			transparent 70%
		);
		transition:
			width 0.3s ease,
			height 0.3s ease;
		pointer-events: none;
	}

	/* ── Ambient orbs ────────────────────────────────────────────── */
	.orb {
		border-radius: 50%;
		filter: blur(90px);
		opacity: 0.16;
	}
	.orb-a {
		width: 520px;
		height: 520px;
		background: var(--color-accent);
		top: -160px;
		right: -120px;
		animation: orbA 13s ease-in-out infinite;
	}
	.orb-b {
		width: 380px;
		height: 380px;
		background: #7c3aed;
		bottom: -60px;
		left: -100px;
		animation: orbB 16s ease-in-out infinite;
	}
	.orb-c {
		width: 280px;
		height: 280px;
		background: color-mix(in srgb, var(--color-accent) 55%, #06b6d4);
		top: 42%;
		left: 42%;
		animation: orbC 11s ease-in-out infinite;
	}
	@keyframes orbA {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(-70px, 90px) scale(1.15);
		}
	}
	@keyframes orbB {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(90px, -70px) scale(1.12);
		}
	}
	@keyframes orbC {
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
	@media (prefers-reduced-motion: reduce) {
		.orb {
			animation: none;
		}
	}

	/* ── Grid veil ───────────────────────────────────────────────── */
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

	/* ── Grain ───────────────────────────────────────────────────── */
	.grain {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 220px 220px;
		opacity: 0.03;
	}

	/* ── Role badge ──────────────────────────────────────────────── */
	.badge {
		border: 1px solid color-mix(in srgb, var(--color-accent) 35%, transparent);
		background: color-mix(in srgb, var(--color-accent) 7%, transparent);
		color: var(--color-accent);
		backdrop-filter: blur(8px);
	}
	.pulse-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-accent);
		animation: dotPulse 1.6s ease-in-out infinite;
	}
	@keyframes dotPulse {
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

	/* ── Name gradient ───────────────────────────────────────────── */
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

	/* ── Subtitle words ──────────────────────────────────────────── */
	.sub-word {
		color: var(--color-muted);
		opacity: 0;
		transform: translateY(14px);
		animation: wordIn 0.5s ease forwards;
	}
	.sub-accent {
		color: var(--color-accent);
	}
	@keyframes wordIn {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.sub-word {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}

	/* ── Inline tech pills ───────────────────────────────────────── */
	.pill {
		display: inline;
		font-family: monospace;
		font-size: 0.82em;
		font-weight: 700;
		color: var(--color-accent);
		background: color-mix(in srgb, var(--color-accent) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-accent) 28%, transparent);
		padding: 0.1em 0.42em;
		border-radius: 5px;
	}

	/* ── Buttons ─────────────────────────────────────────────────── */
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
		color: var(--color-fg);
		background: color-mix(in srgb, var(--color-surface) 55%, transparent);
		backdrop-filter: blur(8px);
		transition:
			border-color 0.25s,
			background 0.25s;
	}
	.btn-secondary:hover {
		border-color: var(--color-accent);
		background: color-mix(in srgb, var(--color-accent) 9%, var(--color-surface));
	}

	/* ── Social chips ────────────────────────────────────────────── */
	.chip {
		border-color: var(--color-line, #333);
		color: var(--color-muted);
		background: color-mix(in srgb, var(--color-surface) 45%, transparent);
	}
	.chip:hover {
		border-color: color-mix(in srgb, var(--color-accent) 55%, transparent);
		color: var(--color-accent);
		background: color-mix(in srgb, var(--color-accent) 9%, transparent);
		transform: translateY(-2px);
	}

	/* ── Stats ───────────────────────────────────────────────────── */
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

	/* ── Console card ────────────────────────────────────────────── */
	.console-wrap {
		animation: consoleFloat 8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
	}
	@keyframes consoleFloat {
		0%,
		100% {
			transform: perspective(1400px) rotateX(2.5deg) rotateY(-5deg) translateY(0);
		}
		50% {
			transform: perspective(1400px) rotateX(4.5deg) rotateY(3deg) translateY(-14px);
		}
	}
	@media (max-width: 720px), (prefers-reduced-motion: reduce) {
		.console-wrap {
			animation: none;
			transform: none;
		}
		.orb {
			display: none;
		}
	}

	.console-card {
		border-color: color-mix(in srgb, var(--color-accent) 28%, var(--color-line, #333));
		background: color-mix(in srgb, var(--color-surface) 70%, transparent);
	}
	.console-body {
		background: color-mix(in srgb, var(--color-surface-2, #111) 82%, transparent);
		backdrop-filter: blur(16px);
	}
	.c-block {
		background: color-mix(in srgb, var(--color-surface) 55%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-line, #333) 70%, transparent);
	}
	.c-label {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 10px;
		font-family: monospace;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	/* Live metric bars */
	.metric-a {
		background: var(--color-accent);
	}
	.metric-b {
		background: color-mix(in srgb, var(--color-accent) 55%, #a78bfa);
	}

	/* Skill tags */
	.s-tag {
		padding: 3px 10px;
		border-radius: 6px;
		border: 1px solid color-mix(in srgb, var(--color-accent) 25%, var(--color-line, #333));
		background: color-mix(in srgb, var(--color-accent) 8%, transparent);
		color: var(--color-accent);
	}

	/* Card glow */
	.card-glow {
		background: radial-gradient(
			ellipse at center,
			color-mix(in srgb, var(--color-accent) 16%, transparent),
			transparent 70%
		);
	}
</style>
