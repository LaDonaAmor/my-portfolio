<script lang="ts">
  import { ArrowRight, Sparkles, Search, RotateCcw } from 'lucide-svelte';

  type Fit = 'strong' | 'partial';

  type Recommendation = {
    id: string;
    name: string;
    description: string;
    stack: string[];
    tags: string[];
    href: string;
    reason: string;
    fit: Fit;
  };

  let query = $state('');
  let loading = $state(false);
  let error = $state('');
  let recommendations = $state<Recommendation[]>([]);
  let searched = $state(false);

  const MAX = 300;
  const charsLeft = $derived(MAX - query.length);
  const isNearLimit = $derived(charsLeft <= 50);

  const prompts = [
    'I need a healthcare dashboard with real-time data',
    'Looking for accessible, well-animated UI work',
    'Show me team productivity or ops tooling',
    'I want something built with SvelteKit'
  ];

  async function recommend(value = query) {
    error = '';
    const cleaned = value.trim().slice(0, MAX);
    if (cleaned.length < 3) {
      error = 'Describe what you are looking for in a few words.';
      return;
    }

    loading = true;
    searched = false;

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleaned })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? 'Request failed.');

      recommendations = data.recommendations;
      searched = true;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Something went wrong.';
    } finally {
      loading = false;
    }
  }

  function reset() {
    query = '';
    error = '';
    recommendations = [];
    searched = false;
  }
</script>

<section class="py-14">
  <div class="mx-auto max-w-3xl">

    <!-- Header -->
    <div class="text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Smart Discovery</p>
      <h2 class="mt-3 text-3xl font-semibold md:text-4xl">Find the right project for your needs.</h2>
      <p class="mt-4 leading-7 text-muted">
        Describe what you're building or hiring for, and get matched to the most relevant work in this portfolio.
      </p>
    </div>

    <!-- Search panel -->
    <div class="glass mt-10 rounded-2xl p-5">
      <div class="dark-panel rounded-xl border border-line bg-[#071525] p-5">

        <!-- Input -->
        <label class="sr-only" for="recommend-input">Describe what you are looking for</label>
        <div class="relative">
          <Search size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="recommend-input"
            bind:value={query}
            maxlength={MAX}
            disabled={loading}
            onkeydown={(e) => e.key === 'Enter' && recommend()}
            class="w-full rounded-lg border border-line bg-surface py-3 pl-10 pr-4 text-sm outline-none placeholder:text-muted focus:border-accent disabled:opacity-50"
            placeholder="e.g. I need a healthcare dashboard with real-time data"
          />
        </div>

        <!-- Prompt suggestions -->
        {#if !searched}
          <div class="mt-4 flex flex-wrap gap-2">
            {#each prompts as p (p)}
              <button
                type="button"
                onclick={() => { query = p; recommend(p); }}
                class="rounded-md border border-line px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-accent"
              >
                {p}
              </button>
            {/each}
          </div>
        {/if}

        <!-- Error -->
        {#if error}
          <p role="alert" class="mt-3 text-xs text-red-300">{error}</p>
        {/if}

        <!-- Actions -->
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs {isNearLimit ? 'text-amber-400' : 'text-muted/60'}">{charsLeft} characters left</span>
          <div class="flex gap-2">
            {#if searched}
              <button
                type="button"
                onclick={reset}
                class="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-accent"
              >
                <RotateCcw size="14" />
                Reset
              </button>
            {/if}
            <button
              type="button"
              onclick={() => recommend()}
              disabled={loading || query.trim().length < 3}
              class="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-40"
            >
              <Sparkles size="14" />
              {loading ? 'Matching…' : 'Find Projects'}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading skeleton -->
    {#if loading}
      <div class="mt-6 grid gap-4">
        {#each [1, 2] as i (i)}
          <div class="animate-pulse rounded-xl border border-line bg-surface-2 p-5">
            <div class="flex items-start justify-between">
              <div class="h-5 w-36 rounded bg-surface"></div>
              <div class="h-5 w-16 rounded-full bg-surface"></div>
            </div>
            <div class="mt-3 h-4 w-full rounded bg-surface"></div>
            <div class="mt-2 h-4 w-3/4 rounded bg-surface"></div>
            <div class="mt-4 flex gap-2">
              {#each [1, 2, 3] as j (j)}
                <div class="h-6 w-16 rounded-md bg-surface"></div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Results -->
    {#if searched && !loading}
      {#if recommendations.length === 0}
        <div class="mt-6 rounded-xl border border-line bg-surface-2 p-8 text-center text-muted">
          No strong matches found. Try describing a different requirement.
        </div>
      {:else}
        <div class="mt-6 grid gap-4">
          <p class="text-sm text-muted">
            {recommendations.length} project{recommendations.length > 1 ? 's' : ''} matched your description
          </p>
          {#each recommendations as rec (rec.id)}
            <article class="group rounded-xl border border-line bg-surface-2 p-5 transition hover:border-accent/40">
              <div class="flex items-start justify-between gap-4">
                <h3 class="font-semibold text-fg">{rec.name}</h3>
                <span
                  class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium
                    {rec.fit === 'strong'
                      ? 'bg-emerald-400/10 text-emerald-300'
                      : 'bg-accent/10 text-accent'}"
                >
                  {rec.fit === 'strong' ? '✦ Strong fit' : 'Partial fit'}
                </span>
              </div>

              <!-- AI reason -->
              <p class="mt-2 text-sm italic text-accent/80">{rec.reason}</p>

              <p class="mt-2 text-sm leading-6 text-muted">{rec.description}</p>

              <!-- Stack tags -->
              <div class="mt-4 flex flex-wrap gap-2">
                {#each rec.stack as tech (tech)}
                  <span class="rounded-md border border-line px-2.5 py-1 text-xs text-muted">{tech}</span>
                {/each}
              </div>

              <a
                href={resolve(rec.href)}
                class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:gap-2.5"
              >
                View project <ArrowRight size="14" />
              </a>
            </article>
          {/each}
        </div>
      {/if}
    {/if}

  </div>
</section>