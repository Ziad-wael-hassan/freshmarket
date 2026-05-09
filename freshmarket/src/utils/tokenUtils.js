/**
 * JWT utility functions for token handling
 */

/**
 * Decode JWT payload (base64 decoding)
 * @param {string} token - JWT token
 * @returns {object} Decoded payload
 */
export const decodeToken = (token) => {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
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
  return {
    id: decoded.id || decoded._id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
  }
}
