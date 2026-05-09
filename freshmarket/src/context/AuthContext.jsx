import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { auth, googleProvider } from '@/services/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { persistor } from '@/store'
import { resetCart } from '@/features/cart/cartSlice'
import { resetWishlist } from '@/features/wishlist/wishlistSlice'
import { authService } from '@/services/authService'
import { cartService } from '@/services/cartService'
import { fetchCart } from '@/features/cart/cartSlice'
import { fetchWishlist } from '@/features/wishlist/wishlistSlice'
import {
  authDebug,
  clearAuthToken,
  getAuthToken,
  getStoredAuthToken,
  registerUnauthorizedHandler,
  setAuthToken,
} from '@/services/authSession'
import { clearLocalCart } from '@/utils/localCart'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { decodeToken, getUserFromToken, isTokenValid } from '@/utils/tokenUtils'
import { normalizeUser, unwrapApiData } from '@/utils/apiData'

const AuthContext = createContext(null)

const canUseToken = (token) => {
  if (!token) return false

  const decoded = decodeToken(token)
  if (!decoded?.exp) return true

  return isTokenValid(token)
}

const extractTokenFromResponse = (payload) =>
  payload?.token || payload?.data?.token || payload?.accessToken || payload?.data?.accessToken || null

const resolveUserFromToken = (token, fallbackUser = null) => {
  const tokenUser = normalizeUser(getUserFromToken(token))
  const normalizedFallback = normalizeUser(fallbackUser) || {}
  const resolvedIdentity =
    tokenUser?._id ||
    tokenUser?.id ||
    normalizedFallback?._id ||
    normalizedFallback?.id ||
    tokenUser?.email ||
    normalizedFallback?.email ||
    null

  if (!resolvedIdentity) {
    return Object.keys(normalizedFallback).length > 0 ? normalizedFallback : null
  }

  return {
    ...normalizedFallback,
    ...tokenUser,
    _id: resolvedIdentity,
    id: tokenUser?.id || tokenUser?._id || normalizedFallback?.id || normalizedFallback?._id || resolvedIdentity,
  }
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [token, setToken] = useState(() => getStoredAuthToken())
  const [user, setUser] = useState(() => resolveUserFromToken(getStoredAuthToken()))
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(resolveUserFromToken(getStoredAuthToken())))
  const [isLoading, setIsLoading] = useState(true)
  const [authInitialized, setAuthInitialized] = useState(false)

  const isHandlingUnauthorized = useRef(false)

  const resetServerState = useCallback(() => {
    dispatch(resetCart())
    dispatch(resetWishlist())
    persistor.purge()
  }, [dispatch])

  const resetCommerceState = useCallback(() => {
    resetServerState()
    clearLocalCart()
  }, [resetServerState])

  const clearBackendSession = useCallback(
    ({ reason = 'session-reset', resetCommerce = true } = {}) => {
      console.log('[Auth RESET]', reason)
      clearAuthToken()
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)

      if (resetCommerce) {
        resetCommerceState()
      } else {
        resetServerState()
      }
    },
    [resetCommerceState, resetServerState]
  )

  const commitAuthenticatedSession = useCallback(
    (nextToken, nextUser, { persist = true } = {}) => {
      const normalizedUser = normalizeUser(nextUser)
      const resolvedUser = normalizedUser?._id ? normalizedUser : resolveUserFromToken(nextToken, nextUser)

      if (!resolvedUser?._id || !nextToken) {
        return null
      }

      if (persist) {
        setAuthToken(nextToken)
      }

      setToken(nextToken)
      setIsAuthenticated(true)
      setUser(resolvedUser)

      return resolvedUser
    },
    []
  )

  const syncAuthenticatedUser = useCallback(
    (nextUser, nextToken, { persist = true } = {}) => {
      return commitAuthenticatedSession(nextToken, nextUser, { persist })
    },
    [commitAuthenticatedSession]
  )

  const fetchProfile = useCallback(async (config = {}) => {
    const profileResponse = await authService.getProfile(config)
    const normalizedUser = normalizeUser(profileResponse)

    if (!normalizedUser?._id) {
      throw new Error('Unable to resolve your FreshCart profile.')
    }

    return normalizedUser
  }, [])

  const restoreFromToken = useCallback(
    (sessionToken, fallbackUser = null) => {
      const resolvedUser = resolveUserFromToken(sessionToken, fallbackUser)

      if (!resolvedUser?._id || !sessionToken) {
        return null
      }

      return commitAuthenticatedSession(sessionToken, resolvedUser, { persist: false })
    },
    [commitAuthenticatedSession]
  )

  const refreshAuthenticatedUser = useCallback(
    async (sessionToken, { allowTokenFallback = true, source = 'session' } = {}) => {
      const fallbackUser = resolveUserFromToken(sessionToken)

      try {
        const profile = await fetchProfile({ skipUnauthorizedHandling: true })
        const refreshedUser = syncAuthenticatedUser(profile, sessionToken, { persist: false })

        authDebug(`profile refresh succeeded (${source})`, {
          userId: refreshedUser?._id || null,
        })

        console.log(`[refreshAuthenticatedUser] succeeded (${source})`, { userId: refreshedUser?._id })
        return refreshedUser
      } catch (error) {
        const status = error?.response?.status

        console.log(`[refreshAuthenticatedUser] profile fetch failed (${source})`, {
          status: status || 'network-error',
          fallbackId: fallbackUser?._id,
          allowTokenFallback,
        })

        if ((status === 401 || status === 403) && !allowTokenFallback) {
          throw error
        }

        if ((status === 401 || status === 403) && fallbackUser?._id && allowTokenFallback) {
          authDebug(`profile refresh denied, keeping token user (${source})`, { status })
          console.log(`[refreshAuthenticatedUser] 401/403 with fallback — restoring token session`)
          return restoreFromToken(sessionToken, fallbackUser)
        }

        if (fallbackUser?._id && allowTokenFallback) {
          authDebug(`profile refresh unavailable, keeping token user (${source})`, {
            status: status || 'network-error',
          })
          console.log(`[refreshAuthenticatedUser] network error with fallback — keeping token session`)
          return restoreFromToken(sessionToken, fallbackUser)
        }

        throw error
      }
    },
    [fetchProfile, restoreFromToken, syncAuthenticatedUser]
  )

  const performLogout = useCallback(
    async ({
      reason = 'manual',
      redirectTo = '/login',
      toastMessage = null,
      toastType = 'success',
      resetCommerce = true,
      signOutFirebase = true,
    } = {}) => {
      authDebug('logout triggered', { reason })
      setIsLoading(true)

      if (signOutFirebase) {
        try {
          await signOut(auth)
        } catch {
          // Firebase logout is best-effort alongside local session cleanup.
        }
      }

      clearBackendSession({ reason, resetCommerce })

      if (redirectTo) {
        navigate(redirectTo, { replace: true })
      }

      if (toastMessage) {
        if (toastType === 'error') {
          toast.error(toastMessage)
        } else {
          toast.success(toastMessage)
        }
      }

      setIsLoading(false)
    },
    [clearBackendSession, navigate]
  )

  useEffect(() => {
    let isMounted = true
    let authTimeout

    const initializeAuth = async () => {
      const storedToken = getStoredAuthToken()
      authDebug('token loaded', storedToken ? 'present' : 'missing')

      if (!storedToken || !canUseToken(storedToken)) {
        clearTimeout(authTimeout)
        clearBackendSession({ reason: 'bootstrap-missing-or-invalid-token' })

        if (isMounted) {
          setIsLoading(false)
          setAuthInitialized(true)
          authDebug('auth initialized', { authenticated: false, source: 'guest' })
        }

        return
      }

      setAuthToken(storedToken)
      restoreFromToken(storedToken)

      try {
        const restoredUser = await refreshAuthenticatedUser(storedToken, {
          allowTokenFallback: true,
          source: 'bootstrap',
        })

        if (isMounted) {
          authDebug('auth initialized', {
            authenticated: Boolean(restoredUser?._id),
            source: 'session',
          })
        }
      } catch (error) {
        const status = error?.response?.status
        authDebug('session validation failed', {
          status: status || 'unknown',
        })
        console.log('[Auth bootstrap validation failed]', {
          status: status || 'unknown',
          tokenPresent: Boolean(storedToken),
        })

        if (status === 401 || status === 403 || !canUseToken(storedToken)) {
          clearBackendSession({ reason: 'bootstrap-validation-failed' })
        } else {
          restoreFromToken(storedToken)
        }
      } finally {
        if (isMounted) {
          clearTimeout(authTimeout)
          setIsLoading(false)
          setAuthInitialized(true)
        }
      }
    }

    authTimeout = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false)
        setAuthInitialized(true)
        console.warn('[Auth] Timeout — forcing auth initialization complete')
      }
    }, 5000)

    initializeAuth()

    return () => {
      isMounted = false
      clearTimeout(authTimeout)
    }
  }, [clearBackendSession, refreshAuthenticatedUser, restoreFromToken])

  useEffect(() => {
    const unregister = registerUnauthorizedHandler(async (payload = {}) => {
      if (isHandlingUnauthorized.current) {
        return
      }

      isHandlingUnauthorized.current = true

      const activeToken = getAuthToken()

      if (!activeToken) {
        isHandlingUnauthorized.current = false
        return
      }

      authDebug('unauthorized handler received', payload)

      try {
        if (!canUseToken(activeToken)) {
          await performLogout({
            reason: 'expired-token',
            toastMessage: 'Session expired. Please log in again.',
            toastType: 'error',
          })
          return
        }

        try {
          await refreshAuthenticatedUser(activeToken, {
            allowTokenFallback: false,
            source: 'unauthorized-recovery',
          })
          authDebug('unauthorized recovery succeeded', payload)
        } catch (validationError) {
          const status = validationError?.response?.status

          if (status === 401 || status === 403) {
            await performLogout({
              reason: 'session-validation-failed',
              toastMessage: 'Session expired. Please log in again.',
              toastType: 'error',
            })
            return
          }

          authDebug('temporary request failure ignored during unauthorized recovery', {
            status: status || 'network-error',
            url: payload.url || 'unknown',
          })
        }
      } finally {
        setTimeout(() => {
          isHandlingUnauthorized.current = false
        }, 1000)
      }
    })

    return unregister
  }, [performLogout, refreshAuthenticatedUser])

  useEffect(() => {
    console.log('[AuthContext]', {
      token,
      user,
      isAuthenticated,
      isLoading,
      authInitialized,
    })
  }, [authInitialized, isAuthenticated, isLoading, token, user])

  useEffect(() => {
    console.log('[Auth storage]', {
      token: typeof window !== 'undefined' ? window.localStorage.getItem('token') : null,
    })
  }, [token])



  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true)
    try {
      // 1. Firebase Sign-in
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user

      // 2. Get Firebase ID token
      const firebaseToken = await firebaseUser.getIdToken()

      // 3. Exchange with backend for app JWT
      const response = await authService.googleAuth({ firebaseToken })
      const payload = unwrapApiData(response) || response.data
      const nextToken = extractTokenFromResponse(response.data)

      if (!nextToken) {
        throw new Error('Backend did not return an authentication token.')
      }

      // 4. Commit session
      const candidateUser = normalizeUser(payload?.user || response.data?.user || payload)
      
      setAuthToken(nextToken)
      
      const nextUser = commitAuthenticatedSession(nextToken, candidateUser, {
        persist: true,
      })

      if (!nextUser?._id) {
        throw new Error('Unable to resolve your FreshCart profile.')
      }

      toast.success(`Welcome, ${nextUser.name}!`)

      // 5. Hydrate state
      dispatch(fetchCart())
      dispatch(fetchWishlist())
      
      setAuthInitialized(true)

      return { success: true, user: nextUser }

    } catch (error) {
      console.error('Google login failed:', error)
      const code = error?.code || ''
      
      if (code === 'auth/popup-blocked') {
        toast.error('Popup blocked — please allow popups for this site')
      } else if (code === 'auth/popup-closed-by-user') {
        // Just silent exit
      } else {
        const message = error?.response?.data?.message || error.message || 'Google authentication failed'
        toast.error(message)
      }
      
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }, [commitAuthenticatedSession, dispatch])

  const logout = useCallback(async () => {
    await performLogout({
      reason: 'manual-logout',
      toastMessage: 'Logged out successfully',
    })
  }, [performLogout])

  const updateProfile = useCallback(
    async (userData) => {
      const response = await authService.updateProfile(userData)
      const updatedUser = normalizeUser(response) || normalizeUser(response.data?.user)

      if (updatedUser?._id) {
        setUser((current) => ({
          ...current,
          ...updatedUser,
        }))
      } else {
        setUser((current) => ({
          ...current,
          ...userData,
        }))
      }

      return updatedUser || userData
    },
    []
  )

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      loading: isLoading,
      isLoading,
      authInitialized,
      loginWithGoogle,
      logout,
      updateProfile,
    }),
    [authInitialized, isAuthenticated, isLoading, loginWithGoogle, logout, token, updateProfile, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
