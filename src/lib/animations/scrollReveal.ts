import { animate } from 'motion';

export function revealOnScroll(selector: string) {
	if (typeof window === 'undefined') return;

	const elements = document.querySelectorAll<HTMLElement>(selector);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				const target = entry.target as HTMLElement;

				animate(
					target,
					{
						opacity: [0, 1],
						y: [32, 0],
						scale: [0.98, 1]
					},
					{
						duration: 0.8,
						ease: [0.22, 1, 0.36, 1] as const
					}
				);

				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.15 }
	);

	elements.forEach((el) => observer.observe(el));
}
