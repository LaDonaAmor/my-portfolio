<script lang="ts">
  import { onMount } from 'svelte';
  import { animate, stagger } from 'motion';
  import { resolve } from '$app/paths';

  onMount(() => {
    const elements = document.querySelectorAll('.hero-line');
    if (elements.length > 0) {
      animate(
        Array.from(elements), 
        { opacity: [0, 1], y: [24, 0] }, 
        { delay: stagger(0.08), duration: 0.7 }
      );
    }
  });
</script>

<!-- ... (previous HTML) ... -->

<div class="hero-line mt-10 flex gap-4">
  <a
    href={resolve('/projects')}
    class="rounded bg-accent px-5 py-3 font-medium text-black"
  >
    View Work
  </a>

  <a
// eslint-disable-next-line svelte/no-navigation-without-resolve
href="/resume.pdf"  
class="rounded border border-white/20 px-5 py-3"
>
  Download CV
</a>
</div>