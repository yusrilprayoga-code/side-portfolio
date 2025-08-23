import { type NextRequest, NextResponse } from "next/server"
import { setCurrentAccessToken, getCurrentAccessToken } from "@/lib/spotifyTokenStore"

export async function POST(request: NextRequest) {
  try {
    const { access_token, refresh_token, expires_in } = await request.json()

    if (!access_token) {
      return NextResponse.json({ error: "No access token provided" }, { status: 400 })
    }

    // Store the access token in shared store (also store refresh token and expiry if provided)
    setCurrentAccessToken(access_token, refresh_token ?? null, typeof expires_in === "number" ? expires_in : null)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing access token:", error)
    return NextResponse.json({ error: "Failed to store access token" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ access_token: getCurrentAccessToken() })
}

// Also export helper for other modules to read token if imported directly
export { getCurrentAccessToken as getStoredAccessToken }
