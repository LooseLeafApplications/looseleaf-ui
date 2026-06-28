# LooseLeaf UI Component Library

To empower lean, agile engineering teams to compose intrinsically responsive, performance-first user interfaces instantly. By utilising composable layout primitives that respect typographic boundaries (capped at `60ch`), LooseLeaf UI eliminates manual layout overrides and minimises ongoing maintenance overhead for small development footprints.

---

## <a name="top"></a>📋 Table of Contents

1. [📖 Project Purpose & User Stories](#purpose)
2. [🔬 Strategic Research](#research)
3. [🖼️ UX Design Strategy (The 5 Planes)](#ux-strategy)
4. [🗺️ System Architecture](#architecture)
5. [✨ Core Features & UI Overhauls](#features)
6. [🌐 Deployment Guide](#deployment)
7. [🤝 Credits & Acknowledgements](#credits)
8. [🏗️ Development Log & Engineering Phases](#dev-log)
9. [🧪 Testing & Quality Assurance Portfolio](#testing)

---

## 1. <a name="purpose"></a> 📖 Project Purpose & User Stories

To establish a system that scales successfully, we must document for whom we are building and for why.

### 🎯 System Core Purpose:

“To empower engineers to compose intrinsically responsive, performance-first user interfaces instantly, using composable layout primitives that respect typographic boundaries (capped at 60ch) and eliminate manual layout overrides.”

### 👤 User Stories

- **User Story:** As a developer on a lean engineering team, I want a layout framework with minimal maintenance overhead, so that our small team can rapidly scale the product without spending critical sprint cycles maintaining complex component configurations.
  - _Acceptance Criterion:_ The system must rely strictly on native browser capabilities (CSS Custom Properties and Custom Elements) rather than heavy JavaScript bundle dependencies or complex build-step preprocessors.
- **User Story:** As a Frontend Engineer, I want to compose layout structures using unified HTML elements (like a `<l-stack>` or `<l-cluster>`) without writing custom, non-DRY utility classes or complex grid overrides for every new view.
  - _Acceptance Criterion:_ The layout elements must manage spacing purely using internal custom properties and direct-child selectors, leaving child components entirely free of hardcoded margins.
- **User Story:** As a UI Designer, I want a strict, centralised token schema for spacing and typography based on a mathematical scale, ensuring visual harmony across all views without layout degradation.
  - _Acceptance Criterion (BDD):_ \* **Given** a child component is nested inside a high-density area,
    - **When** the local `--scale-ratio` modifier is overridden,
    - **Then** all internal font sizes and margins must recalculate harmoniously based on the new interval without breaking the container layout.
- **User Story:** As an End User, I want an interface that automatically scales to my device constraints and honors my browser zoom configuration perfectly, mitigating data loss or obscured content.
  - _Acceptance Criterion (BDD):_ \* **Given** an end user increases their browser zoom up to 200% or views the layout on a narrow mobile screen (320px width),
    - **When** the content scales fluidly,
    - **Then** no text elements may overlap or become truncated, and no horizontal scrollbars should appear on standard text-bound layout rows.

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 2. <a name="research"></a>🔬 Strategic Research

Before we configure our system architecture, we must assess where traditional utility frameworks are perceived to fall short and how our chosen stack addresses these pain points.

| Core Metric/Strategy | Traditional Frameworks                                                | LooseLeaf UI Architecture                                                                     |
| :------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Layout Philosophy    | Extrinsic & Device-Bound (Uses viewport-driven `@media` breakpoints). | Intrinsic & Content-Bound (Algorithmic constraints like `flex-basis` and `min()`).            |
| Box Model & Model    | Often overridden locally; prone to layout calculation bloat.          | Universal strict `border-box` reset globally applied using wildcard `*`.                      |
| Typographic Control  | Fluid text sizing requires complex breakpoint scaling rules.          | Self-governing scale bounded to strict line-height fractions and a maximum measure of `60ch`. |
| Code Footprint (DRY) | High namespacing overhead or massive HTML class strings.              | Lean composition via Custom Elements; high global reach with minimal semantic inheritance.    |

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 3. <a name="ux-strategy"></a> 🖼️ UX Design Strategy (The 5 Planes)

### Wireframes

![Description](./docs/wireframes/placeholder.png)

### I. Strategy

- **User Goals:**
- **Target Audience:**
- **The Future Runway:**

### II. Scope

### III. Structure

### IV. Skeleton

### V. Surface

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 4. <a name="architecture"></a> 🗺️ System Architecture

### 📐 Universal Constraints

Exploring the first principles of the border-box model, the global removal of vertical margin leakage, and how we structurally clamp our typographic measure to a strict `60ch` limit without breaking container flexibility.

Our global reset must enforce total predictability across every layout and container, regardless of where it is nested. We accomplish this by addressing three core pillars:

1. **The Box Model Reset (`border-box`):** Eliminates unexpected sizing changes when adding padding or borders.
2. **Margin Collapse & Leakage Prevention (`margin-block: 0`):** Prevents a child element's vertical margins from breaking out and altering the parent container's spacing.
3. **The Typographic Measure Boundary (`max-inline-size: 60ch`):** Ensures text never stretches past the optimal reading length, maintaining strict readability.

| Selector/Rule                   | System Purpose                      | Architectural Intent                                                                                                                                        |
| :------------------------------ | :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `* { box-sizing: border-box; }` | Universal sizing predictability.    | Forces all padding and borders to be calculated _inside_ the declared width, preventing layout breaking.                                                    |
| `* { margin-block: 0; }`        | Elimination of layout leakage.      | Strips default vertical margins from all elements. Spacing must be explicitly managed by layout primitives (like a Stack), avoiding magic number overrides. |
| `p, li, h1, h2, h3`             | Typographic constraint enforcement. | Clamps line length to a maximum of `60ch` to optimise cognitive load and reading comfort across large screens.                                              |

<details>  
<summary><b>🔍 Expand Universal Reset</b></summary>

```css
/* ==========================================================================  
   LOOSELEAF UI: THE UNIVERSAL RESET  
   ========================================================================== */

/* 1. Global Box Model & Margin Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin-block: 0; /* Removes vertical margin leakage entirely */
}

/* 2. Document Level Constraints */
html,
body {
  min-inline-size: 100%;
  font-family: sans-serif;
  line-height: 1.5;
  color: var(--color-text-base);
}

/* 3. Typographic Measure with Inverted Control*/
p,
li,
h1,
h2,
h3,
h4,
h5,
h6 {
  max-inline-size: var(
    --element-measure,
    60ch
  ); /* Default to 60ch, but overrideable by any parent layout primitive */
}
```

</details>

### Fluid Lock-Step Token Design

This design system rejects the fragile practice of hardcoding absolute pixel values (`px`) or relying on arbitrary viewport breakpoints (`@media`) to handle spacing and typography. Instead, it treats layout as a **dynamic composition**, leveraging a single mathematical denominator to ensure global harmony.

#### The Tonic Root: Rem over Pixels

- **Accessibility First:** We strictly avoid hardcoding pixel units (`px`) for text and core layout boundaries.
- **User Affordance:** By utilising `rem` units, our layout respects the user's default browser or operating system settings. If a user adjusts their zoom or default text size, the entire interface scales proportionally without causing data loss or malformed content.

#### The Harmonic Series: Modular Scale

- **Adherence to Ratio:** Spacing tokens and typographic hierarchies are derived from a strict **Modular Scale**. Much like a musical chord is built on clean mathematical intervals, our token intervals expand by a designated multiplier (e.g., a Perfect Fifth, 1.5).
- **DRY Architecture:** Tokens are calculated recursively using CSS custom properties on the `:root` element. Changing a single base variable dynamically propagates and updates the entire system's rhythm seamlessly.

#### Contextual Anchors & Component Isolation

- **Algorithmic Self-Governance:** Layout primitives (such as Stacks and Clusters) are designed to be context-independent. They handle their own internal spacing automatically based on the immediate space available, rather than the global screen width.
- **The "Muted" Multiplier:** While mathematical consistency is our foundation, strict lock-step scales can explode exponentially on desktop screens. To prevent oversized layouts in tight spaces, individual components maintain isolation by safely clamping or overriding the scale multiplier (`--scale-ratio`) locally to maintain information density.
- **Division:** To reverse the direction of our scale and calculate our smaller spacing intervals, we use division (e.g. `--s-1: calc(var(--s0) / var(--scale-ratio))`).

### Component Purpose Blueprint

Drafting the exact definitions for our first structural layout primitives, ensuring our documentation explicitly details _why_ a pattern exists rather than just listing its styles. It must demonstrate that every element exists to solve a specific structural problem, completely isolated from any parent environment.

<details>  
<summary><b>🔍 Case Study: Let’s look at the Stack (`<l-stack>`)</b></summary>

In standard utility frameworks such as Bootstrap, vertical spacing is often managed by adding top or bottom margins directly to individual components (e.g. `mb-3`). This breaks isolation because the component now carries assumptions about what sits next to it.

The **Stack** completely inverts this responsibility. It acts as a structural container that injects uniform vertical spacing between its immediate children, leaving the children entirely unaware of their layout context.

**1. Conceptual Purpose** \* **Problem:** Vertical margin leakage and fragmented spacing rules cause layouts to degrade when components are rearranged or nested.

- **Pattern Solution:** The `<l-stack>` custom element encapsulates layout flow. It strips child elements of their vertical spatial layout footprints and injects a single, consistent structural interval between them.
- **Contextual Rule:** Use the Stack to manage sequential, vertical content flows (e.g., card body text, form fields, or sidebar navigation lists).

**2. Logical Behaviour Map**

To guarantee total component isolation, the Stack operates under three mathematical constraints:

- **Context Neutrality:** It does not force a width or background; it only governs the empty space _between_ its contents.
- **Recursive Multi-Layering:** If a Stack is nested inside another Stack, each maintains its own independent spacing interval via CSS custom properties.
- **The Axiom of the Exception:** It applies spacing exclusively to the _elements that follow a sibling_, ensuring the top and bottom edges of the parent container remain perfectly flush.

**3. Designing the Implementation Logic**

To implement this without relying on complex JavaScript or heavy utility overrides, we can use the **CSS Lobotomised Owl Selector** (`* + *`). This selector targets any element that directly follows another element.

Here is the baseline logic we will use for the Stack primitive:

```css
/* --- The Stack Primitive Logic --- */
l-stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* Inject spacing only between consecutive elements */
l-stack > * + * {
  margin-block-start: var(
    --space,
    var(--s1)
  ); /* Defaults to scale interval s1 */
}
```

</details>

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 5. <a name="features"></a> ✨ Core Features & UI Overhauls

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 6. <a name="deployment"></a> 🌐 Deployment Guide

### Deployment Steps

To deploy the site to GitHub Pages, the following steps were executed:

### Local Deployment (Cloning)

To run this project locally on your own machine:

### ⚡ Quick Local Spin-Up Alternatives

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 7. <a name="credits"></a> 🤝 Credits & Acknowledgements

### AI Pair Programming & Academic Integrity

Artificial Intelligence (LLMs) was utilised strictly as a "Pair Programmer" and strict linter throughout the development lifecycle to accelerate cross-browser debugging, reflow profiling, and formatting, ensuring absolute human ownership and comprehension of the overarching engine code.

### Technologies Used

- **HTML5:** Semantic accessible markup layout layer.
- **CSS3:**
- **JavaScript (ES6+):**
- **Inline SVG:**
- **Git & GitHub:** Atomic source control and cloud distribution.

### 📂 Repository Structural Layout

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 8. <a name="dev-log"></a>🏗️ Development Log & Engineering Phases

### Phase 0 (Foundational Tokens)

Marijn Haverbeke notes in _Eloquent JavaScript_ that uninteresting details should be handled gracefully by our underlying language constructs. In CSS, this means assigning our architectural constants to the highest global reach possible: the `:root` pseudo-class.

<details>  
<summary><b>🔍 Expand Engineering Case Study: Phase 0</b></summary>

To create true visual harmony, we will derive our spatial tokens from a **Modular Scale**.

Let's pick a **Perfect Fifth** ratio (1.5) as our denominator:

```css
/* ==========================================================================  
   LOOSELEAF UI: REBOOT & SYSTEM TOKENS (Phase 0)  
   ========================================================================== */

:root {
  /* --- The Harmonic Ratio --- */
  --ratio: 1.5;

  /* --- Typographic & Spacing Scale (Modular) --- */
  --s-2: calc(var(--s-1) / var(--ratio));
  --s-1: calc(var(--s0) / var(--ratio));
  --s0: 1rem; /* The Baseline Tonic */
  --s1: calc(var(--s0) * var(--ratio)); /* 1.5rem */
  --s2: calc(var(--s1) * var(--ratio)); /* 2.25rem */
  --s3: calc(var(--s2) * var(--ratio)); /* 3.375rem */
  --s4: calc(var(--s3) * var(--ratio)); /* 5.063rem */

  /* --- Layout & Measure Constraints --- */
  --measure: 60ch; /* Maximum readable text boundary */
  --gutter-base: var(--s1);
}

/* --- Strict Global Reboot --- */
* {
  box-sizing: border-box; /* Enforce border-box model universally */
  margin-block: 0; /* Strip default vertical margins to prevent leakage */
}

html,
body {
  max-inline-size: none; /* Frame containers bypass global measure constraints */
  font-family: sans-serif; /* Global typography declaration */
  line-height: 1.5; /* Text line-height denominator */
}

/* --- Universal Measure Constraints --- */
p,
li,
h1,
h2,
h3,
h4,
h5,
h6,
figcaption {
  max-inline-size: var(
    --measure
  ); /* Restrict lines from stretching past reading comfort */
}
```

</details>

### Phase 1: Algorithmic Layout & Primitive Composition

<details>  
<summary><b>🔍 Expand Engineering Case Study: Phase 1</b></summary>

</details>

### Phase 2:

<details>  
<summary><b>🔍 Expand Engineering Case Study: Phase 2</b></summary>

</details>

<p align="right">(<a href="#top">Back to top</a>)</p>

---

## 9. <a name="testing"></a> 🧪 Testing & Quality Assurance Portfolio

This section outlines the holistic verification suite executed to guarantee the engineering integrity, mathematical precision, and cross-platform accessibility of…

### 1. Manual Testing Matrix (Boundary Explorations)

### 2. User Story Testing (Behavior-Driven Verification)

Verification of core target audience features mapped back to the primary user requirements.

### 3. Validator Testing

- **W3C HTML Validator:** \* **W3C CSS Validator:**

### 4. Lighthouse Testing

### 5. Browser Compatibility

Cross-origin audio context rendering pipelines were explicitly verified across major rendering engines:

### 6. Responsiveness Testing

### 7. Automated End-to-End Testing

### 8. Bugs Fixed (Sprint Log)

### 9. Known Issues

<p align="right">(<a href="#top">Back to top</a>)</p>
