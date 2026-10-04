# Tailwind Migration

## Goal

Move frontend styling from the legacy `app.css` and `final-controls.css` rules to Tailwind utilities without changing rendered geometry, assets, routes, interactions, or responsive behavior.

## Rules

- Keep the legacy CSS loaded until the corresponding component batch has passed geometry and focused interaction tests.
- Do not rewrite multiple sections in one batch.
- Preserve semantic class names during migration so existing tests remain useful.
- Use Tailwind utilities for layout, spacing, colors, typography, borders, shadows, and responsive states.
- Keep only irreducible CSS for keyframes, pseudo-elements, SVG layering, and browser drag/scroll behavior.
- Do not use `!important` in migrated utilities unless it is required to override an unmigrated legacy rule; remove the override when that batch is complete.
- Do not migrate portal styles while public landing-page batches are still in progress.

## Batch Order

1. Tokens and global document behavior
2. Public navbar, hero, shortcut menu, and school overview
3. Advantages and partner logos
4. School majors and video profile
5. Program and BLUD
6. Prestasi and Berita
7. AI CTA and footer
8. Chatbot and shared public controls
9. Login, portal, and admin screens
10. Remove unused legacy CSS and keep only keyframes/pseudo-element exceptions

## Verification Per Batch

- `npm.cmd run check --workspace frontend`
- `npm.cmd run build --workspace frontend` when shared styling or routing changes
- Focused Playwright geometry/interaction test
- Desktop and mobile horizontal-overflow check
- Fresh `artifacts/<section>-default.png` and `-hover.png` where hover exists
- Compare DOM geometry against the Figma node data; tolerate only browser/font rasterization differences

## Current Status

- Tailwind v4 is active through `frontend/src/styles/tokens.css` and `@tailwindcss/vite`.
- Batch 1 complete: `FloatingChatbot`, `PartnerLogos`, `PublicNavbar`, `ShortcutMenu`, `SchoolOverview`, and `SchoolAdvantages` use Tailwind utilities for their migrated layout/state styles.
- Redundant legacy selectors for those migrated pieces were removed only after focused regression checks.
- Remaining legacy styles still implement complex homepage sections, portal screens, keyframes, and shared interactions; they are not safe to delete yet.
- Current batch validation: frontend check PASS, frontend build PASS, focused Berita/Prestasi/centering/chatbot tests PASS.
- A pre-existing video-play assertion remains unrelated to this migration batch.
