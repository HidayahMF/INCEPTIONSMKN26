# DESIGN.md — SMKN 26 Jakarta Website

> Design source of truth: Figma file `WEBSITE-SMKN-26`, Landing Page node `43:207`, Beranda frame `43:172`, UI Style Guide node `18:18589`.
>
> This file defines the visual language that every new public page must follow. New pages must feel like they belong to the existing Figma homepage, not like a generic AI-generated SaaS/dashboard page.

## 1. Design Direction

The visual identity is **clean, bright, vocational-school modern, friendly, and editorial**.

The site should feel:
- polished but not corporate-SaaS
- youthful but not childish
- spacious but not empty
- highly visual, using photography as a major design element
- strongly tied to the SMKN 26 blue palette
- consistent with the Beranda Figma instead of inventing a new visual system per page

Avoid generic “AI website” patterns:
- giant empty pastel backgrounds
- random glassmorphism
- generic gradient blobs with no relation to the Figma
- excessive badges/breadcrumbs/cards stacked vertically
- tiny content floating in a huge page
- every block inside a rounded card
- dashboard-style section layouts on public pages
- arbitrary purple/neon colors
- excessive shadows
- generic footer layouts that do not match the school site
- oversized pills everywhere

## 2. Core Design Tokens

### Typography

Primary font: **Inter**

Weights from the Figma style guide:
- Regular
- Medium
- Semi Bold
- Bold

| Role | Size | Weight | Line Height |
|---|---:|---:|---:|
| Display / major hero | 56–64px desktop | Bold | 1.15–1.5 |
| Page title | 44–52px desktop | Bold | 1.15 |
| Section title | 36px | Bold | 54px |
| Card title | 24px | Bold / Semi Bold | 1.25 |
| Lead paragraph | 18–20px | Medium | 30px |
| Body | 14–16px | Regular / Medium | 1.6 |
| Small caption | 12–14px | Regular | 18–21px |
| Navbar menu | 18px | Medium | normal |
| Button | 14px | Semi Bold | 1.5 |

Text should usually align left inside content sections. Center alignment is reserved for major section headings, hero copy, badges, and intentionally centered compositions.

### Color Palette

```css
--primary: #0092FF;
--primary-dark: #006CDC;
--soft-blue: #4CBAF5;
--light-blue: #D7F1FF;
--background: #EAF5FA;
--surface: #FFFFFF;
--text: #0B1324;
--muted: #5B6B8C;
--complimentary: #FFB700;
```

Primary blue gradient:

```css
linear-gradient(
  105deg,
  #006CDC 0%,
  #0092FF 72%,
  #4CBAF5 100%
)
```

Do not invent additional dominant colors unless a real asset requires them.

## 3. Layout System

The Figma homepage is based on a **1440px desktop canvas**.

Primary desktop content width:

```text
1272px
```

Desktop side margin at 1440px:

```text
84px
```

Use:

```tsx
max-w-[1272px] mx-auto
```

with responsive side padding:

```tsx
w-[calc(100%-32px)]
```

Do not let content stretch indefinitely on 1600/1920px displays.

### Vertical rhythm

Use deliberate spacing:
- navbar to page hero: ~120–160px
- section separation: 80–120px
- badge to title: ~24–32px
- title to body: ~12–20px
- content column gap: 48–80px

Whitespace must frame content, not make it look unfinished.

## 4. Navbar

Figma node: `43:325`

Desktop dimensions:
- width: 1272px
- height: 80px
- top: 20px
- horizontal center

Visual rules:
- white background
- fully pill-shaped
- `border-radius: 999px`
- horizontal padding: 24px
- vertical padding: 10px
- subtle shadow only

Shadow:

```css
0 4px 8px rgba(15, 23, 42, 0.08)
```

Logo area:
- school logo about 48×52px
- school name 12px Bold
- motto 8px italic / muted

Menu:
- Inter Medium
- 18px
- dark text `#0B1324`
- 16px padding per menu item

Login:
- 40px high pill
- gradient blue
- 14px Semi Bold
- horizontal padding around 32px

All public pages must reuse the existing `PublicNavbar`.

## 5. Reusable Section Badge

Visual:
- background `#F6FBFF`
- soft-blue text `#4CBAF5`
- 14px Semi Bold
- horizontal padding 12px
- vertical padding 5px
- fully rounded
- subtle shadow

```css
0 4px 16px rgba(15, 23, 42, 0.08)
```

Use once per major section.

## 6. Headings and Blue Accent

A recurring Figma pattern is:

```text
Dark text + gradient-blue emphasized phrase
```

Use this sparingly for meaningful emphasis only.

## 7. Buttons

### Primary
- blue gradient
- white text
- pill radius
- 14px Semi Bold
- subtle hover lift
- optional arrow icon

### Secondary
- white surface
- primary-blue text
- pill radius
- subtle shadow
- optional 20px arrow icon

Avoid square enterprise-dashboard buttons, glow effects, and oversized CTAs.

## 8. Card Language

Cards in Figma use:
- white background
- radius around 24px
- restrained border such as `#EAF5FA`
- very soft shadow
- strong image/content hierarchy

Shortcut Card:
- width 280px
- radius 24px
- padding 16px
- title 24px
- body 12px

Keunggulan Card:
- 300×400px
- radius 24px
- top image 200px
- content padding 18px
- title 24px
- body 12px / 18px line height

Do not turn every section into a card.

## 9. Photography

Rules:
- use real SMKN 26 photography
- use large visual areas, not tiny thumbnails
- keep aspect ratio natural
- use `object-cover` only for previews/cards
- panorama viewer itself must not use CSS `object-cover`
- image corners generally 20–24px
- decorative blue circles/ellipses may frame images, matching the “Mengenal SMK” Figma section

# 10. `/tour` — Virtual Tour Landing Page

The `/tour` page must look like it belongs to the Figma homepage.

It must **not** look like:
- an admin page
- a generic AI-generated tourism page
- a full-page flat light-blue rectangle
- a dashboard

## A. Page intro

Desktop:
- floating navbar at top
- content begins around 140–160px
- centered section badge
- centered page title
- centered short lead paragraph

Suggested copy:

Badge:
```text
Jelajahi Sekolah
```

Title:
```text
Virtual Tour SMKN 26 Jakarta
```

Lead:
```text
Kenali lingkungan SMKN 26 Jakarta lebih dekat melalui pengalaman visual yang interaktif.
```

Visual:
- background mostly white
- subtle `#EAF5FA` decoration only
- title dark `#0B1324`
- optional gradient-blue accent on “Virtual Tour”
- avoid repeated badges/breadcrumbs

## B. Location showcase

Because only one good panorama exists, do not make a generic card grid.

Use an editorial split inspired by the Figma “Mengenal SMK” section:

```text
LEFT                              RIGHT
large copy                        large Lapangan preview
title                             framed by blue
description                       decorative ellipse/circle
CTA
```

Desktop:
- max width 1272px
- two columns
- 48/52 or 50/50
- gap 64–80px
- vertically centered
- section height around 420–500px

Location:
```text
Lapangan SMKN 26 Jakarta
```

Description:
```text
Area lapangan utama SMKN 26 Jakarta yang digunakan untuk kegiatan sekolah, olahraga, upacara, dan berbagai aktivitas siswa.
```

CTA:
```text
Jelajahi Virtual Tour →
```

Thumbnail:
```text
/assets/panorama/LapanganSMKN261.jpeg
```

Image should be large, around 520–600px wide on desktop.

Add Figma-like decorative geometry behind the preview:
- one large soft/light-blue circular ring
- one smaller blue accent circle
- decorations remain behind image
- blue palette only

Do not put the entire section in a white floating card.

## C. Future locations

Use reusable data. When more locations exist, alternate editorial rows:
- image left / text right
- text left / image right

Do not show fake “Coming Soon” cards.

# 11. `/tour/lapangan` — Panorama Detail Page

The current detail page should be redesigned using the same Figma language.

## A. Top section

Do not use tiny breadcrumb + tiny badge + huge empty blue background.

Use:
- white or subtle `#EAF5FA` background
- floating `PublicNavbar`
- 1272px container
- title 44–52px Bold
- lead 16–18px Medium
- optional single badge above title
- controlled whitespace

Suggested copy:

Badge:
```text
Virtual Tour
```

Title:
```text
Lapangan SMKN 26 Jakarta
```

Lead:
```text
Jelajahi area lapangan utama SMKN 26 Jakarta secara interaktif.
```

Helper:
```text
Geser untuk melihat area sekitar
```

Keep helper near the lead/viewer, not isolated at the far-right edge.

## B. Viewer framing

The panorama viewer is the visual hero.

Desktop:
- max width 1272px
- width 100%
- height `clamp(520px, 68vh, 720px)`
- radius 24px
- subtle Figma-style shadow
- optional 8–12px white outer surface
- subtle border `#EAF5FA`

Do not add heavy dark framing.

## C. Viewer controls

Keep:
- zoom
- fullscreen
- compact controls
- `panoData`
- `VisibleRangePlugin`

Do not show scene selector while only one good panorama exists.

## D. Bottom action

Use Figma secondary-pill style:

```text
← Kembali ke Virtual Tour
```

Avoid an isolated tiny button surrounded by excessive empty space.

# 12. Footer

Use one consistent `PublicFooter` across public pages.

If dark:
- use `#0B1324`
- align to 1272px grid
- restrained typography
- no generic SaaS footer layout

# 13. Responsive Rules

## Desktop ≥ 1280px
- max content 1272px
- proportions based on 1440px Figma
- no indefinite stretching

## Tablet 768–1279px
- reduce title sizes proportionally
- split sections may stack if cramped
- 24–32px page padding

## Mobile < 768px
- single-column
- 16px side padding
- page title around 34–40px
- body 15–16px
- viewer minimum useful height around 420px
- no horizontal overflow
- decorative circles may crop naturally
- never scale desktop absolute coordinates directly

# 14. Motion

Allowed:
- hover lift 2–4px
- shadow increase
- arrow movement
- image scale 1.02–1.05
- 200–300ms transitions

Avoid:
- continuous floating
- bouncing icons
- excessive parallax
- glowing cards
- animated gradients

# 15. Anti-AI-Slop Checklist

Before declaring a public page complete:
- reuse the 1272px Beranda grid
- use Inter only
- use the Figma palette only
- follow the existing title hierarchy
- make real photography prominent
- use section badges sparingly
- keep radii mostly around 24px or pill where appropriate
- keep shadows subtle
- use whitespace deliberately
- public pages should be editorial, not dashboard-like
- decorative shapes should come from the Figma circle/ellipse language
- reuse the existing navbar
- buttons must match Figma primary/secondary patterns
- remove generic glassmorphism, neon, random purple, giant blobs
- remove unnecessary card wrappers
- ask: **does this look like the same designer who created Beranda made it?**

If no, the page is not finished.

# 16. Implementation Constraint

For every new public page:

1. Read this file first.
2. Inspect existing Beranda components before writing UI.
3. Reuse:
   - `PublicNavbar`
   - project design tokens
   - primary/secondary button patterns
   - badge pattern
   - 1272px layout container
   - existing shadows/radii
4. Do not invent a separate design system.
5. Compare the result side-by-side with Figma node `43:172`.
6. Build success is not visual validation.
7. Take screenshots at 1440px and 390px before calling the design finished.
