"use client"

import { getAuthorizationUrl } from "@/lib/spotify"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, ExternalLink } from "lucide-react"

export default function LoginPage() {
    const handleSpotifyLogin = () => {
        const authUrl = getAuthorizationUrl()
        window.location.href = authUrl
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%22.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      <Card className="max-w-md mx-4 bg-black/40 backdrop-blur-sm border-green-500/20 relative z-10">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-white">Spotify Profile</h1>
          </div>
          <p className="text-gray-300">Connect your Spotify account to view your music profile</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Ready to Connect?</h2>
            <p className="text-gray-400 text-sm mb-6">
              We'll access your top tracks, recently played songs, and playlists to create your personalized music
              profile.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>View your top tracks and artists</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>See your recently played music</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Access your playlists</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Create new playlists</span>
            </div>
          </div>

          <Button
            onClick={handleSpotifyLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect with Spotify
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By connecting, you agree to Spotify's terms of service and privacy policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
