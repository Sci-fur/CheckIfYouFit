# CheckIfYouFit — Updated Technical Summary

## Stack

- Next.js App Router (JavaScript / JSX)
- React client components for interactive tools
- Global CSS with dark/light theme variables
- Browser `localStorage` for local drafts and tool progress
- Real Unsplash photographic backgrounds with local download script and remote fallback
- No external UI component framework or runtime API dependency

## Routes

| Route | Purpose |
|---|---|
| `/` | Eligibility assessment, destinations, methodology, FAQs and feature hub |
| `/compare` | Compare up to three destinations with editable annual budget assumptions |
| `/scholarships` | Searchable starter directory with official provider links |
| `/tools` | Cost estimator, BDT conversion using a user-entered rate, document checklist |
| `/shortlist` | Personal university/programme tracker with deadlines, status, notes and CSV export |
| `/resources` | Student planning guides |
| `/about` | Purpose, scoring model and limitations |
| `/developers` | Instructor, developers and university details |
| `/contact` | Enquiry form that opens a prefilled email and WhatsApp contact link |

## Core behaviour

- The eligibility wizard has seven steps: destination, level, qualification, grades, English, budget and intake.
- `lib/fit.js` calculates a 0–100 indicative planning score from four weighted factors: English 30%, grades 25%, budget 25%, qualification 20%.
- Missing starter cost data is scored neutrally; it is not treated as free study.
- Results include factor explanations, next-step suggestions and alternative destinations.
- Sample university names are presented as research starters only; they are not programme matches.
- The assessment draft, saved report, comparison state, calculator inputs, checklist progress and shortlist are stored in the visitor's browser.
- The share URL carries only the seven selected categorical assessment answers.
- The result/report print view can be saved as PDF through the browser's print dialog.

## Visual system

- Deep navy, violet and cyan palette with a light theme option
- Glass-style cards, soft borders, restrained motion and responsive layouts
- Dedicated photographic backgrounds: airport terminal, city skyline, university campus, consultation office, study desk, library, computer lab, student collaboration and graduation
- Mobile navigation, keyboard focus states, reduced-motion support and print styles

## Data and production gaps

The project does not connect to a live university catalogue, programme-level admission API, scholarship feed, immigration API, live currency service, CRM or database. The country costs and English benchmarks are starter assumptions retained from the initial prototype and must be verified and source-dated before public production use. The score is not an admission probability or a visa prediction.

The contact form uses `mailto:` and therefore depends on the visitor's configured email application. No lead data is transmitted to a server. Local storage is browser-specific and is not synced across devices.

For a production service, add server-side data management, authentication, secure report storage, CRM/email integration, verified programme-level records, a scholarship update workflow, source timestamps and privacy/consent controls.


## Brand theme update

The site now uses the Shustho Bangladesh reference palette supplied in `COLOR_PALETTE_REFERENCE.md`: forest green, deep forest, leaf, mint, warm paper, chalk and marigold. The default UI theme is light/warm-paper, with a forest-green dark variant. Typography follows `FONTS_REFERENCE.md`: Bricolage Grotesque for headings and display text, Atkinson Hyperlegible for body and interface text, and Anek Bangla as the Bengali glyph fallback. The Google Fonts import is at the top of `app/globals.css`; system sans-serif fallbacks remain available if the CDN cannot be reached.
