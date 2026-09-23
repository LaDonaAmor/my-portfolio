<script lang="ts">
	import { CheckCircle2, Mail, MapPin } from 'lucide-svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact | Racheal Ogunmodede</title>
	<meta
		name="description"
		content="Contact Racheal Ogunmodede about frontend development, product UI, and accessible interface work."
	/>
</svelte:head>

<section class="grid gap-12 pt-8 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:pt-12">
	<div>
		<p class="eyebrow">Contact</p>
		<h1 class="mt-4 font-display text-5xl leading-tight sm:text-6xl">
			Let’s make something useful.
		</h1>

		<p class="mt-6 max-w-xl text-lg leading-8 text-muted">
			Tell me a little about what you’re building, the part you’d like help with, and any timing you
			already have in mind. If you’re still figuring it out, that’s fine too.
		</p>

		<div class="paper-card mt-6 p-6">
			<h2 class="font-display text-2xl">Good things to include</h2>

			<ul class="mt-3 space-y-1 text-sm leading-6 text-muted">
				<li class="flex gap-3">
					<CheckCircle2 size={18} class="mt-0.5 shrink-0 text-accent" />
					What the product or team does.
				</li>
				<li class="flex gap-3">
					<CheckCircle2 size={18} class="mt-0.5 shrink-0 text-accent" />
					What kind of frontend or product UI help you need.
				</li>
				<li class="flex gap-3">
					<CheckCircle2 size={18} class="mt-0.5 shrink-0 text-accent" />
					A rough timeline, if you have one.
				</li>
			</ul>
		</div>

		<div class="mt-4 grid gap-3 text-sm">
			<a
				href="mailto:rachealogunmodede6@gmail.com"
				class="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-surface px-4 transition hover:border-accent/50 hover:text-accent"
			>
				<Mail size={18} class="text-accent" />
				rachealogunmodede6@gmail.com
			</a>

			<p
				class="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-surface px-4 text-muted"
			>
				<MapPin size={18} class="text-accent" />
				Remote-first
			</p>
		</div>
	</div>

	<div class="paper-card h-fit p-5 sm:p-7">
		<ContactForm />
	</div>
</section>
