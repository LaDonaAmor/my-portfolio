<script lang="ts">
	import { onMount } from 'svelte';

	let active = $state(false);

	onMount(() => {
		let frame = 0;
		let x = -400;
		let y = -400;
		let targetX = x;
		let targetY = y;

		const render = () => {
			x += (targetX - x) * 0.18;
			y += (targetY - y) * 0.18;
			document.documentElement.style.setProperty('--cursor-x', `${x}px`);
			document.documentElement.style.setProperty('--cursor-y', `${y}px`);
			frame = requestAnimationFrame(render);
		};

		const update = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			targetX = event.clientX;
			targetY = event.clientY;
			active = true;
		};

		const leave = () => {
			active = false;
		};

		frame = requestAnimationFrame(render);
		window.addEventListener('pointermove', update, { passive: true });
		window.addEventListener('pointerleave', leave);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('pointermove', update);
			window.removeEventListener('pointerleave', leave);
		};
	});
</script>

<div
	class:active
	class="cursor-field pointer-events-none fixed inset-0 z-30"
	aria-hidden="true"
></div>
<div
	class:active
	class="cursor-dot border-accent/70 pointer-events-none fixed z-30 rounded-full border"
	aria-hidden="true"
></div>

<style>
	.cursor-field {
		opacity: 0;
		background:
			radial-gradient(
				260px circle at var(--cursor-x, -20rem) var(--cursor-y, -20rem),
				color-mix(in oklab, var(--color-accent) 16%, transparent),
				transparent 66%
			),
			radial-gradient(
				72px circle at var(--cursor-x, -20rem) var(--cursor-y, -20rem),
				color-mix(in oklab, var(--color-accent) 14%, transparent),
				transparent 62%
			);
		mix-blend-mode: screen;
		transition: opacity 180ms ease;
	}

	.cursor-dot {
		left: calc(var(--cursor-x, -20rem) - 9px);
		top: calc(var(--cursor-y, -20rem) - 9px);
		width: 18px;
		height: 18px;
		opacity: 0;
		transform: translateZ(0);
		box-shadow: 0 0 22px color-mix(in oklab, var(--color-accent) 70%, transparent);
		transition:
			opacity 180ms ease,
			width 180ms ease,
			height 180ms ease;
	}

	.active {
		opacity: 1;
	}

	@media (pointer: coarse), (prefers-reduced-motion: reduce) {
		.cursor-field,
		.cursor-dot {
			display: none;
		}
	}
</style>
