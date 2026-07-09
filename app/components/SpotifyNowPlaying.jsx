"use client";

import { useEffect, useState } from "react";

const POLL_INTERVAL_MS = 30000;

const SpotifyNowPlaying = ({ compact = false }) => {
  const [data, setData] = useState({
    isPlaying: false,
    title: null,
    artist: null,
    album: null,
    albumImageUrl: null,
    songUrl: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify?type=now-playing", {
          cache: "no-store",
        });
        const result = await response.json();
        if (isMounted) {
          setData(result);
        }
      } catch (_error) {
        if (isMounted) {
          setData((prev) => ({ ...prev, isPlaying: false }));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadNowPlaying();
    const intervalId = setInterval(loadNowPlaying, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      className={compact ? "pt-2 pb-4 lg:-ml-2" : "py-12 px-4 xl:px-16"}
    >
      <div className="rounded-2xl border border-blue-400/20 bg-blue-950/40 backdrop-blur p-4 sm:p-5 shadow-xl shadow-blue-950/40">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {data.isPlaying ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            ) : null}
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                data.isPlaying ? "bg-emerald-400" : "bg-blue-400/40"
              }`}
            />
          </span>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">
            Spotify
          </p>
        </div>
        <h3 className="font-display mt-2 text-3xl font-bold text-white">
          Currently Listening
        </h3>

        {loading ? (
          <p className="mt-4 text-blue-200/70">Loading current track...</p>
        ) : data.isPlaying ? (
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              {data.albumImageUrl ? (
                <img
                  src={data.albumImageUrl}
                  alt={data.album || "Album cover"}
                  className="h-20 w-20 rounded-xl object-cover border border-blue-400/30 shrink-0"
                />
              ) : null}
              <div className="min-w-0">
                <p className="font-semibold text-white whitespace-nowrap overflow-x-auto leading-snug">
                  {data.title}
                </p>
                <p className="text-blue-200/80 whitespace-nowrap overflow-x-auto leading-snug mt-1">
                  {data.artist}
                </p>
                <p className="text-sm text-blue-300/60 whitespace-nowrap overflow-x-auto leading-snug mt-1">
                  {data.album}
                </p>
              </div>
            </div>
            {data.songUrl ? (
              <a
                href={data.songUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
              >
                Open in Spotify
              </a>
            ) : null}
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-blue-200/70">
              Not playing anything right now.
            </p>
            <a
              href="#spotify"
              className="mt-3 inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300 transition"
            >
              Explore what I&apos;ve been listening to →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpotifyNowPlaying;
