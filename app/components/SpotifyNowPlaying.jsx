"use client";

import { useEffect, useState } from "react";

const POLL_INTERVAL_MS = 30000;

const SpotifyNowPlaying = () => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/spotify?type=now-playing", { cache: "no-store" });
        const result = await response.json();
        if (isMounted) setTrack(result?.isPlaying && result.title ? result : null);
      } catch {
        if (isMounted) setTrack(null);
      }
    };

    load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);

  if (!track) return null;

  return (
    <a
      href="#spotify"
      title="See more of what I listen to"
      className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 font-mono text-xs text-emerald-200 transition hover:border-emerald-300"
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="shrink-0 uppercase tracking-[0.18em]">Now playing</span>
      <span className="truncate text-emerald-50">
        {track.title}
        {track.artist ? ` – ${track.artist}` : ""}
      </span>
    </a>
  );
};

export default SpotifyNowPlaying;
