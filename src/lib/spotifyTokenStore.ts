// Simple in-memory token store shared between API routes.
// In production use a database, encrypted store or server-side session.
// Simple in-memory token store shared between API routes.
// In production use a database, encrypted store or server-side session.
let currentAccessToken: string | null = null
let currentRefreshToken: string | null = null
let expiresAt: number | null = null // unix ms

export function setCurrentAccessToken(token: string | null, refreshToken?: string | null, expiresInSeconds?: number | null) {
  currentAccessToken = token
  if (refreshToken) currentRefreshToken = refreshToken
  if (expiresInSeconds) expiresAt = Date.now() + expiresInSeconds * 1000
}

export function getCurrentAccessToken() {
  if (expiresAt && Date.now() > expiresAt) {
    // expired
    currentAccessToken = null
  }
  return currentAccessToken
}

export function getCurrentRefreshToken() {
  return currentRefreshToken
}

export function clearTokens() {
  currentAccessToken = null
  currentRefreshToken = null
  expiresAt = null
}

export function getTokenExpiry() {
  return expiresAt
}
