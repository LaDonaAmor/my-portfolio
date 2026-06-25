<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';
</script>

<button
	aria-label="Toggle theme"
	class="hover:border-accent/50 grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-muted transition hover:text-fg"
	onclick={() => theme.update((t) => (t === 'dark' ? 'light' : 'dark'))}
>
	{#if $theme === 'dark'}
		<Sun size="17" />
	{:else}
		<Moon size="17" />
	{/if}
</button>
