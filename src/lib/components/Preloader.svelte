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
		class="fixed inset-0 z-80 grid place-items-center bg-bg"
		aria-live="polite"
		aria-label="Loading portfolio"
		aria-hidden="true"
	>
		<div
			class="motion-safe:animate-loader-pulse text-center motion-reduce:animate-none"
			aria-hidden="true"
		>
			<div
				class="mx-auto grid size-16 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent"
			>
				TN
			</div>
			<p class="mt-4 font-display text-sm font-semibold tracking-[0.24em] text-accent uppercase">
				Loading Portfolio
			</p>
		</div>
	</div>
{/if}
