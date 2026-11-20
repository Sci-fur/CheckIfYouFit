# CheckIfYouFit — system diagrams

Two diagrams describe the whole system. Open the `.svg` files directly in a browser, or view them embedded below.

| Diagram | File | Shows |
|---|---|---|
| Level-1 Data Flow Diagram | [dfd.svg](dfd.svg) | External entities, the six processes, the static dataset and the five `localStorage` data stores, with every labelled data flow. |
| System architecture | [architecture.svg](architecture.svg) | The browser-side Next.js app (routes, components, libraries), browser APIs/storage, and all external services it touches. |

## Key facts the diagrams capture

- **No backend.** The app is a static Next.js 16 site; every page is a client component (`'use client'`). There are no API routes, no server, no database.
- **All state lives in the browser.** Feature state persists in `localStorage` under `cyf-*` keys; the assessment wizard also autosaves a draft and supports shareable `?assessment=` URLs.
- **Scoring is pure and local.** `lib/fit.js` (`computeResults`, `factorScores`, `verdictFor`) computes the weighted fit score (English 30%, grades 25%, budget 25%, qualification 20%) entirely in memory from `lib/data.js` starter data.
- **External contact is outbound only.** WhatsApp (`wa.me`), email (`mailto:`) and official-source links open in a new tab/window; the app never calls those services.
- **Assets are CDN + local.** Fonts come from Google Fonts, photos from `public/images/` with Unsplash fallbacks.

## DFD element summary

- **Entities:** E1 Student/User · E2 Official sources (outbound links only) · E3 WhatsApp/Email
- **Processes:** P1 Eligibility Wizard · P2 Fit Scoring Engine · P3 Cost Estimator & Checklist · P4 Shortlist Tracker · P5 Directory/Compare/Scholarships · P6 Report Actions (save/print/share)
- **Stores:** D0 static dataset (`lib/data.js`, read-only) · D1 assessment draft+report · D2 tools state · D3 compare state · D4 shortlist · D5 theme/language preferences
