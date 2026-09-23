<script lang="ts">
	import { Check, Palette } from 'lucide-svelte';
	import { accent } from '$lib/stores/theme';

	let open = $state(false);

	const accents = [
		{ name: 'Sky', value: '#38bdf8' },
		{ name: 'Lime', value: '#a3e635' },
		{ name: 'Coral', value: '#fb7185' },
		{ name: 'Violet', value: '#a78bfa' }
	];

	function chooseAccent(value: string) {
		accent.set(value);
		open = false;
	}
</script>

<div class="relative">
	<button
		type="button"
		class="flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm text-muted transition hover:border-accent/50 hover:text-fg"
		aria-expanded={open}
		aria-haspopup="dialog"
		aria-label="Open appearance settings"
		onclick={() => (open = !open)}
	>
		<Palette size={16} />
		<span class="hidden lg:inline">Appearance</span>
	</button>

	{#if open}
		<div
			class="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-line bg-surface p-4 shadow-[0_18px_50px_rgba(2,8,23,0.28)]"
			role="dialog"
			aria-label="Appearance settings"
		>
			<p class="font-display text-sm font-semibold text-fg">Accent color</p>
			<p class="mt-1 text-xs leading-5 text-muted">Choose an interface accent.</p>

			<div class="mt-4 grid grid-cols-2 gap-2">
				{#each accents as color (color.value)}
					<button
						type="button"
						aria-label={`Use ${color.name} accent`}
						aria-pressed={$accent === color.value}
						class="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition
						{$accent === color.value
							? 'border-accent bg-accent/10 text-fg'
							: 'border-line text-muted hover:border-accent/50 hover:text-fg'}"
						onclick={() => chooseAccent(color.value)}
					>
						<span
							class="grid size-5 place-items-center rounded-full"
							style={`background: ${color.value};`}
							aria-hidden="true"
						>
							{#if $accent === color.value}
								<Check size={12} class="text-black" strokeWidth={3} />
							{/if}
						</span>

						{color.name}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
