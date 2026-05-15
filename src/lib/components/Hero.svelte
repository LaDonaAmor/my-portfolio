<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, Code2, Download, Mail, ShieldCheck, Sparkles } from 'lucide-svelte';
  import { animate, stagger } from 'motion';
  import { base } from '$app/paths';
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
        { opacity: [0, 1], transform: ['translateY(16px) scale(0.99)', 'translateY(0) scale(1)'] },
        { delay: stagger(0.06), duration: 0.6, easing: 'ease-out' }
      );
    }
  });
</script>

<section class="hero-stage hero-stage-backdrop relative isolate min-height-[90vh] flex items-center overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24">
  <div class="bg-grain z-0"></div>
  <Particles className="absolute inset-0 -z-10 pointer-events-none" refresh={true} />
  
  <div class="mx-auto w-full max-w-7xl relative z-10">
    <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
      
      <div class="flex flex-col items-start text-left">
        <p class="hero-line text-xs font-semibold uppercase tracking-[0.25em] text-accent flex items-center gap-2 mb-6">
          <ShieldCheck size="14" strokeWidth={2.5} />  
          TechNurse &mdash; Frontend Developer
        </p>

        <h1 class="hero-line font-display text-5xl font-extrabold tracking-tight text-fg md:text-7xl leading-[1.05]">
          Hi, I'm Racheal,
        </h1>

        <p class="hero-line mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted font-normal">
          a frontend developer who enjoys building fast, responsive, and accessible web experiences. I work with React, TypeScript, Tailwind CSS, and SvelteKit to turn ideas into clean, user-friendly interfaces. I pay close attention to the details that make products feel polished—smooth interactions, thoughtful animations, and designs that are both functional and enjoyable to use.
        </p>

        <div class="hero-line mt-8 flex flex-col w-full sm:w-auto gap-3.5 sm:flex-row relative z-20">
          <a
            href="{base}/projects"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-ink shadow-[0_12px_30px_color-mix(in_srgb,var(--color-accent)_25%,transparent)] transition duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Explore Projects
            <ArrowRight size="16" strokeWidth={2.5} />
          </a>

          <a
            href="{base}/resume.pdf"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface/40 backdrop-blur-sm px-6 py-3.5 font-semibold text-fg transition duration-200 hover:border-accent/40 hover:bg-surface-2 active:scale-[0.98]"
          >
            <Download size="16" />
            Download Resume
          </a>
        </div>

        <div class="hero-line mt-8 flex flex-wrap gap-2.5 relative z-20" aria-label="Professional profiles and channels">
          {#each socials as social (social.label)}
            <a
              href={social.href}
              class="inline-flex items-center gap-2 rounded-md border border-line bg-surface/30 px-3.5 py-2 text-xs font-medium text-muted transition duration-200 hover:border-accent/40 hover:text-accent"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svelte:component this={social.icon} size="14" />
              {social.label}
            </a>
          {/each}
        </div>

        <dl class="hero-line mt-12 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-line/50 pt-8 text-left">
          <div>
            <dt class="font-display text-2xl font-extrabold text-fg md:text-3xl">3+</dt>
            <dd class="mt-1 text-xs font-medium tracking-wide text-muted uppercase">Featured Builds</dd>
          </div>
          <div>
            <dt class="font-display text-2xl font-extrabold text-fg md:text-3xl">100%</dt>
            <dd class="mt-1 text-xs font-medium tracking-wide text-muted uppercase">Responsive</dd>
          </div>
          <div>
            <dt class="font-display text-2xl font-extrabold text-fg md:text-3xl">A11y</dt>
            <dd class="mt-1 text-xs font-medium tracking-wide text-muted uppercase">Built For Everyone</dd>
          </div>
        </dl>
      </div>

      <div class="hero-line hero-console relative w-full rounded-xl border border-line bg-[#040912]/80 backdrop-blur-md p-1 shadow-2xl">
        <div class="rounded-lg border border-line/40 bg-[#070e1a] p-5">
          <div class="flex items-center justify-between border-b border-line/40 pb-4">
            <p class="font-mono text-xs uppercase tracking-[0.22em] text-accent font-bold">Portfolio OS v2.6</p>
            <div class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="font-mono text-[11px] font-medium text-emerald-400/90 uppercase tracking-wider">Production</span>
            </div>
          </div>

          <div class="mt-6 grid gap-4">
            <div class="rounded-lg bg-surface-2/40 border border-line/30 p-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium tracking-wide text-muted uppercase">Current Engine Architecture</span>
                <Sparkles size="14" class="text-accent" />
              </div>
              <p class="mt-2 text-xl font-bold tracking-tight">Immersive Svelte Product Frameworks</p>
            </div>

            <div class="grid grid-cols-2 gap-3 font-mono text-xs">
              <div class="rounded-md border border-line/30 bg-surface/20 p-3">
                <span class="text-muted block text-[10px] uppercase">Core Core Stack</span>
                <span class="mt-1.5 block font-semibold text-fg">SvelteKit + TS</span>
              </div>
              <div class="rounded-md border border-line/30 bg-surface/20 p-3">
                <span class="text-muted block text-[10px] uppercase">Interpolation</span>
                <span class="mt-1.5 block font-semibold text-fg">Hardware Native</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .hero-console {
    transform-style: preserve-3d;
    animation: consoleFloat 7s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
  }

  @keyframes consoleFloat {
    0%, 100% {
      transform: perspective(1000px) rotateX(1deg) rotateY(-2deg) translateY(0);
    }
    50% {
      transform: perspective(1000px) rotateX(3deg) rotateY(1deg) translateY(-8px);
    }
  }

  @media (max-width: 1024px) or (prefers-reduced-motion: reduce) {
    .hero-console {
      animation: none !important;
      transform: none !important;
    }
  }
</style>