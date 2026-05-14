<script lang="ts">
  export let title: string;
  export let desc: string;
  export let tech: string[];
  export let demo: string;
  export let repo: string;
  export let index = 0;
</script>

<article
  class="group relative p-6 rounded-xl border border-white/10 hover:border-accent transition-all duration-300 hover:-translate-y-1"
  style="animation: fadeUp 0.6s ease backwards;"
  style:animation-delay={`${index * 80}ms`}
>
  <h3 class="text-xl font-semibold">{title}</h3>

  <p class="text-muted mt-2 text-sm">{desc}</p>

  <ul class="flex flex-wrap gap-2 mt-4">
    {#each tech as t (t)}
      <li class="text-xs px-2 py-1 rounded bg-white/5">{t}</li>
    {/each}
  </ul>

  <div class="flex gap-3 mt-5 text-sm">
  <a 
    href={demo} 
    class="underline" 
    rel="external" 
    target="_blank"
  >
    Live
  </a>
  <a 
    href={repo} 
    class="underline" 
    rel="external" 
    target="_blank"
  >
    Code
  </a>
</div>
</article>

<style>
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>