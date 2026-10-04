# CSS Audit Status

## Migrated

- FloatingChatbot
- PartnerLogos
- PublicNavbar
- ShortcutMenu
- SchoolOverview
- SchoolAdvantages
- HeroSection gradient text
- PublicFooter
- VideoProfile layout/geometry (animation exceptions retained)
- Program main markup/layout
- BLUD main markup/layout
- AI CTA main markup/geometry
- PublicChatRoom UI

## Intentionally Retained

- `app.css` and `final-controls.css`: still contain active section fallback, responsive, and animation rules.
- `videoPlayPulse`: active VideoProfile animation.
- `chatbot-thinking`: active chat loading animation.
- `partner-marquee`: active partner logo marquee.
- Major/Jurusan positioning and transitions: active complex responsive geometry.
- Program panel autoplay/transform rules: active slider behavior.
- BLUD fallback/shape selectors: active responsive and compatibility behavior.
- AI CTA settle selectors: active entrance animation.
- Login mobile selectors: retained because Login JSX is one-line and a safe minimal replacement was not possible without structural reformat.
- Third-party Photo Sphere Viewer styles: not owned by the application and not migrated.

## Final Rule Classification

### MIGRATED

- PublicNavbar layout and state utilities
- FloatingChatbot layout and responsive sizing
- ShortcutMenu card layout/state utilities
- PartnerLogos slot/track layout
- SchoolOverview geometry utilities
- SchoolAdvantages card/control utilities
- PublicFooter layout/grid utilities
- PublicChatRoom layout/bubble/composer utilities
- Program primary layout geometry
- BLUD primary layout geometry
- AI CTA primary layout geometry

### RETAINED - APPLICATION BEHAVIOR

- Program panel autoplay transforms and timing
- Jurusan/major positioning, focus states, and complex hover geometry
- BLUD compatibility/fallback selectors for existing card state behavior
- News/Prestasi carousel overflow and pointer-drag behavior
- Login mobile width fallback (`login-form-panel`, `login-form-inner`, `login-form`); JSX is intentionally not reformatted for a risky cosmetic migration

### RETAINED - ANIMATION

- `videoPlayPulse`
- `chatbot-thinking`
- `partner-marquee`
- AI CTA settle animation (`ai-cta-fill`, `ai-cta-bot`, `ai-cta-outline`)

### RETAINED - RESPONSIVE FALLBACK

- Login mobile max-width constraints
- Major mobile fallback list
- Program/BLUD responsive layout fallbacks
- Footer responsive collapse rules
- Video Profile mobile geometry fallback

### RETAINED - THIRD PARTY

- Photo Sphere Viewer generated/runtime styles

### SAFE TO REMOVE

- No additional shared CSS selector is currently safe to remove globally without a full consumer graph and visual regression pass.

## Not Yet Migrated

- Full Program/BLUD/Prestasi/News CSS removal after their Tailwind markup migration.
- AI CTA animation CSS removal/replacement.
- Login complete Tailwind migration.
- Final shared responsive CSS cleanup.
- Full Portal/Admin/Tour CSS audit and cleanup.

## Keyframes

- `videoPlayPulse` — USED BY APPLICATION
- `chatbot-thinking` — USED BY APPLICATION
- `partner-marquee` — USED BY APPLICATION

None are safe to remove.
