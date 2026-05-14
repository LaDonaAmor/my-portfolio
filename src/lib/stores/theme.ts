import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initial = browser ? localStorage.getItem('theme') ?? 'dark' : 'dark';
export const theme = writable<'dark' | 'light'>(initial as 'dark' | 'light');

if (browser) {
  theme.subscribe((v) => {
    document.documentElement.classList.toggle('light', v === 'light');
    localStorage.setItem('theme', v);
  });
}
