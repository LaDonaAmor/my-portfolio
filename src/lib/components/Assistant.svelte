<script lang="ts">
  import { Send, RotateCcw, Bot, Sparkles } from 'lucide-svelte';

  // Add id so each message has a stable, unique key
  type Message = { id: string; role: 'user' | 'assistant'; content: string };

  let prompt = $state('');
  let loading = $state(false);
  let error = $state('');
  let messages = $state<Message[]>([]);
  let inputEl = $state<HTMLInputElement | null>(null);
  let logEl = $state<HTMLDivElement | null>(null);

  const MAX_CHARS = 200;
  const MAX_HISTORY = 10;

  const suggestions = [
    'What are your core skills?',
    'Tell me about your projects',
    'Are you available for hire?',
    'How do you handle accessibility?'
  ];

  const features = [
    'Context-aware multi-turn conversation',
    'Portfolio-scoped answers only',
    'No visitor data retained'
  ];

  function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function sanitize(value: string) {
    return value.replace(/[<>`{}$\\]/g, '').trim().slice(0, MAX_CHARS);
  }

  function scrollToBottom() {
    setTimeout(() => logEl?.scrollTo({ top: logEl.scrollHeight, behavior: 'smooth' }), 50);
  }

  async function ask(value = prompt) {
    error = '';
    const cleaned = sanitize(value);
    if (!cleaned) { error = 'Please enter a question first.'; return; }

    const userMsg: Message = { id: uid(), role: 'user', content: cleaned };
    messages = [...messages, userMsg];
    prompt = '';
    loading = true;
    scrollToBottom();

    try {
      const history = messages.slice(-MAX_HISTORY).map(({ role, content }) => ({ role, content }));

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Error ${res.status}`);

      messages = [...messages, { id: uid(), role: 'assistant', content: data.reply }];
    } catch (err) {
      error = err instanceof Error ? err.message : 'Something went wrong.';
      messages = messages.slice(0, -1);
    } finally {
      loading = false;
      scrollToBottom();
      setTimeout(() => inputEl?.focus(), 60);
    }
  }

  function reset() {
    messages = [];
    error = '';
    prompt = '';
    inputEl?.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); }
    if (e.key === 'Escape') reset();
  }

  const charsLeft = $derived(MAX_CHARS - prompt.length);
  const nearLimit = $derived(charsLeft <= 30);
</script>

<section class="grid gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr]">

  <!-- Left: description -->
  <div class="flex flex-col justify-center">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-accent">AI Portfolio Assistant</p>
    <h2 class="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
      Ask anything about<br />Racheal's work.
    </h2>
    <p class="mt-4 leading-7 text-muted">
      Powered by Grok and scoped strictly to portfolio data — skills, projects, stack, and availability.
    </p>

    <ul class="mt-6 space-y-2.5 text-sm text-muted">
      <!-- KEY: feature string is unique, safe to use as key -->
      {#each features as feature (feature)}
        <li class="flex items-center gap-2.5">
          <span class="size-1.5 shrink-0 rounded-full bg-accent"></span>
          {feature}
        </li>
      {/each}
    </ul>

    <div class="mt-8 flex items-center gap-2 text-xs text-muted/60">
      <Sparkles size="13" class="text-accent" />
      Powered by xAI Grok
    </div>
  </div>

  <!-- Right: chat panel -->
  <div class="glass rounded-2xl p-1">
    <div
      class="flex flex-col rounded-xl border border-line bg-[#071525] overflow-hidden"
      style="height: 500px;"
    >

      <!-- Header -->
      <div class="flex items-center justify-between border-b border-line px-4 py-3 shrink-0">
        <div class="flex items-center gap-2">
          <Bot size="15" class="text-accent" />
          <span class="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Portfolio Assistant
          </span>
        </div>
        {#if messages.length > 0}
          <button
            type="button"
            onclick={reset}
            class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition hover:text-accent"
            aria-label="Reset conversation"
          >
            <RotateCcw size="12" />
            Reset
          </button>
        {/if}
      </div>

      <!-- Message log -->
      <div
        bind:this={logEl}
        class="flex-1 overflow-y-auto p-4 space-y-3"
        role="log"
        aria-live="polite"
        aria-label="Conversation"
      >
        {#if messages.length === 0}
          <p class="text-sm leading-7 text-muted">
            Ask about skills, projects, availability, or anything on this portfolio.
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <!-- KEY: suggestion string is unique -->
            {#each suggestions as s (s)}
              <button
                type="button"
                onclick={() => ask(s)}
                class="rounded-md border border-line px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-accent"
              >
                {s}
              </button>
            {/each}
          </div>
        {:else}
          <!-- KEY: msg.id is a stable unique string, not the object reference -->
          {#each messages as msg (msg.id)}
            <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
              <div
                class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-7
                  {msg.role === 'user'
                    ? 'rounded-br-sm bg-accent text-ink'
                    : 'rounded-bl-sm bg-surface-2 text-muted'}"
              >
                {msg.content}
              </div>
            </div>
          {/each}

          {#if loading}
            <div class="flex justify-start">
              <div class="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-3.5">
                <span class="size-1.5 animate-bounce rounded-full bg-accent" style="animation-delay:0ms"></span>
                <span class="size-1.5 animate-bounce rounded-full bg-accent" style="animation-delay:150ms"></span>
                <span class="size-1.5 animate-bounce rounded-full bg-accent" style="animation-delay:300ms"></span>
              </div>
            </div>
          {/if}
        {/if}
      </div>

      <!-- Input -->
      <div class="border-t border-line p-4 space-y-2 shrink-0">
        {#if error}
          <p role="alert" class="text-xs text-red-300">{error}</p>
        {/if}

        <form
          class="flex items-center gap-2"
          onsubmit={(e) => { e.preventDefault(); ask(); }}
        >
          <label class="sr-only" for="assistant-prompt">Ask the portfolio assistant</label>
          <input
            id="assistant-prompt"
            bind:this={inputEl}
            bind:value={prompt}
            maxlength={MAX_CHARS}
            disabled={loading}
            onkeydown={handleKeydown}
            autocomplete="off"
            placeholder="Ask a question…"
            class="flex-1 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none
              placeholder:text-muted focus:border-accent disabled:opacity-50 transition"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            aria-label="Send message"
            class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent
              text-ink transition hover:brightness-110 disabled:opacity-40"
          >
            <Send size="15" />
          </button>
        </form>

        <div class="flex justify-between text-xs text-muted/50">
          <span>Enter to send · Esc to reset</span>
          <span class={nearLimit ? 'text-amber-400' : ''}>{charsLeft} left</span>
        </div>
      </div>

    </div>
  </div>

</section>