# CheckIfYouFit - Study Abroad Planning Platform

A Next.js App Router project for early study-abroad planning. It combines an indicative eligibility assessment with destination comparison, scholarship discovery, cost planning, document tracking and student resources.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer recommended

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Background photographs

The site uses photographic backgrounds and a new destination directory with a national flag and famous-landmark image for each of the 22 countries. Nine destination photos and the airport/London hero photos are bundled locally. The remaining destination photos have local download targets plus remote fallbacks; run the downloader to cache as many as their source hosts allow.

For a self-hosted or offline copy, optionally run:

```bash
npm run images:download
```

This downloads page backgrounds and the remaining 13 landmark photos into `public/images/` and `public/images/destinations/`. If a source host blocks automated downloads, the destination cards try the remote source URL as a browser fallback. Photographer/source details are listed in `IMAGE_CREDITS.md` and `public/images/destination-manifest.json`.

## Production build

```bash
npm run build
npm run start
```

## Main routes

- `/` - seven-step eligibility assessment, destination preview, tools overview and FAQs
- `/destinations` - searchable 22-country destination gallery with flags, landmark photography and region filters
- `/compare` - compare up to three destinations and enter your own cost assumptions
- `/scholarships` - searchable starter directory linking to official scholarship providers
- `/tools` - study-cost estimator and document checklist
- `/shortlist` - local university/programme shortlist and application status tracker
- `/resources` - practical student planning guides
- `/about` - purpose, scoring model and limitations
- `/developers` - instructor, developers and university details
- `/contact` - enquiry form that prepares an email in the visitor's email application

## Local persistence

The assessment draft, saved result, comparison selections, calculator inputs and checklist progress are stored in the visitor's browser using `localStorage`. They are not sent to a server. A shareable assessment URL contains the selected assessment answers in its query string; users should not put sensitive personal information into the assessment.

## Important data note

This project does **not** connect to a live university/programme catalogue, admissions system, scholarship feed, visa API or currency API. The eligibility score is an indicative planning model using broad starter assumptions, not an admission prediction. Sample institution names are research starters only. Cost and English benchmarks must be checked against the exact programme, institution, city and current intake.

Before production use, replace starter assumptions in `lib/data.js` with verified, source-dated programme-level data and add a backend for user accounts, lead capture, email delivery, data administration and secure report storage.

## Project structure

- `app/` - routes and global stylesheet
- `components/` - shared navigation, footer and site preferences
- `lib/data.js` - countries, questionnaire options, scholarship directory and checklist data
- `lib/fit.js` - transparent indicative scoring logic
- `public/images/` - bundled hero photos, destination landmark photos and manifests
- `public/destination-photo-preview.html` - standalone preview of all 22 destination flags and landmark images
- `public/background-preview.html` - visual gallery of the actual photo sources
- `public/developer/` and `public/instructor/` - supplied project profile images
- `scripts/download-backgrounds.mjs` - downloads page backgrounds and remaining destination photographs locally


## Visual theme

The default interface uses the forest-green / warm-paper palette in `COLOR_PALETTE_REFERENCE.md`. Use the header theme control to switch to the dark forest variant. Typography follows `FONTS_REFERENCE.md`: Bricolage Grotesque for headings and display text, Atkinson Hyperlegible for body/UI text, and Anek Bangla as the Bengali glyph fallback. Google Fonts are loaded from the CDN; system sans-serif fallbacks keep the site usable if the font service is unavailable. The type scale uses a strict 28px minimum for visible text, with fluid headings above that floor and layouts reflowed for the larger type.


## Large-type layout (100% browser zoom)

The interface now enforces a minimum 28px font size for visible text, buttons, navigation, labels, form controls and tables. Headings scale above that floor. The header navigation is available through an expandable menu so it remains comfortable at normal browser zoom. Content widths, destination cards, form controls and spacing have been adjusted for the larger type. The font families remain Bricolage Grotesque (headings), Atkinson Hyperlegible (body/UI) and Anek Bangla (Bengali fallback).
