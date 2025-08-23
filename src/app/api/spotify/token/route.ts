import { NextResponse } from "next/server"
import { getAccessToken } from "@/lib/spotify"
import { setCurrentAccessToken } from "@/lib/spotifyTokenStore"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 })

    const tokenResponse = await getAccessToken(code)

    if (tokenResponse.error) {
      console.error("Token exchange failed:", tokenResponse)
      return NextResponse.json(tokenResponse, { status: 400 })
    }

    // store on server
    setCurrentAccessToken(tokenResponse.access_token, tokenResponse.refresh_token, tokenResponse.expires_in)

    return NextResponse.json(tokenResponse)
  } catch (err) {
    console.error("/api/spotify/token error:", err)
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 })
  }
}
