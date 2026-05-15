import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const SYSTEM_PROMPT = `You are a concise portfolio assistant for Racheal Ogunmodede, a frontend developer known as TechNurse.
Answer ONLY questions about her portfolio, skills, projects, and availability.
Keep responses to 2-3 sentences maximum. Politely decline anything unrelated to her work.

Key facts:
- Stack: SvelteKit, TypeScript, React, Tailwind CSS, Motion (formerly Framer Motion)
- Projects: Clinical Flow (health dashboard), Nova Ops (ops tool), Atlas Care (care management UI)
- Strengths: accessible UI, motion design, responsive interfaces, design systems
- Status: open to focused frontend, SvelteKit, and dashboard projects
- Contact: rachealogunmodede6@gmail.com | github.com/LaDonaAmor`;

export const POST: RequestHandler = async ({ request }) => {
  const apiKey = env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OPENAI_API_KEY is missing');
    return json({ error: 'API key not configured.' }, { status: 500 });
  }

  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: 'Invalid messages payload.' }, { status: 400 });
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // cheap, fast, more than capable enough
        max_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ]
      })
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error('OpenAI API error:', res.status, JSON.stringify(body));
      return json({ error: body?.error?.message ?? `API error (${res.status})` }, { status: res.status });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? 'No response received.';

    return json({ reply });

  } catch (err) {
    console.error('Assistant route error:', err instanceof Error ? err.message : err);
    return json({ error: err instanceof Error ? err.message : 'Server error. Please try again.' }, { status: 500 });
  }
};