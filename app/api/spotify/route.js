import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

const ENDPOINTS = {
  "now-playing": `${API_BASE}/me/player/currently-playing`,
  "top-tracks": `${API_BASE}/me/top/tracks?time_range=short_term&limit=10`,
  "top-artists": `${API_BASE}/me/top/artists?time_range=short_term&limit=10`,
  "recently-played": `${API_BASE}/me/player/recently-played?limit=15`,
};

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify environment variables");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh Spotify token");
  }

  const data = await response.json();
  return data.access_token;
}

function mapTrack(track) {
  return {
    title: track?.name ?? null,
    artist: track?.artists?.map((a) => a.name).join(", ") ?? null,
    album: track?.album?.name ?? null,
    albumImageUrl: track?.album?.images?.[0]?.url ?? null,
    songUrl: track?.external_urls?.spotify ?? null,
  };
}

function mapArtist(artist) {
  return {
    name: artist?.name ?? null,
    imageUrl: artist?.images?.[0]?.url ?? null,
    genres: artist?.genres?.slice(0, 2) ?? [],
    artistUrl: artist?.external_urls?.spotify ?? null,
    followers: artist?.followers?.total ?? null,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "now-playing";
  const endpoint = ENDPOINTS[type];

  if (!endpoint) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: type === "now-playing" ? 30 : 300 },
    });

    if (type === "now-playing") {
      if (response.status === 204 || response.status === 202 || !response.ok) {
        return NextResponse.json({ isPlaying: false }, { status: 200 });
      }
      const track = await response.json();
      return NextResponse.json(
        {
          isPlaying: Boolean(track?.is_playing),
          ...mapTrack(track?.item),
        },
        { status: 200 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { items: [], error: `Spotify returned ${response.status}` },
        { status: 200 },
      );
    }

    const data = await response.json();

    if (type === "top-tracks") {
      return NextResponse.json(
        { items: (data?.items ?? []).map(mapTrack) },
        { status: 200 },
      );
    }

    if (type === "top-artists") {
      return NextResponse.json(
        { items: (data?.items ?? []).map(mapArtist) },
        { status: 200 },
      );
    }

    // recently-played
    return NextResponse.json(
      {
        items: (data?.items ?? []).map((entry) => ({
          ...mapTrack(entry?.track),
          playedAt: entry?.played_at ?? null,
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        isPlaying: false,
        items: [],
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 },
    );
  }
}
