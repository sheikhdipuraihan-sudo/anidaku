import { NextResponse } from 'next/server'

const endpoint = 'https://graphql.anilist.co'
const mediaFields = `id idMal title { romaji english native } coverImage { extraLarge large color } bannerImage description(asHtml: false) episodes duration averageScore genres isAdult status seasonYear season seasonInt format studios { nodes { name } } streamingEpisodes { title url thumbnail }`

const query = `query ($page: Int!, $perPage: Int!, $search: String, $genre: String) { Page(page: $page, perPage: $perPage) { pageInfo { currentPage hasNextPage lastPage } media(type: ANIME, search: $search, genre: $genre, isAdult: false, sort: TRENDING_DESC) { ${mediaFields} } } }`

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const page = Math.max(1, Number(params.get('page') || 1))
  const search = params.get('search') || undefined
  const genre = params.get('genre') || undefined
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ query, variables: { page, perPage: 24, search, genre } }), next: { revalidate: 300 } })
    if (!response.ok) return NextResponse.json({ error: 'AniList request failed' }, { status: response.status })
    const payload = await response.json()
    if (payload.errors) return NextResponse.json({ error: payload.errors[0]?.message || 'AniList query failed' }, { status: 502 })
    return NextResponse.json(payload.data.Page)
  } catch { return NextResponse.json({ error: 'Unable to reach AniList' }, { status: 502 }) }
}

export async function POST(request: Request) {
  const { id } = await request.json()
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: 'Invalid anime id' }, { status: 400 })
  const queryById = `query ($id: Int!) { Media(id: $id, type: ANIME) { ${mediaFields} relations { edges { relationType node { id title { romaji english } coverImage { extraLarge } } } } recommendations(sort: RATING_DESC, perPage: 6) { nodes { mediaRecommendation { id title { romaji english } coverImage { extraLarge } } } } } }`
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ query: queryById, variables: { id } }), next: { revalidate: 300 } })
    const payload = await response.json()
    if (!response.ok || payload.errors || !payload.data.Media || payload.data.Media.isAdult) return NextResponse.json({ error: 'Anime unavailable' }, { status: 404 })
    return NextResponse.json(payload.data.Media)
  } catch { return NextResponse.json({ error: 'Unable to reach AniList' }, { status: 502 }) }
}
