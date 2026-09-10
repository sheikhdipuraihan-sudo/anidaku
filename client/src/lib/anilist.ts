export type Anime = {
  id: number;
  title: { romaji?: string; english?: string; native?: string };
  description?: string;
  coverImage: { extraLarge?: string; large?: string; color?: string };
  bannerImage?: string;
  genres: string[];
  format?: string;
  status?: string;
  season?: string;
  seasonYear?: number;
  episodes?: number;
  duration?: number;
  averageScore?: number;
  popularity?: number;
  isAdult?: boolean;
  updatedAt?: number;
  nextAiringEpisode?: { episode: number; airingAt: number; timeUntilAiring?: number };
  studios?: { nodes: { name: string }[] };
  tags?: { name: string; rank: number }[];
  relations?: { edges: { relationType: string; node: Anime }[] };
  recommendations?: { nodes: { mediaRecommendation: Anime }[] };
};

const API = "https://graphql.anilist.co";
const cache = new Map<string, { at: number; value: unknown }>();
const pending = new Map<string, Promise<unknown>>();
const CACHE_MS = 1000 * 60 * 5;
const CACHE_PREFIX = "anidaku:api-cache:";
const JIKAN_API = "https://api.jikan.moe/v4";
const fallback: Anime[] = [
  { id: 20958, title: { romaji: "Shingeki no Kyojin", english: "Attack on Titan" }, description: "Humanity's last refuge stands behind towering walls in this acclaimed action drama.", coverImage: { extraLarge: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800" }, bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1800", genres: ["Action", "Drama", "Fantasy"], format: "TV", status: "FINISHED", seasonYear: 2013, episodes: 25, averageScore: 88, popularity: 1000000, studios: { nodes: [{ name: "WIT Studio" }] } },
  { id: 154587, title: { romaji: "Sousou no Frieren", english: "Frieren: Beyond Journey's End" }, description: "An elven mage begins a new journey after the adventure has already ended.", coverImage: { extraLarge: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800" }, bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1800", genres: ["Adventure", "Drama", "Fantasy"], format: "TV", status: "FINISHED", seasonYear: 2023, episodes: 28, averageScore: 91, popularity: 900000, studios: { nodes: [{ name: "Madhouse" }] } },
  { id: 16498, title: { romaji: "One Punch Man", english: "One-Punch Man" }, description: "A hero who can defeat any opponent with a single punch searches for a worthy challenge.", coverImage: { extraLarge: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800" }, bannerImage: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1800", genres: ["Action", "Comedy", "Sci-Fi"], format: "TV", status: "FINISHED", seasonYear: 2015, episodes: 12, averageScore: 86, popularity: 800000, studios: { nodes: [{ name: "Madhouse" }] } },
];
const safe = (items: Anime[] = []) => items.filter((a) => !a.isAdult && !a.genres?.includes("Hentai"));
async function query<T>(queryText: string, variables: Record<string, unknown> = {}): Promise<T> {
  const key = JSON.stringify({ queryText, variables }); const hit = cache.get(key); if (hit && Date.now() - hit.at < CACHE_MS) return hit.value as T;
  try { const stored = sessionStorage.getItem(CACHE_PREFIX + key); if (stored) { const parsed = JSON.parse(stored) as { at: number; value: T }; if (Date.now() - parsed.at < CACHE_MS) { cache.set(key, parsed); return parsed.value; } sessionStorage.removeItem(CACHE_PREFIX + key); } } catch {}
  const existing = pending.get(key); if (existing) return existing as Promise<T>;
  const request = queryFresh<T>(queryText, variables, key);
  pending.set(key, request);
  try { return await request; } finally { pending.delete(key); }
}
async function queryFresh<T>(queryText: string, variables: Record<string, unknown>, key: string): Promise<T> {
  const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ query: queryText, variables }), signal: controller.signal });
    if (!response.ok) throw new Error(`AniList unavailable (${response.status})`);
    const json = await response.json(); if (json.errors?.length) throw new Error("AniList returned an error");
    const entry = { at: Date.now(), value: json.data };
    cache.set(key, entry);
    try { sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry)); } catch {}
    return json.data as T;
  } finally { window.clearTimeout(timeout); }
}
const fields = `id title { romaji english native } description(asHtml: false) coverImage { extraLarge large color } bannerImage genres format status season seasonYear episodes duration averageScore popularity isAdult updatedAt nextAiringEpisode { episode airingAt timeUntilAiring } studios { nodes { name } } tags { name rank }`;

type JikanAnime = { mal_id: number; title?: string; title_english?: string | null; title_japanese?: string | null; synopsis?: string | null; images?: { jpg?: { large_image_url?: string; image_url?: string } }; type?: string; status?: string; aired?: { from?: string | null }; episodes?: number | null; duration?: string | null; score?: number | null; popularity?: number | null; genres?: { name: string }[]; studios?: { name: string }[] };
function fromJikan(item: JikanAnime): Anime { return { id: item.mal_id, title: { english: item.title_english || undefined, romaji: item.title, native: item.title_japanese || undefined }, description: item.synopsis || undefined, coverImage: { extraLarge: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url }, genres: item.genres?.map((genre) => genre.name) || [], format: item.type || "TV", status: item.status === "Finished Airing" ? "FINISHED" : item.status === "Not yet aired" ? "NOT_YET_RELEASED" : "RELEASING", seasonYear: item.aired?.from ? new Date(item.aired.from).getFullYear() : undefined, episodes: item.episodes || undefined, duration: item.duration ? Number.parseInt(item.duration) || undefined : undefined, averageScore: item.score ? Math.round(item.score * 10) : undefined, popularity: item.popularity || undefined, studios: { nodes: item.studios || [] } }; }
async function searchJikan(search: string, page = 1, genre?: string) { const params = new URLSearchParams({ q: search, page: String(page), limit: "24", sfw: "true", order_by: "popularity", sort: "desc" }); const response = await fetch(`${JIKAN_API}/anime?${params}`); if (!response.ok) throw new Error(`Jikan unavailable (${response.status})`); const json = await response.json() as { data: JikanAnime[]; pagination?: { last_visible_page?: number; has_next_page?: boolean } }; const items = json.data.map(fromJikan).filter((anime) => !genre || anime.genres.some((item) => item.toLowerCase() === genre.toLowerCase())); return { items, pageInfo: { currentPage: page, lastPage: json.pagination?.last_visible_page || page, hasNextPage: Boolean(json.pagination?.has_next_page) } }; }

export type PageInfo = { currentPage: number; lastPage: number; hasNextPage: boolean };
export async function getCollection(kind: "trending" | "popular" | "latest" | "upcoming" | "seasonal" | "genre", page = 1, genre?: string) {
  const sort = kind === "trending" ? "TRENDING_DESC" : kind === "latest" ? "UPDATED_AT_DESC" : kind === "upcoming" ? "POPULARITY_DESC" : "POPULARITY_DESC";
  const status = kind === "upcoming" ? "NOT_YET_RELEASED" : undefined;
  try {
    const data = await query<{ page: { media: Anime[]; pageInfo: PageInfo } }>(`query($page: Int, $genre: String, $status: MediaStatus) { page: Page(page: $page, perPage: 24) { pageInfo { currentPage lastPage hasNextPage } media(sort: ${sort}, type: ANIME, isAdult: false, genre: $genre, status: $status) { ${fields} } } }`, { page, genre: genre || undefined, status });
    return { items: safe(data.page.media), pageInfo: data.page.pageInfo };
  } catch { return { items: page === 1 ? safe(fallback) : [], pageInfo: { currentPage: 1, lastPage: 1, hasNextPage: false } }; }
}
export async function getHome() { const [trending, popular, seasonal] = await Promise.all([getCollection("trending"), getCollection("popular"), getCollection("seasonal")]); return { trending: trending.items, popular: popular.items, seasonal: seasonal.items }; }
export async function searchAnime(search: string, page = 1, genre?: string) { if (!search.trim()) return { items: [], pageInfo: { currentPage: 1, lastPage: 1, hasNextPage: false } }; try { return await searchJikan(search.trim(), page, genre); } catch { try { const data = await query<{ page: { media: Anime[]; pageInfo: PageInfo } }>(`query($search: String, $page: Int, $genre: String) { page: Page(page: $page, perPage: 24) { pageInfo { currentPage lastPage hasNextPage } media(search: $search, genre: $genre, sort: POPULARITY_DESC, type: ANIME, isAdult: false) { ${fields} } } }`, { search: search.trim(), page, genre: genre || undefined }); return { items: safe(data.page.media), pageInfo: data.page.pageInfo }; } catch { const term = search.toLowerCase(); return { items: fallback.filter((a) => titleOf(a).toLowerCase().includes(term) || a.genres.some((g) => g.toLowerCase().includes(term))), pageInfo: { currentPage: 1, lastPage: 1, hasNextPage: false } }; } } }
export async function getSchedule() { const result = await getCollection("trending"); return result.items.filter((anime) => anime.nextAiringEpisode).sort((a, b) => (a.nextAiringEpisode?.airingAt || 0) - (b.nextAiringEpisode?.airingAt || 0)); }
export async function getAnime(id: number) { try { const data = await query<{ Media: Anime & { relations: Anime["relations"]; recommendations: Anime["recommendations"] } }>(`query($id: Int) { Media(id: $id, type: ANIME) { ${fields} relations { edges { relationType node { ${fields} } } } recommendations { nodes { mediaRecommendation { ${fields} } } } } }`, { id }); return data.Media && !data.Media.isAdult ? data.Media : null; } catch { return fallback.find((anime) => anime.id === id) || fallback[0]; } }
export function titleOf(anime: Anime) { return anime.title.english || anime.title.romaji || anime.title.native || "Untitled anime"; }
export function cleanDescription(value?: string) { return (value || "No description available.").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&"); }
export function releasedEpisodes(anime: Anime) {
  if (anime.nextAiringEpisode?.episode) return Math.max(0, anime.nextAiringEpisode.episode - 1);
  if (anime.status === "FINISHED") return anime.episodes;
  return undefined;
}
export function episodeLabel(anime: Anime) {
  const released = releasedEpisodes(anime);
  if (anime.status === "FINISHED" && released != null) return `${released} / ${released} Episodes`;
  if (released != null) return `Episodes released: ${released}`;
  return anime.status === "NOT_YET_RELEASED" ? "Not released" : "Released episodes unavailable";
}
export function imageOf(anime: Anime) { return anime.coverImage.extraLarge || anime.coverImage.large || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800"; }
export function remember(key: string, value: unknown) { localStorage.setItem(`anidaku:${key}`, JSON.stringify(value)); }
export function recall<T>(key: string, fallbackValue: T): T { try { return JSON.parse(localStorage.getItem(`anidaku:${key}`) || "null") ?? fallbackValue; } catch { return fallbackValue; } }
