# GEMINI.md - Project Context: intro-2-genai

This document provides essential context and instructions for the `intro-2-genai` project, a modern web application built with **TanStack Start**.

## Project Overview

`intro-2-genai` is a high-performance, type-safe React application leveraging the latest TanStack ecosystem. It is designed for seamless full-stack development with a focus on developer experience and modern web standards.

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19)
- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Build Tool:** [Vite v7](https://vitejs.dev/)
- **Server Engine:** [Nitro](https://nitro.unjs.io/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Language:** TypeScript

## Architecture & Structure

- `src/routes/`: **File-based routing** directory.
  - `__root.tsx`: Defines the global layout, HTML document structure, and shared providers.
  - `index.tsx`: The application's landing page (`/`).
  - `about.tsx`: The about page (`/about`).
- `src/components/`: Reusable UI components (e.g., `Header`, `Footer`, `ThemeToggle`).
- `src/router.tsx`: Router initialization and configuration.
- `src/styles.css`: Global styles, CSS variables, and Tailwind CSS directives.
- `vite.config.ts`: Vite configuration including plugins for TanStack Start, Tailwind, and Nitro.

## Development Workflow

### Key Commands

- `npm run dev`: Starts the development server on **port 3000**. **Assume this command is always running in the background unless explicitly stated otherwise.**
- `npm run build`: Generates a production-ready build.
- `npm run preview`: Previews the production build locally.
- `npm run test`: Executes the test suite via Vitest.
- `npm run lint`: Performs static analysis check.
- `npm run check`: Automatically formats files and fixes linting issues (`prettier --write && eslint --fix`).

## Design & Accessibility Mandates

- **Contrast-First:** Every piece of text, chip, or badge must meet WCAG AA standards. Never use light text on light backgrounds or vice-versa.
- **Light Mode Prioritized:** All new features and UI elements must be thoroughly checked in light mode. Do not rely on transparency (`/10` or `/20`) if the resulting contrast is low.
- **Color Variables:** Always use theme-aware variables (`--text-primary`, `--accent-primary`, etc.) instead of hardcoded colors or Tailwind color utilities unless they are explicitly tuned for both modes (e.g., the `status-badge` classes in `src/styles.css`).

### Conventions & Style

- **Routing:** Use file-based routing in `src/routes/`. TanStack Router automatically generates types for routes.
- **Imports:** Use the `#/*` alias for clean imports from the `src` directory (configured in `package.json` and `tsconfig.json`).
- **Styling:** Prefer Tailwind CSS utility classes. Custom theme variables and visual tokens are managed in `src/styles.css`.
- **Theming:** The application supports Light, Dark, and Auto modes, managed via a `ThemeToggle` component and a root CSS class.
- **Testing:** Add tests in `src/` (or adjacent to components) using `.test.tsx` or `.spec.tsx` extensions.

## Dependencies

The project relies on:
- `@tanstack/react-router` & `@tanstack/react-start` for core logic.
- `lucide-react` for iconography.
- `vitest` & `@testing-library/react` for quality assurance.
