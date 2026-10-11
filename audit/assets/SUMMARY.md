# Asset Audit — SMKN 26 Frontend

Generated: 2026-10-11
Method: static string scan **+** runtime crawl of 99 routes with Playwright (Chromium),
recording every `/assets/*` request (all returned HTTP 200; Vite serves `index.html`
for unknown paths, so broken refs can look like 200 — see "Broken refs").

## Numbers

| Category | Files | Size |
|---|---|---|
| Total in `frontend/public/assets` | 570 | 288.2 MB |
| Used at runtime | 446 | — |
| Referenced in code but **never rendered** (dead registry entries) | 26 | 9.26 MB |
| **Not referenced anywhere** (safe to delete) | 98 | 112.66 MB |
| **Broken references** (file missing) | 4 | — |

Cleaning (98 + 26) removes ~**122 MB (~42%)** of the asset payload.

## Files

- `final-used.txt` — assets actually requested at runtime.
- `final-static-only.txt` — referenced in `figmaAssets.ts` but never rendered. Delete file **and** its entry.
- `final-unused.txt` — not referenced at all. Safe to delete.
- `final-missing-on-disk.txt` — code points to files that do not exist (broken images).
- `duplicates.txt` — byte-identical files grouped together.
- `dynamic-refs.txt` — code locations that build asset URLs from variables.
- `missing-raw.txt`, `used.txt`, `unused.txt` — raw intermediate output (ignore if unclear).

## Safe-to-delete highlights (98 files)

- `panorama/school_tour/Screenshots/*` (23) — low-res duplicates of `Upscaled/*` (the app uses `Upscaled`).
- Figma design screenshots: `Screenshot 2026-10-06 *.png`, `tampilan*figma*.png`,
  `figmamitraindustri.png`, `Detail Halaman Card Mitra Industri - Astro.png`.
- Whole `figma/herosection/` folder (13) — duplicates of per-major hero images.
- Big "cover/reference" images never rendered: `BLUD-*/<Name>.png`, `BKK/BKK.png`,
  `ekstrakulikuler/Ekstrakurikuler.png`, `lsp/Lembaga Sertifikasi Profesi (LSP).png`, etc.
- `figma/eyebrow/*`, `partners/partner-logo-*` (duplicates of named logos), `compnet/mandiri` duplicates.
- Unused slices: `achievements-raw-02/05/06`, `programs-raw-01/05`, `news-svg-02`, `Prestasi/dd.png`.

## Dead registry entries (26 files — delete file + edit `src/assets/figmaAssets.ts`)

`hero-background.png`, `hero-headline.svg`, `student-female.png`;
`ai-cta-raw-01.png`, `ai-cta-svg-02.svg`, `ai-cta-svg-10.svg`;
`blud-*-shape.svg` + `blud-svg-19.svg`; `advantage-arrow.svg`, `advantage-carousel-left/right.svg`;
`achievements-svg-13.svg`; `news-raw-02.png`, `news-raw-05.png`;
`partner-panasonic/pln/wika.png`; `profile-overview.png`;
`struktur-arrow-right.svg`, `struktur-arrow.svg`; `panorama/tampilanfigma.png`.

## Broken references (fix in code)

| Code | Missing file |
|---|---|
| `src/pages/StrukturOrganisasiPage.tsx:11` | `/assets/figma/Organisasi/Struktur Osis/Group 1811 (1).png` |
| `src/pages/StrukturOrganisasiPage.tsx:17` | `/assets/figma/Organisasi/Struktur MPK/Group 1812 (1).png` |
| `src/pages/EkstrakurikulerPage.tsx:128` | `/assets/figma/ekstrakulikuler/Hero Section-1.png` |
| `src/pages/LspPage.tsx:61` | `/assets/figma/lsp/Hero Section-1.png` |

## Resolution (applied)

- Deleted all 98 unused + 26 dead-registry files (124 total, ~122 MB).
- Removed the matching dead entries from `src/assets/figmaAssets.ts`.
- Removed the 4 broken elements (the intended overlay artwork was never exported,
  so the empty `<img>`/`decoration` nodes were deleted rather than replaced).
- Result: `frontend/public/assets` = **446 files / 166.3 MB**.
- `tsc --noEmit` passes with no dangling asset references.

## Reorganization + de-duplication (applied)

Goal: one folder per page, shared assets in shared folders, and no asset
duplicated/imported more than once.

Final structure (`frontend/public/assets`):

```
shared/<tema>/            global (branding, footer, hero, icons, news, partners,
                          struktur, decorations, advantages, chatbot, illustrations,
                          profile, video-profile, lsp, majors)
home/<bagian>/            beranda only (achievements, blud, major-cards, programs,
                          school, shortcuts)
pages/<halaman>/          one page (bkk, blud/*, ekstrakurikuler, guru, lsp,
                          lsp/*, majors/*, mars, mitra-industri, organisasi,
                          portal-informasi, prestasi, profile, tour)
majors/<KODE>Assets/      shared across a major's page + its BLUD + LSP pages
                          (KGS, TEK, TITL, TFLM, TKR, SIJA)
```

What was done:

- Planned with `plan2.cjs` (explicit folder map + byte-hash de-dup overlay):
  **394 moves + 52 duplicate deletes = 446 files**.
- Rewrote every code reference with `rewrite-code.cjs`:
  - exact literal replacement of all `/assets/figma/...` and `/assets/panorama/...`
    URLs (raw and `%20`-encoded) via `refMap`;
  - dynamic helper pages (`KgsPage`, `LspPage`, `EmanPage`, …) now use an
    `ASSET_OVERRIDES` map + new base folder, so `asset(\"nama.png\")` keeps working
    even for relocated/renamed files;
  - config-driven `BludServicePage` rewritten to `BLUD_BASES` + `BLUD_OVERRIDES`;
  - index-based `PartnerDetailPage` now uses a `COMPETENCY_ICONS` array.
- Verified: `tsc --noEmit` passes, `vite build` succeeds, and a fresh 99-route
  Playwright crawl (`verify-crawl.cjs`) reports
  **requestedAssets=394, onDisk=394, missing=0, badStatus=0**.
- Clarity renames: cross-major generic photos → `shared/majors/person-a.png`
  / `person-b.png`; `home/majors/` → `home/major-cards/` (to distinguish from
  `pages/majors/`).

Human-readable guide: `frontend/public/assets/README.md`.
Machine plan/refMap: `audit/assets/move-plan.json`, `audit/assets/move-plan2.txt`.
Runtime verification: `audit/assets/verify-crawl.txt`.
