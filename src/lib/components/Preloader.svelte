<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);

	onMount(() => {
		const timer = window.setTimeout(() => {
			visible = false;
		}, 720);

		return () => window.clearTimeout(timer);
	});
</script>

{#if visible}
	<div
		class="preloader fixed inset-0 z-80 grid place-items-center bg-bg"
		aria-live="polite"
		aria-label="Loading portfolio"
	>
		<div class="text-center">
			<div
				class="border-accent/40 bg-accent/10 text-accent mx-auto grid size-16 place-items-center rounded-2xl border"
			>
				TN
			</div>
			<p class="text-accent mt-4 font-display text-sm font-semibold tracking-[0.24em] uppercase">
				Loading Portfolio
			</p>
		</div>
	</div>
{/if}

<style>
	.preloader {
		animation: loaderOut 720ms ease 520ms both;
	}

	.preloader > div {
		animation: loaderPulse 900ms ease-in-out infinite alternate;
	}

	@keyframes loaderPulse {
		to {
			transform: translateY(-4px) scale(1.02);
		}
	}

	@keyframes loaderOut {
		to {
			opacity: 0;
			visibility: hidden;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.preloader,
		.preloader > div {
			animation: none;
		}
	}
</style>
