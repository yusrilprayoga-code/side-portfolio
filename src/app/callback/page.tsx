"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
// Token exchange is performed server-side via /api/spotify/token
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code")
        const error = searchParams.get("error")
        const state = searchParams.get("state")

        if (error) {
          throw new Error(`Spotify authorization error: ${error}`)
        }

        if (!code) {
          throw new Error("No authorization code received")
        }

        if (state !== "spotify-auth") {
          throw new Error("Invalid state parameter")
        }

        // Exchange code for access token via server-side endpoint
        const tokenResponse = await fetch("/api/spotify/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }).then((r) => r.json())

        if (tokenResponse.error) {
          console.error("Token response error details:", tokenResponse)
          throw new Error(`Token exchange error: ${tokenResponse.error}`)
        }

        // Store the access token (in a real app, you'd store this securely)
        localStorage.setItem("spotify_access_token", tokenResponse.access_token)
        localStorage.setItem("spotify_refresh_token", tokenResponse.refresh_token)

        // Set the token in our API route (this is a simplified approach)
        await fetch("/api/spotify/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token,
            expires_in: tokenResponse.expires_in,
          }),
        })

        // Redirect to main page
        router.push("/")
      } catch (err) {
        console.error("Callback error:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    handleCallback()
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800 flex items-center justify-center">
        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Connecting to Spotify</h2>
            <p className="text-gray-300">Please wait while we authenticate your account...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800 flex items-center justify-center">
        <Card className="bg-black/40 backdrop-blur-sm border-red-500/20 max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Failed</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
