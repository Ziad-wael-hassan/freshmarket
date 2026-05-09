/**
 * JWT utility functions for token handling
 */

const decodeBase64Url = (value) => {
  if (!value) return null

  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4
  const padded = padding === 0 ? normalized : normalized.padEnd(normalized.length + (4 - padding), '=')

  return atob(padded)
}

/**
 * Decode JWT payload (base64 decoding)
 * @param {string} token - JWT token
 * @returns {object} Decoded payload
 */
export const decodeToken = (token) => {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    return JSON.parse(decodeBase64Url(payload))
  } catch {
    return null
  }
}

/**
 * Check if token is still valid
 * @param {string} token - JWT token
 * @returns {boolean} True if token is valid
 */
export const isTokenValid = (token) => {
  if (!token) return false
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return false
  // Check if expiry time has passed
  return Date.now() < decoded.exp * 1000
}

/**
 * Get remaining time until token expires (in milliseconds)
 * @param {string} token - JWT token
 * @returns {number} Milliseconds until expiry, or 0 if already expired
 */
export const getTokenExpiry = (token) => {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return 0
  const remaining = decoded.exp * 1000 - Date.now()
  return remaining > 0 ? remaining : 0
}

/**
 * Extract user data from token
 * @param {string} token - JWT token
 * @returns {object|null} User data from token
 */
export const getUserFromToken = (token) => {
  const decoded = decodeToken(token)
  if (!decoded) return null

  const source =
    (decoded.user && typeof decoded.user === 'object' && decoded.user) ||
    (decoded.data && typeof decoded.data === 'object' && decoded.data) ||
    decoded

  const resolvedId =
    source.id ||
    source._id ||
    source.userId ||
    decoded.id ||
    decoded._id ||
    decoded.userId ||
    decoded.sub ||
    null

  return {
    id: resolvedId,
    _id: resolvedId,
    name: source.name || source.username || source.fullName || decoded.name || '',
    email: source.email || decoded.email || decoded.userEmail || '',
    role: source.role || decoded.role,
  }
}
