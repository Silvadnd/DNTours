import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DN Tours - Sri Lanka Travel Guide',
    short_name: 'DN Tours',
    description: 'Experience authentic Sri Lanka with DN Tours - Your trusted local travel guide',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0A2540',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['travel', 'tourism', 'guide'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
  }
}
