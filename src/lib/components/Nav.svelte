<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import { resolve } from '$app/paths';
</script>

<header
  class="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--color-bg)_70%,transparent)] border-b border-white/5"
>
  <nav class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
    <a href={resolve('/')} class="font-bold tracking-tight">
      your.name<span class="text-accent">.</span>
    </a>

    <div class="flex items-center gap-6 text-sm">
      <a href={resolve('/projects')}>Projects</a>
      <a href={resolve('/about')}>About</a>
      <a href={resolve('/contact')}>Contact</a>

      <kbd class="hidden md:inline px-2 py-1 rounded border border-white/15 text-xs">
        ⌘K
      </kbd>

      <ThemeToggle />
    </div>
  </nav>
</header>