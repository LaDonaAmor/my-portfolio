# Racheal Ogunmodede — Frontend Portfolio

A personal frontend developer portfolio for Racheal Ogunmodede, also known as **TechNurse**. The site presents selected work, professional background, skills, contact options, and an AI-powered portfolio assistant.

Built with SvelteKit, TypeScript, Tailwind CSS, and Motion.

## Features

- Responsive portfolio layout for desktop, tablet, and mobile
- Interactive hero section with:
  - Animated introduction
  - Floating interactive console card
  - Profile and stack tabs
  - Terminal-style commands for navigating the site
- GitHub-powered project listings
- Featured projects selected using the `featured` GitHub repository topic
- Project search, technology filtering, and archived-project visibility
- AI portfolio assistant powered by Groq
- Contact form powered by Formspree
- Light, dark, and system theme preferences
- Configurable accent colors
- Command palette with `Ctrl + K` or `Cmd + K`
- Keyboard-accessible navigation and visible focus states
- Reduced-motion support for motion-heavy interactions

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/)
- [Svelte 5](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Groq](https://groq.com/) for the portfolio assistant
- [Formspree](https://formspree.io/) for contact form submissions

## Project Structure

```text
src/
├── lib/
│   ├── animations/
│   │   └── scrollReveal.ts         # Scroll-based motion helpers
│   ├── components/
│   │   ├── AccentPicker.svelte     # Accent color selector
│   │   ├── Assistant.svelte        # Portfolio assistant interface
│   │   ├── CommandPalette.svelte   # Keyboard navigation palette
│   │   ├── ContactForm.svelte      # Formspree contact form
│   │   ├── Hero.svelte             # Interactive floating hero console
│   │   ├── Nav.svelte              # Responsive site navigation
│   │   ├── ProjectCard.svelte      # Reusable project card
│   │   └── ThemeToggle.svelte      # System, light, and dark theme control
│   ├── server/
│   │   └── github.ts               # GitHub repository data loader
│   └── stores/
│       └── theme.ts                # Theme and accent persistence
├── routes/
│   ├── +layout.svelte              # Shared page shell
│   ├── +page.svelte                # Homepage
│   ├── about/+page.svelte          # About page
│   ├── contact/+page.svelte        # Contact page
│   ├── projects/+page.svelte       # Project index
│   └── api/assistant/+server.ts    # Groq assistant API route
└── app.css                          # Global design tokens and styles

static/
├── resume.pdf
└── favicon and web manifest assets
```

## Prerequisites

- Node.js 20 or newer
- pnpm recommended, because this repository includes a `pnpm-lock.yaml`
- A Groq API key for the AI assistant

## Getting Started

Clone the repository:

```bash
git clone https://github.com/LaDonaAmor/your-repository-name.git
cd your-repository-name
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the development server:

```bash
pnpm dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
# Start the development server
pnpm dev

# Run Svelte and TypeScript checks
pnpm check

# Run checks continuously
pnpm check:watch

# Check formatting and linting
pnpm lint

# Format project files
pnpm format

# Create a production build
pnpm build

# Preview the production build locally
pnpm preview
```

## Environment Variables

| Variable       | Required               | Description                                          |
| -------------- | ---------------------- | ---------------------------------------------------- |
| `GROQ_API_KEY` | Yes, for the assistant | API key used by the server-side Groq assistant route |

Do not expose `GROQ_API_KEY` in client-side code, commit it to Git, or prefix it with `PUBLIC_`.

## Project Data

Projects are loaded from the public GitHub profile:

```text
https://github.com/LaDonaAmor
```

The homepage shows repositories that:

- Are not forks
- Are not archived
- Include the GitHub topic `featured`

To feature a repository on the homepage, add this topic in GitHub:

```text
featured
```

The project index displays non-fork repositories and supports search, filtering, and archived-project visibility.

## External Services

This project uses the following third-party services:

| Service    | Purpose                                                            |
| ---------- | ------------------------------------------------------------------ |
| GitHub API | Fetches public repository information                              |
| Microlink  | Generates project preview screenshots from repository or demo URLs |
| Groq API   | Generates portfolio assistant responses                            |
| Formspree  | Receives contact form submissions                                  |

If any service is unavailable, the relevant feature may not load or may show an error state.

## AI Assistant

The portfolio assistant is intentionally restricted to verified portfolio information, including:

- Racheal’s frontend focus and technical stack
- Availability and contact information
- Current featured GitHub projects

The assistant uses Groq’s `openai/gpt-oss-20b` model through the server route at:

```text
/api/assistant
```

It should not be treated as a source of information beyond the portfolio data provided to it.

## Accessibility

The portfolio includes:

- Semantic page structure and heading hierarchy
- Keyboard-accessible interactive controls
- Visible focus indicators
- Labeled form and search inputs
- Accessible theme, accent, and filter controls
- Mobile-friendly control sizes
- Reduced-motion support using `prefers-reduced-motion`
- Live regions for assistant, terminal, form, and status feedback

## Deployment

The project currently uses `@sveltejs/adapter-auto`.

Before deploying, run:

```bash
pnpm check
pnpm build
```

Set `GROQ_API_KEY` in your deployment provider’s environment-variable settings. Do not place the key in a public frontend environment variable.

## Author

**Racheal Ogunmodede**  
Frontend Developer · TechNurse

- GitHub: [@LaDonaAmor](https://github.com/LaDonaAmor)
- LinkedIn: [rachealogunmodede](https://www.linkedin.com/in/rachealogunmodede/)
- Email: [rachealogunmodede6@gmail.com](mailto:rachealogunmodede6@gmail.com)

## License

No license has been declared for this repository. All rights are reserved unless a license is added.
