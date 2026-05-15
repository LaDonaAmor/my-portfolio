<script lang="ts">
  import { Mail, MapPin, Timer } from 'lucide-svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
  <title>Contact | TechNurse</title>
  <meta name="description" content="Contact TechNurse for frontend, and product UI work." />
    	<link rel="icon" href="/favicon.svg" />

</svelte:head>

<section class="grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
  <div>
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Contact</p>
    <h1 class="mt-4 text-4xl font-display font-semibold leading-tight md:text-6xl">Let's build something sharp.</h1>
    <p class="mt-5 max-w-xl text-lg leading-8 text-muted">
      Send a focused message about your product, team, or feature. The form validates the basics and opens your mail client when ready.
    </p>

    <div class="mt-8 grid gap-3 text-sm">
      <p class="flex items-center gap-3 rounded-lg border border-line bg-surface/78 p-4">
        <Mail size="18" class="text-accent" />
        rachealogunmodede6@gmail.com
      </p>
      <p class="flex items-center gap-3 rounded-lg border border-line bg-surface/78 p-4">
        <MapPin size="18" class="text-accent" />
        Remote-first
      </p>
      <p class="flex items-center gap-3 rounded-lg border border-line bg-surface/78 p-4">
        <Timer size="18" class="text-accent" />
        Replies within 1-2 business days
      </p>
    </div>
  </div>

  <div class="glass rounded-2xl p-5 md:p-6">
    <ContactForm />
  </div>
</section>
