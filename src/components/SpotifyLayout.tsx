"use client";

import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Music,
  Play,
  Heart,
  Share2,
  ExternalLink,
  Headphones,
  Radio,
  Disc3,
  Loader2,
  Plus,
  List,
} from "lucide-react";
import type {
  SpotifyApiResponse,
  SpotifyTrack,
  SpotifyRecentlyPlayedItem,
  SpotifyPlaylist,
} from "@/types/spotify";
import { isSpotifyApiResponse, isSpotifyApiError } from "@/types/spotify";
import Image from "next/image";

// Custom hook for Spotify data fetching
const useSpotifyData = () => {
  const [spotifyData, setSpotifyData] = useState<SpotifyApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchSpotifyData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching Spotify data from API...");
      const response = await fetch("/api/spotify");

      if (response.status === 401) {
        // No access token, redirect to login
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Response Error:", response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: unknown = await response.json();
      console.log("Raw API response:", data);

      if (isSpotifyApiError(data)) {
        console.error("Spotify API Error:", data.error);
        if (data.error.includes("authenticate")) {
          router.push("/login");
          return;
        }
        throw new Error(data.error);
      }

      if (isSpotifyApiResponse(data)) {
        console.log("Data validated successfully:", {
          topTracks: data.topTracks?.length,
          userProfile: data.userProfile?.display_name,
          recentlyPlayed: data.recentlyPlayed?.length,
          userPlaylists: data.userPlaylists?.length || 0,
        });
        setSpotifyData(data);
      } else {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("fetchSpotifyData error:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSpotifyData();
  }, [fetchSpotifyData]);

  return { spotifyData, loading, error, refetch: fetchSpotifyData };
};

// Custom hook for playlist creation
const usePlaylistCreation = () => {
  const [creating, setCreating] = useState(false);

  const createPlaylistFromTopTracks = useCallback(
    async (topTracks: SpotifyTrack[]) => {
      try {
        setCreating(true);
        const trackUris = topTracks.slice(0, 5).map((track) => track.uri);

        const response = await fetch("/api/spotify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trackUris }),
        });

        if (!response.ok) {
          throw new Error("Failed to create playlist");
        }

        const { playlist } = await response.json();
        return playlist;
      } catch (error) {
        console.error("Error creating playlist:", error);
        throw error;
      } finally {
        setCreating(false);
      }
    },
    []
  );

  return { createPlaylistFromTopTracks, creating };
};

// Component for displaying track information
interface TrackCardProps {
  track: SpotifyTrack;
  index?: number;
  showRanking?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  index,
  showRanking = false,
}) => {
  const albumImage =
    track.album.images[2]?.url ||
    track.album.images[0]?.url ||
    "/placeholder.svg?height=64&width=64";
  const artistNames = track.artists.map((artist) => artist.name).join(", ");

  return (
    <Card className="bg-green-900/20 border-green-500/20 hover:bg-green-900/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {showRanking && typeof index === "number" && (
            <div className="text-green-400 font-bold text-lg w-8">
              #{index + 1}
            </div>
          )}
          <Image
            src={albumImage || "/placeholder.svg"}
            alt={`${track.album.name} album cover`}
            width={64}
            height={64}
            className="w-16 h-16 rounded-md object-cover"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium truncate" title={track.name}>
              {track.name}
            </div>
            <div className="text-gray-400 text-sm truncate" title={artistNames}>
              {artistNames}
            </div>
            <div
              className="text-gray-500 text-xs truncate"
              title={track.album.name}
            >
              {track.album.name}
            </div>
          </div>
          <Button
            className="text-green-400 hover:text-white hover:bg-green-600"
            asChild
          >
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${track.name} in Spotify`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for playlist cards
interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const playlistImage =
    playlist.images[0]?.url || "/placeholder.svg?height=160&width=160";

  return (
    <Card className="bg-green-900/20 border-green-500/20 hover:bg-green-900/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center gap-3">
          <Image
            src={playlistImage || "/placeholder.svg"}
            width={64}
            height={64}
            alt={`${playlist.name} playlist cover`}
            className="w-32 h-32 rounded-md object-cover"
            loading="lazy"
          />
          <div className="w-full">
            <div
              className="text-white font-medium truncate"
              title={playlist.name}
            >
              {playlist.name}
            </div>
            <div className="text-gray-400 text-sm">
              {playlist.tracks.total} tracks
            </div>
            <div className="text-gray-500 text-xs truncate">
              by {playlist.owner.display_name}
            </div>
          </div>
          <Button
            className="text-green-400 hover:text-white hover:bg-green-600"
            asChild
          >
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${playlist.name} in Spotify`}
            >
              <Play className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for recently played items
interface RecentlyPlayedCardProps {
  item: SpotifyRecentlyPlayedItem;
  index: number;
}

const RecentlyPlayedCard: React.FC<RecentlyPlayedCardProps> = ({
  item,
  index,
}) => {
  const albumImage =
    item.track.album.images[2]?.url ||
    item.track.album.images[0]?.url ||
    "/placeholder.svg?height=48&width=48";
  const artistNames = item.track.artists
    .map((artist) => artist.name)
    .join(", ");

  return (
    <Card className="bg-green-900/20 border-green-500/20 hover:bg-green-900/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Image
            src={albumImage || "/placeholder.svg"}
            alt={`${item.track.album.name} album cover`}
            width={64}
            height={64}
            className="w-16 h-16 rounded-md object-cover"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <div
              className="text-white font-medium truncate"
              title={item.track.name}
            >
              {item.track.name}
            </div>
            <div className="text-gray-400 text-sm truncate" title={artistNames}>
              {artistNames}
            </div>
          </div>
          <Button
            className="text-green-400 hover:text-white hover:bg-green-600"
            asChild
          >
            <a
              href={item.track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Play ${item.track.name} in Spotify`}
            >
              <Play className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Loading component
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
      <p className="text-white text-lg">Loading your Spotify data...</p>
    </div>
  </div>
);

// Error component
interface ErrorScreenProps {
  error: string;
  onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-4">
      <Music className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <p className="text-white text-lg mb-4">Error: {error}</p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-green-600 hover:bg-green-700">
          Try Again
        </Button>
      )}
    </div>
  </div>
);

// Spotify Embed Component
interface SpotifyEmbedProps {
  playlistId: string;
  title?: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  playlistId,
  title = "Spotify Playlist",
}) => (
  <div className="w-full">
    <iframe
      title={title}
      src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
      width="100%"
      height="380"
      style={{ minHeight: "380px", borderRadius: "12px" }}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </div>
);

// Main page component
const SpotifyLayout: React.FC = () => {
  const { spotifyData, loading, error, refetch } = useSpotifyData();
  const { createPlaylistFromTopTracks, creating } = usePlaylistCreation();
  const [createdPlaylist, setCreatedPlaylist] = useState<any>(null);

  const handleCreatePlaylist = async () => {
    if (!spotifyData?.topTracks) return;

    try {
      const playlist = await createPlaylistFromTopTracks(spotifyData.topTracks);
      setCreatedPlaylist(playlist);
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  if (!spotifyData) {
    return <ErrorScreen error="No data available" onRetry={refetch} />;
  }

  const { topTracks, userProfile, recentlyPlayed, userPlaylists } = spotifyData;
  const profileImage =
    userProfile.images?.[0]?.url || "/placeholder.svg?height=128&width=128";
  const displayName = userProfile.display_name || "Music Lover";
  const followerCount = userProfile.followers?.total || 0;
  const profileUrl =
    userProfile.external_urls?.spotify ||
    "https://open.spotify.com/user/31qu5ndt24u4hylkijcjhsn6sb54?si=03b35c2c068443fa";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%22.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              My Spotify Profile
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Discover my musical journey</p>
        </header>

        {/* Main Profile Card */}
        <Card className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border-green-500/20 mb-8">
          <CardHeader className="text-center pb-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 border-4 border-green-400">
                <AvatarImage
                  src={profileImage || "/placeholder.svg"}
                  alt={`${displayName}'s profile picture`}
                  loading="lazy"
                  className="object-cover"
                />
                <AvatarFallback className="bg-green-600 text-white text-2xl">
                  <Music className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {displayName}
                </h2>
                <Badge className="bg-green-600 text-white hover:bg-green-700">
                  <Headphones className="w-4 h-4 mr-1" />
                  {followerCount.toLocaleString()} Followers
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-green-900/30 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Disc3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {topTracks.length}
                  </div>
                  <div className="text-gray-300 text-sm">Top Tracks</div>
                </CardContent>
              </Card>

              <Card className="bg-green-900/30 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <List className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {userPlaylists?.length || 0}
                  </div>
                  <div className="text-gray-300 text-sm">Playlists</div>
                </CardContent>
              </Card>

              <Card className="bg-green-900/30 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Radio className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {followerCount.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">Followers</div>
                </CardContent>
              </Card>

              <Card className="bg-green-900/30 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {recentlyPlayed.length}
                  </div>
                  <div className="text-gray-300 text-sm">Recent Plays</div>
                </CardContent>
              </Card>
            </div>

            {/* Spotify Profile Link */}
            <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Music className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Follow me on Spotify
                      </h3>
                      <p className="text-green-100">
                        Check out my playlists and music taste
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Spotify
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Tracks */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-400" />
                  Your Top Tracks
                </h3>
                <Button
                  onClick={handleCreatePlaylist}
                  disabled={creating}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {creating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Create Playlist
                </Button>
              </div>
              <div className="space-y-3">
                {topTracks.slice(0, 5).map((track, index) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    index={index}
                    showRanking={true}
                  />
                ))}
              </div>
            </section>

            {/* Created Playlist Embed */}
            {createdPlaylist && (
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <List className="w-5 h-5 text-green-400" />
                  Your Created Playlist
                </h3>
                <SpotifyEmbed
                  playlistId={createdPlaylist.id}
                  title={createdPlaylist.name}
                />
              </section>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button className="flex-1 border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Playlists Section */}
        {userPlaylists && userPlaylists.length > 0 && (
          <Card className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border-green-500/20 mb-8">
            <CardHeader>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <List className="w-6 h-6 text-green-400" />
                My Playlists ({userPlaylists.length})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPlaylists.slice(0, 6).map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recently Played Section */}
        <Card className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Disc3 className="w-6 h-6 text-green-400" />
              Recently Played
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyPlayed.map((item, index) => (
                <RecentlyPlayedCard
                  key={`${item.track.id}-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sample Playlist Embed */}
        <Card className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border-green-500/20 mt-8">
          <CardHeader>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Music className="w-6 h-6 text-green-400" />
              Featured Playlist
            </h3>
          </CardHeader>
          <CardContent>
            <SpotifyEmbed
              playlistId="1N0dRvRb5bfAKUxnzQGDDJ"
              title="My Recommendation Playlist"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpotifyLayout;