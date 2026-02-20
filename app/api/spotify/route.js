import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

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

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 30 },
    });

    if (response.status === 204 || response.status === 202) {
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    if (!response.ok) {
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    const track = await response.json();

    return NextResponse.json(
      {
        isPlaying: Boolean(track?.is_playing),
        title: track?.item?.name ?? null,
        artist: track?.item?.artists?.map((a) => a.name).join(", ") ?? null,
        album: track?.item?.album?.name ?? null,
        albumImageUrl: track?.item?.album?.images?.[0]?.url ?? null,
        songUrl: track?.item?.external_urls?.spotify ?? null,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        isPlaying: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 },
    );
  }
}
