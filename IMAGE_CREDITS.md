# Image sources and usage notes

## Original generated images bundled in this project

The following nine destination card photographs were generated specifically for this project and are stored in `public/images/destinations/`:

- United States — Statue of Liberty and Manhattan
- United Kingdom — Big Ben and Westminster
- South Korea — Gyeongbokgung Palace and Seoul
- Canada — CN Tower and Toronto waterfront
- Australia — Sydney Opera House and Harbour Bridge
- Malaysia — Petronas Twin Towers
- Malta — Valletta Grand Harbour
- Poland — Warsaw Old Town
- Sweden — Gamla Stan, Stockholm

The airport hero and London twilight photographs in `public/images/` were also generated specifically for this project.

## Additional destination image sources

The following 13 destinations use source-hosted photographs with local download targets and remote browser fallbacks. The downloader is best-effort; some source hosts may block automated retrieval. Review each source's current licence and attribution terms before using the site commercially.

| Country | Landmark | Source / attribution |
|---|---|---|
| Italy | Colosseum, Rome | Unsplash — Braden Collum; Unsplash licence |
| Finland | Helsinki Cathedral | Princess Cruises image library; verify permission before commercial use |
| Romania | Palace of Parliament, Bucharest | Headout; verify permission before commercial use |
| New Zealand | Auckland Sky Tower | Wikimedia Commons — Waitemata Harbour and Sky Tower; see source file licence |
| Belgium | Grand Place, Brussels | 20minutos; verify permission before commercial use |
| Norway | Geirangerfjord | Carolus Reizen; verify permission before commercial use |
| Hungary | Hungarian Parliament, Budapest | Wikimedia Commons — Jorge Franganillo; CC BY 2.0 |
| Cyprus | Paphos Harbour Castle | Wikimedia Commons — Mriana Agbaria; CC BY-SA 4.0 |
| Denmark | Nyhavn, Copenhagen | The Standard; verify permission before commercial use |
| Lithuania | Vilnius Old Town | Tripadvisor; verify permission before commercial use |
| Estonia | Tallinn Old Town | Tripoto; verify permission before commercial use |
| Latvia | House of the Blackheads, Riga | Wikimedia Commons — Edgars Košovojs; CC BY-SA 3.0 |
| Austria | Schönbrunn Palace, Vienna | Wikimedia Commons — Truete; CC0 |

## Page background photographs

Page-level backgrounds use the Unsplash source URLs listed in `public/images/background-manifest.json`. Review the current Unsplash licence and attribution guidance before launch.

## Important

The nine generated destination images and the generated airport/London photos are included in the ZIP. The remaining 13 destination photographs are referenced by their source URLs and are downloaded by `npm run images:download` where the source hosts permit it. The cards retain remote fallbacks so they can still display when a local download is unavailable. Do not assume every third-party source permits commercial redistribution; replace any image whose licence does not fit the final deployment.
