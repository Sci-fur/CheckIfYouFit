# Features included in this upgrade

## Implemented in this frontend

- Responsive navigation and mobile menu
- Dark/light theme toggle
- English/Bangla interface toggle for core navigation and homepage copy
- Seven-step eligibility assessment with draft autosave in the browser
- Indicative score, weighted factor breakdown and practical next-step suggestions
- Alternative destination suggestions using the same transparent starter model
- Save report locally, share assessment URL, prepare an email summary, and print/save as PDF
- Destination search and country notes
- Compare up to three destinations, including editable annual budget assumptions
- Scholarship directory with text, destination, level and funding filters; each card links to the official provider
- Study cost estimator with course duration, tuition, living costs and one-time expenses
- Optional BDT conversion using a rate entered by the user (no live FX feed)
- Level-based document checklist with browser persistence, copy and print actions
- Personal university/programme shortlist with deadlines, notes, status tracking and CSV export (manual entries; not a live search catalogue)
- Student resource guides and FAQ
- About/methodology page and project team page
- Contact form that prepares a `mailto:` message and direct WhatsApp link
- Real photographic backgrounds for the home hero, destinations, assessment result, tools, scholarships, shortlist, resources, about, contact and developers pages; local download script plus remote photo fallback
- Responsive layouts, keyboard focus states, reduced-motion support and print styles

## Not connected yet — requires backend or verified data services

- Real user accounts, login, password reset and cloud dashboards
- Server-side report storage and synchronisation across devices
- Automatic email delivery (the current form opens the visitor's email app)
- CRM lead capture and counsellor assignment
- Live university/course search and exact programme-level eligibility matching
- Verified current tuition, living-cost, IELTS and admission requirement feeds
- Live scholarship listings, application deadlines and eligibility matching
- Live exchange rates
- Visa/work-rights API or legal/immigration advice
- Admin panel for updating countries, sources, scholarships and content

## Data and safety notes

- The fit score is a planning signal, not a probability of admission.
- The country profile assumptions in `lib/data.js` are starter/demo values and must be verified before launch.
- A missing cost value is not treated as free study.
- Scholarship deadlines and eligibility are intentionally not hard-coded because they change by application cycle.
- The checklist is general and must be adapted to each institution and visa category.
- Contact form details are not transmitted to a server by this version.
- No student testimonials, admission counts or success-rate claims have been invented. Add real, consented student stories only when verified material is available.
