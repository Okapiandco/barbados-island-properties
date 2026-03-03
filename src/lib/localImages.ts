// Static manifest of local images in public/ — no fs needed (works on Vercel)
const localImageManifest: Record<string, string[]> = {
  'windfall': [
    '/Images/Rental Properties/Windfall/Westland Heights- Windfall Pool_ deck view drone shot.jpg',
    '/Images/Rental Properties/Windfall/Westland Heights-Windfall Master Suite #1.jpg',
    '/Images/Rental Properties/Windfall/Westland Heights-Windfall living room.jpg',
  ],
  'royal-villa-8': [
    '/Images/Rental Properties/Royal Villa 8/Royal Westmoreland Royal Villa 8 Bedroom 3 Bed View.jpg',
    '/Images/Rental Properties/Royal Villa 8/Royal Westmoreland Royal Villa 8 Communal Pool 2.jpeg',
    '/Images/Rental Properties/Royal Villa 8/Royal Westmoreland Royal Villa 8 First Floor Whole Space.jpg',
  ],
  'sugar-cane-ridge-9-royal-westmoreland': [
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Covered Balcony.jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Ensuite Bathroom.jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Guest Bedroom 1 .jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Kitchen.jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Primary Bedroom leading to pool deck.jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Primary bedroom leading to pool deck(1).jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Swimming Pool .jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - kitchen & dining.jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge Royal Westmoreland - Living Room.jpg',
    '/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Risge 9 Royal Westmoreland - Guest Bedroom 2 leading to pool deck.jpg',
  ],
}

export function getLocalImages(slug: string, title: string) {
  const files = localImageManifest[slug]
  if (!files) return []

  return files.map((src) => ({
    src,
    alt: `${title} - ${src.split('/').pop()?.replace(/\.[^.]+$/, '') || ''}`,
  }))
}

export function getFirstLocalImage(slug: string, title: string): string | null {
  const images = getLocalImages(slug, title)
  return images.length > 0 ? images[0].src : null
}
