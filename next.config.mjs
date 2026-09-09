const nextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: 's4.anilist.co' }] }, async headers() { return [{ source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, { key: 'Strict-Transport-Security', value: 'max-age=63072000' }] }] } }
export default nextConfig
