<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { resolve } from '$app/paths';
	import AccentPicker from './AccentPicker.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { page } from '$app/state';

	let mobileMenuOpen = $state(false);

	const links = [
		{ href: resolve('/projects'), label: 'Projects' },
		{ href: resolve('/about'), label: 'About' },
		{ href: resolve('/contact'), label: 'Contact' }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<header class="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-xl">
	<nav class="mx-auto flex w-[min(100%-2rem,88rem)] items-center justify-between py-3">
		<a
			href={resolve('/')}
			class="flex items-center gap-3"
			aria-label="TechNurse home"
			onclick={closeMobileMenu}
		>
			<span
				class="grid size-10 place-items-center rounded-2xl bg-accent font-display text-lg text-ink"
				aria-hidden="true"
			>
				TN
			</span>

			<span>
				<span class="block font-display text-xl text-fg">TechNurse</span>
				<span class="block font-mono text-[10px] tracking-widest text-muted uppercase">
					Racheal Ogunmodede
				</span>
			</span>
		</a>

		<div class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					class="relative rounded-full px-4 py-2 text-sm font-medium transition
			{page.url.pathname === link.href
						? 'bg-accent/10 text-accent'
						: 'text-muted hover:bg-surface-2 hover:text-fg'}"
					href={link.href}
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
				>
					{link.label}
					{#if page.url.pathname === link.href}
						<span class="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"></span>
					{/if}
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-2">
			<div class="hidden lg:block">
				<AccentPicker />
			</div>

			<ThemeToggle />

			<button
				type="button"
				class="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-accent/50 hover:text-fg md:hidden"
				aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-navigation"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				{#if mobileMenuOpen}
					<X size={18} />
				{:else}
					<Menu size={18} />
				{/if}
			</button>
		</div>
	</nav>

	{#if mobileMenuOpen}
		<div
			id="mobile-navigation"
			class="border-t border-line bg-bg/96 px-4 py-4 shadow-[0_24px_70px_rgba(2,8,23,0.36)] md:hidden"
		>
			<div class="mx-auto grid w-[min(100%,36rem)] gap-2">
				{#each links as link (link.href)}
					<a
						class="rounded-xl border px-4 py-3 font-medium transition
						{page.url.pathname === link.href
							? 'border-accent/50 bg-accent/10 text-accent'
							: 'border-line bg-surface/70 text-fg'}"
						href={link.href}
						aria-current={page.url.pathname === link.href ? 'page' : undefined}
						onclick={closeMobileMenu}
					>
						{link.label}
					</a>
				{/each}

				<div
					class="flex items-center justify-between rounded-xl border border-line bg-surface/70 px-4 py-3"
				>
					<span class="text-sm text-muted">Appearance</span>
					<AccentPicker />
				</div>
			</div>
		</div>
	{/if}
</header>
