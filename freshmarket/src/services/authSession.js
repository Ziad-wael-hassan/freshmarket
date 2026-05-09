const TOKEN_KEY = 'token'

let inMemoryToken = null
let unauthorizedHandler = null
let pendingUnauthorizedPayload = null

const canUseBrowserStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage)

const readTokenFromStorage = () => {
  if (!canUseBrowserStorage()) {
    return null
  }

  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const authDebug = (message, payload) => {
  if (payload === undefined) {
    console.info(`[Auth] ${message}`)
    return
  }

  console.info(`[Auth] ${message}`, payload)
}

inMemoryToken = readTokenFromStorage()

export const getStoredAuthToken = () => readTokenFromStorage()

export const getAuthToken = () => inMemoryToken || readTokenFromStorage()

export const setAuthToken = (token) => {
  inMemoryToken = token || null

  if (canUseBrowserStorage()) {
    try {
      if (token) {
        window.localStorage.setItem(TOKEN_KEY, token)
      } else {
        window.localStorage.removeItem(TOKEN_KEY)
      }
    } catch {
      // Ignore localStorage failures and keep the in-memory token as the source of truth.
    }
  }

  return inMemoryToken
}

export const clearAuthToken = () => setAuthToken(null)

export const registerUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler

  if (pendingUnauthorizedPayload) {
    const payload = pendingUnauthorizedPayload
    pendingUnauthorizedPayload = null
    Promise.resolve().then(() => {
      handler(payload)
    })
  }

  return () => {
    if (unauthorizedHandler === handler) {
      unauthorizedHandler = null
    }
  }
}

export const notifyUnauthorized = (payload = {}) => {
  authDebug('unauthorized event fired', payload)

  if (typeof unauthorizedHandler === 'function') {
    unauthorizedHandler(payload)
    return
  }

  pendingUnauthorizedPayload = payload
}
