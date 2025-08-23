// Prefer server-side env vars; fall back to NEXT_PUBLIC for client convenience
const client_id = (process.env.SPOTIFY_CLIENT_ID ?? process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID) as string | undefined
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string | undefined

if (!client_id || !client_secret) {
  // Fail fast during development — helps surface missing env values
  console.error("Missing Spotify client_id or client_secret environment variables")
  console.error("Found client_id:", client_id ? "present" : "missing")
  console.error("Found client_secret:", client_secret ? "present" : "missing")
}

// Pilih redirect_uri berdasarkan environment
const redirect_uri =
  process.env.NODE_ENV === "production"
    ? "https://www.yusrilprayoga.tech/callback"
    : "http://127.0.0.1:3000/callback";

const basic = Buffer.from(
  `${client_id}:${client_secret}`
).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const ACCOUNTS_ENDPOINT = "https://accounts.spotify.com/authorize";

// Spotify scopes we need
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
].join(" ");

export const getAuthorizationUrl = () => {
  if (!client_id) {
    throw new Error("SPOTIFY_CLIENT_ID not configured")
  }
  
  const params = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scopes,
    redirect_uri,
    state: "spotify-auth",
  });

  return `${ACCOUNTS_ENDPOINT}?${params.toString()}`;
};

export const getAccessToken = async (code: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const json = await response.json()
  if (!response.ok || json.error) {
    console.error("Spotify token exchange failed:", response.status, json)
  }

  return json
};

export const getRefreshToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const json = await response.json()
  if (!response.ok || json.error) {
    console.error("Spotify refresh token failed:", response.status, json)
  }

  return json
};

export const fetchWebApi = async (
  endpoint: string,
  method = "GET",
  body?: any,
  accessToken?: string
) => {
  if (!accessToken) {
    throw new Error("No access token provided");
  }

  const response = await fetch(`https://api.spotify.com/${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Spotify API Error: ${response.status} - ${errorText}`);
    throw new Error(`Spotify API Error: ${response.status}`);
  }

  return response.json();
};
