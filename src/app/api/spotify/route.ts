import { type NextRequest, NextResponse } from "next/server"
import { fetchWebApi, getRefreshToken } from "@/lib/spotify"
import { getCurrentAccessToken, getCurrentRefreshToken, setCurrentAccessToken } from "@/lib/spotifyTokenStore"
import type { SpotifyApiResponse, SpotifyApiError } from "@/types/spotify"

// Token storage is handled by `src/lib/spotifyTokenStore`

export async function GET() {
  try {
    // Ensure we have a valid access token, try refresh if needed
    let accessToken = getCurrentAccessToken()
    if (!accessToken) {
      const refresh = getCurrentRefreshToken()
      if (refresh) {
        try {
          const refreshed = await getRefreshToken(refresh)
          if (!refreshed || refreshed.error) {
            console.error("Refresh failed:", refreshed)
          } else {
            setCurrentAccessToken(refreshed.access_token, refreshed.refresh_token ?? refresh, refreshed.expires_in)
            accessToken = refreshed.access_token
          }
        } catch (err) {
          console.error("Error during token refresh:", err)
        }
      }
    }

    if (!accessToken) {
      return NextResponse.json({ error: "No access token available. Please authenticate first." } as SpotifyApiError, {
        status: 401,
      })
    }

    // Fetch user's top tracks
  const topTracksResponse = await fetchWebApi(
      "v1/me/top/tracks?limit=10&time_range=medium_term",
      "GET",
      undefined,
      accessToken,
    )

    // Fetch user profile
  const userProfileResponse = await fetchWebApi("v1/me", "GET", undefined, accessToken)

    // Fetch recently played tracks
  const recentlyPlayedResponse = await fetchWebApi(
      "v1/me/player/recently-played?limit=10",
      "GET",
      undefined,
      accessToken,
    )

    // Fetch user playlists (optional - might fail if user has no playlists)
    let userPlaylistsResponse
    try {
      userPlaylistsResponse = await fetchWebApi("v1/me/playlists?limit=10", "GET", undefined, accessToken)
    } catch (error) {
      console.warn("Failed to fetch user playlists:", error)
      userPlaylistsResponse = { items: [] }
    }

    const spotifyData: SpotifyApiResponse = {
      topTracks: topTracksResponse.items || [],
      userProfile: userProfileResponse,
      recentlyPlayed: recentlyPlayedResponse.items || [],
      userPlaylists: userPlaylistsResponse.items || [],
    }

    return NextResponse.json(spotifyData)
  } catch (error) {
    console.error("Spotify API error:", error)
    return NextResponse.json({ error: "Failed to fetch Spotify data" } as SpotifyApiError, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure access token (try refresh if necessary)
    let accessToken = getCurrentAccessToken()
    if (!accessToken) {
      const refresh = getCurrentRefreshToken()
      if (refresh) {
        try {
          const refreshed = await getRefreshToken(refresh)
          if (!refreshed || refreshed.error) {
            console.error("Refresh failed:", refreshed)
          } else {
            setCurrentAccessToken(refreshed.access_token, refreshed.refresh_token ?? refresh, refreshed.expires_in)
            accessToken = refreshed.access_token
          }
        } catch (err) {
          console.error("Error during token refresh:", err)
        }
      }
    }

    if (!accessToken) {
      return NextResponse.json({ error: "No access token available. Please authenticate first." } as SpotifyApiError, {
        status: 401,
      })
    }

    const { trackUris } = await request.json()

    if (!trackUris || !Array.isArray(trackUris)) {
      return NextResponse.json({ error: "Invalid track URIs provided" } as SpotifyApiError, { status: 400 })
    }

    // Get user profile to create playlist
    const userProfile = await fetchWebApi("v1/me", "GET", undefined, accessToken)

    // Create a new playlist
    const playlistData = {
      name: "My Top Tracks Playlist",
      description: "A playlist created from my top tracks",
      public: false,
    }

    const playlist = await fetchWebApi(`v1/users/${userProfile.id}/playlists`, "POST", playlistData, accessToken)

    // Add tracks to the playlist
    await fetchWebApi(`v1/playlists/${playlist.id}/tracks`, "POST", { uris: trackUris }, accessToken)

    return NextResponse.json({ playlist })
  } catch (error) {
    console.error("Error creating playlist:", error)
    return NextResponse.json({ error: "Failed to create playlist" } as SpotifyApiError, { status: 500 })
  }
}

// Helper function to set access token (you'd call this after OAuth)
// legacy helper removed - use the api endpoint `/api/spotify/auth` to set tokens
