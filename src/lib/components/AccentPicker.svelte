<script lang="ts">
	import { accent } from '$lib/stores/theme';

	const accents = ['#38bdf8', '#60a5fa', '#22d3ee', '#fb7185', '#a78bfa'];

	// reactive rune
	$effect(() => {
		const value = $accent;

		if (typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--color-accent', value);
		}
	});
</script>

<div class="flex items-center gap-2" aria-label="Choose accent color">
	{#each accents as color (color)}
		<button
			aria-label={`Use ${color} accent`}
			class="size-6 rounded-full border border-line transition-all hover:scale-110 active:scale-95"
			class:ring-2={$accent === color}
			style="background: {color}; --ring-color: {color};"
			class:ring-[var(--ring-color)]={$accent === color}
			onclick={() => accent.set(color)}
		></button>
	{/each}
</div>
