<script lang="ts">
	import '../app.css';
	import CursorField from '$lib/components/CursorField.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Preloader from '$lib/components/Preloader.svelte';

	let { children } = $props();
</script>

<Preloader />
<CursorField />
<Nav />

<main id="main" class="page-shell min-h-screen">
	{@render children()}
</main>

<footer
	class="mx-auto flex w-[min(100%-3rem,88rem)] flex-col gap-4 border-t border-line py-8 text-sm text-muted md:flex-row md:items-center md:justify-between"
>
	<p>© {new Date().getFullYear()} Racheal Ogunmodede · TechNurse</p>
	<p>Frontend developer building thoughtful, accessible digital products.</p>
</footer>
