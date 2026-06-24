<script lang="ts">
  import { onMount } from 'svelte';
  import { revealOnScroll } from '$lib/animations/scrollReveal';

  const skills = [
    'React',
    'TypeScript',
    'JavaScript (ES6+)',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Responsive Design',
    'API Integration',
    'Git & GitHub',
    'UI/UX Principles'
  ];

  const timeline = [
	{
      year: '2026 – Present',
      title: 'Frontend Development Intern - HNG',
      body:
		'Building production-focused frontend applications with React, emphasizing reusable components, API integration, responsive design, and scalable UI architecture.'    
	}, 
    {
      year: '2026 – Present',
      title: 'Frontend Developer Intern — Digital Health Africa',
      body:
        'Building UI components, onboarding flows, and profile systems for a professional healthcare directory platform.'
    },
    {
      year: '2024 – Present',
      title: 'Frontend Development (Project-Based Learning)',
      body:
        'Building React-based applications focused on reusable components, API integration, and responsive UI systems.'
    },
    {
      year: '2024 – 2025',
      title: 'Clinical Practice — FMC Owo',
      body:
        'Worked in a high-responsibility healthcare environment strengthening precision, teamwork, and structured problem-solving.'
    }
  ];

  onMount(() => {
    revealOnScroll('.reveal');
  });
</script>

<svelte:head>
  <title>About | TechNurse</title>
  <meta name="description" content="About TechNurse, a SvelteKit developer focused on product-quality web interfaces." />
  	<link rel="icon" href="/favicon.svg" />

</svelte:head>

<section class="py-12">
  <p class="reveal text-sm font-semibold uppercase tracking-[0.18em] text-accent">
    About
  </p>
  <div class="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">

  <h1 class="reveal font-display mt-6 text-4xl font-semibold md:text-6xl">
      I turn product ideas into interfaces people can trust.
  </h1>
    <div class="text-lg leading-8 text-muted">

  <p class="reveal mt-6 max-w-3xl text-lg text-muted leading-8">
    I build React + TypeScript interfaces focused on clarity, usability, and performance.
    My healthcare background brings discipline, precision, and human-centered thinking into engineering.
  </p>
  <p class="mt-5 reveal">My background in healthcare strengthens my attention to detail, analytical thinking,
        teamwork, and ability to perform in high-responsibility environments. I am passionate
        about building digital products that are practical, accessible, and impactful especially
        in digital health systems.</p>
</div>
</div>
</section>

<section class="py-16">
  <h2 class="reveal font-display text-2xl font-semibold">Core skills</h2>

  <ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {#each skills as skill (skill)}
      <li class="reveal rounded-lg border border-line bg-surface/70 px-4 py-3">
        {skill}
      </li>
    {/each}
  </ul>
</section>

<section class="py-16">
  <h2 class="reveal font-display text-2xl font-semibold">Experience</h2>

  <div class="mt-8 space-y-6">
    {#each timeline as item (item.title)}
      <article class="reveal rounded-xl border border-line bg-surface/70 p-6">
        <p class="text-sm text-accent font-semibold">{item.year}</p>
        <h3 class="mt-2 text-xl font-semibold">{item.title}</h3>
        <p class="mt-3 text-muted leading-7">{item.body}</p>
      </article>
    {/each}
  </div>
</section>