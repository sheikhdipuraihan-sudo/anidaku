'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getProviderUrl, providers, type ProviderKey } from '@/lib/providers'

export default function WatchPage() {
  const params = useParams<{ id: string; episode: string }>()
  const searchParams = useSearchParams()
  const provider = (searchParams.get('provider') as ProviderKey) || 'megaplay'
  const language = searchParams.get('language') === 'dub' ? 'dub' : 'sub'
  const id = Number(params.id)
  const episode = Math.max(1, Number(params.episode))
  const url = getProviderUrl(provider, id, episode, language)
  return <main className="watch-page"><div className="watch-toolbar"><Link href={`/anime/${id}`}><ArrowLeft /> Back to details</Link><div className="watch-title">Watching episode {episode}</div><div className="watch-controls"><Link href={`/watch/${id}/${episode}?provider=${provider}&language={language === 'sub' ? 'dub' : 'sub'}`}>{language === 'sub' ? 'Switch to dub' : 'Switch to sub'}</Link></div></div><div className="player-shell"><iframe src={url} title={`Episode ${episode} player`} allow="autoplay; fullscreen; encrypted-media" allowFullScreen referrerPolicy="origin" /><div className="player-fallback"><span>Provider player did not load?</span><a href={url} target="_blank" rel="noreferrer">Open stream <ExternalLink /></a></div></div><div className="server-picker"><div><p className="section-kicker">Streaming servers</p><h1>Choose a provider</h1></div><div className="server-list">{providers.map(item => <Link className={provider === item.key ? 'server active' : 'server'} href={`/watch/${id}/${episode}?provider=${item.key}&language=${language}`} key={item.key}><strong>{item.name}</strong><span>{item.description}</span></Link>)}</div></div></main>
}
