import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initial = browser ? (localStorage.getItem('theme') ?? 'dark') : 'dark';
export const theme = writable<'dark' | 'light'>(initial as 'dark' | 'light');
const initialAccent = browser ? (localStorage.getItem('accent') ?? '#38bdf8') : '#38bdf8';
export const accent = writable(initialAccent);

if (browser) {
	theme.subscribe((v) => {
		document.documentElement.classList.toggle('light', v === 'light');
		localStorage.setItem('theme', v);
	});

	accent.subscribe((v) => {
		document.documentElement.style.setProperty('--color-accent', v);
		localStorage.setItem('accent', v);
	});
}
