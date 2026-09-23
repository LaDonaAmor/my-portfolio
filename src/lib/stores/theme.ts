import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type ThemePreference = 'system' | 'light' | 'dark';

const savedTheme = browser ? localStorage.getItem('theme') : null;

const initialTheme: ThemePreference =
	savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system'
		? savedTheme
		: 'system';

const initialAccent = browser ? (localStorage.getItem('accent') ?? '#38bdf8') : '#38bdf8';

export const theme = writable<ThemePreference>(initialTheme);
export const accent = writable(initialAccent);

if (browser) {
	const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
	let currentPreference = initialTheme;

	function applyTheme(preference: ThemePreference) {
		const useLightTheme = preference === 'light' || (preference === 'system' && mediaQuery.matches);

		document.documentElement.classList.toggle('light', useLightTheme);
	}

	theme.subscribe((preference) => {
		currentPreference = preference;
		applyTheme(preference);
		localStorage.setItem('theme', preference);
	});

	mediaQuery.addEventListener('change', () => {
		if (currentPreference === 'system') {
			applyTheme('system');
		}
	});

	accent.subscribe((value) => {
		document.documentElement.style.setProperty('--color-accent', value);
		localStorage.setItem('accent', value);
	});
}
