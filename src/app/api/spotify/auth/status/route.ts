import { NextResponse } from "next/server"
import { getCurrentAccessToken, getCurrentRefreshToken, getTokenExpiry } from "@/lib/spotifyTokenStore"

export async function GET() {
  return NextResponse.json({
    access_token: getCurrentAccessToken(),
    refresh_token: getCurrentRefreshToken(),
    expires_at: getTokenExpiry(),
  })
}
