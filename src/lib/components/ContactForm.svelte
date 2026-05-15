<script lang="ts">
  import { Send } from 'lucide-svelte';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let sent = $state(false);
  let error = $state('');

  function sanitize(value: string, max: number) {
    return value.replace(/[<>`{}$\\]/g, '').trim().slice(0, max);
  }

  function submit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    const cleanName = sanitize(name, 100);
    const cleanEmail = sanitize(email, 255);
    const cleanMessage = sanitize(message, 1000);

    if (!cleanName) {
      error = 'Name is required and must be 100 characters or fewer.';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
      error = 'Please enter a valid email address.';
      return;
    }
    if (!cleanMessage) {
      error = 'Message is required and must be 1000 characters or fewer.';
      return;
    }

    location.href = `mailto:hello@technurse.dev?subject=${encodeURIComponent('Portfolio: ' + cleanName)}&body=${encodeURIComponent(`${cleanMessage}\n\n${cleanEmail}`)}`;
    sent = true;
  }
</script>

<form onsubmit={submit} class="grid gap-4">
  <label class="grid gap-2">
    <span class="text-sm font-medium text-muted">Name</span>
    <input
      bind:value={name}
      required
      maxlength="100"
      class="rounded-lg border border-line bg-surface px-4 py-3 text-fg outline-none transition placeholder:text-muted/70 focus:border-accent"
      placeholder="Your name"
    />
  </label>

  <label class="grid gap-2">
    <span class="text-sm font-medium text-muted">Email</span>
    <input
      type="email"
      bind:value={email}
      required
      maxlength="255"
      class="rounded-lg border border-line bg-surface px-4 py-3 text-fg outline-none transition placeholder:text-muted/70 focus:border-accent"
      placeholder="you@example.com"
    />
  </label>

  <label class="grid gap-2">
    <span class="text-sm font-medium text-muted">Message</span>
    <textarea
      bind:value={message}
      required
      maxlength="1000"
      rows="5"
      class="resize-y rounded-lg border border-line bg-surface px-4 py-3 text-fg outline-none transition placeholder:text-muted/70 focus:border-accent"
      placeholder="Tell me what you are building."
    ></textarea>
  </label>

  {#if error}
    <p role="alert" class="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>
  {/if}
  {#if sent}
    <p class="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">Opening your mail client...</p>
  {/if}

  <button class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-ink transition hover:bg-sky-300">
    Send Message
    <Send size="17" />
  </button>
</form>
