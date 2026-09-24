# DESIGN_SYSTEM — SMKN 26 Jakarta

Status: USER-PROVIDED STYLE-GUIDE SCREENSHOT confirms the listed color/font values; Figma layer dimensions, gradient endpoints, responsive variants and assets remain UNVERIFIED. Figma source supplied by team: `https://www.figma.com/design/YpgHMnWSwcq2oBKDbOJrnX/WEBSITE-SMKN-26?node-id=0-1&p=f&t=zbNoiQeyR8zL1qqS-0`. Four user-shared screenshots are references for review; do not claim that their exact HEX/font dimensions have been extracted unless checked against the actual file or legible specifications.

## Binding rules for an AI coding agent
1. Reference approved Figma frame/screenshot for the page, not a generic dashboard template. Match layout hierarchy, spacing rhythm, typography emphasis, image treatment, corner radii, navigation and mobile behavior.
2. Before UI coding, have designer confirm values below and record exact Figma node/frame, token name and value. If missing, mark `PENDING` instead of inventing final brand tokens.
3. Centralize values in `frontend/src/styles/tokens.css` using CSS custom properties; build reusable Button, Container, Card, Input, Header, Sidebar and ChatWidget components. Do not hardcode arbitrary color values per page.
4. Public website and private portal may use distinct layouts but must share approved colors/typography/components. No unapproved redesign or extra UI framework.
5. Provide responsive desktop/mobile behavior, semantic landmarks, readable contrast, keyboard focus, accessible form labels, loading, error and empty states. Panorama has non-motion fallback.

## Tokens legible in the provided style-guide screenshot (confirm against Figma before final sign-off)
- Font family: Inter; Regular 400, Medium 500, SemiBold 600, Bold 700.
- Primary #0092FF; Primary Dark #006CDC; Soft Blue #4CBAF5; Light Blue #D7F1FF; Background #EAF5FA.
- Complimentary/accent #FFB700; Text #0B1324; Muted #5B6B8C; Card #FFFFFF.
- Gradient screenshot labels show #0B1324 twice despite blue swatches: **ambiguous, designer must confirm endpoints; do not derive from swatch appearance**.
- Layout screenshot shows rounded white navbar, pill buttons, blue-and-white cards, hero with school photo and student cutouts. Use actual licensed assets once delivered.

## Remaining tokens to extract with designer
| Token | Approved value | Figma frame / note |
|---|---|---|
| `--color-primary`, `--color-primary-hover` | `#0092FF` / hover PENDING | screenshot/frame reference |
| `--color-secondary`, `--color-accent` | `#4CBAF5` / `#FFB700` | |
| `--color-bg`, `--color-surface`, `--color-border` | `#EAF5FA` / `#FFFFFF` / border PENDING | |
| `--color-text`, `--color-text-muted`, `--color-on-primary` | `#0B1324` / `#5B6B8C` / on-primary PENDING | |
| `--color-success`, `--color-warning`, `--color-danger` | PENDING | |
| `--font-sans`, `--font-heading`, font weights | Inter; 400/500/600/700 | check font license |
| heading/body scale and line heights | PENDING | |
| widths, gutters, spacing, radii, shadows, breakpoints | PENDING | |
| logo/hero/icon assets and permitted usage | PENDING | |

## Page-by-page handoff
- Public landing: header/navigation, hero, content sections, school CTA, floating AI Chatbot and footer.
- Public details: profile/jurusan/program/achievement/news/contact; separate reusable content templates if matching designs allow.
- Internal: student/teacher/manager dashboards, sidebar/navigation, tables/forms, alerts, status chips and mobile collapse behavior.
- Chatbot: initial launcher, open/closed layout, welcome, sources, insufficient-evidence, sending, error and quota state.
- 360 tour: loading frame, hotspot/room information, zoom controls, fallback image/description.

## Acceptance checklist
- [ ] Designer confirms source frames, fonts, HEX values, image assets and responsive rules.
- [ ] All implemented pages reference approved tokens and reusable components.
- [ ] Desktop/mobile visual comparison against Figma screenshots completed.
- [ ] Hover/focus/disabled/loading/error/empty states built where applicable.
