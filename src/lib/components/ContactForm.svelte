<script lang="ts">
	import { Send } from 'lucide-svelte';

	const FORMSPREE_URL = 'https://formspree.io/f/mykqwnow';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);
	let error = $state('');
	let loading = $state(false);

	function sanitize(value: string, max: number) {
		return value
			.replace(/[<>`{}$\\]/g, '')
			.trim()
			.slice(0, max);
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		error = '';

		const cleanName = sanitize(name, 100);
		const cleanEmail = sanitize(email, 255);
		const cleanMessage = sanitize(message, 1000);

		if (!cleanName) {
			error = 'Name is required.';
			return;
		}
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
			error = 'Please enter a valid email address.';
			return;
		}
		if (!cleanMessage) {
			error = 'Message is required.';
			return;
		}

		loading = true;

		try {
			const res = await fetch(FORMSPREE_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					name: cleanName,
					email: cleanEmail,
					message: cleanMessage,
					_subject: `Portfolio enquiry from ${cleanName}`
				})
			});

			if (!res.ok) throw new Error('Failed to send');

			sent = true;
			name = '';
			email = '';
			message = '';
		} catch {
			error = 'Could not send. Email me directly at rachealogunmodede6@gmail.com';
		} finally {
			loading = false;
		}
	}
</script>

<form onsubmit={submit} class="grid gap-4" novalidate>
	<label class="grid gap-2">
		<span class="text-sm font-medium text-muted">Name</span>
		<input
			bind:value={name}
			required
			maxlength="100"
			disabled={loading}
			class="rounded-lg border border-line bg-surface px-4 py-3 text-fg transition outline-none placeholder:text-muted/50 focus:border-accent disabled:opacity-60"
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
			disabled={loading}
			class="rounded-lg border border-line bg-surface px-4 py-3 text-fg transition outline-none placeholder:text-muted/50 focus:border-accent disabled:opacity-60"
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
			disabled={loading}
			class="resize-y rounded-lg border border-line bg-surface px-4 py-3 text-fg transition outline-none placeholder:text-muted/50 focus:border-accent disabled:opacity-60"
			placeholder="Tell me what you're building."
		></textarea>
	</label>

	{#if error}
		<p
			role="alert"
			class="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-400"
		>
			{error}
		</p>
	{/if}

	{#if sent}
		<p class="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">
			Thanks! Your message has been sent. I'll get back to you soon.
		</p>
	{/if}

	<button
		type="submit"
		disabled={loading}
		class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-accent transition hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
	>
		{loading ? 'Sending...' : 'Send Message'}
		<Send size="17" />
	</button>
</form>
