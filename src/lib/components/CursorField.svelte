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
	class:opacity-100={active}
	class="pointer-events-none fixed inset-0 z-30 opacity-0 mix-blend-screen transition-opacity duration-180 [background:radial-gradient(260px_circle_at_var(--cursor-x,-20rem)_var(--cursor-y,-20rem),color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_66%),radial-gradient(72px_circle_at_var(--cursor-x,-20rem)_var(--cursor-y,-20rem),color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_62%)] motion-reduce:hidden max-[0px]:hidden"
	aria-hidden="true"
></div>

<div
	class:opacity-100={active}
	class="pointer-events-none fixed top-[calc(var(--cursor-y,-20rem)-9px)] left-[calc(var(--cursor-x,-20rem)-9px)] z-30 size-4.5 transform-[translateZ(0)] rounded-full border border-accent/70 opacity-0 [box-shadow:0_0_22px_color-mix(in_oklab,var(--color-accent)_70%,transparent)] transition-opacity duration-180 motion-reduce:hidden"
	aria-hidden="true"
></div>
