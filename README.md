# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# Portfolio Website - Architecture Documentation

## Overview
A premium cinematic scroll-driven developer portfolio built with React 19, Vite, Tailwind CSS v4, GSAP ScrollTrigger, and Lenis smooth scrolling.

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 19 |
| Build Tool | Vite | 6+ |
| Styling | Tailwind CSS | v4 |
| Animation | GSAP + ScrollTrigger | 3.12+ |
| Smooth Scroll | Lenis | 1.1+ |
| Language | JavaScript (ESM) | ES2024 |

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── projects/
│   │   ├── jarvis.svg
│   │   ├── ai-gallery.svg
│   │   ├── ocr-braille.svg
│   │   ├── mini-llm.svg
│   │   └── portfolio.svg
│   └── certificates/
│       ├── ai-ml.svg
│       ├── fullstack.svg
│       ├── python.svg
│       └── dsa.svg
├── src/
│   ├── animations/
│   │   └── gsapUtils.js          # Reusable GSAP animation utilities
│   ├── components/
│   │   ├── UI/
│   │   │   ├── LoadingScreen.jsx # Initial loading experience
│   │   │   ├── ScrollProgress.jsx # Global scroll progress bar
│   │   │   └── Cursor.jsx        # Custom cursor (CSS-based)
│   │   ├── Navigation/
│   │   │   └── Navigation.jsx    # Responsive nav with scroll spy
│   │   ├── Hero/
│   │   │   └── Hero.jsx          # Cinematic hero with parallax
│   │   ├── About/
│   │   │   └── About.jsx         # About section with timeline
│   │   ├── Skills/
│   │   │   └── Skills.jsx        # Animated skill cards
│   │   ├── Experience/
│   │   │   └── Experience.jsx    # Work experience timeline
│   │   ├── Projects/
│   │   │   └── Projects.jsx      # Pinned project showcase
│   │   ├── Certifications/
│   │   │   └── Certifications.jsx # Horizontal cert gallery
│   │   ├── GitHub/
│   │   │   └── GitHub.jsx        # GitHub stats & repos
│   │   └── Contact/
│   │       └── Contact.jsx       # Contact form & CTA
│   ├── data/
│   │   └── portfolioData.js      # Single source of truth
│   ├── hooks/
│   │   └── useAnimations.js      # Custom React hooks for GSAP
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles + Tailwind v4
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
└── ARCHITECTURE.md
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        portfolioData.js                      │
│  (Single Source of Truth: personalInfo, skills, experience, │
│   projects, certifications, githubStats, navigation, social) │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  Hero    │    │  About   │    │ Skills   │
    │ Component│    │ Component│    │ Component│
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │               │
    ┌────┴─────┐    ┌────┴─────┐    ┌────┴─────┐
    │useGSAP() │    │useGSAP() │    │useGSAP() │
    │Hook      │    │Hook      │    │Hook      │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │               │
    ┌────┴───────────────┴───────────────┴─────┐
    │          GSAP Context & ScrollTrigger      │
    │  (Centralized animation lifecycle mgmt)    │
    └─────────────────────┬──────────────────────┘
                          │
                 ┌────────┴────────┐
                 ▼                 ▼
          ┌──────────┐       ┌──────────┐
          │  Lenis   │       │  Lenis   │
          │ Smooth   │       │ Scroll   │
          │ Scroll   │       │ Events   │
          └──────────┘       └──────────┘
```

---

## Component Architecture

### 1. Core Animation Layer

#### `src/animations/gsapUtils.js`
**Purpose**: Reusable animation utilities - no React dependencies

```javascript
// Exports:
- prefersReducedMotion()           // Check OS preference
- createScrollTrigger(config)      // Safe ScrollTrigger factory
- gsapContext(scope, callback)     // GSAP context wrapper
- animateTextReveal(elements, opts) // Staggered text reveal
- animateScaleReveal(elements, opts) // Scale + fade reveal
- animateParallax(element, speed)  // Parallax movement
- animatePin(element, options)     // Pin element on scroll
- animateHorizontalScroll()        // Horizontal carousel
- animateCounter(element, value)   // Number counter
- splitTextLines/Words/Chars()     // Text splitting utilities
- killAllScrollTriggers()          // Cleanup
- refreshScrollTrigger()           // Refresh
- matchMedia(queries, callbacks)   // GSAP matchMedia wrapper
```

#### `src/hooks/useAnimations.js`
**Purpose**: React hooks wrapping GSAP with proper cleanup

```javascript
// Exports:
- useGSAP(callback, deps)              // GSAP context with cleanup
- useScrollTrigger(config, deps)       // ScrollTrigger with auto-cleanup
- useParallax(speed, options)          // Parallax hook
- useMediaQuery(query)                 // CSS media query hook
- useReducedMotion()                   // Reduced motion hook
- useScrollPosition()                  // {x, y, progress}
- useScrollProgress()                  // 0-1 scroll progress
- useIntersectionObserver(options)     // Intersection observer
- useAnimationFrame(callback)          // rAF loop with cleanup
- useLeninSmoothScroll()               // Lenis initialization (deprecated - use App)
```

---

### 2. UI Components

#### `src/components/UI/LoadingScreen.jsx`
- **Duration**: 300ms
- **Animations**: CSS-based (fade-in, slide-up, load-bar)
- **Features**: No GSAP dependency, auto-complete fallback

#### `src/components/UI/ScrollProgress.jsx`
- **Position**: Fixed top, 1px height
- **Style**: Gradient (primary → cyan → primary)
- **Performance**: Uses `useScrollProgress()` hook

#### `src/components/UI/Cursor.jsx`
- **Implementation**: Pure CSS + single rAF loop (no GSAP)
- **Disabled by default** in App.jsx (`enableCursor: false`)
- **Respects**: `prefers-reduced-motion`, touch devices

---

### 3. Navigation

#### `src/components/Navigation/Navigation.jsx`
- **Features**:
  - Scroll spy (highlights active section)
  - Smooth scroll to sections
  - Mobile hamburger menu
  - Social links (GitHub, LinkedIn)
  - Glass morphism on scroll
  - Right-side scroll progress indicator

---

### 4. Page Sections (in scroll order)

#### `src/components/Hero/Hero.jsx`
- **Height**: 100vh
- **Animations**:
  - Name: yPercent -150%, scale 0.6, fade
  - Subtitle: yPercent -100%, fade
  - Description: yPercent -80%, fade
  - Background: parallax yPercent 30%, scale 1.1
  - Particles: yPercent 50%, fade
- **ScrollTrigger**: scrub 0.6, end: "center top"
- **Particles**: 10 CSS-animated particles (no GSAP loop)

#### `src/components/About/About.jsx`
- **Layout**: Two-column (text + visual/cards)
- **Animations**: scrub 0.6, durations 0.5-1s
- **Parallax**: Image yPercent 20%

#### `src/components/Skills/Skills.jsx`
- **Layout**: Grouped by category (5 groups)
- **Animations**: Staggered cards, skill bars with CSS transitions
- **Scrub**: 0.6

#### `src/components/Experience/Experience.jsx`
- **Layout**: Alternating timeline
- **Animations**: scrub 1, timeline line scaleY

#### `src/components/Projects/Projects.jsx`
- **Feature**: Pinned stage (500% height)
- **Mechanism**: 5 project cards scale/opacity via ScrollTrigger
- **Active tracking**: Single scroll listener updates `activeProject`
- **Detail panel**: Updates based on active project

#### `src/components/Certifications/Certifications.jsx`
- **Layout**: Horizontal scrolling gallery
- **Animation**: `animateHorizontalScroll` + card reveals

#### `src/components/GitHub/GitHub.jsx`
- **Stats**: Animated counters (onEnter)
- **Languages**: Animated progress bars
- **Repos**: Top 5 repositories

#### `src/components/Contact/Contact.jsx`
- **CTA**: Large "LET'S BUILD SOMETHING INTELLIGENT"
- **Form**: Controlled inputs, submit simulation
- **Social**: 4 contact methods

---

## Animation Architecture

### ScrollTrigger Patterns Used

```javascript
// 1. Scrubbed timeline (continuous)
gsap.timeline({
  scrollTrigger: { trigger, start, end, scrub: 0.6 }
});

// 2. Pin section
ScrollTrigger.create({
  trigger: element,
  start: "top top",
  end: "+=500%",
  pin: true,
  pinSpacing: true
});

// 3. Parallax
gsap.to(element, {
  yPercent: -100 * speed,
  ease: "none",
  scrollTrigger: { trigger, start, end, scrub: 1 }
});

// 4. Horizontal scroll
gsap.to(items, {
  xPercent: -100 * (items.length - 1) * speed,
  ease: "none",
  scrollTrigger: { trigger: container, scrub: 1 }
});

// 5. OnEnter/Leave callbacks (for counters)
ScrollTrigger.create({
  trigger: section,
  onEnter: () => animateCounters(),
  onEnterBack: () => animateCounters()
});
```

### Reduced Motion Strategy
```javascript
// In every useGSAP/useEffect:
if (prefersReducedMotion()) {
  // Set final states immediately
  gsap.set(elements, { opacity: 1, y: 0, scale: 1 });
  return;
}

// CSS fallback:
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

## Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **Code Splitting** | Lenis lazy-loaded via dynamic import |
| **GSAP Context** | `gsap.context()` for automatic cleanup |
| **Particle Reduction** | 10 CSS particles (was 30 GSAP) |
| **Cursor** | Pure CSS + single rAF (disabled default) |
| **Image Loading** | `loading="lazy"` on all images |
| **Scroll Listeners** | `{ passive: true }` |
| **Bundle Size** | ~417KB JS, ~49KB CSS (gzipped: 131KB / 8KB) |

---

## Key Files Reference

### Entry Points
- `src/main.jsx` - React root, StrictMode
- `src/App.jsx` - App shell, Lenis init, providers
- `index.html` - SEO meta, font preloads, CSP-ready

### Configuration
- `vite.config.js` - Vite config
- `postcss.config.js` - Tailwind v4 PostCSS plugin
- `tailwind.config.js` - **Not used** (Tailwind v4 uses CSS-first `@theme`)

### Styling
- `src/index.css` - All styles via `@import "tailwindcss"` + `@theme` + `@layer`

---

## Deployment

```bash
# Development
npm run dev          # http://localhost:5173

# Production Build
npm run build        # Outputs to dist/

# Preview Build
npm run preview
```

**Vercel**: Zero-config deploy. `dist/` is publish directory.

---

## Adding New Sections

1. Add data to `src/data/portfolioData.js`
2. Create component in `src/components/SectionName/SectionName.jsx`
3. Use `useGSAP` hook with `prefersReducedMotion()` guard
4. Import and add to `App.jsx` in scroll order
5. Add to `navigation` array in `portfolioData.js`

---

## Browser Support

| Feature | Support |
|---------|---------|
| GSAP ScrollTrigger | All modern browsers |
| Lenis Smooth Scroll | Chrome 80+, Firefox 75+, Safari 14+ |
| CSS Grid/Flexbox | All modern browsers |
| Backdrop Filter | Chrome 76+, Firefox 70+, Safari 14+ |
| CSS Custom Properties | All modern browsers |

---

## Accessibility

- ✅ Semantic HTML5
- ✅ ARIA labels on interactive elements
- ✅ Focus visible states
- ✅ `prefers-reduced-motion` respected
- ✅ Keyboard navigation
- ✅ Alt text on images
- ✅ Color contrast (WCAG AA)
- ✅ `scroll-behavior: smooth` with reduced-motion fallback

---

## Future Enhancements

- [ ] Add project detail modal (click card → expand)
- [ ] Implement blog/posts section
- [ ] Add theme toggle (dark/light)
- [ ] WebGL background (Three.js) for Hero
- [ ] Service Worker for offline support