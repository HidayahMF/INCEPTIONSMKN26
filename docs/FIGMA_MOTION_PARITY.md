# Figma Prototype Motion Parity

This contract records verified prototype behavior for the current Figma file. Numeric easing for Figma `SLOW` is intentionally unresolved because the available motion context does not expose its cubic-bezier curve.

| Component | Source -> destination | Trigger | Duration / delay | Easing | State delta |
|---|---|---|---|---|---|
| Standard hover variants | Component default -> hover variant | `ON_HOVER` / `CHANGE_TO` | ~300ms | Ease Out | Variant-specific crop, color, shadow, opacity, geometry, and z-index; no generic transform assumed. |
| Partner marquee | `130:940` -> `130:897` | `AFTER_TIMEOUT` ~1ms | 10s / loop | Linear | Track translates `0` to `-2590.253px`; viewport `1272 x 140`; slot `235.475 x 117.737`; step `259.026px`. |
| Program slider | `I246:1137;242:1043` -> `242:995` | `AFTER_TIMEOUT` | 800ms delay, 1.458421s | Figma `SLOW` (`SLOW_NUMERIC_CURVE = UNRESOLVED`) | Track translates `0` to `-556px`; panel sequence remains marching band, traditional dance, pencak silat. |
| Video play | `237:678` -> `235:661` | `AFTER_TIMEOUT` ~1ms | 1s | Ease Out | Default ring `98.4 x 98.4` at `(12,10)` becomes `120 x 120` at `(1.2,-1)`; blue play glyph stays `52.48 x 52.48`. |
| Jurusan KGS | `205:815` -> `205:726` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `0,0,561,518`; student/crop/card animate; inactive visuals opacity `.25`. |
| Jurusan TEK | default -> `205:784` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `138,-12,572,512`. |
| Jurusan TITL | default -> `205:848` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `312,-44,612,570`. |
| Jurusan TFLM | default -> `205:879` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `340,-39,594,564`. |
| Jurusan TKR | default -> `205:914` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `526,-38,576,562`. |
| Jurusan SIJA | default -> `205:950` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `728,17,524,503`. |
| Prestasi card | `266:2170` -> `266:2136` | `ON_HOVER` / focus | ~300ms | Ease Out | Card `237 x 296` becomes `261 x 326`; matching internal layers animate; poster override remains per instance. |
| BLUD cards | default -> `246:1294`, `1310`, `1306`, `1302`, `1298`, `1314` | `ON_HOVER` / focus | ~300ms | Ease Out | Per-card shape, border, shadow, opacity; no shared generic lift. Exact internal deltas remain unavailable from the checked API context. |
| Advantages cards | `111:453` -> `123:708` | `ON_HOVER` | ~300ms | Ease Out | Geometry remains `300 x 400`; hover adds verified shadow only. |

## Reduced Motion

With `prefers-reduced-motion: reduce`, marquee and timed transitions stop or resolve to a readable stable state; controls and content remain usable.

## Unresolved

- `SLOW_NUMERIC_CURVE = UNRESOLVED`: the checked Figma prototype/node context (`I246:1137;242:1043` -> `242:995`) exposes the preset name and duration, but not cubic-bezier control points. No approximation was introduced.
- Exact per-card BLUD internal shape bounds remain unresolved. The checked prototype destination nodes (`246:1294`, `246:1310`, `246:1306`, `246:1302`, `246:1298`, `246:1314`) were available only as destination references; recursive child property deltas were not exposed by the available API context.

## BLUD Default -> Hover Geometry Audit

The default values below are the verified shared component contract. The six hover destination node IDs were checked as prototype destinations, but the available API did not return recursive child bounds/styles for their shape, border, shadow, icon, or text layers. Therefore no per-card CSS delta is asserted or invented.

| Card | Default | Hover | Verified delta | Node evidence |
|---|---|---|---|---|
| KGStudio | card 400x200, radius 24px, 2px `#EAF5FA` border, padding 18px; semantic icon/shape pair | Internal geometry unavailable | No extractable shape x/y/width/height/opacity, border, shadow, icon, or text delta | `246:1294`; card source `246:1379` |
| UPTECHNO | card 400x200, radius 24px, 2px `#EAF5FA` border, padding 18px; semantic icon/shape pair | Internal geometry unavailable | No extractable shape x/y/width/height/opacity, border, shadow, icon, or text delta | `246:1310`; card source `246:1386` |
| E-MAN | card 400x200, radius 24px, 2px `#EAF5FA` border, padding 18px; semantic icon/shape pair | Internal geometry unavailable | No extractable shape x/y/width/height/opacity, border, shadow, icon, or text delta | `246:1306`; card source `246:1393` |
| Manufaktur26 | card 400x200, radius 24px, 2px `#EAF5FA` border, padding 18px; semantic icon/shape pair | Internal geometry unavailable | No extractable shape x/y/width/height/opacity, border, shadow, icon, or text delta | `246:1302`; card source `246:1400` |
| Garage26 | card 400x200, radius 24px, 2px `#EAF5FA` border, padding 18px; semantic icon/shape pair | Internal geometry unavailable | No extractable shape x/y/width/height/opacity, border, shadow, icon, or text delta | `246:1298`; card source `246:1401` |
| GADIZ VOKASI | card 400x200, radius 24px, 2px `#EAF5FA` border, padding 18px; semantic icon/shape pair | Internal geometry unavailable | No extractable shape x/y/width/height/opacity, border, shadow, icon, or text delta | `246:1314`; card source `246:1402` |

Production comparison: the current implementation has a shared hover border/shadow and per-card semantic shape asset positioning, but the checked Figma data does not prove those values wrong. No BLUD CSS was changed.

## Prestasi CTA Asset Audit

Source role: `6d2f1.svg`, `basil:arrow-right-solid`. The exact local equivalent is `frontend/public/assets/figma/achievements/achievements-svg-13.svg`. It has the same path geometry, `viewBox="0 0 20 20"`, dimensions `20 x 20`, and `fill="white"` as the existing exported `frontend/public/assets/figma/programs/programs-svg-08.svg`; both files also have identical SHA-256 hashes. The semantic mapping is `figmaAssets.achievements.detailArrow`.
