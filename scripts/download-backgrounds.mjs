import { mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = path.join(root, 'public', 'images')
const destinationDir = path.join(outputDir, 'destinations')

const images = [
  ['airport-hero.jpg', 'https://images.unsplash.com/photo-1778385406327-54caa75374e2?auto=format&fit=crop&w=2400&q=85'],
  ['destinations-city.jpg', 'https://images.unsplash.com/photo-1772339164384-e4eba87f08c0?auto=format&fit=crop&w=2400&q=85'],
  ['compare-city.jpg', 'https://images.unsplash.com/photo-1771760171302-2d60b9a3576f?auto=format&fit=crop&w=2400&q=85'],
  ['campus-scholarships.jpg', 'https://images.unsplash.com/photo-1760111085279-6c4b6d831acc?auto=format&fit=crop&w=2400&q=85'],
  ['library-resources.jpg', 'https://images.unsplash.com/photo-1530608031805-8e170c1b793a?auto=format&fit=crop&w=2400&q=85'],
  ['developers-workspace.jpg', 'https://images.unsplash.com/photo-1781246212288-7fa538344718?auto=format&fit=crop&w=2400&q=85'],
  ['study-workspace.jpg', 'https://images.unsplash.com/photo-1782012505157-aca188bd6921?auto=format&fit=crop&w=2400&q=85'],
  ['shortlist-students.jpg', 'https://images.unsplash.com/photo-1767102060241-130cb9260718?auto=format&fit=crop&w=2400&q=85'],
  ['about-community.jpg', 'https://images.unsplash.com/photo-1741528804373-2bedeb308ce1?auto=format&fit=crop&w=2400&q=85'],
  ['consultation-office.jpg', 'https://images.unsplash.com/photo-1758873268705-bb756c95f26a?auto=format&fit=crop&w=2400&q=85'],
  ['graduation-success.jpg', 'https://images.unsplash.com/photo-1790339773800-d6f5581bd740?auto=format&fit=crop&w=2400&q=85'],
]

const destinationImages = [
  ['italy.jpg', 'https://images.unsplash.com/photo-1514896856000-91cb6de818e0?auto=format&fit=crop&fm=jpg&q=85&w=1600'],
  ['finland.jpg', 'https://assets.princess.com/is/image/princesscruises/helsinki-finland-cathedral-statue%3A3x2?ts=1777914663484'],
  ['romania.jpg', 'https://cdn-imgix.headout.com/media/images/b6224c1ce830e1230cc8d24f387c1dcf-PalaceofParliament.jpg?auto=compress&fit=crop&w=1400&q=85'],
  ['new-zealand.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waitemata_Harbour%2C_Ferry_dock_and_the_Skytower%2C_Auckland_-_0206.jpg/1920px-Waitemata_Harbour%2C_Ferry_dock_and_the_Skytower%2C_Auckland_-_0206.jpg'],
  ['belgium.jpg', 'https://imagenes.20minutos.es/uploads/imagenes/2023/03/22/bruselas-belgica.jpeg'],
  ['norway.jpg', 'https://www.carolus.be/Media/CARE/_Profiles/f728e8a8/659d01b8/6558-Carolus_PremiumTours_bus_vliegtuig_Noorwegen_Noorse%20fjorden_Geirangerfjord%201%20%282%29.jpg?v=637480589065486668'],
  ['hungary.jpg', 'https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_Parliament_Building_from_across_the_Danube,_Budapest_(54179693007).jpg?width=1600'],
  ['cyprus.jpg', 'https://commons.wikimedia.org/wiki/Special:FilePath/Paphos_Harbour_Castle.jpg?width=1400'],
  ['denmark.jpg', 'https://static.standard.co.uk/2025/01/16/16/55/SEI235364100.jpg?width=1200'],
  ['lithuania.jpg', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/6c/71/88.jpg'],
  ['estonia.jpg', 'https://static2.tripoto.com/media/filter/nl/img/67267/TripDocument/1592998944_tallinn.jpg'],
  ['latvia.jpg', 'https://commons.wikimedia.org/wiki/Special:FilePath/House_of_the_Blackheads_Riga.jpg?width=1400'],
  ['austria.jpg', 'https://commons.wikimedia.org/wiki/Special:FilePath/Schonbrunn_Palace.jpg?width=1400'],
]

async function downloadBatch(entries, directory) {
  await mkdir(directory, { recursive: true })
  for (const [filename, url] of entries) {
    const destination = path.join(directory, filename)
    try { await access(destination); console.log(`Already present: ${filename}`); continue } catch {}
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'CheckIfYouFit-image-assets/2.2' }, signal: AbortSignal.timeout(15000) })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const bytes = Buffer.from(await response.arrayBuffer())
      await writeFile(destination, bytes)
      console.log(`Downloaded ${filename} (${Math.round(bytes.length / 1024)} KB)`)
    } catch (error) {
      console.warn(`Could not download ${filename}: ${error.message}. The browser will try its remote fallback.`)
    }
  }
}

await downloadBatch(images, outputDir)
await downloadBatch(destinationImages, destinationDir)
console.log('Photo asset download finished. Locally bundled photos remain available even if a remote source is unavailable.')
