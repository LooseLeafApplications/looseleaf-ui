# LooseLeaf UI Component Library

To empower lean, agile engineering teams to compose intrinsically responsive, performance-first user interfaces instantly. By utilising composable layout primitives that respect typographic boundaries (capped at `60ch`), LooseLeaf UI eliminates manual layout overrides and minimises ongoing maintenance overhead for small development footprints.

---

## 📋 Table of Contents

1. [📖 Project Philosophy & Principles](#philosophy)
2. [📦 Installation & Integration](#installation)
3. [🗺️ Tier 1: Core Axioms & Harmonics](#tier-1)
4. [🧩 Tier 2: Layout Primitives](#tier-2)
5. [✨ Tier 3: Functional Atoms](#tier-3)
6. [🏗️ Tier 4: Macro-Compositions](#tier-4)
7. [🔧 Tier 4: Utility Classes](#tier-4u)
8. [🧪 Quality Assurance & Browser Matrix](#qa)
9. [🏗️ Development Log & Credits](#dev-log)

Link to GitHub Pages sandbox deployment: [https://stockol.github.io/looseleaf-ui/]

## 1. <a name="philosophy"></a> 📖 Project Philosophy & Principles

To establish a system that scales successfully, we must document for whom we are building and for why. A shared language is fundamental to collaboration, ensuring the system image bridges the gap to the user's mental model.

### 🎯 System Core Purpose:

“To empower engineers to compose intrinsically responsive, performance-first user interfaces instantly, using composable layout primitives that respect typographic boundaries and eliminate manual layout overrides.”

### 👤 User Stories

- **As a developer on a lean engineering team,** I want a layout framework with minimal maintenance overhead, so that our small team can rapidly scale the product without spending critical sprint cycles maintaining complex component configurations.
  - _Acceptance Criterion:_ The system must rely strictly on native browser capabilities (CSS Custom Properties and Custom Elements) rather than heavy JavaScript dependencies.
- **As a Frontend Engineer,** I want to compose layout structures using unified HTML elements without writing custom, non-DRY utility classes or complex grid overrides for every new view.
  - _Acceptance Criterion:_ Layout elements must manage spacing purely using internal custom properties and direct-child selectors, leaving child components entirely free of hardcoded margins.
- **As a UI Designer,** I want a strict, centralised token schema for spacing and typography based on a mathematical scale, ensuring visual harmony across all views without layout degradation.
  - _Acceptance Criterion:_ When local `--scale-ratio` modifiers are overridden, all internal font sizes and margins must recalculate harmoniously.
- **As an End User,** I want an interface that automatically scales to my device constraints and honours my browser zoom configuration perfectly, mitigating data loss or obscured content.
  - _Acceptance Criterion:_ When browser zoom increases to 200%, the layout scales fluidly without overlapping text or horizontal scrollbars on standard text-bound rows.

### 🔬 Strategic Research

| Core Metric/Strategy    | Traditional Frameworks                                                | LooseLeaf UI Architecture                                                                     |
| :---------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Layout Philosophy**   | Extrinsic & Device-Bound (Uses viewport-driven `@media` breakpoints). | Intrinsic & Content-Bound (Algorithmic constraints like `flex-basis` and `min()`).            |
| **Box Model**           | Often overridden locally; prone to layout calculation bloat.          | Universal strict `border-box` reset globally applied using wildcard `*`.                      |
| **Typographic Control** | Fluid text sizing requires complex breakpoint scaling rules.          | Self-governing scale bounded to strict line-height fractions and a maximum measure of `60ch`. |
| **Code Footprint**      | High namespacing overhead or massive HTML class strings.              | Lean composition via Custom Elements; high global reach with minimal semantic inheritance.    |

---

## 2. <a name="installation"></a> 📦 Installation & Integration

LooseLeaf UI is designed to be a drop-in toolkit rather than a heavy compiled framework.

### Local Integration

1. Clone the repository into your project structure.
2. Link the core CSS files in your `<head>` in the following strict cascade order:
   - `00-harmonics.css` (Resets, Tokens, and Modular Scale)
   - `01-primitives.css` (Stack, Cluster, Sidebar, Grid, Switcher, Reel)
   - `02-atoms.css` (Buttons, Inputs)
   - `03-organisms.css` (Navigation, Footer)

---

## 3. <a name="tier-1"></a> 🗺️ Tier 1: Core Axioms & Harmonics

Before we define individual layout primitives or components, LooseLeaf UI establishes a set of global, immutable rules. These ensure predictable sizing, readable text, and a mathematically harmonious layout scale, much like the regular frequencies of a harmonic series in music.

### 1. Global Resets & The Measure Axiom

- **The Box Model Reset (`border-box`):** Eliminates unexpected sizing changes when adding padding or borders.
- **Margin Collapse & Leakage Prevention (`margin-block: 0`):** Prevents a child element's vertical margins from breaking out and altering the parent container's spacing.
- **The Typographic Measure Boundary (`max-inline-size: 60ch`):** Ensures text never stretches past the optimal reading length, maintaining strict readability.

```css
/* 1. Global Box Model & Margin Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin-block: 0;
}

/* 2. Document Level Constraints */
html,
body {
  min-inline-size: 100%;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: var(--color-text-base);
}

/* 3. Typographic Measure with Inverted Control */
p,
li,
h1,
h2,
h3,
h4,
h5,
h6 {
  max-inline-size: var(--element-measure, 60ch);
}
```

### 2. The Fluid Modular Scale

Hardcoding font sizes and margins (e.g., 16px, 24px) leads to visual inconsistency. We use a mathematical scale based on a fundamental base frequency (`--s0`) and a harmonic ratio (`1.5`).

```css
:root {
  /* The Harmonic Ratio */
  --scale-ratio: 1.5;

  /* Fluid Baseline Tonic (--s0) */
  --s0: clamp(1rem, 0.8rem + 1vw, 1.25rem);

  /* The Expanding Scale */
  --s1: calc(var(--s0) * var(--scale-ratio));
  --s2: calc(var(--s1) * var(--scale-ratio));
  --s3: calc(var(--s2) * var(--scale-ratio));

  /* The Contracting Scale */
  --s-1: calc(var(--s0) / var(--scale-ratio));
  --s-2: calc(var(--s-1) / var(--scale-ratio));

  /* --- The Contracting Modular Scale (Division) --- */
  --s-1: calc(var(--s0) / var(--scale-ratio));
  --s-2: calc(var(--s-1) / var(--scale-ratio));

  /* --- Universal Layout Constraints --- */
  --measure: 60ch;
}
```

### 3. Semantic Colour Tokens

Colours are named strictly by their structural purpose in the UI rather than their visual hue, ensuring effortless theming and dark mode integration.

```css
:root {
  --color-surface-base: #ffffff;
  --color-surface-sunken: #f4f4f5;
  --color-text-base: #18181b;
  --color-action-primary: #0070f3;
  --color-border-subtle: #e4e4e7;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface-base: #18181b;
    --color-text-base: #ffffff;
  }
}
```

---

## 4. <a name="tier-2"></a> 🧩 Tier 2: Layout Primitives

Layout primitives handle the invisible structure of the application. They are algorithmically self-governing and devoid of cosmetic styling.

### The Stack (`l-stack`)

Injects a uniform vertical margin between consecutive sibling elements, using the lobotomised owl selector (`* + *`).

```css
l-stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
l-stack > * + * {
  margin-block-start: var(--space, var(--s1));
}
```

### The Cluster (`l-cluster`)

Groups elements side-by-side, wrapping gracefully using the `gap` property, completely bypassing media queries.

```css
l-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, var(--s1));
  justify-content: flex-start;
  align-items: var(--cluster-align, center);
}
```

### The Sidebar (`l-sidebar`)

Places a fixed-width element next to a fluid element, wrapping into a vertical stack intrinsically when the container drops below a defined threshold (`50%` by default).

```css
l-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, var(--s1));
}
l-sidebar > :first-child {
  flex-basis: var(--side-width, 15rem);
  flex-grow: 1;
}
l-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--main-min-width, 50%);
}
```

### The Grid (`l-grid`)

An intrinsic grid that calculates its own column count based on available space, expanding and wrapping smoothly without breakpoints.

```css
l-grid {
  display: grid;
  gap: var(--space, var(--s1));
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--grid-min, 15rem), 100%), 1fr)
  );
}
```

### The Reel (`l-reel`)

A native horizontal scrolling container leveraging CSS scroll-snap physics to prevent "dead zones" between items.

```css
l-reel {
  display: flex;
  gap: var(--space, var(--s1));
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  padding-block-end: 1rem;
}
l-reel > * {
  scroll-snap-align: start;
}
```

### The Switcher (`l-switcher`)

A mathematical toggle that forces elements to remain in a single row until the container drops below a threshold, instantly switching to a vertical stack to prevent orphaned grid items.

```css
l-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, var(--s1));
}
l-switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--threshold, 40rem) - 100%) * 999);
}
```

---

## 5. <a name="tier-3"></a> ✨ Tier 3: Functional Atoms

Atoms are the smallest indivisible functional patterns. They handle their own intrinsic styling (padding, colours, interactive states) but **never** dictate their own external layout (margins or positioning).

### The Button (`.c-button`)

**1. Architectural Overview**
A universal interactive trigger used for submitting forms, confirming actions, or linking to primary routes.

- **Primitives Used:** None (Atom).
- **JS Required:** **No**.
- **Dark Mode Implications:** Relies strictly on semantic colour tokens (`--color-action-primary`, `--color-surface-base`) to invert automatically.

**2. Accessibility (a11y) Advisories**

- If used as a link, use an `<a>` tag with the `.c-button` class. If triggering an on-page action, use a `<button>` tag.
- Ensure focus states (`:focus`, `:focus-visible`) are clearly defined for keyboard navigation.

**3. Variables Available**

- Inherits fluid typography directly from `--s0`.

**4. Implementation (HTML Structure)**

```html
<button class="c-button" data-loudness="cheer" type="submit">
  Primary Action
</button>
<a href="/" class="c-button" data-loudness="murmur">Secondary Link</a>
```

**5. CSS Requirement**
_(See `02-atoms.css` for full implementation of visual loudness variants)._

### Form Inputs (`.c-input`, `.c-label`)

**1. Architectural Overview**
Unified data-entry fields that strip away inconsistent browser defaults and rebuild the UI using our fluid scale.

- **Primitives Used:** None intrinsically, but must be composed within an `<l-stack>` for vertical rhythm.
- **JS Required:** **No** (unless adding custom validation).
- **Dark Mode Implications:** Input backgrounds map to `--color-surface-base` and borders to `--color-border-subtle`.

**2. Accessibility (a11y) Advisories**

- Every `.c-input` **must** have a corresponding `.c-label`.
- The `for` attribute on the label must explicitly match the `id` of the input.
- Setting `font-size: var(--s0)` (which defaults to minimum 16px) is critical to prevent the jarring auto-zoom behaviour in iOS Safari.

**3. Variables Available**

- Inherits structural spacing from `--s-1` and `--s-2`.

**4. Implementation (HTML Structure)**

```html
<div>
  <label class="c-label" for="email">Email Address</label>
  <input type="email" id="email" class="c-input" required />
</div>
```

### The Badge (`.c-badge`)

**1. Architectural Overview**
A compact, inline-flex status indicator designed to sit naturally alongside text in a paragraph or heading.

- **Primitives Used:** None (Atom).
- **JS Required:** **No**.
- **Dark Mode Implications:** Semantic tints (e.g., `data-status="danger"`) must use accessible contrast ratios for both light and dark backgrounds.

**2. Accessibility (a11y) Advisories**

- Badges are non-interactive read-only atoms. Do not use them as clickable tags.
- If color is the _only_ indicator of status (e.g., a red badge for "Error"), ensure hidden text or an icon accompanies it for screen readers.

**3. Variables Available**

- Automatically calculates proportional padding based on `0.85em` of the parent's font size.

**4. Implementation (HTML Structure)**

```html
<h2>Notifications <span class="c-badge" data-status="danger">3 New</span></h2>
```

### The Accordion (`.c-accordion`)

**1. Architectural Overview**
An interactive vertical list of headers that reveal or hide associated content to preserve vertical screen real estate.

- **Primitives Used:** `<l-stack>` (for the vertical rhythm of the items).
- **JS Required:** **Yes**. Hook: `data-ll-accordion`.
- **Dark Mode Implications:** Active states shift background to `--color-surface-sunken`.

**2. Accessibility (a11y) Advisories**

- The clickable header must be a `<button>` (not a div).
- The button requires `aria-expanded="false"` (or `true`) and `aria-controls="content-id"`.

**3. Variables Available**

- `--accordion-radius`: (Default: `8px`)
- `--accordion-icon-transition`: (Default: `transform var(--dur-base) var(--spring-snappy)`)

**4. Implementation (HTML Structure)**

```html
<div class="c-accordion" data-ll-accordion>
  <l-stack style="--space: 0;">
    <div class="c-accordion__item">
      <button
        class="c-accordion__trigger"
        aria-expanded="false"
        aria-controls="panel-1"
      >
        <span>Section Title</span>
        <svg class="c-accordion__icon" aria-hidden="true" viewBox="0 0 24 24">
          ...
        </svg>
      </button>
      <div class="c-accordion__panel" id="panel-1">
        <div class="c-accordion__content">
          <p>Content goes here.</p>
        </div>
      </div>
    </div>
  </l-stack>
</div>
```

### The Dropdown (`.c-dropdown`)

**1. Architectural Overview**
A contextual overlay for displaying lists of links or actions, triggered by a user interaction.

- **Primitives Used:** `<l-stack>` (to vertically space the items inside the menu).
- **JS Required:** **Yes**. Hook: `data-ll-toggle="dropdown"`.
- **Animations:** Utilises spring physics (`.u-anim-lift`) and opacity transitions.

**2. Accessibility (a11y) Advisories**

- The trigger must have `aria-haspopup="true"` and `aria-expanded="false"`.
- The menu must be dismissible via the `Escape` key or clicking outside the wrapper.

**3. Variables Available**

- `--dropdown-width`: (Default: `12rem`)
- `--dropdown-offset`: (Default: `0.5rem`)

**4. Implementation (HTML Structure)**

```html
<div class="c-dropdown-wrapper">
  <button
    class="c-button u-anim-lift"
    data-ll-toggle="dropdown"
    aria-expanded="false"
    aria-haspopup="true"
  >
    Actions
  </button>
  <div class="c-dropdown" role="menu">
    <l-stack style="--space: var(--s-2);">
      <a href="#" class="c-dropdown__item" role="menuitem">Account Settings</a>
    </l-stack>
  </div>
</div>
```

---

## 6. <a name="tier-4"></a> 🏗️ Tier 4: Macro-Compositions (Organisms)

Macro-compositions are complex UI patterns built by nesting Tier 3 Atoms inside Tier 2 Layout Primitives. Tier 4 components rarely declare their own layout CSS. They act purely as decorative shells, delegating structural flow to the primitives inside them.

### The Navbar (`.c-navbar`)

**1. Architectural Overview**
A responsive, top-level navigation header that groups branding, navigational links, and actions. It collapses its menu behind a toggle button when horizontal space is depleted.

- **Primitives Used:** `<l-cluster>` (to push the brand and menu apart).
- **JS Required:** **Yes**. Hook: `data-ll-toggle="collapse"`.
- **Dark Mode Implications:** Sits on `--color-surface-base` with a bottom border of `--color-border-subtle`.

**2. Accessibility (a11y) Advisories**

- The wrapper must be a `<nav>` tag with a clear `aria-label` (e.g., "Primary Navigation").
- The mobile toggle (hamburger) must have `aria-controls="menu-id"` and `aria-label="Toggle navigation"`.

**3. Variables Available**

- `--navbar-threshold`: (Default: `45rem`).
- `--navbar-padding`: (Default: `var(--s1) var(--s2)`).

**4. Implementation (HTML Structure)**

```html
<nav class="c-navbar" aria-label="Primary Navigation">
  <l-cluster style="justify-content: space-between;">
    <a href="/" class="c-navbar__brand">LooseLeaf</a>
    <button
      class="c-navbar__toggle u-anim-lift"
      data-ll-toggle="collapse"
      aria-expanded="false"
      aria-controls="primary-menu"
      aria-label="Toggle navigation"
    ></button>
    <div class="c-navbar__menu" id="primary-menu">
      <l-cluster>
        <a href="/features" class="c-navbar__link">Features</a>
        <button class="c-button" data-loudness="cheer">Get Started</button>
      </l-cluster>
    </div>
  </l-cluster>
</nav>
```

### The Global Footer (`.c-site-footer`)

**1. Architectural Overview**
A page-terminating structure containing multiple columns of secondary links, legal information, and social connectivity.

- **Primitives Used:** `<l-stack>` (vertical sections), `<l-grid>` (columns of links).
- **JS Required:** **No**.
- **Dark Mode Implications:** Typically placed on a darker or sunken background (`--color-surface-sunken`).

**2. Accessibility (a11y) Advisories**

- Consider wrapping in a `<footer>` tag or using `role="contentinfo"`.

**3. Variables Available**

- Inherits fluid spacing directly from Tier 1 (`--s3`, `--s4`).

**4. Implementation (HTML Structure)**

```html
<footer class="c-site-footer">
  <l-stack style="--space: var(--s3);">
    <l-grid style="--grid-min: 10rem;">
      <l-stack style="--space: var(--s-1);">
        <h3 class="c-footer-heading">Product</h3>
        <a href="#">Features</a>
      </l-stack>
    </l-grid>
    <div class="c-site-footer__bottom">
      <p>&copy; 2026 LooseLeaf UI.</p>
    </div>
  </l-stack>
</footer>
```

### The Split Hero Banner (`.c-hero`)

**1. Architectural Overview**
A primary landing page feature presenting copy on one side and supporting media on the other.

- **Primitives Used:** `<l-switcher>` (snaps from side-by-side to stacked gracefully).
- **JS Required:** **No**.

**2. Accessibility (a11y) Advisories**

- Ensure the heading hierarchy is respected (usually begins with an `<h1>`).
- The supporting media must have descriptive `alt` text if conveying meaning, or `alt=""` if purely decorative.

**3. Variables Available**

- Relies on the Switcher's `--threshold` variable (Default: `45rem`).

**4. Implementation (HTML Structure)**

```html
<section class="c-hero">
  <l-switcher style="--threshold: 45rem; align-items: center;">
    <l-stack style="--space: var(--s1);">
      <h1 class="c-hero__title">Build interfaces faster.</h1>
      <p class="c-hero__lead">A composable layout system.</p>
    </l-stack>
    <div class="c-hero__media">
      <img src="hero.svg" alt="Interface illustration" />
    </div>
  </l-switcher>
</section>
```

### The Card (`.c-card`)

**1. Architectural Overview**
A decorative container used to group related concepts, products, or actions.

- **Primitives Used:** `<l-stack>` (manages all internal vertical rhythm).
- **JS Required:** **No**.
- **Dark Mode Implications:** Borders must use `--color-border-subtle` to remain visible when backgrounds adapt.

**2. Accessibility (a11y) Advisories**

- If the entire card is a link, avoid wrapping block-level elements (`<h3>`, `<p>`) in an `<a>` tag if older browser support is required; consider a pseudo-element overlay on the title link.

**3. Variables Available**

- None (Relies entirely on standard padding tokens).

**4. Implementation (HTML Structure)**

```html
<article class="c-card">
  <l-stack style="--space: var(--s1);">
    <img src="thumbnail.jpg" alt="" class="c-card__media" />
    <l-stack style="--space: var(--s-2);">
      <h3>Card Title</h3>
      <p>Descriptive text without margin classes.</p>
    </l-stack>
  </l-stack>
</article>
```

### The Native Modal (`.c-modal`)

**1. Architectural Overview**
A high-priority disruption requiring user interaction before returning to the main application flow.

- **Primitives Used:** `<l-stack>` (for internal content spacing).
- **JS Required:** **Yes** (to trigger `.showModal()` and `.close()` on the dialog element).
- **Animations:** Can utilise Tier 5 physics for entry/exit.

**2. Accessibility (a11y) Advisories**

- Utilises the HTML5 `<dialog>` element to natively handle focus trapping and top-layer rendering.
- Must provide an explicit, keyboard-accessible close mechanism (e.g., an "X" button or "Cancel").

**3. Variables Available**

- Restricts max-width using `--measure` (60ch).

**4. Implementation (HTML Structure)**

```html
<dialog class="c-modal" id="myModal">
  <l-stack>
    <h2>Confirm Action</h2>
    <p>Are you sure you want to proceed?</p>
    <l-cluster style="justify-content: flex-end;">
      <button
        class="c-button"
        onclick="document.getElementById('myModal').close()"
      >
        Cancel
      </button>
    </l-cluster>
  </l-stack>
</dialog>
```

### The Structured Form (`.c-form`)

**1. Architectural Overview**
A complex composition of input atoms aligned into fieldsets, rows, and action clusters.

- **Primitives Used:** `<l-stack>` (sections), `<l-grid>` (columns), `<l-cluster>` (actions).
- **JS Required:** **No**.

**2. Accessibility (a11y) Advisories**

- Group related inputs (like shipping address) inside a `<fieldset>` with a descriptive `<legend>`.

**3. Variables Available**

- Grid column wrapping handled by `--grid-min: 15rem`.

**4. Implementation (HTML Structure)**

```html
<form class="c-form">
  <l-stack style="--space: var(--s3);">
    <fieldset class="c-form__section">
      <legend class="c-form__legend">Details</legend>
      <l-stack style="--space: var(--s1);">
        <l-grid style="--grid-min: 15rem;"> </l-grid>
      </l-stack>
    </fieldset>
  </l-stack>
</form>
```

### The Article / Prose (`.c-prose`)

**1. Architectural Overview**
A specialised wrapper for rendering long-form content (CMS or Markdown output) by injecting vertical rhythm into raw, unclassed HTML.

- **Primitives Used:** Lobotomised Owl selector internally applied.
- **JS Required:** **No**.

**2. Accessibility (a11y) Advisories**

- Ensure logical heading structures (H1 -> H2 -> H3) are maintained in the raw HTML.

**3. Variables Available**

- Enforces the global `--measure` (60ch).

**4. Implementation (HTML Structure)**

```html
<article class="c-prose">
  <h1>The Architecture of UI</h1>
  <p>Raw paragraph tag managed by the prose wrapper.</p>
  <h2>Subheading</h2>
  <p>Another paragraph spaced automatically.</p>
</article>
```

### The Media Object (`.c-media-object`)

**1. Architectural Overview**
A fixed-width anchor (like an avatar) situated next to fluid, descriptive text.

- **Primitives Used:** `<l-sidebar>`.
- **JS Required:** **No**.

**2. Accessibility (a11y) Advisories**

- If the image is purely decorative (e.g., an abstract icon), use `alt=""`.

**3. Variables Available**

- Configures the fixed anchor width via `--side-width: 4rem`.

**4. Implementation (HTML Structure)**

```html
<div class="c-media-object">
  <l-sidebar style="--side-width: 4rem; --space: var(--s1);">
    <img src="avatar.jpg" alt="User Avatar" class="c-media-object__avatar" />
    <div class="c-media-object__content">
      <l-stack style="--space: var(--s-2);">
        <strong>Ada Lovelace</strong>
        <p>A brief bio flowing perfectly next to the avatar.</p>
      </l-stack>
    </div>
  </l-sidebar>
</div>
```

## 8. <a name="qa"></a> 🧪 Quality Assurance & Browser Matrix

This section outlines the holistic verification suite executed to guarantee the engineering integrity, mathematical precision, and cross-platform accessibility of the system.

- **Manual Testing Matrix:** Boundary explorations simulating extreme container constriction.
- **Behaviour-Driven Verification:** Cross-referencing component behaviour against core user stories.
- **Validator Testing:** W3C HTML and CSS conformance checks.
- **Lighthouse Testing:** Performance, Accessibility, and Best Practices scoring.
- **Browser Compatibility:** Explicit verification across WebKit, Blink, and Gecko engines.
- **Responsiveness Testing:** Device agnostic verification across multiple viewport archetypes.

---

## 9. <a name="dev-log"></a> 🏗️ Development Log & Credits

### Credits & Acknowledgements

- **AI Pair Programming:** Large Language Models were utilised strictly as a "Pair Programmer" and linter throughout the development lifecycle to accelerate cross-browser debugging, reflow profiling, and formatting.
- **Every Layout:** Deep inspiration drawn from Heydon Pickering and Andy Bell's principles on algorithmic, intrinsic CSS layout design.
- **Design Systems:** Alla Kholmatova's framework for modular, pattern-driven design languages.
- **Eloquent JavaScript:** Marijn Haverbeke's principles on abstraction and managing program complexity.

### Technologies Used

- **HTML5:** Semantic accessible markup layout layer.
- **CSS3:** Custom properties, CSS Grid, Flexbox, `clamp()`, and mathematical logic.
- **JavaScript (ES6+):** (Used sparingly for progressive enhancement where CSS falls short).
- **Git & GitHub:** Atomic source control and cloud distribution.
