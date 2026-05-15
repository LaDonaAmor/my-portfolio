import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const PROJECTS = [
  {
    id: 'clinical-flow',
    name: 'Clinical Flow',
    description: 'A health dashboard for clinical teams to track patient flow, bed occupancy, and shift handovers in real time.',
    stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    tags: ['dashboard', 'data visualisation', 'healthcare', 'real-time', 'accessibility'],
    href: '/projects/clinical-flow'
  },
  {
    id: 'nova-ops',
    name: 'Nova Ops',
    description: 'An internal operations tool for task assignment, status tracking, and team workload management.',
    stack: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS'],
    tags: ['productivity', 'operations', 'team management', 'CRUD', 'state management'],
    href: '/projects/nova-ops'
  },
  {
    id: 'atlas-care',
    name: 'Atlas Care',
    description: 'A care management UI for coordinating patient appointments, carer schedules, and medication reminders.',
    stack: ['SvelteKit', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    tags: ['healthcare', 'scheduling', 'animation', 'forms', 'accessibility'],
    href: '/projects/atlas-care'
  }
];

const SYSTEM_PROMPT = `You are a project recommender for Racheal Ogunmodede's (TechNurse) frontend portfolio.

Given a visitor's description of what they need, recommend the most relevant projects from this list and explain why each fits. Be specific and concise.

Available projects:
${JSON.stringify(PROJECTS, null, 2)}

Respond ONLY with a valid JSON array. No markdown, no explanation outside the JSON.
Each item must have:
- id: string (matching a project id above)
- reason: string (one sentence explaining why it fits, max 20 words)
- fit: "strong" | "partial"

Example:
[{"id":"clinical-flow","reason":"Demonstrates real-time dashboard work with accessible data visualisation.","fit":"strong"}]

Only include projects that are genuinely relevant. If nothing fits, return an empty array [].`;

export const POST: RequestHandler = async ({ request, fetch }) => {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return json({ error: 'Please describe what you are looking for.' }, { status: 400 });
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY ?? '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: query.trim().slice(0, 300) }]
      })
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return json({ error: body?.error?.message ?? `API error (${res.status})` }, { status: res.status });
    }

    const data = await res.json();
    const raw = data.content
      .filter((b: { type: string }) => b.type === 'text')
      .map((b: { text: string }) => b.text)
      .join('');

    const recommendations = JSON.parse(raw.replace(/```json|```/g, '').trim());

    // Enrich with full project data
    const enriched = recommendations
      .map((r: { id: string; reason: string; fit: string }) => {
        const project = PROJECTS.find(p => p.id === r.id);
        return project ? { ...project, reason: r.reason, fit: r.fit } : null;
      })
      .filter(Boolean);

    return json({ recommendations: enriched });

  } catch (err) {
    console.error('Recommend route error:', err);
    return json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
};