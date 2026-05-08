import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { getTokenExpiry, getUserFromToken, isTokenValid } from '@/utils/tokenUtils'
import { authService } from '@/services/authService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken && isTokenValid(storedToken)) {
      const decodedUser = getUserFromToken(storedToken)
      setToken(storedToken)
      setUser(decodedUser)
      setIsAuthenticated(true)
    } else {
      localStorage.removeItem('token')
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!token) return
    const remaining = getTokenExpiry(token)
    if (remaining <= 0) {
      logout()
      return
    }
    const timer = window.setTimeout(() => {
      logout()
      toast.error('Session expired. Please log in again.')
    }, remaining)
    return () => window.clearTimeout(timer)
  }, [token])

  const setSession = useCallback((jwtToken) => {
    const decodedUser = getUserFromToken(jwtToken)
    if (!decodedUser) return false
    localStorage.setItem('token', jwtToken)
    setToken(jwtToken)
    setUser(decodedUser)
    setIsAuthenticated(true)
    return true
  }, [])

  const login = useCallback(
    async (email, password) => {
      const response = await authService.signin({ email, password })
      if (response.data.token) {
        setSession(response.data.token)
      }
      return response.data
    },
    [setSession]
  )

  const registerUser = useCallback(
    async (data) => {
      const response = await authService.signup(data)
      if (response.data.token) {
        setSession(response.data.token)
      }
      return response.data
    },
    [setSession]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    navigate('/login', { replace: true })
  }, [navigate])

  const updateUser = useCallback((userData) => {
    setUser((current) => ({ ...current, ...userData }))
  }, [])

  const updateProfile = useCallback(
    async (data) => {
      const response = await authService.updateProfile(data)
      if (response.data.user) {
        updateUser(response.data.user)
      }
      return response.data
    },
    [updateUser]
  )

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      registerUser,
      logout,
      updateUser,
      updateProfile,
    }),
    [user, token, isAuthenticated, isLoading, login, registerUser, logout, updateUser, updateProfile]
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
