# Fonts — Shustho

Reference for the type system used across the site. All font loading and sizing is defined in `app/globals.css`.

## Font families

Loaded via Google Fonts (`@import` at the top of `app/globals.css`):

| Family | Weights | Role | CSS variable |
|---|---|---|---|
| **Bricolage Grotesque** | 400–800 (variable, `opsz` axis) | Display/headings | `--font-display` |
| **Atkinson Hyperlegible** | 400, 700 (+ italics) | Body text, UI, forms | `--font-body` |
| **Anek Bangla** | 400–700 | Bangla (বাংলা) glyph fallback | fallback in both stacks |

### Import URL

```css
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Anek+Bangla:wght@400..700&display=swap');
```

## Stack definitions

```css
--font-display: 'Bricolage Grotesque', 'Anek Bangla', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body:    'Atkinson Hyperlegible', 'Anek Bangla', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

- `Anek Bangla` sits in both stacks so Bengali text renders correctly when the
  Bangla/English toggle (`src/i18n.jsx`) is active.
- System sans-serif fonts are the final fallback if Google Fonts is unreachable
  (the site still works offline, just with plainer type).

## Where each family is used

| Element | Family |
|---|---|
| `h1`–`h4`, `.brand-word`, `.stat-card strong`, `.appointment-date b`, `.not-found-code` | `--font-display` (Bricolage Grotesque) |
| `body`, buttons, inputs, labels, tables, pills, everything else | `--font-body` (Atkinson Hyperlegible) |

Atkinson Hyperlegible was chosen for its high legibility — it is designed for
low-vision readers, which matches the site's accessibility-first direction.

## Type scale — 28px minimum at 100% zoom

The current CheckIfYouFit implementation uses a strict **28px minimum for all visible text**. The site is laid out for a normal 100% browser zoom; it does not ask visitors to zoom in to read labels, buttons, navigation, tables or helper copy.

| Variable | Value | Used for |
|---|---|---|
| `--fs-floor` | `28px` | Minimum visible text, controls, labels and small copy |
| `--fs-body` | `28px` | Base body copy |
| `--fs-h3` | `clamp(36px, 2.2vw, 42px)` | `h3` |
| `--fs-h2` | `clamp(44px, 3vw, 56px)` | `h2` |
| `--fs-h1` | `clamp(52px, 4vw, 72px)` | `h1` |
| `--fs-display` | `clamp(60px, 4.8vw, 82px)` | Hero headline |

The global 28px floor is applied to visible text elements and form controls. Heading and display sizes scale fluidly above that floor. The header uses an expandable menu so navigation remains usable without shrinking text. Destination cards, form fields and content grids have been enlarged/reflowed to suit the type scale.

## License notes

- **Bricolage Grotesque** — SIL Open Font License 1.1 (variable font by Mathieu Triay)
- **Atkinson Hyperlegible** — SIL Open Font License 1.1 (developed by the Braille Institute)
- **Anek Bangla** — SIL Open Font License 1.1

All three are free for commercial use and served from Google Fonts CDN.
For fully offline/air-gapped deployment, self-host the `.woff2` files and
replace the `@import` with `@font-face` declarations.

## Changing the fonts

1. Edit the `@import` URL and/or the `--font-display` / `--font-body` stacks
   in `app/globals.css`.
2. To resize the whole system, adjust `--fs-floor` / `--fs-body` first — they
   cover the majority of text — then spot-check hardcoded `font-size:` values.
3. Keep `Anek Bangla` (or another Bengali-capable family) in the stacks if the
   Bangla toggle must keep working.
4. Verify Bangla rendering and check `prefers-contrast` / `prefers-reduced-motion`
   media queries at the bottom of `src/styles.css` still look right.
