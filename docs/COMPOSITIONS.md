# LooseLeaf UI - Composition Architecture & Layering Guide

Welcome to the Composition Architecture Guide for **LooseLeaf UI**.

The fundamental principle of CUBE CSS (Composition, Utility, Block, Exception) is the strict **Separation of Macro Layout from Visual Aesthetics**.

In traditional frameworks, layout positioning, margins, and component styling are heavily coupled. This leads to non-DRY utility strings, specificity battles, and constant margin overrides. LooseLeaf UI solves this by isolating all structural flow into **Compositions**.

---

## 📋 Table of Contents

1. [📖 Golden Rules of CUBE Architecture](#golden-rules)
2. [🏗️ Macro-Composition Case Studies](#case-studies)
   - [Case Study 1: The Marketing Hero Section](#case-study-1)
   - [Case Study 2: The Application Dashboard](#case-study-2)
   - [Case Study 3: The Multi-Group Navigation Bar](#case-study-3)
   - [Case Study 4: The Off-Canvas Drawer / Mobile Nav](#case-study-4)
   - [Case Study 5: The Bento Feature Grid](#case-study-5)
   - [Case Study 6: The Media Object / Testimonial Stack](#case-study-6)
3. [🧱 Block Architectural Guidelines](#block-guidelines)
   - [The Button Block (`.button`)](#block-button)
   - [The Card Block (`.card`)](#block-card)
   - [The Input Block (`.input` & `.field`)](#block-input)
   - [The Badge Block (`.badge`)](#block-badge)

---

## 1. <a name="golden-rules"></a> 📖 Golden Rules of CUBE Architecture

1. **Purely Structural:** Compositions govern spacing, wrapping, and alignment. They **never** declare background colours, borders, shadows, or typography styles.
2. **Zero Outer Margins on Blocks:** Visual blocks (`.card`, `.button`, `.input`) care _only_ about their internal padding and aesthetics. They are completely purged of external margins.
3. **Outer to Inner Layering:** Compositions control layout from macro wrappers (`.wrapper`, `.sidebar`) down to micro relationships (`.cluster`, `.flow`).
4. **Custom Properties as Props:** Tune thresholds, alignment, and gaps inline using local CSS Custom Properties (e.g., `style="--switcher-threshold: 40rem;"`) without writing extra CSS rules.
5. **Exceptions Over Modifier Classes:** Use HTML state attributes (`data-variant="primary"`, `data-state="open"`, `data-status="danger"`) to alter block appearances dynamically rather than inventing non-DRY utility classes.

---

## 🛠️ Composition Primitives Quick Reference

| Primitive    | Class       | Structural Purpose                                                    | Key Custom Properties                  |
| :----------- | :---------- | :-------------------------------------------------------------------- | :------------------------------------- |
| **Flow**     | `.flow`     | Manages vertical rhythm between sibling elements via lobotomized owl. | `--flow-space` (Default: `1em`)        |
| **Cluster**  | `.cluster`  | Groups items horizontally, wrapping naturally with zero overflow.     | `--cluster-space`, `--cluster-justify` |
| **Sidebar**  | `.sidebar`  | Asymmetric 2-column layout (fixed-target panel + fluid main area).    | `--sidebar-target-width`               |
| **Switcher** | `.switcher` | Forces items side-by-side until container hits a minimum threshold.   | `--switcher-threshold`                 |
| **Grid**     | `.grid`     | Auto-filling, intrinsically responsive CSS Grid layout.               | `--grid-min-item-size`                 |
| **Wrapper**  | `.wrapper`  | Constrains maximum inline reading/layout width with auto margins.     | `--wrapper-max-width`                  |

---

## 2. <a name="case-studies"></a> 🏗️ Macro-Composition Case Studies

Below are standard, real-world layout challenges solved entirely by layering LooseLeaf UI compositions without writing custom layout CSS.

---

### <a name="case-study-1"></a> Case Study 1: The Marketing Hero Section

#### The Goal

A responsive hero section featuring headline copy and CTA buttons on the left, media on the right, and aligned wrapping behavior. On narrow viewports, the media must stack smoothly below the text, and buttons must wrap naturally.

#### The Composition Stack

`Wrapper` ➔ `Switcher` ➔ `Flow` + `Cluster`

#### HTML Implementation

```html
<!-- 1. WRAPPER: Constrains maximum section width and centers it -->
<div class="wrapper">
  <!-- 2. SWITCHER: Enforces side-by-side layout until container drops below 50rem -->
  <div class="switcher" style="--switcher-threshold: 50rem;">
    <!-- LEFT COLUMN: Flow primitive manages vertical rhythm -->
    <div class="flow">
      <h1>Build resilient web applications</h1>
      <p>
        A CUBE CSS architecture that scales without specificity wars or heavy
        framework dependencies.
      </p>

      <!-- 3. CLUSTER: Manages horizontal grouping and wrapping for buttons -->
      <div class="cluster">
        <button class="button" data-variant="primary">Get Started</button>
        <button class="button">Documentation</button>
      </div>
    </div>

    <!-- RIGHT COLUMN: Media Container -->
    <div class="hero__media">
      <img src="hero-illustration.svg" alt="App Preview" />
    </div>
  </div>
</div>
```

#### Why This Works

- No Media Queries: The `Switcher` handles responsiveness intrinsically based on container constraints rahter than arbitrary viewport widths.
- No Spacing Leaks: The `Flow` primitive spaces the heading, body text, and button group cleanly without requiring hardcoded `margin-bottom` rules on child tags.

### <a name="case-study-2"></a> Case Study 2: The Application Dashboard Layout

#### The Goal

A fixed-width sidebar navigation running alongside a fluid main content region. The main section contains an auto-filling 3-column metric display.

#### The Composition Stack

`Sidebar` ➔ `Grid` ➔ `Flow`

#### HTML Implementation

```html
<!-- 1. SIDEBAR: Asymmetric split (Fixed target sidebar + fluid main area) -->
<div class="sidebar" style="--sidebar-target-width: 16rem;">
  <!-- FIXED NAVIGATION SIDEBAR -->
  <aside class="sidebar__nav">
    <nav class="flow">
      <a href="#dash">Dashboard</a>
      <a href="#analytics">Analytics</a>
      <a href="#settings">Settings</a>
    </nav>
  </aside>

  <!-- FLUID MAIN CONTENT AREA -->
  <main class="flow">
    <h2>Overview</h2>

    <!-- 2. GRID: Auto-filling card layout inside main area -->
    <div class="grid" style="--grid-min-item-size: 18rem;">
      <article class="card">
        <div class="flow">
          <h3>Total Revenue</h3>
          <p class="text-step-2">$42,850</p>
        </div>
      </article>

      <article class="card">
        <div class="flow">
          <h3>Active Users</h3>
          <p class="text-step-2">1,240</p>
        </div>
      </article>

      <article class="card">
        <div class="flow">
          <h3>Conversion Rate</h3>
          <p class="text-step-2">3.4%</p>
        </div>
      </article>
    </div>
  </main>
</div>
```

#### Why This Works

- Independent Column Mechanics: The `Sidebar` primitive preserves the navigation target width (`16rem`) while delegating all remaining space to `<main>`.
- Internal Grid Responsiveness: The metric cards calculate their column count dynamically based on the available width inside `<main>`, NOT the outer browser viewport.

### <a name="case-study-3"></a> Case Study 3: The Multi-Group Navigation Bar

#### The Goal

A header containing a brand logo on the left, primary navigation links in the center/right, and action buttons on the far right.

#### The Composition Stack

`Wrapper` ➔ `Cluster` (Outer) ➔ `Cluster` (Inner)

#### HTML Implementation

```html
<header class="site-header">
  <!-- 1. WRAPPER: Limits maximum header inline width -->
  <div class="wrapper">
    <!-- 2. OUTER CLUSTER: Pushes primary groupings apart using flex-between -->
    <div class="cluster" style="--cluster-justify: space-between;">
      <!-- BRAND LOGO -->
      <a href="/" class="brand-logo">LooseLeaf UI</a>

      <!-- 3. INNER CLUSTER: Nav links grouped together with custom tight spacing -->
      <nav class="cluster" style="--cluster-space: var(--spacing-sm);">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#docs">Docs</a>
      </nav>

      <!-- 4. INNER CLUSTER: Action buttons -->
      <div class="cluster">
        <button class="button">Log In</button>
        <button class="button" data-variant="primary">Sign Up</button>
      </div>
    </div>
  </div>
</header>
```

#### Why This Works

- Scoped Spacing Controls: By overriding `--cluster-space` locally on the `<nav>` cluster, we create tight link gaps without affecting the wider layout gap of the parent header cluster.
- Graceful Wrapping: On smaller viewports, navigation elements wrap into organised rows without triggering horizontal scrollbars or clipping text.

### <a name="case-study-4"></a> Case Study 4: The Off-Canvas Drawer/Mobile Navigation

#### The Goal

A slide-out mobile menu or filter drawer using the native HTML5 `<dialog>` element, maintaining accessible focus trapping and vertical link flow.

#### The Composition Stack

`Dialog` ➔ `Wrapper` ➔ `Cluster` + `Flow`

#### HTML Implementation

```html
<!-- Trigger Button -->
<button class="button" data-open-dialog="mobile-menu-drawer">Open Menu</button>

<!-- Slide-Out Drawer Dialog -->
<dialog class="offcanvas" id="mobile-menu-drawer">
  <div class="wrapper flow">
    <div class="cluster" style="--cluster-justify: space-between;">
      <h3>Navigation</h3>
      <button class="button" data-size="small" data-close-dialog>Close</button>
    </div>

    <nav class="flow">
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#about">About Us</a>
      <a href="#contact">Contact</a>
    </nav>
  </div>
</dialog>
```

### <a name="case-study-5"></a> Case Study 5: The Bento Feature Grid

#### The Goal

An asymmetric feature showcase grid where individual cards calculate their layout bounds intrinsically while maintaining vertical rhythm inside each card.

#### The Composition Stack

`Grid` ➔ `Card` ➔ `Flow`

#### HTML Implementation

```html
<div class="grid" style="--grid-min-item-size: 20rem;">
  <!-- HERO BENTO ITEM (Spans full width via local utility/style) -->
  <article class="card" style="grid-column: 1 / -1;">
    <div class="flow">
      <span class="badge" data-status="info">Featured</span>
      <h2>Next-Gen Token Compiler</h2>
      <p>
        Automate your design system pipeline from JSON direct to native CSS
        Custom Properties.
      </p>
    </div>
  </article>

  <!-- SECONDARY BENTO ITEM -->
  <article class="card">
    <div class="flow">
      <h3>Zero Dependencies</h3>
      <p>Shipped with plain ES6 and native browser standards.</p>
    </div>
  </article>

  <!-- TERTIARY BENTO ITEM -->
  <article class="card">
    <div class="flow">
      <h3>CUBE CSS Architecture</h3>
      <p>Flat specificity layers using CSS @layer boundaries.</p>
    </div>
  </article>
</div>
```

### <a name="case-study-6"></a> Case Study 6: The Media Object/Testimonial Stack

#### The Goal

A fixed-size avatar or image situated next to fluid, multi-line copy that automatically drops into a vertical stack on small viewports without hardcoded media queries.

#### The Composition Stack

`Sidebar` ➔ `Flow`

#### HTML Implementation

```html
<article class="card">
  <div
    class="sidebar"
    style="--sidebar-target-width: 4rem; --sidebar-space: var(--spacing-md);"
  >
    <!-- FIXED AVATAR ANCHOR -->
    <div class="media-object__avatar">
      <img
        src="avatar.jpg"
        alt="Ada Lovelace"
        style="border-radius: 50%; aspect-ratio: 1;"
      />
    </div>

    <!-- FLUID COPY CONTENT -->
    <div class="flow">
      <blockquote class="text-step-0">
        "LooseLeaf UI completely transformed how our engineering team approaches
        design systems."
      </blockquote>
      <p class="text-muted">
        <strong>Ada Lovelace</strong> — Lead Systems Architect
      </p>
    </div>
  </div>
</article>
```

## 3. <a name="block-guidelines"></a> 🧱 Block Architectural Guidelines

Blocks care only about their internal styling (padding, typography, background colors, borders, and interactive transitions). They are completely purged of external positioning or margins.

Below are the architectural definitions for LooseLeaf UI's foundational visual blocks.

### <a name="block-button"></a>The Button Block (`.button`)

#### CSS Implementation (src/03-blocks/button.css)

```css
@layer blocks {
  .button {
    /* Base Block Parameters */
    --button-bg: var(--colors-surface-sunken);
    --button-text: var(--colors-text-base);
    --button-border: var(--colors-border-subtle);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--typography-step-0);
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    border-radius: var(--radius-sm, 0.375rem);
    background-color: var(--button-bg);
    color: var(--button-text);
    border: 1px solid var(--button-border);
    cursor: pointer;
    transition:
      transform var(--transitions-dur-fast) var(--transitions-spring-snappy),
      background-color var(--transitions-dur-fast) ease;
  }

  .button:hover {
    transform: translateY(-2px);
  }

  .button:focus-visible {
    outline: 2px solid var(--colors-action-primary);
    outline-offset: 2px;
  }

  /* CUBE Exceptions (Attribute Driven) */
  .button[data-variant="primary"] {
    --button-bg: var(--colors-action-primary);
    --button-text: #ffffff;
    --button-border: transparent;
  }

  .button[data-size="small"] {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: clamp(0.8rem, 0.75rem + 0.25vw, 0.95rem);
  }
}
```

### <a name="block-card"></a> The Card Block (`.card`)

#### CSS Implementation (`src/03-blocks/card.css`)

```css
@layer blocks {
  .card {
    --card-padding: var(--spacing-lg);

    background-color: var(--colors-surface-base);
    border: 1px solid var(--colors-border-subtle);
    border-radius: var(--radius-md, 0.5rem);
    padding: var(--card-padding);
    overflow: hidden;
  }

  /* Full-bleed child media helper */
  .card__media {
    margin-inline: calc(var(--card-padding) * -1);
    margin-block-start: calc(var(--card-padding) * -1);
    width: calc(100% + (var(--card-padding) * 2));
    max-width: none;
    object-fit: cover;
  }
}
```

### <a name="block-input"></a> The Input Block (`.input` & `.field`)

#### CSS Implementation

```css
@layer blocks {
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .label {
    font-size: var(--typography-step-0);
    font-weight: 500;
    color: var(--colors-text-base);
  }

  .input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--typography-step-0);
    background-color: var(--colors-surface-base);
    color: var(--colors-text-base);
    border: 1px solid var(--colors-border-subtle);
    border-radius: var(--radius-sm, 0.375rem);
    transition: border-color var(--transitions-dur-fast) ease;
  }

  .input:focus-visible {
    outline: 2px solid var(--colors-action-primary);
    outline-offset: 1px;
  }

  /* Validation Exception Hook */
  .input[aria-invalid="true"] {
    border-color: #ef4444;
  }
}
```

### <a name="block-badge"></a> The Badge Block (`.badge`)

#### Implementation (`src/03-blocks/badge.css`)

```css
@layer blocks {
  .badge {
    --badge-bg: var(--colors-surface-sunken);
    --badge-text: var(--colors-text-base);

    display: inline-flex;
    align-items: center;
    padding: 0.25em 0.65em;
    font-size: 0.75em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 999px;
    background-color: var(--badge-bg);
    color: var(--badge-text);
  }

  /* Status Exception Hooks */
  .badge[data-status="info"] {
    --badge-bg: #dbeafe;
    --badge-text: #1e40af;
  }

  .badge[data-status="success"] {
    --badge-bg: #dcfce7;
    --badge-text: #166534;
  }

  .badge[data-status="danger"] {
    --badge-bg: #fee2e2;
    --badge-text: #991b1b;
  }
}
```
