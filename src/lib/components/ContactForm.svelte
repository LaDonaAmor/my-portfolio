<script lang="ts">
	import { Send } from 'lucide-svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);
	let error = $state('');

	function sanitize(value: string, max: number) {
		return value
			.replace(/[<>`{}$\\]/g, '')
			.trim()
			.slice(0, max);
	}

	function submit(event: SubmitEvent) {
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

		const mailto =
			`mailto:rachealogunmodede6@gmail.com` +
			`?subject=${encodeURIComponent('Portfolio enquiry from ' + cleanName)}` +
			`&body=${encodeURIComponent(cleanMessage + '\n\n— ' + cleanName + ' (' + cleanEmail + ')')}`;

		// Open in a new tab so Outlook Web (or any web client) doesn't
		// replace your portfolio page. Also avoids the blank-tab flicker
		// that location.href causes when the OS hands it to a native client.
		window.open(mailto, '_blank');

		// Give the user honest feedback — we can't know if they actually sent it
		sent = true;
	}
</script>

<form onsubmit={submit} class="grid gap-4" novalidate>
	<label class="grid gap-2">
		<span class="text-sm font-medium text-muted">Name</span>
		<input
			bind:value={name}
			required
			maxlength="100"
			class="rounded-lg border border-line bg-surface px-4 py-3 text-fg transition outline-none placeholder:text-muted/50 focus:border-accent"
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
			class="rounded-lg border border-line bg-surface px-4 py-3 text-fg transition outline-none placeholder:text-muted/50 focus:border-accent"
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
			class="resize-y rounded-lg border border-line bg-surface px-4 py-3 text-fg transition outline-none placeholder:text-muted/50 focus:border-accent"
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
			Your mail client should have opened. If nothing happened, email me directly at
			<a href="mailto:rachealogunmodede6@gmail.com" class="underline underline-offset-2">
				rachealogunmodede6@gmail.com
			</a>
		</p>
	{/if}

	<button
		type="submit"
		class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-ink transition hover:brightness-110 active:scale-[0.97]"
	>
		Send Message
		<Send size="17" />
	</button>
</form>
