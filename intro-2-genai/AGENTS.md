# AGENTS.md - Project Context: intro-2-genai

This document provides essential context and instructions for the `intro-2-genai` project, a GenAI workshop presentation website built with **TanStack Start**.

## Project Overview

`intro-2-genai` is a workshop presentation deck website for teaching "GenAI for Software Engineering". It features a presentation-style layout with topic navigation.

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19)
- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Build Tool:** [Vite v7](https://vitejs.dev/)
- **Server Engine:** [Nitro](https://nitro.unjs.io/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Language:** TypeScript

## Design System: "Neural Light"

### Color Palette (CSS Variables in styles.css)

- **Background Base:** `#FAFAFA` (light) / `#09090B` (dark)
- **Surface:** `#FFFFFF` (light) / `#18181B` (dark)
- **Primary Accent:** `#7C3AED` (Electric Violet)
- **Secondary Accent:** `#0891B2` (Cyan)
- **Text Primary:** `#18181B` (light) / `#FAFAFA` (dark)
- **Text Secondary:** `#52525B` (light) / `#A1A1AA` (dark)
- **Border:** `#E4E4E7` (light) / `#27272A` (dark)

### Typography (Google Fonts)

- **Headings:** Sora (font-display)
- **Body:** IBM Plex Sans (font-sans)
- **Code:** JetBrains Mono (font-mono)

## Architecture & Structure

### Routes

- `/` - Homepage (Workshop overview with session cards)
- `/foundations` - The Probabilistic Engine topic (9:00 AM - 10:30 AM)
- `/foundations/tokens` - Tokens & Constraints sub-topic
- `/foundations/nondet` - Non-Deterministic Nature sub-topic
- `/foundations/prompting` - Prompt Engineering sub-topic

### Components

- `src/components/Header.tsx` - Site header with navigation
- `src/components/Footer.tsx` - Site footer
- `src/components/ThemeToggle.tsx` - Theme switcher (Light/Dark/Auto)
- `src/styles.css` - Global styles with design tokens

## Development Workflow

### Key Commands

- `npm run dev`: Starts the development server on **port 3000**. **Assume this command is always running in the background unless explicitly stated otherwise.**
- `npm run build`: Generates a production-ready build.
- `npm run preview`: Previews the production build locally.
- `npm run test`: Executes the test suite via Vitest.
- `npm run lint`: Performs static analysis check.
- `npm run check`: Automatically formats files and fixes linting issues (`prettier --write && eslint --fix`).

### Conventions & Style

- **Routing:** Use file-based routing in `src/routes/`. Create nested routes as subdirectories (e.g., `src/routes/foundations/tokens.tsx`).
- **Imports:** Use the `#/*` alias for clean imports from the `src` directory.
- **Styling:** Prefer Tailwind CSS utility classes with custom CSS variables from the design system.
- **Theming:** Use CSS variables defined in `styles.css` (`var(--accent-primary)`, `var(--text-secondary)`, etc.)
- **Cards:** Use the `.card` class for content cards with hover effects.
- **Animations:** Use `.rise-in` class and `.stagger-N` for staggered entrance animations.

### Content Guidelines

- Use clear, hierarchical headings (display-title for main, section-title for sections)
- Include time badges for workshop sessions
- Use topic badges for labels
- Include code examples in `<pre><code>` blocks with JetBrains Mono
- Use icons from lucide-react for visual cues

## Dependencies

The project relies on:

- `@tanstack/react-router` & `@tanstack/react-start` for core logic.
- `lucide-react` for iconography.
- `vitest` & `@testing-library/react` for quality assurance.
