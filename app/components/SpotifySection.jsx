"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "top-tracks", label: "Top Tracks" },
  { id: "top-artists", label: "Top Artists" },
  { id: "recently-played", label: "Recently Played" },
];

function timeAgo(iso) {
  if (!iso) return "";
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const listVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const SpotifySection = () => {
  const [tab, setTab] = useState("top-tracks");
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (cache[tab]) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/spotify?type=${tab}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (isMounted) {
          setCache((prev) => ({ ...prev, [tab]: data.items ?? [] }));
        }
      } catch (_e) {
        if (isMounted) {
          setCache((prev) => ({ ...prev, [tab]: [] }));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const items = cache[tab];
  const isLoading = loading && !items;

  return (
    <section id="spotify" className="py-12 px-4 xl:px-16">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">
          My Soundtrack
        </p>
        <h2 className="font-display text-4xl font-bold text-white mt-3 mb-3">
          What I&apos;m Listening To
        </h2>
        <p className="text-blue-200/70 max-w-2xl mx-auto">
          Pulled live from my Spotify — explore my top tracks and artists this
          week, or scroll through my recent listening history.
        </p>
      </div>

      <div className="flex justify-center gap-3 flex-wrap mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? "border-sky-400 bg-sky-400/15 text-sky-300 shadow-lg shadow-sky-500/10"
                : "border-blue-400/20 text-blue-200/70 hover:border-sky-400/50 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-blue-400/20 bg-blue-950/40 backdrop-blur p-5 sm:p-8 shadow-xl shadow-blue-950/40">
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-blue-400/10 animate-pulse"
              />
            ))}
          </div>
        ) : !items || items.length === 0 ? (
          <p className="text-blue-200/70 text-center py-8">
            Nothing to show right now — check back soon.
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tab === "top-artists" ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {items.map((artist, i) => (
                    <motion.li
                      key={`${artist.name}-${i}`}
                      custom={i}
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a
                        href={artist.artistUrl ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-3 rounded-2xl border border-blue-400/10 bg-blue-900/30 p-4 transition hover:-translate-y-1 hover:border-sky-400/50 hover:bg-blue-900/50"
                      >
                        <span className="text-xs font-bold text-sky-400/60">
                          #{i + 1}
                        </span>
                        {artist.imageUrl ? (
                          <img
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="h-20 w-20 rounded-full object-cover border-2 border-blue-400/20 group-hover:border-sky-400/60 transition"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-full bg-blue-800/60" />
                        )}
                        <div className="text-center min-w-0 w-full">
                          <p className="font-semibold text-white truncate">
                            {artist.name}
                          </p>
                          {artist.genres?.length ? (
                            <p className="text-xs text-blue-200/60 truncate mt-1">
                              {artist.genres.join(" · ")}
                            </p>
                          ) : null}
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((track, i) => (
                    <motion.li
                      key={`${track.title}-${track.playedAt ?? i}`}
                      custom={i}
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a
                        href={track.songUrl ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 rounded-2xl border border-blue-400/10 bg-blue-900/30 p-3 transition hover:border-sky-400/50 hover:bg-blue-900/50"
                      >
                        {tab === "top-tracks" ? (
                          <span className="w-6 text-center text-sm font-bold text-sky-400/60 shrink-0">
                            {i + 1}
                          </span>
                        ) : null}
                        {track.albumImageUrl ? (
                          <img
                            src={track.albumImageUrl}
                            alt={track.album ?? "Album cover"}
                            className="h-14 w-14 rounded-xl object-cover border border-blue-400/20 shrink-0"
                          />
                        ) : (
                          <div className="h-14 w-14 rounded-xl bg-blue-800/60 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white truncate group-hover:text-sky-300 transition">
                            {track.title}
                          </p>
                          <p className="text-sm text-blue-200/70 truncate">
                            {track.artist}
                          </p>
                        </div>
                        {tab === "recently-played" && track.playedAt ? (
                          <span className="text-xs text-blue-300/50 shrink-0">
                            {timeAgo(track.playedAt)}
                          </span>
                        ) : null}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default SpotifySection;
