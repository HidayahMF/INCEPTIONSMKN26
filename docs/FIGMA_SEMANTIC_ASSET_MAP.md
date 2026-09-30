# Figma Semantic Asset Map

Current local asset mapping for visible homepage controls. Entries marked `VERIFIED` are matched against local dimensions/rendered appearance; unresolved source node IDs are recorded rather than inferred.

| Component / state | Source role | Exact local asset | Status |
|---|---|---|---|
| Hero | school building / composite student | `frontend/public/assets/figma/hero/hero-school-building.png`, `student-male.png` | VERIFIED |
| Quick Access | SPMB, library, KJP/PIP, AI | `frontend/public/assets/figma/shortcuts/` | VERIFIED |
| Overview CTA | right arrow | `frontend/public/assets/figma/icons/icon-arrow-right.svg` | VERIFIED |
| Advantages carousel | left/right controls | `frontend/public/assets/figma/advantages/advantage-carousel-left.svg`, `advantage-carousel-right.svg` | VERIFIED |
| Jurusan | badge, education, pointers, card arrows, six people | `frontend/public/assets/figma/majors/` | VERIFIED |
| Video default | blue play glyph, default ring | `frontend/public/assets/figma/video-profile/video-profile-svg-01.svg`, `video-profile-svg-03.svg` | VERIFIED |
| Video destination | outer active ring | `frontend/public/assets/figma/video-profile/video-profile-svg-08.svg` | VERIFIED |
| Program card arrows | blue chevron | `frontend/public/assets/figma/programs/programs-svg-01.svg` | VERIFIED |
| Program primary CTA | white solid arrow | `frontend/public/assets/figma/programs/programs-svg-08.svg` | VERIFIED |
| BLUD | six icons and six shape variants | `frontend/public/assets/figma/blud/` | VERIFIED / per-card bounds unresolved |
| Prestasi statistics | gift, people | `achievements-svg-12.svg`, `achievements-svg-03.svg` | VERIFIED |
| Prestasi carousel / News controls | gradient chevron | `frontend/public/assets/figma/news/news-svg-02.svg` | VERIFIED |
| Prestasi CTA | `6d2f1.svg`, `basil:arrow-right-solid`, solid white arrow | `frontend/public/assets/figma/achievements/achievements-svg-13.svg` | VERIFIED exact path/viewBox/dimensions/fill; SHA-256 matches `programs-svg-08.svg` |
| News cards | current Figma variants | `news-raw-03.png`, `news-raw-04.png`, `news-raw-01.png`, `news-raw-09.png`, `news-raw-07.png` | VERIFIED by current visual mapping |
| AI CTA | badge, rings, bot, primary arrow | `frontend/public/assets/figma/ai-cta/`, `programs-svg-08.svg` | VERIFIED |
| Footer | crest, social, contact, map | `frontend/public/assets/figma/branding/`, `footer/` | VERIFIED |
| Floating chatbot | default/hover/pressed | local imported chatbot assets | VERIFIED |

No Unicode glyph is used for a homepage icon where a verified local SVG exists.
