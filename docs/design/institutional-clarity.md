---
name: Institutional Clarity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4943'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7a73'
  outline-variant: '#bdc9c1'
  surface-tint: '#006c4e'
  primary: '#005d42'
  on-primary: '#ffffff'
  primary-container: '#047857'
  on-primary-container: '#9ffdd3'
  inverse-primary: '#7bd8b1'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#005683'
  on-tertiary: '#ffffff'
  tertiary-container: '#006fa8'
  on-tertiary-container: '#dbecff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#97f5cc'
  primary-fixed-dim: '#7bd8b1'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#00513a'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md-medium:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an institutional-yet-modern posture built for high-stakes municipal and state-level procurement workflows in Brazil. It bridges bureaucratic regulatory compliance and high-velocity B2B SaaS execution, taking aesthetic cues from Linear and Stripe to replace dated legacy enterprise software with precision, clarity, and authority.

The aesthetic balances clean minimalism with subtle tactile depth:
- **Trustworthy & Authoritative:** High legibility, crisp structural dividing lines, strictly controlled status indicators, and confident typography communicate fiscal responsibility and institutional security.
- **Modern GovTech Performance:** Dense analytical data streams (notice analysis, bidding deadlines, CNPJ validations) are balanced by expansive whitespace, clear typography, and low-cognitive-load information architecture.
- **Conversion-Driven Confidence:** Primary actions and actionable AI insights command attention via calibrated emerald surfaces, subtle atmospheric shadows, and deliberate micro-interactions that reassure the user through high-value financial submissions.

## Colors

The palette is engineered to meet strict WCAG AA/AAA standards across all administrative and interactive views. The color mode is locked to clean light mode by default.

### Primary Spectrum (Emerald)
- **Primary Main (`#047857`):** Anchors primary call-to-actions, accepted procurement states, active filters, and key metrics.
- **Primary Hover (`#065F46`):** Deep emerald used for hover and pressed button states.
- **Surface Tints (`#ecfdf5`, `#d1fae5`):** Subtle emerald backgrounds used for AI match highlights, win-rate tags, and affirmative banners.

### Neutral Foundation (Slate & Zinc)
- **Background Pure (`#ffffff`):** Base canvas for dashboard worktables, modal panels, and core workspace containers.
- **Background Subtle (`#f8fafc` / `#f0fdf4`):** Tinted alternating sections, table header bands, and neutral canvas backdrops.
- **Borders & Dividers (`#e2e8f0`, `rgba(226, 232, 240, 0.8)`): Fine 1px structural framing.
- **Primary Text (`#0f172a`):** Slate-900 for immediate readability across all standard and bold typography.
- **Secondary Text (`#475569`):** Slate-600 for supporting labels, meta-information, and table columns.
- **Muted Text (`#94a3b8`):** Slate-400 for disabled states, placeholder strings, and non-essential timestamps.

### Supporting & Functional Accents
- **Sky (`#0284c7`):** Tertiary status for legal notices under formal administrative clarification.
- **Amber (`#d97706`):** Warning indicator for expiring submission deadlines and missing tax clearance certificates (CNDs).
- **Rose (`#e11d48`):** Disqualification risks, audit alerts, and critical bid blockers.

## Typography

The type scale pairs **Hanken Grotesk** for display headers and page anchors with **Inter** for data tables, form fields, and deep body content.

- **Headlines:** Set in Hanken Grotesk with deliberate negative letter-spacing (`-0.02em` to `-0.03em`). This establishes confident, tech-forward anchors that feel crisp and deliberate without compromising institutional gravity.
- **Body Text:** Grounded in Inter with a 16px minimum floor on standard body contexts to ensure legibility during intense review sessions of complex Brazilian administrative decree texts and bid requirements (editais).
- **Tabular Figures:** Numbers in tables, currency columns (BRL), and countdown clocks must render using `font-variant-numeric: tabular-nums` to ensure exact column alignment during real-time electronic dispute sessions (*pregão eletrônico*).

## Layout & Spacing

Layout geometry follows an 8-point structural system, enforcing vertical balance across dense dashboards and spacious conversion landing paths alike.

### Grid Framework
- **Desktop (1280px+):** 12-column fluid grid, `2rem` (32px) margins, `1.5rem` (24px) gutters. Maximum content canvas constrained to 1440px for broad layout views.
- **Tablet (768px - 1279px):** 8-column grid with `1.5rem` (24px) margins and `1rem` (16px) gutters. Bidding tables introduce sticky horizontal scroll containers for data fidelity.
- **Mobile (Below 768px):** 4-column grid with `1rem` (16px) margins and `1rem` (16px) gutters. High-order navigation collapses to a fixed persistent bottom navigation bar or top drawer.

### Spacing Principles
- Dynamic padding scale utilizes `space-xs` (4px), `space-sm` (8px), `space-md` (16px), `space-lg` (24px), and `space-xl` (32px) for stack separation and card layouts.
- Form field clusters enforce `space-md` separation between input groups and `space-xs` between labels and controls.

## Elevation & Depth

Visual hierarchy is maintained via stacked tonal planes and subtle, tinted ambient lighting rather than heavy drop shadows, reinforcing a clean, high-precision SaaS aesthetic.

### Tonal Hierarchy
- **Level 0 (Base Canvas):** Pure `#ffffff` or muted `#f8fafc`.
- **Level 1 (Cards & Data Containers):** Pure `#ffffff` surface bound by a 1px boundary (`border-slate-200/80`).
- **Level 2 (Dropdowns, Popovers, Active Drawers):** `#ffffff` with structural separation achieved through delicate multi-stop shadows.

### Atmospheric Shadow Formulas
- **Elevation Subtle (`shadow-sm`):** `0 1px 2px 0 rgba(15, 23, 42, 0.05)`. Used for resting state cards and structured inputs.
- **Elevation Interactive (`shadow-md`):** `0 4px 12px -2px rgba(4, 120, 87, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`. A gentle 4% emerald tint elevates critical action modules and hover-active bid opportunities.
- **Elevation Focus (`shadow-lg`):** `0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(4, 120, 87, 0.06)`. Applied strictly to active flyouts, AI insight modals, and legal alert triggers.

## Shapes

The design system embraces a **Rounded (Level 2)** geometry to balance modern interface tactility with reliable administrative sobriety.

- **Base Radius (0.5rem / 8px):** Standard interactive elements such as text fields, secondary badges, segmented controls, and button components.
- **Container Radius (`rounded-lg` / 1rem / 16px):** Bid preview modules, analytical summary blocks, modals, and intelligence alert drawers.
- **Pill Radius (`rounded-full` / 9999px):** Status chips, user tags, and numerical countdown counter pills.
- **Boundary Strictness:** Decorative elements never employ asymmetrical or expressive variable radiuses. Radius consistency reinforces a rigorous and predictable workflow.

## Components

### Buttons & Interactive Controls
- **Minimum Target Size:** All interactive buttons and selectors enforce an explicit minimum height of 44px for reliable touch and mouse interactions.
- **Primary Button:** Background `#047857`, text `#ffffff`, typography `label-md`. Hover triggers `#065F46` with a micro-elevation transition (`150ms ease-out`). Active state applies scale `0.99`.
- **Secondary Button:** Surface `#ffffff`, border 1px solid `#e2e8f0`, text `#0f172a`. Hover transitions to `#f8fafc` with border `#cbd5e1`.
- **Focus Rings:** Uncompromised WCAG compliant dual ring: `2px white` inner offset, `2px #047857` outer focus ring on `:focus-visible`.

### Form Fields & Inputs
- **Base Input:** Height 44px, padding `0 14px`, surface `#ffffff`, border 1px solid `#cbd5e1`, border-radius 8px. Typography `body-md`.
- **Input Placeholder:** `#94a3b8`.
- **Active / Focused:** Border color shifts to `#047857` backed by an ambient glow (`box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.12)`).
- **Error State:** Border `#e11d48` with contextual inline helper icon and 12px error text below.

### Cards & Analytical Panels
- **Structure:** Encapsulated in 16px radius (`rounded-lg`), pure white base, bound by `1px solid rgba(226, 232, 240, 0.8)`, resting with `shadow-sm`.
- **Header Separator:** Subtle `#f1f5f9` rule separating modal/card headlines from internal analytical parameter zones.

### Chips & Badges
- **Status Pills:** Height 24px, padding `2px 8px`, `rounded-full`, typography `label-sm`.
  - *Win Opportunity / AI Match:* `#ecfdf5` background, `#047857` label, `#a7f3d0` border.
  - *Under Review:* `#f0f9ff` background, `#0284c7` label, `#bae6fd` border.
  - *Impugnação / High Risk:* `#fff1f2` background, `#e11d48` label, `#fecdd3` border.

### Checkboxes & Radio Elements
- **Dimensions:** 20px × 20px bounding box wrapped in a 44px safe-touch target.
- **State Styling:** Inactive border `#cbd5e1` on white surface. Selected state fills `#047857` with sharp white icon checkmark, accompanied by standard accessibility focus states.

### Specialized GovTech / B2B Components
- **Bidding Countdown Timer (Pregão Live):** Monospaced, high-contrast numerical pill utilizing tabular figures, transitioning from slate neutral to amber/rose when critical submission cutoffs approach.
- **AI Tender Breakdown Card:** Tinted background `#f0fdf4`, bordered by `#d1fae5`, featuring a dedicated left rail indicator in `#047857` that contextualizes compliance likelihood, required documents, and disqualification vectors directly derived from the public notice.