<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fade, scale } from 'svelte/transition';
    import { base, resolve } from '$app/paths';


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

  let filtered = $derived(items.filter(i =>
    i.label.toLowerCase().includes(q.toLowerCase())
  ));

  function handleBackdropKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') open = false;
  }

  onMount(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open = !open; }
      if (e.key === 'Escape') open = false;
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });
</script>

{#if open}
  
  <div
    class="fixed inset-0 z-50 bg-black/60 grid place-items-start pt-32"
    transition:fade={{ duration: 150 }}
    role="presentation"
    tabindex="-1"
    onclick={() => open = false}
    onkeydown={handleBackdropKey}
  >
    <div
      class="w-full max-w-lg mx-auto bg-bg border border-white/15 rounded-xl overflow-hidden"
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
        placeholder="Type a command…"
        class="w-full px-4 py-3 bg-transparent outline-none border-b border-white/10"
      />
      <ul>
        {#each filtered as it (it.label)}
          <li>
            <button
              class="w-full text-left px-4 py-3 hover:bg-white/5"
              onclick={() => { open = false; it.run(); }}
            >{it.label}</button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}