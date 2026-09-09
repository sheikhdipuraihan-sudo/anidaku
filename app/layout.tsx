import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'Anidaku — Watch anime online', description: 'Discover anime from AniList and watch through your selected streaming provider.' }
export const viewport: Viewport = { width: 'device-width', initialScale: 1, userScalable: false, themeColor: '#0d0d12' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
