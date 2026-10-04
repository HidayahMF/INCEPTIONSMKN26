# Responsive Rules

This document is the implementation contract for new public sections. It is
based on browser audits at `360x800`, `375x812`, `390x844`, `768x1024`,
`1024x768`, `1280x800`, and `1440x900`.

## Root Layout

- Every page root must use `min-w-0 max-w-full`.
- Public page wrappers must use `overflow-x-clip` only at the page boundary.
- Do not use global `overflow-hidden` to conceal a wrong child width or wrong
  absolute position.
- Any section with an absolute illustration must own `relative overflow-hidden`
  when the illustration is intentionally clipped by its design frame.

## Containers

- Use `w-full min-w-0 max-w-full` for fluid content.
- Use a bounded desktop container such as `mx-auto w-full max-w-[1272px]` or
  `max-w-[1280px]`.
- Never use a fixed width without a responsive fallback.
- Prefer `grid-cols-1` on mobile, then add `sm:`, `md:`, or arbitrary project
  breakpoints only when the actual viewport has enough space.
- Grid children that contain text must include `min-w-0`.

## Typography

- Mobile headings must have an explicit mobile size and line height.
- Do not use `whitespace-nowrap` for body copy or headings that can exceed a
  narrow viewport.
- Use `max-w-full` and a readable line height for paragraphs.
- A button label must be allowed to wrap or the button must have a fluid width;
  never combine long text with a fixed mobile width.

## Cards And Media

- Cards should use `w-full max-w-[...]` on mobile, not a desktop width that is
  forced into a narrow row.
- A multi-card row must choose one of these explicit patterns:
  - responsive grid: one column mobile, then two/three/four columns; or
  - intentional carousel: fixed card width, visible affordance, and documented
    horizontal scrolling.
- Images must use `max-w-full`, an intentional `object-fit`, and a mobile
  `object-position` when the crop changes.
- Decorative images must be resized and repositioned at mobile breakpoints;
  do not simply hide a design element unless the Figma state omits it.

## Absolute Decorations

- Parent: `relative`.
- Decoration: `pointer-events-none` and bounded by the parent section.
- At mobile widths, calculate the decoration from the viewport or container,
  not from a desktop pixel offset.
- Check both sides of the viewport for circles, arcs, blobs, and wide SVGs.
- If a decoration overlaps readable text, adjust its size/position or the text
  flow; do not cover it with an opaque global overlay.

## Navbar

- Desktop navigation may be hidden below its supported breakpoint.
- Mobile navigation must use a fluid width such as
  `w-[min(14rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]`.
- Dropdowns must be bounded by the viewport and allowed to scroll vertically.
- Logo and menu controls must have `shrink-0`; text areas must have `min-w-0`.

## Footer

- Footer content must use `min-w-0` in every grid/flex region.
- Long links and contact strings need `break-words` or a constrained readable
  width.
- Mobile footer columns should start at one column, then expand to two or three
  only when the viewport supports it.
- Footer decorative map/art must be `max-w-full` unless it is deliberately
  cropped inside a bounded card.

## Verification Checklist

For every new section, inspect actual browser renders at:

```text
360x800, 375x812, 390x844, 768x1024, 1024x768, 1280x800, 1440x900
```

Check visual wrapping, overlap, image crop, buttons, dropdowns, card behavior,
footer flow, and actual screenshots. `scrollWidth === clientWidth` is useful but
is not sufficient proof of responsive correctness.
