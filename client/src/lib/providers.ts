export type StreamResult = { provider: string; url: string; subtitles?: { label: string; url: string }[]; qualities?: string[] };
export type Episode = { id: string; number: number; title?: string; thumbnail?: string };
export type Provider = { id: string; name: string; host: string; enabled: boolean; note: string; getStream?: (episodeId: string) => Promise<StreamResult | null> };

// Provider endpoints are intentionally opt-in. The app never bypasses DRM, auth, geo-blocks, or CAPTCHA.
export const providers: Provider[] = [
  { id: "zokoanime", name: "ZokoAnime", host: "zokoanime.video", enabled: false, note: "Enable only after verifying a documented, permitted API endpoint." },
  { id: "megaplay", name: "MegaPlay", host: "megaplay.buzz/api", enabled: false, note: "Enable only with an approved API contract." },
  { id: "vidnest-animepahe", name: "Vidnest · AnimePahe", host: "vidnest.fun", enabled: false, note: "AnimePahe integration is isolated and disabled until legally available." },
];

export function getAvailableProviders() { return providers.filter((provider) => provider.enabled); }
export async function resolveStream(episodeId: string, preferred?: string) {
  const ordered = [...getAvailableProviders()].sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred));
  for (const provider of ordered) {
    try { const result = await provider.getStream?.(episodeId); if (result) return result; } catch { /* try the next configured server */ }
  }
  return null;
}
