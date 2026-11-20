# Shustho Bangladesh — Color Palette

All colors used across the site, extracted from `src/styles.css` (design tokens in `:root`) and `index.html` (theme-color meta).

## Core design tokens (`:root` variables)

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#15251f` | Primary text, borders, shadows |
| `--forest` | `#0e4a3c` | Brand primary — hero, buttons, brand mark (also `<meta name="theme-color">`) |
| `--forest-deep` | `#09372d` | Top strip, footer, button hover state |
| `--leaf` | `#2e7d63` | Accent green |
| `--mint` | `#cbe5d5` | Light green fills — status pills, hover states, top-strip text |
| `--soft` | `#e7efe4` | Alternate section background, hover fills |
| `--paper` | `#f1f4ec` | Page background |
| `--chalk` | `#fcfdf7` | Card / header / input surfaces |
| `--line` | `#c9d6c9` | Borders, dividers |
| `--marigold` | `#f2b233` | Accent yellow — eyebrow badges, links, highlights, trust strip |
| `--marigold-soft` | `#fbebc4` | Soft yellow fills — tags, amber status |
| `--alert` | `#b63d30` | Error / emergency red |
| `--alert-soft` | `#fbe8e3` | Soft red fills — emergency notice |
| `--muted` | `#4f645a` | Secondary text |

## On-dark text colors

Used on forest/deep-green backgrounds (hero, footer, CTA panels).

| Hex | Usage |
|---|---|
| `#d7e7dc` | Body text on dark sections (hero lead, footer links) |
| `#c9dcd0` | Muted text on dark sections (hero assurance, footer bottom) |
| `#d6e6f0` | Light blue-grey tint (also reused as `.tone-blue` background) |
| `#e6efe3` | Hero image wrap background |
| `#fff` / `#ffffff` | Pure white — button text, emergency icon, `.button-white` |

## Accent & status colors (hard-coded)

| Hex | Usage |
|---|---|
| `#f7c661` | Lighter marigold — CTA button hover |
| `#fbebc4` + `#b57a0b` + `#6b4404` + `#4b3207` + `#4b3b12` | Amber status/tag palette (`.status-amber`, `.demo-tag`, `.trust-strip` text) |
| `#b63d30` + `#fbe8e3` + `#5b1f18` + `#f0a99f` | Alert palette — emergency notice, `.video-control.off` border/text |
| `#2e7d63` + `#0e4a3c` + `#09372d` + `#1f5a50` | Green accent family |

## Category / tone colors

Soft pastel backgrounds with darker text, used for record icons, partner badges, avatars, and dashboard tones.

| Class | Background | Text / icon color |
|---|---|---|
| `.tone-blue` / `.partner-blue` / `.record-icon.blue` | `#d6e6f0` | `#1e5673` |
| `.tone-violet` / `.partner-violet` | `#e4daf1` | `#5a3b7e` |
| `.tone-amber` / `.partner-amber` / `.record-icon.amber` | `#fbebc4` | `#6b4404` |
| `.partner-teal` | `#cfe9e4` | `#1f5a50` |

## Avatar palette

| Class | Hex |
|---|---|
| `.avatar-rose` | `#f4d6d4` |
| `.avatar-blue` | `#d5e6ef` |
| `.avatar-violet` | `#e4daf1` |
| `.avatar-amber` | `#f6e2b9` |
| `.avatar-pink` | `#f3d9e4` |
| `.avatar-teal` | `#cfe9e4` |
| `.avatar-indigo` | `#d8ddf2` |
| `.avatar-green` | `#d3e9d9` |

## Product card colors

| Class | Hex |
|---|---|
| `.product-m1` | `#ddebe2` |
| `.product-m2` | `#f4e6c8` |
| `.product-m3` | `#e2e6f3` |
| `.product-m4` | `#f3dedd` |
| `.product-m5` | `#e6efe3` |
| `.product-m6` | `#e0ecef` |

## Form & input colors

| Hex | Usage |
|---|---|
| `#7b8c80` | Placeholder text |
| `#4f645a` (`--muted`) | Helper / legal text, disabled text |
| `#34453d` (`--muted` override) + `#7f9185` (`--line` override) | High-contrast media-query variant (line 1308) |

## Transparency / overlays

| Value | Usage |
|---|---|
| `rgba(21, 37, 31, 0.28)` | Trust-strip dividers (ink at 28%) |
| `rgba(21, 37, 31, 0.12)` | Card shadow (`--shadow`) |
| `rgba(9, 55, 45, 0.72 / 0.45 / 0.2)` | Forest-deep overlays |
| `rgba(255, 255, 255, 0.08–0.28)` | White overlays on dark sections |
| `rgba(0, 0, 0, 0.2)` | Black overlay |

## Design notes

- The palette is a "close care" green theme: deep forest greens (`#0e4a3c` / `#09372d`) paired with warm marigold (`#f2b233`) accents on soft off-white paper backgrounds.
- Hard borders (2–3px `--ink`) and offset shadows (`12px 12px 0`) are part of the visual identity — colors are mostly flat fills, no gradients.
- Pastel tints (`#d6e6f0`, `#e4daf1`, `#f4d6d4`, etc.) are reserved for avatars, icons, and status badges; they never appear as section backgrounds.
