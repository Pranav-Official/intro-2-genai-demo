# GenAI Workshop Presentation Website - Project Plan

## What We've Done

### 1. Design System Setup

- Created **"Neural Light"** theme with:
  - Background: `#FAFAFA` (light) / `#09090B` (dark)
  - Primary Accent: Electric Violet `#7C3AED`
  - Secondary Accent: Cyan `#0891B2`
  - Typography: Sora (headings), IBM Plex Sans (body), JetBrains Mono (code)
- Updated `src/styles.css` with CSS variables and design tokens

### 2. Routes Created

- `/` - Homepage with workshop overview and session cards
- `/foundations` - Foundations topic page (The Probabilistic Engine)
- `/foundations/tokens` - Tokens & Constraints sub-topic
- `/foundations/nondet` - Non-Deterministic Nature sub-topic
- `/foundations/prompting` - Prompt Engineering for Devs sub-topic

### 3. Content Pages Created

- **Homepage**: Workshop title, session cards (4 sessions), prerequisites
- **Foundations**: Topic overview with 3 sub-topic cards
- **Tokens Page**: What tokens are, context window limitations, token economics
- **Non-Determinism Page**: Temperature settings, reproducibility strategies, code examples
- **Prompting Page**: Chain-of-Thought, Few-Shot for TypeScript & SQL

### 4. Components Updated

- `Header.tsx` - Updated branding to "GenAI Workshop"
- `Footer.tsx` - Updated to workshop branding
- `__root.tsx` - Updated page title

### 5. Documentation

- Updated `AGENTS.md` with design system details and routing structure

---

## Current Issue

**Routing Problem**: The nested routes (`/foundations/tokens`, `/foundations/nondet`, `/foundations/prompting`) are not rendering their content correctly. The server returns the parent `/foundations` page instead of the child pages.

This appears to be a TanStack Router file-based routing issue where the child routes in the `/foundations/` directory are not being properly recognized as children of the parent `/foundations` route.

---

## Further Plan

### Phase 1: Fix Routing (Priority: High)

- [x] Debug and fix the TanStack Router nested route configuration
- [x] Ensure `/foundations/tokens`, `/foundations/nondet`, `/foundations/prompting` render correctly

### Phase 2: Additional Pages (Priority: Medium)

- [ ] Create remaining workshop session pages:
  - `/patterns` - AI Engineering Patterns (RAG, agents, tool use)
  - `/tooling` - Tooling & Infrastructure
  - `/hands-on` - Hands-on Workshop

### Phase 3: Polish (Priority: Medium)

- [ ] Add more content/examples to existing pages
- [ ] Improve code examples with syntax highlighting
- [ ] Add navigation breadcrumbs
- [ ] Ensure mobile responsiveness

### Phase 4: Testing & Deployment (Priority: Low)

- [ ] Test all routes work correctly
- [ ] Run lint and type checks
- [ ] Build for production

---

## File Structure

```
src/
├── routes/
│   ├── index.tsx              # Homepage
│   ├── about.tsx              # About page (existing)
│   ├── foundations.tsx        # Parent route
│   └── foundations/
│       ├── tokens.tsx         # Tokens sub-topic
│       ├── nondet.tsx         # Non-determinism sub-topic
│       └── prompting.tsx      # Prompt engineering sub-topic
├── components/
│   ├── Header.tsx             # Updated branding
│   ├── Footer.tsx             # Updated branding
│   └── ThemeToggle.tsx        # Theme switcher
├── styles.css                 # Design system tokens
├── router.tsx                 # Router config
└── routeTree.gen.ts           # Auto-generated routes
```

---

## Running the Project

```bash
npm run dev     # Start development server on port 3000
npm run build   # Build for production
npm run lint    # Run linting
npm run check   # Format and lint fix
```
