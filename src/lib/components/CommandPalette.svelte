<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base, resolve } from '$app/paths';
	import { fade, scale } from 'svelte/transition';

	let open = $state(false);
	let q = $state('');

	const items = [
		{ label: 'Home', run: () => goto(resolve('/')) },
		{ label: 'Projects', run: () => goto(resolve('/projects')) },
		{ label: 'About', run: () => goto(resolve('/about')) },
		{ label: 'Contact', run: () => goto(resolve('/contact')) },
		{
			label: 'Download CV',
			run: () => {
				window.location.href = `${base}/resume.pdf`;
			}
		}
	];

	let filtered = $derived(items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())));

	function handleBackdropKey(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') open = false;
	}

	onMount(() => {
		const h = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				open = !open;
			}
			if (e.key === 'Escape') open = false;
		};
		window.addEventListener('keydown', h);
		return () => window.removeEventListener('keydown', h);
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 grid place-items-start bg-[#020817]/78 px-4 pt-28 backdrop-blur-sm"
		transition:fade={{ duration: 150 }}
		role="presentation"
		tabindex="-1"
		onclick={() => (open = false)}
		onkeydown={handleBackdropKey}
	>
		<div
			class="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_28px_90px_rgba(0,0,0,0.42)]"
			transition:scale={{ duration: 180, start: 0.96 }}
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
			tabindex="0"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<input
				bind:value={q}
				placeholder="Type a command..."
				class="w-full border-b border-line bg-transparent px-4 py-4 text-fg outline-none placeholder:text-muted"
			/>
			<ul class="p-2">
				{#each filtered as it (it.label)}
					<li>
						<button
							class="w-full rounded-lg px-4 py-3 text-left text-sm transition hover:bg-accent/10 hover:text-accent"
							onclick={() => {
								open = false;
								it.run();
							}}
						>
							{it.label}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
