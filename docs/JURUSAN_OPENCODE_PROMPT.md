# OpenCode Implementation Prompt: Jurusan SMK

Implement the Jurusan SMK feature in this repository. This is a copy-paste implementation brief; do not redesign it and do not use screenshots as runtime assets.

## Scope and source of truth

- Stack is locked: React + TypeScript + Vite, Tailwind CSS 4, Inter Variable.
- Figma file: `https://www.figma.com/design/YpgHMnWSwcq2oBKDbOJrnX/WEBSITE-SMKN-26`.
- Inspect these nodes if any detail is unclear: Beranda `43:172`; section `208:1126`; shape `205:990`; lineup `205:815`; model set `164:996`; heading `208:992`; badge `139:990`.
- Variants: KGS `164:997` / `205:541`; TEK `164:1077` / `205:543`; TITL `164:1061` / `205:545`; TFLM `164:1013` / `205:547`; TKR `164:1029` / `205:549`; SIJA `164:1045` / `205:551`.
- Reuse existing `PublicNavbar`, tokens, button language, and the 1272px Beranda grid. Do not create a new UI library or redesign unrelated pages.

## Files and routes

Create a reusable component, preferably `frontend/src/components/public/MajorsSection.tsx`, plus narrowly scoped styles/data files only where needed. Add it to `Home` immediately after `<PartnerLogos />` in `frontend/src/App.tsx`. Replace the generic `/majors` `PublicPage` branch with a dedicated `MajorsPage` that reuses the same component. Keep public access unauthenticated. There are no confirmed major-detail designs/routes in the current project; CTA links must use `/majors?major=<slug>` unless an existing consistent destination is discovered. Do not invent six detail pages.

Update only the existing registry entry in `frontend/src/assets/figmaAssets.ts`; do not move or rename unrelated assets.

## Exact local assets

All files below already belong under `frontend/public/assets/figma/majors/`; use these paths, never temporary Figma URLs:

- `/assets/figma/majors/major-kgs.png`
- `/assets/figma/majors/major-tek.png`
- `/assets/figma/majors/major-titl.png`
- `/assets/figma/majors/major-tflm.png`
- `/assets/figma/majors/major-tkr.png`
- `/assets/figma/majors/major-sija.png`
- `/assets/figma/majors/icon-major-education.svg`
- `/assets/figma/majors/icon-arrow-right.svg`
- `/assets/figma/majors/popover-pointer-left.svg`
- `/assets/figma/majors/popover-pointer-right.svg`
- `/assets/figma/majors/major-background-shape.svg`
- `/assets/figma/majors/icon-section-badge.svg`

Preserve each transparent PNG's natural crop and alpha edges. Do not make a screenshot of the section and do not redraw these icons/shapes with CSS.

## Desktop geometry

The section is 1444×749 at the 1440px Figma canvas. The decorative shape starts at section y=173 and is 1444×576. The lineup stage is 1272×524 at section x=93, y=223. Use an overflow-safe stage; do not implement six equal grid columns.

Default lineup order, mapped by exact Figma instance bounds inside the 1272×524 stage:

| Major | x | y | instance bounds | model source |
|---|---:|---:|---:|---|
| KGS | 8 | 64 | 323×461 | `164:997` |
| TEK | 160 | 39 | 339×485 | `164:1077` |
| TITL | 349 | 7 | 361×517 | `164:1061` |
| TFLM | 561 | 7 | 363×518 | `164:1013` |
| TKR | 758 | 24 | 349×501 | `164:1029` |
| SIJA | 933 | 40 | 335×485 | `164:1045` |

These are overlapping transparent people, not six cards. Preserve the visual z-order from `205:815`; later/central figures must remain visually layered as in Figma. At the primary 1440px target, scale the 1272px stage proportionally only if the available width is smaller.

## Section copy

Badge: `Jurusan / Program Keahlian`

Heading: `Temukan Bidang yang Sesuai dengan Minatmu`

Description: `Kenali enam program keahlian di SMKN 26 Jakarta dan temukan bidang yang dapat menjadi langkah awal untuk mengembangkan keterampilan, pengalaman, dan masa depanmu.`

The section heading block is centered at x=293, y=63, width 872, height 118. Badge frame is centered at x=615, y=0, width 227.6, height 31.

## Major data

Render these in this order and do not rewrite copy:

1. KGS — `Konstruksi Gedung & Sanitasi` — `Mempelajari perancangan, pembangunan,perawatan gedung, serta pengelolaan sistem sanitasi.` — gradient `#D40009` to `#FF464E` — hover card right.
2. TEK — `Teknik Elektronika & Komunikasi` — `Mempelajari perakitan, perawatan perangkat elektronika, serta sistem komunikasi dan elektronika daya.` — gradient `#004E9E` to `#0876E7` — hover card right.
3. TITL — `Teknik Instalasi Tenaga Listrik` — `Mempelajari instalasi tenaga listrik dan sistem kontrol untuk kebutuhan industri.` — gradient `#FFC533` to `#FFD56B` — hover card right.
4. TFLM — `Teknik Fabrikasi Logam & Manufaktur` — `Mempelajari pemesinan, pengelasan, dan pembuatan komponen untuk kebutuhan manufaktur.` — gradient `#AB0001` to `#C10102` — hover card left.
5. TKR — `Teknik Kendaraan Ringan` — `Mempelajari perawatan dan perbaikan mesin serta sistem kendaraan bermotor roda empat.` — gradient `#B9C5E0` to `#A9ADB4` — hover card left.
6. SIJA — `Sistem Informasi, Jaringan & Aplikasi` — `Mempelajari pengembangan perangkat lunak, desain grafis, jaringan, dan infrastruktur teknologi informasi.` — gradient `#FF7700` to `#FF9E49` — hover card left.

Every info card uses the education icon in a 54×54 circular gradient control, 24px radius, white surface, `#EAF5FA` border, 20px padding, 28px vertical gap, and the existing SMKN 26 primary blue gradient CTA labeled `Jelajahi Jurusan` with the exact local arrow icon.

## Hover/focus variants

Hover is a composition, not a scale transform. Student proportions must not stretch. The expanded composition overlays the same stage, does not reflow siblings, does not increase section height, and receives a higher z-index.

| Major | variant size | person slot | card slot | pointer |
|---|---:|---|---|---|
| KGS | 523×471 | left, x=0, y=42, 300×429 | right, x=238, y=0, 285×293 | left pointer at card x=-15/y=160 |
| TEK | 524×468 | left, x=0, y=33.909, 300×434.091 | right, x=239, y=0, 285×293 | left pointer |
| TITL | 524×468 | left, x=0, y=33.909, 300×434.091 | right, x=239, y=0, 285×293 | left pointer |
| TFLM | 524×468 | right, x=224, y=33.909, 300×434.091 | left, x=0, y=0, 285×293 | right pointer at x=300/y=134 |
| TKR | 524×469 | right, x=224, y=34.909, 300×434.091 | left, x=0, y=0, 285×293 | right pointer |
| SIJA | 524×503 | right, x=230, y=21, 294×482 | left, x=0, y=21, 285×293 | right pointer |

Card typography is Inter: major title 24px Bold with the major gradient, body 12px Regular with 18px line height, CTA 14px SemiBold. Card internal content begins at 21px/20px equivalent; icon-to-text gap is 12px; text title-to-description gap is 4px; CTA is 170×41 at x=21, y=231. The source variant cards are nodes `205:568`, `205:598`, `205:613`, `205:628`, `205:658`, `205:688`.

## Interaction and accessibility

- Default: all six bodies are visible together.
- Pointer hover and keyboard focus activate only one major; mouse leave restores default unless pinned.
- Use `button` or an accessible interactive element for each body, with visible focus styling and `aria-expanded`, `aria-controls`, and a useful accessible label.
- Desktop click pins the card. Clicking the same major may close it; clicking another switches it; Escape closes it; outside click should close it when practical.
- The CTA is a real link/button to `/majors?major=<slug>` and must remain keyboard reachable.
- Mobile/touch has no hover: first tap opens one card; another tap switches; repeated tap may close. Keep the active card within the viewport.
- Respect `prefers-reduced-motion`.
- Use a 180–250ms transition with an appropriate ease-out. Animate opacity/transform only; never animate layout dimensions in a way that causes page shift.

## Responsive behavior

Use 1920, 1440, 1366, 1024, 768, and 390px checks. The primary fidelity target is 1440px. At 1920px keep the 1272px maximum stage centered; at 1366px keep it within the viewport with proportional safe padding; at 1024px and 768px do not allow an expanded card to escape the viewport. Preserve readable type and all aspect ratios.

Below desktop, do not blindly apply desktop absolute coordinates. Prefer a horizontally scrollable/snap lineup of the six real transparent figures with the selected detail card positioned below or beside the selected figure, whichever best preserves the Figma character without page overflow. At 390px use 16px page padding, readable 12–16px body text, a touch-sized target, one active card, and a usable CTA. Confirm no horizontal document overflow.

## Testing and verification

Add or update focused tests as project conventions allow. Run typecheck/lint/build. Add Playwright coverage that:

1. opens `/` and confirms the section follows `PartnerLogos`;
2. opens `/majors` and confirms the dedicated section is rendered, not the old generic empty state;
3. verifies all six local image paths load;
4. hovers/focuses each major and checks the correct card text, left/right orientation, and `aria-expanded`;
5. clicks to pin, switches majors, presses Escape, and checks close behavior;
6. checks CTA destination contains the correct major slug;
7. checks 1440px and 390px screenshots for no horizontal overflow and visible readable content.

Capture implementation screenshots at 1440px and 390px, plus at least one desktop screenshot for a left-card hover and one for a right-card hover. Compare with Figma nodes `208:1126`, `205:815`, and the six hover variants. Do not claim visual verification if any local asset is empty, missing, substituted, or still references a temporary Figma URL.

## Strict no-change scope

Do not implement unrelated portal modules, backend/API changes, authentication changes, payment changes, chatbot retrieval changes, new detail-page designs, or a new design system. Do not replace Inter, Tailwind, `PublicNavbar`, the existing tokens, or the existing public shell. Do not use CSS-drawn substitutes where a listed Figma asset exists. Do not turn the lineup into `grid-cols-6`. Do not use fake copy, fake images, or placeholder success states.

## Definition of done

The homepage contains the working Jurusan section after `PartnerLogos`; `/majors` reuses the same section; all six verified local people assets and supporting assets exist and load; default overlap matches the listed geometry; all six Default/Hover behaviors match the listed direction and dimensions; hover, focus, pin, Escape, outside click, touch, CTA, responsive, and reduced-motion behavior work; accessibility attributes and meaningful labels exist; tests/build/screenshots have been run and reported; no unrelated files or features are changed.
