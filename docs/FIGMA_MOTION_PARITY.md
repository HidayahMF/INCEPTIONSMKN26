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
| BLUD cards | default -> `246:1294`, `1310`, `1306`, `1302`, `1298`, `1314` | `ON_HOVER` / focus | ~300ms | Ease Out | Card `400x200`; border `2px #EAF5FA` -> `4px #006CDC`; shape wrapper `(392,24.39,59.92,150.215)` -> `(297,-28,100.92,253)`; hover shape `blud-svg-19.svg`; shadow only KGStudio, E-MAN, Manufaktur26, Garage26. |
| Advantages cards | `111:453` -> `123:708` | `ON_HOVER` | ~300ms | Ease Out | Geometry remains `300 x 400`; hover adds verified shadow only. |

## Reduced Motion

With `prefers-reduced-motion: reduce`, marquee and timed transitions stop or resolve to a readable stable state; controls and content remain usable.

## Unresolved

- `SLOW_NUMERIC_CURVE = UNRESOLVED`: the checked Figma prototype/node context (`I246:1137;242:1043` -> `242:995`) exposes the preset name and duration, but not cubic-bezier control points. No approximation was introduced.
- BLUD child geometry is resolved from fresh direct contexts: default shape wrapper `(392,24.39,59.92,150.215)` with the `150.215x59.92` shape rotated `-90deg`; hover wrapper `(297,-28,100.92,253)` with `blud-svg-19.svg` (`253x100.92`) rotated `-90deg`. Hover shadow is present for KGStudio, E-MAN, Manufaktur26, and Garage26 only.

## BLUD Default -> Hover Geometry Audit

The default values below are the verified shared component contract. Default semantic shape assets are mapped by role in `figmaAssets.blud.defaultShapes`; the obsolete numeric icon/plus/bolt/arrow array is no longer used.

| Card | Default | Hover | Verified delta | Node evidence |
|---|---|---|---|---|
| KGStudio | card 400x200, radius 24px, 2px `#EAF5FA` border, padding 18px; default shape wrapper `(392,24.39,59.92,150.215)` | 4px `#006CDC` border; hover wrapper `(297,-28,100.92,253)`; shadow `0 4px 16px rgba(15,23,42,.08)` | Border width/color and shape wrapper change | `246:1294`; default `246:1379`, component `246:1244` |
| UPTECHNO | same shared default geometry | 4px `#006CDC` border; hover wrapper `(297,-28,100.92,253)`; no exposed hover shadow | Border width/color and shape wrapper change | `246:1310`; default `246:1386`, component `246:1286` |
| E-MAN | same shared default geometry | 4px `#006CDC` border; hover wrapper `(297,-28,100.92,253)`; shadow `0 4px 16px rgba(15,23,42,.08)` | Border width/color and shape wrapper change | `246:1306`; default `246:1393`, component `246:1282` |
| Manufaktur26 | same shared default geometry | 4px `#006CDC` border; hover wrapper `(297,-28,100.92,253)`; shadow `0 4px 16px rgba(15,23,42,.08)` | Border width/color and shape wrapper change | `246:1302`; default `246:1400`, component `246:1278` |
| Garage26 | same shared default geometry | 4px `#006CDC` border; hover wrapper `(297,-28,100.92,253)`; shadow `0 4px 16px rgba(15,23,42,.08)` | Border width/color and shape wrapper change | `246:1298`; default `246:1401`, component `246:1246` |
| GADIZ VOKASI | same shared default geometry | 4px `#006CDC` border; hover wrapper `(297,-28,100.92,253)`; no exposed hover shadow | Border width/color and shape wrapper change | `246:1314`; default `246:1402`, component `246:1290` |

Production comparison: the generic lift and generic blue shadow were removed. Default and hover shape wrappers, border transition, hover asset, and per-card shadow behavior now follow the fresh Figma contract.

## Prestasi CTA Asset Audit

Current source role: `9c51c.svg`, `basil:arrow-right-solid`. The exact local export is `frontend/public/assets/figma/icons/secondary-arrow-right.svg`, `20x20`, `viewBox="0 0 20 20"`, fill `#0092FF`. The semantic mapping is `figmaAssets.secondaryButton.arrowRight`; Prestasi no longer uses `figmaAssets.achievements.detailArrow`.
