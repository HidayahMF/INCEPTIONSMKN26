# Figma Prototype Motion Parity

This contract records verified prototype behavior for the current Figma file. Numeric easing for Figma `SLOW` is intentionally unresolved because the available motion context does not expose its cubic-bezier curve.

| Component | Source -> destination | Trigger | Duration / delay | Easing | State delta |
|---|---|---|---|---|---|
| Standard hover variants | Component default -> hover variant | `ON_HOVER` / `CHANGE_TO` | ~300ms | Ease Out | Variant-specific crop, color, shadow, opacity, geometry, and z-index; no generic transform assumed. |
| Partner marquee | `130:940` -> `130:897` | `AFTER_TIMEOUT` ~1ms | 10s / loop | Linear | Track translates `0` to `-2590.253px`; viewport `1272 x 140`; slot `235.475 x 117.737`; step `259.026px`. |
| Program slider | `I246:1137;242:1043` -> `242:995` | `AFTER_TIMEOUT` | 800ms delay, 1.458421s | Figma `SLOW` (numeric curve unresolved) | Track translates `0` to `-556px`; panel sequence remains marching band, traditional dance, pencak silat. |
| Video play | `237:678` -> `235:661` | `AFTER_TIMEOUT` ~1ms | 1s | Ease Out | Default ring `98.4 x 98.4` at `(12,10)` becomes `120 x 120` at `(1.2,-1)`; blue play glyph stays `52.48 x 52.48`. |
| Jurusan KGS | `205:815` -> `205:726` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `0,0,561,518`; student/crop/card animate; inactive visuals opacity `.25`. |
| Jurusan TEK | default -> `205:784` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `138,-12,572,512`. |
| Jurusan TITL | default -> `205:848` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `312,-44,612,570`. |
| Jurusan TFLM | default -> `205:879` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `340,-39,594,564`. |
| Jurusan TKR | default -> `205:914` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `526,-38,576,562`. |
| Jurusan SIJA | default -> `205:950` | `ON_HOVER` | ~300ms | Ease Out | Wrapper `728,17,524,503`. |
| Prestasi card | `266:2170` -> `266:2136` | `ON_HOVER` / focus | ~300ms | Ease Out | Card `237 x 296` becomes `261 x 326`; matching internal layers animate; poster override remains per instance. |
| BLUD cards | default -> `246:1294`, `1310`, `1306`, `1302`, `1298`, `1314` | `ON_HOVER` / focus | ~300ms | Ease Out | Per-card shape, border, shadow, opacity; no shared generic lift. |
| Advantages cards | `111:453` -> `123:708` | `ON_HOVER` | ~300ms | Ease Out | Geometry remains `300 x 400`; hover adds verified shadow only. |

## Reduced Motion

With `prefers-reduced-motion: reduce`, marquee and timed transitions stop or resolve to a readable stable state; controls and content remain usable.

## Unresolved

- Figma `SLOW` numeric cubic-bezier is not exposed by the available motion API.
- Exact per-card BLUD internal shape bounds require fresh recursive design context; current implementation uses local semantic shape assets and no generic lift.
