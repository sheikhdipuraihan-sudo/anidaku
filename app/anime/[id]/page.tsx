import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Play, Star } from 'lucide-react'

async function getAnime(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/anilist`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: Number(id) }), cache: 'no-store' })
  if (!response.ok) return null
  return response.json()
}

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const anime = await getAnime(id)
  if (!anime) notFound()
  const title = anime.title.english || anime.title.romaji
  return <main className="detail-page"><div className="detail-hero" style={{ backgroundImage: `linear-gradient(90deg, var(--bg) 18%, rgba(13,13,18,.74), var(--bg)), url(${anime.bannerImage || anime.coverImage.extraLarge})` }}><div className="detail-content"><Link className="back-link" href="/"><ArrowLeft /> Back to browse</Link><div className="detail-layout"><img className="detail-poster" src={anime.coverImage.extraLarge} alt={`${title} poster`} /><div><p className="section-kicker">Anime details</p><h1>{title}</h1><p className="detail-meta"><span>{anime.format || 'TV'}</span><span>•</span><span>{anime.episodes || '?'} episodes</span><span>•</span><span><Star /> {anime.averageScore ? (anime.averageScore / 10).toFixed(1) : 'N/A'}</span></p><p className="detail-description">{anime.description || 'No description available.'}</p><div className="tag-row">{anime.genres?.map((genre: string) => <span key={genre}>{genre}</span>)}</div><Link className="primary" href={`/watch/${anime.id}/1`}><Play fill="currentColor" /> Start watching</Link></div></div></div></div><section className="detail-body"><h2>Episodes</h2><p className="muted">Select an episode to begin watching with your preferred provider.</p><div className="episode-grid">{Array.from({ length: anime.episodes || 1 }, (_, index) => <Link href={`/watch/${anime.id}/${index + 1}`} key={index}>Episode {index + 1}</Link>)}</div></section></main>
}
