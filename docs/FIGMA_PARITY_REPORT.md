# Figma Homepage Parity Report

## 1. Goal

This is a Figma-to-production implementation contract for the `Beranda` homepage. It records the geometry available through the authenticated Figma View session, the current React entry point, existing local assets, and unresolved items that require Figma Editor access or a rendered production browser capture. No homepage implementation is included in this package.

## 2. Target viewport

- Figma canvas: `1440px` wide.
- Homepage root `43:172`: `1440 x 8152`.
- Coordinates below are Figma canvas coordinates with the root origin at `(0, 0)`.

## 3. Source links

- Figma design: `https://www.figma.com/design/YpgHMnWSwcq2oBKDbOJrnX/WEBSITE-SMKN-26?node-id=43-172`
- Figma prototype: `https://www.figma.com/proto/YpgHMnWSwcq2oBKDbOJrnX/WEBSITE-SMKN-26?node-id=43-172`
- Production: `https://inceptionsmkn-26.vercel.app/`
- Local entry: `frontend/src/App.tsx`
- Reference screenshot: `docs/figma-reference/home-full.png`

## 4. Current production architecture

`Home` in `frontend/src/App.tsx` renders `PublicNavbar`, `HeroSection`, `ShortcutMenu`, `SchoolOverview`, `SchoolAdvantages`, `PartnerLogos`, and `SchoolMajors`, then closes the main element. Global public behavior is wrapped by `PublicExperience`, which supplies AOS, the floating chatbot, and the public chat room. Existing routes and protected features were not changed.

The production HTML shell is a Vite client-rendered document (`#root`, `/assets/index-BzWQLAHL.js`, `/assets/index-C66j_Eo_.css`); a browser render at 1440px is required for measured DOM parity. Static HTML inspection cannot establish rendered section coordinates.

## 5. Figma section order

1. Navbar `43:325`
2. Hero `49:722`
3. Quick Access `250:985`
4. Mengenal SMK `84:1200`
5. Keunggulan SMK `113:686`
6. Mitra Industri `208:1127`
7. Jurusan SMK `208:1126`
8. Video Profil `242:695`
9. Program SMK `246:1219`
10. BLUD SMK `246:1477`
11. Prestasi SMK `270:2717`
12. Berita SMK `279:1210`
13. Pembangunan.AI CTA `286:1952`
14. Footer `286:1470`
15. Floating chatbot `293:1975`

## 6. Missing production sections

Missing from the current `Home`: Video Profil, Program SMK, BLUD SMK, Prestasi SMK, Berita SMK, Pembangunan.AI CTA, and the Figma Footer instance. The floating chatbot exists through `PublicExperience`, but its parity against `293:1975` is not verified. Mitra Industri and Jurusan are present through existing components but require geometry and asset parity work.

## 7. Existing-section parity audit

| Section | Status | Evidence / measurable target |
|---|---|---|
| Navbar | PARTIAL / unverified | Figma outer box `x=84,y=20,w=1272,h=80`; current component exists, but rendered geometry and variants require browser comparison. |
| Hero | PARTIAL / unverified | Figma `0,0,1440,880`; exact child geometry is recorded in §8. |
| Quick Access | PARTIAL / unverified | Figma `132,807,1192,149`; four cards are `280px` wide with `24px` gaps. |
| Mengenal SMK | PARTIAL / unverified | Figma `84,1009,1272,400`; image group and text boxes are recorded below. |
| Keunggulan SMK | PARTIAL / unverified | Figma `0,1497,1440,645`; six 300px cards in a 324px step carousel. |
| Mitra Industri | PARTIAL / unverified | Figma `93,2230,1272,218`; 20 visible logo instances in two repeated tracks. |
| Jurusan SMK | WRONG GEOMETRY known | Figma stage `205:815` is `x=84,y=251,w=1272,h=524` relative to the section; six custom-sized model instances. |

## 8. Exact desktop geometry

| Section / node | x | y | width | height |
|---|---:|---:|---:|---:|
| Hero `49:722` | 0 | 0 | 1440 | 880 |
| Quick Access `250:985` | 132 | 807 | 1192 | 149 |
| Mengenal SMK `84:1200` | 84 | 1009 | 1272 | 400 |
| Keunggulan `113:686` | 0 | 1497 | 1440 | 645 |
| Mitra `208:1127` | 93 | 2230 | 1272 | 218 |
| Jurusan `208:1126` | 0 | 2548 | 1440 | 793 |
| Video `242:695` | -3 | 3341 | 1447 | 700 |
| Program `246:1219` | 128 | 4129 | 1184 | 673 |
| BLUD `246:1477` | 84 | 4890 | 1272 | 629 |
| Prestasi `270:2717` | 103 | 5607 | 1272 | 654.983 |
| Berita `279:1210` | 29 | 6349.983 | 1382 | 495.017 |
| AI CTA `286:1952` | 84 | 6996 | 1272 | 442 |
| Footer `286:1470` | 0 | 7526 | 1440 | 626 |

Important child geometry:

- Navbar inner: logo `x=24,y=8,w=178,h=64`; menu `x=214,y=13,w=920,h=54`; login button `x=1146,y=20,w=102,h=40`.
- Hero text `x=257,y=140,w=925,h=187`; actions `x=526,y=351,w=389,h=41`; search `x=300,y=725,w=840,h=44`.
- Hero students group `x=429,y=401,w=649,h=516`; male slot `x=558,y=401,w=520,h=516`; female slot `x=429,y=421,w=302,h=476`.
- Mengenal preview `x=0,y=63,w=620,h=148` relative to section; image group `x=734,y=35,w=538,h=365`; overview card `x=1,y=243,w=680,h=90`.
- Keunggulan card track begins `x=85,y=181,w=1272,h=400`; six cards are 300×400 at x `-170,154,478,802,1126,1450`.
- Jurusan background shape begins `x=-9,y=201,w=1444,h=576`; stage begins `x=84,y=251,w=1272,h=524`; heading preview `x=284,y=91,w=872,h=118`.
- Video content `x=287,y=274,w=872,h=250`; play instance is `122×120` at relative x `375`.
- Program content preview `x=156,y=63,w=872,h=118`; main grid `x=0,y=205,w=1184,h=468`; left card 580×468; right cards 580×140 with 24px vertical gaps.
- BLUD card grid `x=12,y=205,w=1248,h=424`; six cards are 400×200 with 24px gaps.
- Prestasi cards start `x=0,y=205,w=1272,h=296`; five cards are 237×296 at x `0,259,518,776,1035`; statistic card is 1195×122 at relative x `39,y=532.983`.
- News cards start `x=55,y=195.017,w=1272,h=300`; five 400×300 cards at x `-180,244,668,1092,1516`.
- AI text block `x=22,y=0,w=586,h=275`; bot instance `x=775,y=-23,w=418,h=418` relative to CTA.
- Floating chatbot instance is `x=1279,y=654,w=120,h=120` in the homepage root.

## 9. Typography

The View metadata exposes text boxes and line heights but not font-family/style tokens. Exact family, weight, size, tracking, and line-height must be captured with Figma Editor `get_design_context` or text-style inspection. Do not infer typography from the screenshot. Text box heights include: hero headline 96px, hero description 60px, section headings commonly 54px, body previews 60–90px, and card labels 19–29px.

## 10. Colors / gradients / shadows / borders

The metadata endpoint does not expose paint/effect values. These remain Editor-access items. Preserve the existing token system and do not invent values. The screenshot is a visual reference only, never an application asset.

## 11. Static asset placement

Existing local assets are listed in `docs/FIGMA_ASSET_MANIFEST.md`. They cover current hero, shortcut, school, advantage, partner, icon, and majors asset families. Exact Figma source-image IDs and original dimensions for newly required Program, BLUD, Prestasi, News, AI, Video, and Footer assets could not be retrieved because `get_design_context` and asset download metadata require Editor access.

## 12. Jurusan crop and scale matrix

Stage `205:815` contains six model instances:

| Figma instance | Stage x | Stage y | width | height | Major mapping |
|---|---:|---:|---:|---:|---|
| `I205:815;205:710` | 8 | 64 | 323 | 461 | source mapping requires Editor child inspection |
| `I205:815;205:711` | 933 | 40 | 335 | 485 | source mapping requires Editor child inspection |
| `I205:815;205:712` | 758 | 24 | 349 | 501 | source mapping requires Editor child inspection |
| `I205:815;205:713` | 160 | 39 | 339 | 485 | source mapping requires Editor child inspection |
| `I205:815;205:714` | 349 | 7 | 361 | 517 | source mapping requires Editor child inspection |
| `I205:815;205:715` | 561 | 7 | 363 | 518 | source mapping requires Editor child inspection |

These are container geometries, not source image crop percentages. The confirmed KGS crop values from the task brief (`width≈99.6%`, `height≈123.82%`, `left≈0.2%`, `top≈-23.78%`) must be retained. Exact per-model slot geometry, image transforms, hover geometry, z-order, and major mapping require Editor child inspection and are intentionally not fabricated here.

## 13. Prototype interaction matrix

The Figma View metadata endpoint does not expose `node.reactions` or component variant properties. The task-provided confirmed contract is:

| Component family | Trigger | Action | Transition |
|---|---|---|---|
| Primary / secondary buttons | `ON_HOVER` | `CHANGE_TO` variant | Smart Animate, Ease Out, ~0.300s |
| Search bar | `ON_HOVER` | `CHANGE_TO` variant | Smart Animate, Ease Out, ~0.300s |
| Navbar menu | `ON_HOVER` | `CHANGE_TO` variant | Smart Animate, Ease Out, ~0.300s |
| Quick Access cards | `ON_HOVER` | `CHANGE_TO` variant | Smart Animate, Ease Out, ~0.300s |
| Keunggulan cards | `ON_HOVER` | `CHANGE_TO` variant | Smart Animate, Ease Out, ~0.300s |
| Jurusan models | `ON_HOVER` | `CHANGE_TO` variant | Smart Animate, Ease Out, ~0.300s |
| Program / BLUD / Prestasi cards | `ON_HOVER` | `CHANGE_TO` variant | Smart Animate, Ease Out, ~0.300s |

Changed properties for each family (fill, border, icon, text, crop, scale, shadow, and z-order) still require Editor variant inspection. OpenCode must not replace these transitions with arbitrary timings.

## 14. Timed animation matrix

| Node | Trigger | Destination | Timing |
|---|---|---|---|
| Partner track `130:940` | `AFTER_TIMEOUT` ~0.001s | `130:897` | Smart Animate, Linear, 10s |
| Video play `237:678` | `AFTER_TIMEOUT` ~0.001s | `235:661` | Smart Animate, Ease Out, 1s |
| Program slider `I246:1137;242:1043` | `AFTER_TIMEOUT` 0.8s | `242:995` | Smart Animate, Slow, ~1.458421s |

## 15. Carousel / marquee behavior

Partner track contains two copies of ten logo places. First copy x positions are approximately `0,259.026,518.051,777.076,1036.101,1295.127,1554.152,1813.177,2072.203,2331.228`; second copy begins at `2590.253` and continues in the same 259.026px step through `4921.480`. Each logo place is `235.475×117.737` at y `10.512` inside a 1272×140 viewport. The 10-second linear transition must translate the repeated track by exactly one copy width (`2590.253px`) or the equivalent destination delta, then loop seamlessly.

Program slider starts with three 532×303 panels at x `0,556,1112` inside the 532×303 slider viewport. Destination symbol `242:995` shows panels at x `-556,0,556`; implement as a one-panel left shift, not a generic carousel with different dimensions. Delay is 0.8s; Smart Animate Slow duration is ~1.458421s.

## 16. Z-index and overlapping behavior

Jurusan models overlap within the blue arc and must use the six Figma container dimensions and deliberate ordering. The metadata does not expose stacking order; inspect layer order in Editor before implementation. The AI bot overlaps the CTA bounds (`y=-23` within the CTA), and the floating chatbot is independently positioned near the right viewport edge.

## 17. Responsive interpretation

Only the 1440px Figma frame is authoritative in this audit. Implementers should preserve section order and semantic content, then derive responsive layouts by collapsing horizontal tracks, allowing cards to scroll or stack, clipping marquee overflow, and keeping the chatbot reachable without covering essential controls. Do not invent mobile pixel values; validate against available Figma responsive frames when provided.

## 18. Reduced-motion requirements

Honor `prefers-reduced-motion: reduce`: disable Smart Animate-like hover interpolation, timed partner translation, video play interpolation, and program slider auto-transition; retain the final readable state and accessible controls. Never make core information dependent on motion.

## 19. Component reuse recommendations

Reuse current `PublicNavbar`, `HeroSection`, `ShortcutMenu`, `SchoolOverview`, `SchoolAdvantages`, `PartnerLogos`, and `SchoolMajors` as starting points. Add new section components without replacing authentication, Supabase, Gemini, Tour, routing, or existing dashboard features. Keep static paths under `frontend/public/assets/figma/`.

## 20. Recommended React component tree

`Home > PublicNavbar > HeroSection > ShortcutMenu > SchoolOverview > SchoolAdvantages > PartnerLogos > SchoolMajors > VideoProfileSection > ProgramsSection > BludSection > AchievementsSection > NewsSection > AiCtaSection > FigmaFooter`; retain `FloatingChatbot` and `PublicChatRoom` in `PublicExperience`.

## 21. Implementation order

1. Obtain Editor access and complete child-node, styles, variants, reactions, and asset export inspection.
2. Import and verify exact static assets using the manifest.
3. Fix existing-section geometry, especially Jurusan crop/scale and partner track.
4. Implement Video, Program, BLUD, Prestasi, News, AI CTA, and Footer vertical slices.
5. Add interaction and timed motion contracts exactly as recorded.
6. Browser-compare at 1440px, then validate responsive and reduced-motion behavior.

## 22. Acceptance criteria

- All 15 root/section features appear in correct order at 1440px.
- All section bounds match the geometry in §8 within an agreed pixel tolerance.
- Jurusan uses CSS crop/zoom per original image, not edited replacement images.
- Partner and Program motion uses the exact source/destination geometry and timings.
- Every static asset is local, non-empty, type-correct, and listed in the manifest.
- Public pages retain loading, empty, error, and accessible interaction states.
- No secrets, temporary Figma URLs, whole-section screenshots, or fake content are shipped.
- No existing protected feature or route is changed by the homepage implementation.
- This package records unresolved Editor-only facts explicitly; OpenCode must complete those items before claiming VERIFIED.

## Audit status and evidence labels

- `VERIFIED_FROM_FIGMA`: returned by `get_metadata` or `get_screenshot`, including root bounds, section bounds, child layout boxes, partner positions, and slider geometry.
- `VERIFIED_FROM_SOURCE`: read from `frontend/src/App.tsx` and the existing local asset tree.
- `INFERRED`: implementation guidance derived from the measured geometry or the task-provided confirmed motion contract; it is not a Figma style token.
- `BLOCKED_BY_FIGMA_PERMISSION`: exact paint values, typography styles, raw asset URLs, component variants, reactions, and per-model crop transforms requiring `get_design_context` or Editor-only inspection.

The previously modified local asset manifest could not be reconstructed from Git objects after it was overwritten. The final manifest preserves the complete tracked `HEAD` manifest content and merges this audit's additions; no tracked asset entry was intentionally removed. The unrecoverable pre-existing working-tree-only delta is disclosed rather than silently represented as recovered.

## Final extraction update

- Access: `hidayah.muhammad22@smk.belajar.id`, Figma Starter team, `View` seat. `get_design_context` now works for the tested section and returned exact code/assets; prototype reaction metadata remains partly unavailable from the API.
- Reference exports added under `docs/figma-reference/` for Video, Program, BLUD, Prestasi, News, AI CTA, Footer, and floating chatbot. These are documentation-only images.
- Raw Figma images recovered into `frontend/public/assets/figma/video-profile/`, `programs/`, `achievements/`, `news/`, `ai-cta/`, `footer/`, and `chatbot/`. Existing Jurusan images were hash-verified exact matches and were not duplicated.
- 134 newly downloaded non-empty Figma files are present across the audited section folders: raw PNG/JPEG fills plus SVG vector assets. Eight new section reference exports were added; the existing `home-full.png` was retained.
- Typography recovered: Figma uses Inter with `Regular`, `Medium`, `Semi_Bold`, `Bold`, `Extra_Bold`, and `Italic` styles. Representative recovered values include 24px bold Jurusan hover titles, 14px semibold CTA labels, 12px regular Jurusan descriptions at 18px line-height, and 17px/13.6px card text patterns.
- Recovered shared colors/effects include `#006CDC`, `#0092FF`, `#4CBAF5`, `#0B1324`, `#5B6B8C`, `#EAF5FA`, `#F6FBFF`, white card surfaces, 24px card radii, translucent white borders, and `0px 4px 8px rgba(15,23,42,0.08)` card/button shadow. Do not treat this list as exhaustive for every node.

### Jurusan per-model geometry matrix

`VERIFIED_FROM_FIGMA` from node `208:1126` design context. Stage origin is the `205:815` component at section-relative `(84,251)`. Default image slots use `overflow:hidden`; source images are absolutely positioned with percentage crop transforms.

| Major | Figma node | Default X | Default Y | Default W | Default H | Image Width % | Image Height % | Image Left % | Image Top % | Hover X | Hover Y | Hover W | Hover H | Card Side | Card Position | Transition |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| KGS | `I205:815;205:710` / source `205:507` | 8 | 64 | 323 | 461 | 99.6 | 123.82 | 0.2 | -23.78 | 0 | 42 | 523 | 471 | right | x=238,y=0,w=285 | ON_HOVER -> CHANGE_TO, Smart Animate, Ease Out, ~0.3s |
| TEK | `I205:815;205:713` / source `I205:713;205:509` | 160 | 39 | 339 | 485 | 96.19 | 118.18 | 1.91 | -18.18 | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | exact hover variant not returned | ON_HOVER -> CHANGE_TO, Smart Animate, Ease Out, ~0.3s |
| TITL | `I205:815;205:714` / source `205:511` | 349 | 7 | 361 | 517 | 95.67 | 117.54 | 2.17 | -17.54 | 0 | 33.91 | 524 | 468 | left | x=0,y=0,w=285 | ON_HOVER -> CHANGE_TO, Smart Animate, Ease Out, ~0.3s |
| TFLM | `I205:815;205:715` / source `I205:715;205:513` | 561 | 7 | 363 | 518 | 102.39 | 125.79 | -0.48 | -14.86 | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | BLOCKED_BY_FIGMA_PERMISSION | exact hover variant not returned | ON_HOVER -> CHANGE_TO, Smart Animate, Ease Out, ~0.3s |
| TKR | `I205:815;205:712` / source `205:515` | 758 | 24 | 349 | 501 | 94.6 | 116.23 | 2.7 | -16.23 | 224 | 34.91 | 524 | 469 | right | x=0,y=0,w=285 | ON_HOVER -> CHANGE_TO, Smart Animate, Ease Out, ~0.3s |
| SIJA | `I205:815;205:711` / source `205:517` | 933 | 40 | 335 | 485 | 86.93 default / 98.41 hover | 106.81 default / 106.83 hover | 6.53 default / 0.23 hover | -6.81 default / -6.83 hover | 0 | 21 | 524 | 503 | left | x=0,y=21,w=285 | ON_HOVER -> CHANGE_TO, Smart Animate, Ease Out, ~0.3s |

Hover card styling recovered for KGS/TITL/TKR/SIJA: white surface, `1px #EAF5FA` border, 24px radius, 20px padding, 28px outer gap, 54px gradient icon, 24px gradient title, 12px dark body, 14px semibold blue gradient CTA, 20px arrow, and a side pointer. TEK/TFLM hover destinations remain `BLOCKED_BY_FIGMA_PERMISSION`.

### Prototype reaction matrix

| Component | Source Node | Trigger | Destination | Transition | Easing | Duration | Changed Properties |
|---|---|---|---|---|---|---:|---|
| Jurusan KGS | `205:541` | ON_HOVER | `205:568` variant | CHANGE_TO / Smart Animate | EASE_OUT | ~0.3s | crop, wrapper geometry, card appearance, z-order; exact all-property diff not exposed |
| Jurusan TITL | `205:545` | ON_HOVER | `205:613` variant | CHANGE_TO / Smart Animate | EASE_OUT | ~0.3s | crop, wrapper geometry, card appearance, z-order |
| Jurusan TKR | `205:549` | ON_HOVER | `205:658` variant | CHANGE_TO / Smart Animate | EASE_OUT | ~0.3s | crop, wrapper geometry, card appearance, z-order |
| Jurusan SIJA | `205:551` | ON_HOVER | `205:688` variant | CHANGE_TO / Smart Animate | EASE_OUT | ~0.3s | crop, wrapper geometry, card appearance, z-order |
| Buttons/cards/search/navbar | component variants | ON_HOVER | CHANGE_TO variant | Smart Animate | EASE_OUT | ~0.3s | exact per-property diffs remain unavailable for non-Jurusan instances |
| Partner marquee | `130:940` | AFTER_TIMEOUT ~0.001s | `130:897` | Smart Animate | LINEAR | 10s | repeated track translation of 2590.253px |
| Video play | `237:678` | AFTER_TIMEOUT ~0.001s | `235:661` | Smart Animate | EASE_OUT | 1s | exact visual diff requires destination child export |
| Program slider | `I246:1137;242:1043` | AFTER_TIMEOUT 0.8s | `242:995` | Smart Animate | SLOW | ~1.458421s | panel positions shift `0,556,1112` to `-556,0,556` |

### Unresolved items

Exact source-to-layer names for the newly downloaded raw image batches, complete footer column copy, all per-property hover diffs, exact Video destination artwork diff, BLUD card image mapping, and TEK/TFLM hover variants remain `BLOCKED_BY_FIGMA_PERMISSION` or require child-node inspection. The downloaded raw files are preserved and listed in the asset manifest; OpenCode must not infer their semantic order without checking the corresponding Figma child node.
