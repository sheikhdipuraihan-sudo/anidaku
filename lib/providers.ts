export type ProviderKey = 'megaplay' | 'vidnest' | 'zokoanime'

export const providers: Array<{ key: ProviderKey; name: string; description: string }> = [
  { key: 'megaplay', name: 'MegaPlay', description: 'Primary stream' },
  { key: 'vidnest', name: 'VidNest AnimePahe', description: 'AnimePahe server' },
  { key: 'zokoanime', name: 'ZokoAnime', description: 'Alternative server' },
]

export function getProviderUrl(provider: ProviderKey, anilistId: number, episode: number, language: 'sub' | 'dub' = 'sub') {
  const lang = language === 'dub' ? 'dub' : 'sub'
  if (provider === 'megaplay') return `https://megaplay.buzz/stream/ani/${anilistId}/${episode}/${lang}`
  if (provider === 'vidnest') return `https://vidnest.fun/animepahe/${anilistId}/${episode}/${lang}`
  return `https://zokoanime.video/watch/${anilistId}/${episode}/${lang}`
}
