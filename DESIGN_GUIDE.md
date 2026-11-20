# CheckIfYouFit - photographic design guide

## Real photographs connected to the site

| Website area | Photo | Photographer | Source |
|---|---|---|---|
| Home hero | Airport airplane at sunset | Bernd Dittrich | https://unsplash.com/photos/airplane-at-airport-during-a-vibrant-sunset-c4NALCgP51Y |
| Home destinations | London skyline at sunset | Eduard Pretsi | https://unsplash.com/photos/london-skyline-with-bridge-and-river-at-sunset-PUFgFo4PptI |
| Home how-it-works / Scholarships | University campus with students | Brelyn Bashrum | https://unsplash.com/photos/students-walking-through-a-university-campus-archway-MUiv880yORo |
| Home tools / Tools page | Laptop and study workspace | Ritupon Baishya | https://unsplash.com/photos/modern-laptop-and-keyboard-on-a-home-office-desk-vR2kup7Uyds |
| Home transparency / Resources page | Trinity College library | Jonathan Singer | https://unsplash.com/photos/library-interioe-NgU7IJ5XuyY |
| Compare page | Sydney Opera House at sunset | Sung Jin Cho | https://unsplash.com/photos/sydney-opera-house-at-sunset-over-the-water-M7xPhPxyV2Y |
| Shortlist page | Students studying in a library | Fer Troulik | https://unsplash.com/photos/people-studying-at-tables-in-a-modern-library-ct1NZSUSWUc |
| About page | University building with students | Zoshua Colah | https://unsplash.com/photos/university-building-with-students-walking-on-a-brick-plaza-s2GGXQ4oF8Y |
| Developers page | Bangladeshi startup team at work | Ngital | https://unsplash.com/photos/six-colleagues-collaborating-around-a-conference-table-with-laptops-RdEFWm0N84o |
| Contact / Home consultation CTA | Colleagues collaborating at an office desk | Vitaly Gariev | https://unsplash.com/photos/colleagues-collaborating-at-a-modern-office-desk-0iTp1WNlMGc |
| Completed eligibility result | University graduation ceremony | Olek Buzunov | https://unsplash.com/photos/students-in-graduation-caps-and-gowns-STw47GkJivE |

## How the images are applied

`app/globals.css` uses each local JPG as the first background layer and its corresponding Unsplash URL as a remote fallback. The remote image is visible immediately when the site is online. The optional `npm run images:download` command saves local copies for offline use.

The page-specific classes are `.page-hero-tools`, `.page-hero-world`, `.page-hero-campus`, `.page-hero-library`, `.page-hero-developers`, `.page-hero-shortlist`, `.page-hero-about` and `.page-hero-consultation`. Each interior page also has its own low-contrast photographic background behind the content area, so the image remains visible while scrolling. The homepage uses `.hero-section`, `.section-how`, `.destinations-image`, `.tools-section`, `.transparency-section` and `.cta-image`; the completed assessment uses `.result-hero`.

The dark overlays have been reduced so the photographs are clearly visible while headings, form fields and cards remain readable. The light theme uses softer overlays on the light homepage sections.

## Preview and credits

Open `/background-preview.html` to view the exact photographs connected to the CSS. See `IMAGE_CREDITS.md` for photographers and source pages.


## Brand colors and typography refresh

The UI color system now follows `COLOR_PALETTE_REFERENCE.md` (Shustho Bangladesh reference): forest green `#0e4a3c`, deep forest `#09372d`, leaf `#2e7d63`, mint `#cbe5d5`, soft green `#e7efe4`, paper `#f1f4ec`, chalk `#fcfdf7`, ink `#15251f`, marigold `#f2b233`, and marigold-soft `#fbebc4`. The default theme is the warm paper/light treatment; the optional dark theme stays within the same forest-green palette.

Typography follows the separate `FONTS_REFERENCE.md` specification: Bricolage Grotesque is used for display and headings, Atkinson Hyperlegible for body text and interface controls, and Anek Bangla is included in both stacks for Bengali glyph fallback.

The former purple/cyan gradients have been replaced with flat forest-green and marigold fills, firm 2px ink borders, and offset shadows inspired by the reference design notes. Photographic backgrounds, destination landmark imagery, and country flags remain in place.


## Typography

- Display/headings: Bricolage Grotesque (variable weights 400–800).
- Body, navigation, buttons, forms and UI: Atkinson Hyperlegible (400/700 and italics).
- Bengali glyph fallback in both stacks: Anek Bangla (400–700).
- Font families and the supplied fluid type tokens are defined in `app/globals.css`; Google Fonts are imported at the top of that stylesheet.
- See `FONTS_REFERENCE.md` for the source specification.


## Readable compact type scale

The layout uses a compact, consistent type scale tuned for 100% browser zoom: the root font size is 22px, so body copy lands around 20–24px and small labels/metadata stay around 13–16px — readable without the oversized overrides that previously broke the layout. Headings use fluid clamps (display ~50–76px, h1 ~42–62px, h2 ~34–48px, h3 ~26–34px). Buttons, inputs and navigation use shared compact sizing (44–48px controls). The header shows the full navigation on a centred second row on desktop and switches to a dropdown panel below 1180px. The font families remain Bricolage Grotesque for headings, Atkinson Hyperlegible for UI/body copy and Anek Bangla for Bengali glyphs.
