<script lang="ts">
  import { Menu, X } from 'lucide-svelte';
  import { resolve } from '$app/paths';
  import AccentPicker from './AccentPicker.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  let open = $state(false);

  const links = [
    { href: resolve('/projects'), label: 'Projects' },
    { href: resolve('/about'), label: 'About' },
    { href: resolve('/contact'), label: 'Contact' }
  ];

  function closeMenu() {
    open = false;
  }
</script>

<header
  class="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/82 shadow-[0_12px_40px_rgba(2,8,23,0.22)] backdrop-blur-xl"
>
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
    <a href={resolve('/')} class="flex items-center gap-3 font-semibold tracking-tight" onclick={closeMenu}>
      <span
        class="grid size-9 place-items-center rounded-lg font-display border border-accent/30 bg-accent/12 text-sm text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
        aria-hidden="true"
      >
        TN
      </span>
      <span class="font-display text-2xl">TechNurse</span>
    </a>

    <div class="hidden items-center gap-4 text-sm text-muted md:flex">
      {#each links as link (link.href)}
        <a class="rounded-md px-3 py-2 transition hover:bg-white/7 hover:text-fg" href={link.href}>{link.label}</a>
      {/each}

      <kbd class="rounded-md border  border-line bg-surface-2 px-2 py-1 text-xs text-muted">Ctrl K</kbd>
      <AccentPicker />
      <ThemeToggle />
    </div>

    <div class="flex items-center cursor-pointer gap-2 md:hidden">
      <ThemeToggle />
      <button
        class="grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-muted transition hover:border-accent/50 hover:text-fg cursor-pointer"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onclick={() => (open = !open)}
      >
        {#if open}
          <X size="18" />
        {:else}
          <Menu size="18" />
        {/if}
      </button>
    </div>
  </nav>

  {#if open}
    <div id="mobile-navigation" class="border-t border-line bg-bg/96 px-5 py-4 shadow-[0_24px_70px_rgba(2,8,23,0.36)] md:hidden">
      <div class="mx-auto grid max-w-6xl gap-2">
        {#each links as link (link.href)}
          <a
            class="rounded-lg border border-line bg-surface/70 px-4 py-3 font-medium text-fg"
            href={link.href}
            onclick={closeMenu}
          >
            {link.label}
          </a>
        {/each}
        <div class="rounded-lg border border-line bg-surface/70 px-4 py-3">
          <p class="mb-2 text-sm text-muted">Accent</p>
          <AccentPicker />
        </div>
        <p class="rounded-lg border border-line bg-surface/70 px-4 py-3 text-sm text-muted">Tip: use Ctrl K for quick actions.</p>
      </div>
    </div>
  {/if}
</header>
