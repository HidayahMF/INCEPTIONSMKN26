# Figma Homepage Asset Manifest

Source: Figma file `YpgHMnWSwcq2oBKDbOJrnX`, root `43:172`. Paths below are repository-local public paths. Existing assets were inspected before this audit; no temporary `figma.com` URL is intended to remain in runtime source.

| Figma node ID / role | Figma asset/source | Local path | Natural dimensions | Used by section | Existing/new | Verified exact |
|---|---|---|---|---|---|---|
| `43:173` hero building | Figma design context asset `7d9f8.png`; local asset mapping | `frontend/public/assets/figma/hero/hero-school-building.png` | inspect file metadata | Hero | existing | yes |
| `43:360` / `43:359` students | Figma design context asset `c0d31.png` used in both crops | `frontend/public/assets/figma/hero/student-male.png` | inspect file metadata | Hero | existing | partial; female crop mapping needs visual confirmation |
| `49:728` search icon | Figma asset `72e7d.svg` | `frontend/public/assets/figma/icons/icon-search.svg` | SVG root metadata | Hero search | existing | yes |
| `49:756` search variant | component geometry, not standalone asset | — | 840x44 | Hero search | n/a | yes, state documented |
| `I250:955;250:752` etc. | shortcut artwork | `frontend/public/assets/figma/shortcuts/shortcut-spmb.png`, `shortcut-library.png`, `shortcut-kjp-pip.png`, `shortcut-ai-chat.png` | inspect file metadata | Quick access | existing | partial; exact active border is CSS/state, not asset |
| `130:940` partner logos | partner logo instances | `frontend/public/assets/figma/partners/*` | inspect file metadata | Partner marquee | existing | partial; timeout state is motion, not asset |
| `I205:815;205:*` | major model imagery and pointer shapes | `frontend/public/assets/figma/majors/*` | inspect file metadata | Majors | existing | partial; each destination crop/state requires implementation QA |
| `237:678` play/ring | Figma assets `38250.svg` and related ring exports | `frontend/public/assets/figma/video-profile/video-profile-svg-01.svg`, `video-profile-svg-03.svg`, `video-profile-svg-08.svg` | inspect SVG metadata | Video profile | existing | partial; auto destination state not fully mapped |
| `I246:1137;242:1043` | program slider panels | `frontend/public/assets/figma/programs/programs-raw-01.png` through `03.png` | inspect file metadata | Program feature | existing | partial |
| `246:1150`, `246:1168`, `246:1173` | program right-card artwork | `frontend/public/assets/figma/programs/programs-raw-04.png` through `06.png` | inspect file metadata | Program cards | existing | partial |
| `246:1379` etc. | BLUD exact default/hover shape families | `frontend/public/assets/figma/blud/` | SVG root metadata | BLUD | existing | partial; destination mapping must use each exact shape, not one shared hover approximation |
| `266:2170` etc. | achievement card images | `frontend/public/assets/figma/achievements/achievements-raw-01.png` through `05.png` | inspect file metadata | Achievements | existing | partial |
| `286:1798` etc. | news card images | `frontend/public/assets/figma/news/news-raw-01.png` through `05.png` | inspect file metadata | News | existing | partial |
| `293:1993` | AI bot art/layers | `frontend/public/assets/figma/ai-cta/ai-cta-raw-01.png`, `ai-cta-raw-02.png`, `ai-cta-*.svg` | inspect file metadata | AI CTA | existing | partial |
| `293:1975` | floating chatbot | `frontend/public/assets/figma/ai-cta/` and `FloatingChatbot.tsx` mapping | inspect file metadata | Floating chat | existing | unresolved exact hover destination asset |
| `43:325` | navbar logo/chevron/icons | `frontend/public/assets/figma/branding/smkn26-logo.png`, `frontend/public/assets/figma/icons/icon-chevron-down.svg` | inspect file metadata | Navbar | existing | partial; exact live-instance hover/icon orientation not fully verified |
| `286:1470` | footer social/icons/map | `frontend/public/assets/figma/footer/` plus current component references | inspect directory | Footer | existing | unresolved exact inventory; no new download performed |

## Asset extraction result

- Existing local assets reused: hero, branding, icons, shortcuts, school overview, advantages, partners, majors, video profile, programs, BLUD, achievements, news, and AI CTA families represented by `figmaAssets.ts`.
- New assets imported during this audit: **none**. The repository already contains the audited asset families; downloading large duplicate exports would risk replacing user changes without improving exactness.
- `frontend/src/assets/figmaAssets.ts` already contains mappings for the major families. No mapping was added.
- Still unresolved: exact natural dimensions for every file, exact destination-state asset mapping for several component variants, footer asset inventory, floating-chat hover destination, and whether the female hero crop should map to a distinct local file rather than the current shared source.

