# Photographic image assets

- `airport-hero.jpg` and `london-twilight.jpg` are original generated photographs bundled locally.
- `destinations/` contains nine original generated landmark photographs bundled locally.
- The remaining thirteen destination landmark photographs have local filenames and source URLs in `destination-manifest.json`; run `npm run images:download` from the project root to cache them where source hosts allow.
- Destination cards use local image paths first and a source URL fallback if a download is not present.
- `background-manifest.json` lists the photographic page backgrounds and source credits.

Review `IMAGE_CREDITS.md` and each third-party provider's current licence before commercial deployment.
