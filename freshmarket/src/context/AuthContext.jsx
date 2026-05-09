import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { auth, googleProvider } from '@/services/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authInitialized, setAuthInitialized] = useState(false)
  
  // Ref to track if we're currently handling an unauthorized event
  const isHandlingUnauthorized = useRef(false)

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken()
          localStorage.setItem('token', idToken)
          setToken(idToken)
          // Map Firebase user to match the app's expected user structure
          setUser({
            _id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            role: 'user',
            image: firebaseUser.photoURL,
          })
          setIsAuthenticated(true)
          if (import.meta.env.DEV) {
            console.log('[Auth] User authenticated:', firebaseUser.uid)
          }
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('[Auth] Error getting ID token:', error)
          }
        }
      } else {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsAuthenticated(false)
        if (import.meta.env.DEV) {
          console.log('[Auth] User logged out')
        }
      }
      setIsLoading(false)
      setAuthInitialized(true)
    })

    return () => unsubscribe()
  }, [])

  // Listen for unauthorized events from axios interceptor
  useEffect(() => {
    const handleUnauthorized = (event) => {
      // Prevent duplicate handling
      if (isHandlingUnauthorized.current) {
        return
      }
      
      isHandlingUnauthorized.current = true
      
      if (import.meta.env.DEV) {
        console.log('[Auth] Unauthorized event received, clearing auth state')
      }
      
      // Clear auth state but don't redirect - let React handle navigation
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
      
      // Reset flag after a delay
      setTimeout(() => {
        isHandlingUnauthorized.current = false
      }, 1000)
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)
    
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [])

  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user
      
      if (import.meta.env.DEV) {
        console.log('[Auth] Google login successful:', firebaseUser.uid)
      }
      
      toast.success(`Welcome, ${firebaseUser.displayName}!`)
      navigate('/')
      return true
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[Auth] Google login error:', {
          code: error.code,
          message: error.message,
        })
      }
      
      let friendlyMessage = 'Failed to login with Google'
      if (error.code === 'auth/popup-blocked') {
        friendlyMessage = 'Popup was blocked by your browser. Please enable popups for this site.'
      } else if (error.code === 'auth/popup-closed-by-user') {
        friendlyMessage = 'Login window was closed before completion.'
      } else if (error.code === 'auth/api-key-not-valid') {
        friendlyMessage = 'Firebase API key is invalid. Please check your configuration.'
      } else if (error.code === 'auth/unauthorized-domain') {
        friendlyMessage = 'This domain is not authorized in Firebase Console.'
      }
      
      toast.error(friendlyMessage)
      return false
    }
  }, [navigate])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
      navigate('/login', { replace: true })
      toast.success('Logged out successfully')
      if (import.meta.env.DEV) {
        console.log('[Auth] Logout successful')
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[Auth] Logout error:', error)
      }
      toast.error('Failed to log out')
    }
  }, [navigate])

  const updateUser = useCallback((userData) => {
    setUser((current) => ({ ...current, ...userData }))
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      authInitialized,
      loginWithGoogle,
      logout,
      updateUser,
    }),
    [user, token, isAuthenticated, isLoading, authInitialized, loginWithGoogle, logout, updateUser]
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