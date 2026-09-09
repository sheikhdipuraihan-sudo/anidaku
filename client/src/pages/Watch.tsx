import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getAnime, titleOf, type Anime, remember, recall } from "@/lib/anilist";

type Server = "animepahe" | "zokoanime" | "megaplay";
type Track = "sub" | "dub";

function embedUrl(server: Server, animeId: number, episode: number, track: Track) {
  if (server === "animepahe") {
    return `https://vidnest.fun/animepahe/${animeId}/${episode}/${track}`;
  }

  if (server === "zokoanime") {
    return `https://zokoanime.video/stream/ani/${animeId}/${episode}/${track}?color=a5f3fc`;
  }

  return `https://megaplay.buzz/stream/ani/${animeId}/${episode}/${track}`;
}

export default function Watch() {
  const [, params] = useRoute("/watch/:id/:episode");

  const animeId = Number(params?.id);
  const episode = Number(params?.episode || 1);

  const [anime, setAnime] = useState<Anime>();

  const [server, setServer] = useState<Server>(() =>
    recall<Server>("server", "animepahe")
  );

  const [track, setTrack] = useState<Track>(() =>
    recall<Track>("track", "sub")
  );

  const src = useMemo(
    () => embedUrl(server, animeId, episode, track),
    [server, animeId, episode, track]
  );

  useEffect(() => {
    if (animeId) {
      getAnime(animeId).then((value) => setAnime(value || undefined));
    }
  }, [animeId]);

  if (!anime) {
    return (
      <div className="p-20 text-center text-white/50">
        Preparing your player...
      </div>
    );
  }

  const changeServer = (next: Server) => {
    setServer(next);
    remember("server", next);
  };

  const changeTrack = (next: Track) => {
    setTrack(next);
    remember("track", next);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 pb-24 lg:px-8">
      <Link
        href={`/anime/${anime.id}`}
        className="mb-5 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
      >
        <ArrowLeft size={15} />
        Back to {titleOf(anime)}
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1fr_310px]">
        <section>
          {/* RAW EMBED — provider's own player and controls */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
            <iframe
              key={src}
              src={src}
              title={`${titleOf(anime)} episode ${episode}`}
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#a5f3fc]">{titleOf(anime)}</p>
              <h1 className="mt-1 text-2xl font-black">
                Episode {episode}
              </h1>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/watch/${anime.id}/${Math.max(1, episode - 1)}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.05] px-4 py-2 text-sm font-semibold"
              >
                <ChevronLeft size={16} />
                Prev
              </Link>

              <Link
                href={`/watch/${anime.id}/${episode + 1}`}
                className="flex items-center gap-2 rounded-xl bg-[#a5f3fc] px-4 py-2 text-sm font-bold text-[#07131d]"
              >
                Next
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Server + Sub/Dub */}
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4">
            <span className="mr-2 text-sm font-bold">Server</span>

            {(
              [
                ["animepahe", "AnimePahe"],
                ["zokoanime", "ZokoAnime"],
                ["megaplay", "MegaPlay"],
              ] as [Server, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => changeServer(id)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  server === id
                    ? "bg-[#a5f3fc] text-[#07131d]"
                    : "bg-white/[.06] text-white/60 hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}

            <span className="mx-1 h-5 w-px bg-white/15" />

            <button
              onClick={() => changeTrack("sub")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                track === "sub"
                  ? "bg-white/15 text-white"
                  : "text-white/45"
              }`}
            >
              Sub
            </button>

            <button
              onClick={() => changeTrack("dub")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                track === "dub"
                  ? "bg-white/15 text-white"
                  : "text-white/45"
              }`}
            >
              Dub
            </button>
          </div>
        </section>

        {/* Episodes */}
        <aside className="rounded-2xl border border-white/10 bg-[#0e111b] p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Episodes</h2>
            <span className="text-xs text-white/35">
              {anime.episodes || "?"} total
            </span>
          </div>

          <div className="mt-4 grid max-h-[620px] grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5 lg:grid-cols-3">
            {Array.from(
              { length: Math.min(anime.episodes || 12, 40) },
              (_, i) => i + 1
            ).map((n) => (
              <Link
                key={n}
                href={`/watch/${anime.id}/${n}`}
                className={`rounded-lg px-2 py-3 text-center text-sm font-bold transition ${
                  n === episode
                    ? "bg-[#a5f3fc] text-[#07131d]"
                    : "bg-white/[.05] text-white/60 hover:bg-white/10"
                }`}
              >
                {n}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
