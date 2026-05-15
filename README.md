# TechNurse Interactive Portfolio

An immersive SvelteKit developer portfolio built to feel engineered, animated, responsive, and production-ready. It includes a cinematic hero, animated background, particle system, cursor interaction, 3D project showcase, interactive terminal, local AI-style assistant, command palette, fake IDE preview, animated timeline, theme persistence, and custom accent colors.

## Setup

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run check
npm run build
npm run preview
```

## Architecture

- `src/routes/+layout.svelte` wires global UI: navigation, preloader, animated background, cursor field, command palette, and page shell.
- `src/routes/+page.svelte` composes the homepage narrative: hero, project grid, 3D showcase, terminal, assistant, IDE preview, timeline, and quality section.
- `src/routes/projects/+page.svelte` provides dynamic project filtering with category tabs and technology filters.
- `src/lib/data/projects.ts` keeps project metadata centralized so cards and showcase stay in sync.
- `src/lib/components/*` contains reusable UI pieces for animation, navigation, cards, assistant, terminal, timeline, and theme controls.

## Animation Decisions

Animations are intentional and lightweight:

- Hero content uses staggered entrance animation.
- Background particles and shader-like gradients are CSS-based to avoid heavy WebGL cost.
- Project cards use transform-only 3D hover states.
- The 3D showcase uses perspective and transform instead of an expensive canvas scene.
- Page reveal, modal entry, preloader, timeline, and cursor effects are short and consistent.
- `prefers-reduced-motion` disables or minimizes motion-heavy effects.

## Performance Optimization

- Project screenshots are optimized SVG assets in `static/projects`.
- Images use `loading="lazy"`, `decoding="async"`, and fixed dimensions.
- Routes are naturally split by SvelteKit.
- No remote tracking, analytics, third-party AI calls, or exposed API keys.
- Interactions are local, avoiding network latency and external integration risk.
- Animations are mostly opacity and transform for smooth rendering.

## Accessibility Considerations

- Navigation is keyboard-accessible and includes a mobile menu.
- Focus states are visible across interactive controls.
- Project modals use `role="dialog"` and `aria-modal`.
- Terminal and assistant fields have labels and sanitized input.
- Theme and accent controls have accessible labels.
- Content hierarchy uses clear headings, sections, and descriptive link text.

## Security And Stability

- Terminal and assistant sanitize input and never execute shell commands.
- Contact form sanitizes values before creating the mailto URL.
- No secrets are stored in the repository.
- Project links use internal paths to avoid broken placeholder URLs while remaining easy to replace.
- Image loading and error states are handled in project cards.

## Trade-Offs

- The portfolio uses CSS-based 3D and shader-like effects instead of Three.js to keep bundle size and Lighthouse performance stronger.
- The AI assistant is local and rules-based, not connected to an external model, so there are no exposed API keys or data transmission risks.
- Project screenshots are SVG placeholders with final paths ready for replacement.

---

## License

Built for the HNGi14 internship Task.

## Author

Racheal I. Ogunmodede (TechNurse)

Markdown

# TechNurse Interactive Portfolio

An immersive, high-end editorial developer portfolio built with a brutalist-minimalist design aesthetic. This workspace is engineered for strict performance profiles, zero-jank transitions, and clear semantic structural layouts.

Featuring an asymmetrical typographic layout, a dedicated architectural developer console sandbox, and fully native interactive layout nodes.

---

## 🛠️ Tech Stack & Design System

- **Framework Core:** SvelteKit (TypeScript)
- **Style Engine:** Tailwind CSS v4 (Using modern raw `@theme` CSS specifications)
- **Motion Framework:** Motion One (`motion`) for native Web Animations API performance
- **Visual Elements:** Lucide Svelte for structural system indicators

---

## 🏗️ Project Architecture

```text
├── src/
│   ├── lib/
│   │   ├── animations/
│   │   │   └── scrollReveal.ts      # Custom viewport element entry configurations
│   │   ├── components/
│   │   │   ├── AccentPicker.svelte  # Runtime layout tint mutator
│   │   │   ├── Assistant.svelte     # Rule-based local prompt sandbox
│   │   │   ├── CommandPalette.svelte# System global navigation modal
│   │   │   ├── ContactForm.svelte   # Sanitized structural mailto link builder
│   │   │   ├── CursorField.svelte   # Native micro-interaction event listener
│   │   │   ├── DevConsole.svelte    # DEDICATED SANDBOX WORKSPACE SECTION
│   │   │   ├── Hero.svelte          # Editorial typographic branding block
│   │   │   ├── Nav.svelte           # Accessible responsive header navigation
│   │   │   ├── Particles.svelte     # Lightweight canvas simulation
│   │   │   ├── Preloader.svelte     # Initial system state layout loader
│   │   │   ├── ProjectCard.svelte   # Geometric perspective showcase component
│   │   │   └── ThemeToggle.svelte   # Persistent state switcher
│   │   ├── server/
│   │   │   └── github.ts            # Server-side repository fetch subsystem
│   │   └── stores/
│   │       └── theme.ts             # Global layout state context management
│   ├── app.css                      # Editorial slate-monochrome framework configuration
│   ├── app.html                     # Root semantic document frame
│   └── routes/
│       ├── +layout.svelte           # Shell wrapper orchestrating core utilities
│       ├── +page.svelte             # Sequential home narrative composition
│       └── projects/
│           └── +page.svelte         # Dynamic metadata tabular grid interface
├── static/                          # Production assets and media declarations
├── svelte.config.js                 # Unified framework adapter configurations
└── vite.config.ts                   # Fast module compilation manager
⚡ Setup & Development
Initialize environment and dependencies:

Bash
npm install
Boot local development environment with hot module replacement:

Bash
npm run dev
Production Validation Pipeline
Always verify compilation integrity before running deployments:

Bash
# Verify component typing and template validity
npm run check

# Build optimized client bundles and routing tables
npm run build

# Local evaluation of production production-ready build output
npm run preview
📐 Key Engineering Decisions
1. Visual Isolation Strategy
Following high-end editorial aesthetics, the portfolio rejects legacy soft blurred background blobs and complex layout fills. Instead, components sit directly on an explicit, hard geometric linear background grid (.editorial-canvas) utilizing clean structural lines, dark monochrome interfaces, and sharp technical shadows (.brutalist-shadow).

2. Dedicated DevConsole Workspace
The DevConsole component is decoupled from the Hero section and exists as an independent, full-width workspace node. This ensures the landing interface remains lightweight and content-focused, while providing a clear desktop-style sandbox context below it.

3. Lightweight Interaction Framework
No WebGL/Three.js overhead: Flat CSS transforms, perspective matrix fields, and lightweight particle arrays handle deep spatial interaction without hitting GPU thresholds.

Hardware Acceleration: Layout animations rely entirely on composite properties (transform, opacity) via Motion One to skip layout/paint passes.

Accessibility First: Focus rings are structurally mapped to matching component accents; modal dialog targets implement explicit ARIA boundaries (role="dialog", aria-modal), and keyboard navigation handles all shell input seamlessly.

4. Zero-Trust Sandbox Isolation
The integrated Bash terminal core strictly intercepts all buffer inputs locally. Commands like projects, stack, and clear perform direct UI/route manipulation via rules-based evaluations, bypassing any internal string interpolation vulnerabilities.

⚖️ Trade-offs and Constraints
Local Rule-Based Sandbox Assistant: To enforce strict client data privacy and eliminate runtime latency or broken external dependencies, the assistant works entirely off pre-configured matching keywords rather than remote LLM calls.

Vector Media Optimization: Built-in project thumbnails leverage scalable vector asset formats inside /static, maintaining crisp resolution and near-zero byte costs across retina screens.
```
