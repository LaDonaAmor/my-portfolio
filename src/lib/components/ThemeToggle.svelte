<script lang="ts">
	import { Check, ChevronDown, Monitor, Moon, Sun } from 'lucide-svelte';
	import { theme, type ThemePreference } from '$lib/stores/theme';

	let open = $state(false);

	const options: {
		value: ThemePreference;
		label: string;
		icon: typeof Monitor;
	}[] = [
		{ value: 'system', label: 'System', icon: Monitor },
		{ value: 'light', label: 'Light', icon: Sun },
		{ value: 'dark', label: 'Dark', icon: Moon }
	];

	const currentLabel = $derived(
		options.find((option) => option.value === $theme)?.label ?? 'System'
	);

	function selectTheme(value: ThemePreference) {
		theme.set(value);
		open = false;
	}
</script>

<div class="relative">
	<button
		type="button"
		class="flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-sm text-muted transition hover:border-accent/50 hover:text-fg"
		aria-label={`Theme: ${currentLabel}. Activate to change.`}
		aria-expanded={open}
		aria-haspopup="menu"
		onclick={() => (open = !open)}
	>
		{#if $theme === 'light'}
			<Sun size={16} />
		{:else if $theme === 'dark'}
			<Moon size={16} />
		{:else}
			<Monitor size={16} />
		{/if}

		<span class="hidden sm:inline">{currentLabel}</span>
		<ChevronDown size={14} />
	</button>

	{#if open}
		<div
			class="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-line bg-surface p-1.5 shadow-[0_18px_50px_rgba(2,8,23,0.28)]"
			role="menu"
			aria-label="Choose theme"
		>
			{#each options as option (option.value)}
				<button
					type="button"
					role="menuitemradio"
					aria-checked={$theme === option.value}
					class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-surface-2
        {$theme === option.value ? 'text-accent' : 'text-muted hover:text-fg'}"
					onclick={() => selectTheme(option.value)}
				>
					<span class="flex items-center gap-2">
						<option.icon size={15} />
						{option.label}
					</span>

					{#if $theme === option.value}
						<Check size={15} aria-label="Selected" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
