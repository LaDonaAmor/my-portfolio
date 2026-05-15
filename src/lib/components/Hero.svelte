<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, Code2, Download, Mail, ShieldCheck, Sparkles } from 'lucide-svelte';
  import { animate, stagger } from 'motion';
  import { base, resolve } from '$app/paths';
    import Particles from "./Particles.svelte";



  const socials = [
    { label: 'GitHub', href: 'https://github.com/LaDonaAmor', icon: Code2 },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rachealogunmodede/', icon: ArrowRight },
    { label: 'Email', href: 'mailto:rachealogunmodede6@gmail.com', icon: Mail }
  ];

  onMount(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.hero-line'));
    if (elements.length > 0) {
      const runAnimation = animate as unknown as (
        target: HTMLElement[],
        keyframes: Record<string, unknown>,
        options: Record<string, unknown>
      ) => void;
      runAnimation(
        elements,
        { opacity: [0, 1], transform: ['translateY(24px) scale(0.985)', 'translateY(0) scale(1)'] },
        { delay: stagger(0.07), duration: 0.7, easing: 'ease-out' }
      );
    }
  });
</script>

<section class="hero-stage relative isolate overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
  <div class="blue-grid absolute inset-x-1/2 top-0 -z-10 h-152 w-screen -translate-x-1/2 opacity-80"></div>
  <div class="hero-orbit absolute right-2 top-8 -z-10 hidden h-72 w-72 rounded-full border border-accent/20 lg:block"></div>

  <div class="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
    <div>
      <p
        class="hero-line inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
      >
        <ShieldCheck size="16" />
        TechNurse - Frontend Developer
      </p>

      <h1
        class="hero-line mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-normal text-fg md:text-7xl"
      >
       Hi, I'm Racheal,
      </h1>

      <p class="hero-line mt-6 max-w-2xl text-lg leading-8 text-muted">
       a frontend developer crafting fast, expressive, and accessible web experiences. I build with React, TypeScript, Tailwind CSS, and SvelteKit, turning ideas into interface systems that feel alive. I care about motion that means something, interactions that feel natural, and products that don’t just work they flow.
      </p>

      <div class="hero-line mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={resolve('/projects')}
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-ink shadow-[0_18px_45px_color-mix(in_oklab,var(--color-accent)_30%,transparent)] transition hover:brightness-110"
        >
          Explore Projects
          <ArrowRight size="18" />
        </a>

        <a
          href={`${base}/resume.pdf`}
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface/70 px-5 py-3 font-semibold text-fg transition hover:border-accent/50 hover:bg-surface-2"
        >
          <Download size="18" />
          Download Resume
        </a>
      </div>

      <div class="hero-line mt-6 flex flex-wrap gap-3" aria-label="Social and contact links">
        {#each socials as social (social.label)}
          <a
            href={social.href}
            class="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/72 px-3 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-accent"
            rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
            target={social.href.startsWith('http') ? '_blank' : undefined}
          >
            <svelte:component this={social.icon} size="16" />
            {social.label}
          </a>
        {/each}
      </div>

      <dl class="hero-line mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm">
        <div class="rounded-lg border border-line bg-surface/72 p-4">
          <dt class="text-2xl font-semibold text-fg">3+</dt>
          <dd class="mt-1 text-muted">Featured builds</dd>
        </div>
        <div class="rounded-lg border border-line bg-surface/72 p-4">
          <dt class="text-2xl font-semibold text-fg">100%</dt>
          <dd class="mt-1 text-muted">Responsive</dd>
        </div>
        <div class="rounded-lg border border-line bg-surface/72 p-4">
          <dt class="text-2xl font-semibold text-fg">A11y</dt>
          <dd class="mt-1 text-muted">Built for everyone</dd>
        </div>
      </dl>
    </div>

    <div class="hero-line hero-console glass relative overflow-hidden rounded-2xl p-4">
      <div class="absolute -right-10 -top-10 size-32 rounded-full bg-accent/20 blur-3xl"></div>
      <div class="dark-panel rounded-xl border border-line bg-[#081526] p-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-line pb-4">
          <p class="text-xl font-semibold uppercase tracking-[0.18em] text-accent">Portfolio OS</p>
          <span class="rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-medium text-emerald-300">Live</span>
        </div>

        <div class="mt-5 grid gap-4">
          <div class="rounded-lg bg-surface-2 p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted">Current focus</span>
              <Sparkles size="17" class="text-accent" />
            </div>
            <p class="mt-3 text-2xl font-semibold">Immersive Svelte product interfaces</p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border border-line p-4">
              <p class="text-xs text-muted">Stack</p>
              <p class="mt-2 font-semibold">SvelteKit + TS</p>
            </div>
            <div class="rounded-lg border border-line p-4">
              <p class="text-xs text-muted">Motion</p>
              <p class="mt-2 font-semibold">GPU-friendly</p>
            </div>
          </div>

          <div class="space-y-3 rounded-lg border border-line p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">Experience budget</span>
              <span>94%</span>
            </div>
            <div class="h-2 rounded-full bg-white/8">
              <div class="h-full w-[94%] rounded-full bg-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <Particles className="absolute inset-0" refresh={true} />

</section>

<style>
  .hero-console {
    transform-style: preserve-3d;
    animation: consoleFloat 8s ease-in-out infinite;
  }

  .hero-orbit {
    animation: orbitSpin 18s linear infinite;
  }

  @keyframes consoleFloat {
    0%,
    100% {
      transform: perspective(1200px) rotateX(2deg) rotateY(-4deg) translateY(0);
    }
    50% {
      transform: perspective(1200px) rotateX(4deg) rotateY(2deg) translateY(-10px);
    }
  }

  @keyframes orbitSpin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 720px), (prefers-reduced-motion: reduce) {
    .hero-console,
    .hero-orbit {
      animation: none;
      transform: none;
    }
  }
</style>
