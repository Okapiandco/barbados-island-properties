import fs from 'fs'
import path from 'path'

// Map property slugs to local image folders in public/
const localImageFolders: Record<string, string> = {
  'windfall': 'Images/Rental Properties/Windfall',
  'royal-villa-8': 'Images/Rental Properties/Royal Villa 8',
  'sugar-cane-ridge-9-royal-westmoreland': 'Images/Sales Properties/Sugar Cane Ridge',
}

export function getLocalImages(slug: string, title: string) {
  const folder = localImageFolders[slug]
  if (!folder) return []

  const dir = path.join(process.cwd(), 'public', folder)
  try {
    const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort()
    return files.map((file) => ({
      src: `/${folder}/${file}`,
      alt: `${title} - ${file.replace(/\.[^.]+$/, '')}`,
    }))
  } catch {
    return []
  }
}

export function getFirstLocalImage(slug: string, title: string): string | null {
  const images = getLocalImages(slug, title)
  return images.length > 0 ? images[0].src : null
}

export { localImageFolders }
