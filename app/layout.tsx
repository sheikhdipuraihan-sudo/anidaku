import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'Anidaku — Watch anime online', description: 'Discover and stream your next favorite anime on Anidaku.', viewport: { width: 'device-width', initialScale: 1, userScalable: false }, themeColor: '#0d0d12' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
