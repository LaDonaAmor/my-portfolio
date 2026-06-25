<script lang="ts">
	import '../app.css';
	import CursorField from '$lib/components/CursorField.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import Preloader from '$lib/components/Preloader.svelte';

	let { children } = $props();
</script>

<Preloader />
<CursorField />
<Nav />
<CommandPalette />

<main id="main" class="page-shell mx-auto min-h-screen max-w-6xl px-5 pt-24 md:px-6">
	{@render children()}
</main>

<footer
	class="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 font-display text-sm text-muted md:flex-row md:items-center md:justify-between md:px-6"
>
	<p>(c) {new Date().getFullYear()} TechNurse. Built with SvelteKit.</p>
	<p class="text-fg">Available for focused frontend and product UI work.</p>
</footer>
