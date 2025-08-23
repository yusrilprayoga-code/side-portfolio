// Enhanced TypeScript interfaces for better type safety
export interface SpotifyImage {
  url: string
  height: number | null
  width: number | null
}

export interface SpotifyArtist {
  id: string
  name: string
  external_urls: {
    spotify: string
  }
  href: string
  type: "artist"
  uri: string
}

export interface SpotifyAlbum {
  id: string
  name: string
  images: SpotifyImage[]
  external_urls: {
    spotify: string
  }
  release_date: string
  total_tracks: number
  type: "album"
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  external_urls: {
    spotify: string
  }
  duration_ms: number
  explicit: boolean
  popularity: number
  preview_url: string | null
  track_number: number
  type: "track"
  uri: string
}

export interface SpotifyUser {
  id: string
  display_name: string | null
  email?: string
  followers: {
    href: string | null
    total: number
  }
  images: SpotifyImage[]
  external_urls: {
    spotify: string
  }
  country?: string
  product?: string
  type: "user"
}

export interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack
  played_at: string
  context: {
    type: string
    href: string
    external_urls: {
      spotify: string
    }
    uri: string
  } | null
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string | null
  images: SpotifyImage[]
  external_urls: {
    spotify: string
  }
  tracks: {
    total: number
  }
  public: boolean
  owner: {
    display_name: string
    id: string
  }
}

// Make userPlaylists optional to handle cases where it might fail
export interface SpotifyApiResponse {
  topTracks: SpotifyTrack[]
  userProfile: SpotifyUser
  recentlyPlayed: SpotifyRecentlyPlayedItem[]
  userPlaylists?: SpotifyPlaylist[] // Made optional
}

export interface SpotifyApiError {
  error: string
  status?: number
}

// Updated type guards with better checking
export const isSpotifyApiResponse = (data: unknown): data is SpotifyApiResponse => {
  if (typeof data !== "object" || data === null) {
    return false
  }

  const obj = data as Record<string, unknown>

  return (
    "topTracks" in obj &&
    Array.isArray(obj.topTracks) &&
    "userProfile" in obj &&
    typeof obj.userProfile === "object" &&
    "recentlyPlayed" in obj &&
    Array.isArray(obj.recentlyPlayed)
    // userPlaylists is optional, so we don't check for it
  )
}

export const isSpotifyApiError = (data: unknown): data is SpotifyApiError => {
  return (
    typeof data === "object" && data !== null && "error" in data && typeof (data as SpotifyApiError).error === "string"
  )
}
