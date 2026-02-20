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
        const response = await fetch("/api/spotify", { cache: "no-store" });
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
      id="spotify"
      className={compact ? "pt-2 pb-4 lg:-ml-2" : "py-12 px-4 xl:px-16"}
    >
      <div className="rounded-2xl border border-white/70 bg-white/80 p-4 sm:p-5 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Spotify</p>
        <h3 className="font-display mt-2 text-3xl font-bold text-slate-900">
          Currently Listening
        </h3>

        {loading ? (
          <p className="mt-4 text-slate-600">Loading current track...</p>
        ) : data.isPlaying ? (
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              {data.albumImageUrl ? (
                <img
                  src={data.albumImageUrl}
                  alt={data.album || "Album cover"}
                  className="h-20 w-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
              ) : null}
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 whitespace-nowrap overflow-x-auto leading-snug">
                  {data.title}
                </p>
                <p className="text-slate-600 whitespace-nowrap overflow-x-auto leading-snug mt-1">
                  {data.artist}
                </p>
                <p className="text-sm text-slate-500 whitespace-nowrap overflow-x-auto leading-snug mt-1">
                  {data.album}
                </p>
              </div>
            </div>
            {data.songUrl ? (
              <a
                href={data.songUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                Open in Spotify
              </a>
            ) : null}
          </div>
        ) : (
          <p className="mt-4 text-slate-600">
            Spotify is not currently playing anything right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default SpotifyNowPlaying;
