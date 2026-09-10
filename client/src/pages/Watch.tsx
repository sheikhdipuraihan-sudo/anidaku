import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getAnime,
  titleOf,
  type Anime,
  remember,
  recall,
} from "@/lib/anilist";

type Server = "animepahe" | "zokoanime" | "megaplay" | "anilink";
type Track = "sub" | "dub";

function embedUrl(
  server: Server,
  animeId: number,
  episode: number,
  track: Track
) {
  if (server === "animepahe") {
    return `https://vidnest.fun/animepahe/${animeId}/${episode}/${track}`;
  }

  if (server === "zokoanime") {
    return `https://zokoanime.video/stream/ani/${animeId}/${episode}/${track}?color=a5f3fc`;
  }

  if (server === "megaplay") {
    return `https://megaplay.buzz/stream/ani/${animeId}/${episode}/${track}`;
  }

  // AniLink
  const variant = track === "dub" ? "dub" : "sub";

  return `https://anilink.cc/watch/${animeId}/${episode}?variant=${variant}&primaryColor=%238AD7D0&secondaryColor=%23B2EFEA&iconColor=%23FFFFFF`;
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
      getAnime(animeId).then((value) => {
        setAnime(value || undefined);
      });
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
      {/* Back */}
      <Link
        href={`/anime/${anime.id}`}
        className="mb-5 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
      >
        <ArrowLeft size={15} />
        Back to {titleOf(anime)}
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1fr_310px]">
        <section>
          {/* Video Player */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
            <iframe
              key={src}
              src={src}
              title={`${titleOf(anime)} episode ${episode}`}
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              scrolling="no"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture; presentation"
              allowFullScreen
              referrerPolicy={
                server === "anilink" ? "origin" : undefined
              }
            />
          </div>

          {/* Episode information + navigation */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#a5f3fc]">
                {titleOf(anime)}
              </p>

              <h1 className="mt-1 text-2xl font-black">
                Episode {episode}
              </h1>
            </div>

            <div className="flex gap-2">
              {/* Previous */}
              <Link
                href={`/watch/${anime.id}/${Math.max(
                  1,
                  episode - 1
                )}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.05] px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
              >
                <ChevronLeft size={16} />
                Prev
              </Link>

              {/* Next */}
              <Link
                href={`/watch/${anime.id}/${episode + 1}`}
                className="flex items-center gap-2 rounded-xl bg-[#a5f3fc] px-4 py-2 text-sm font-bold text-[#07131d] transition hover:bg-[#8ad7d0]"
              >
                Next
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Server + Sub/Dub */}
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4">
            <span className="mr-2 text-sm font-bold">
              Server
            </span>

            {(
              [
                ["animepahe", "AnimePahe"],
                ["zokoanime", "ZokoAnime"],
                ["megaplay", "MegaPlay"],
                ["anilink", "AniLink"],
              ] as [Server, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
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

            {/* Sub */}
            <button
              type="button"
              onClick={() => changeTrack("sub")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                track === "sub"
                  ? "bg-white/15 text-white"
                  : "text-white/45 hover:text-white/70"
              }`}
            >
              Sub
            </button>

            {/* Dub */}
            <button
              type="button"
              onClick={() => changeTrack("dub")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                track === "dub"
                  ? "bg-white/15 text-white"
                  : "text-white/45 hover:text-white/70"
              }`}
            >
              Dub
            </button>
          </div>
        </section>

        {/* Episodes */}
        <aside className="rounded-2xl border border-white/10 bg-[#0e111b] p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              Episodes
            </h2>

            <span className="text-xs text-white/35">
              {anime.episodes || "?"} total
            </span>
          </div>

          <div className="mt-4 grid max-h-[620px] grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5 lg:grid-cols-3">
            {Array.from(
              {
                length: Math.min(
                  anime.episodes || 12,
                  40
                ),
              },
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
