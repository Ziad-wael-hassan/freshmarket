import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getTokenExpiry, getUserFromToken, isTokenValid } from '@/utils/tokenUtils'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

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
    if (!token) return undefined
    const remaining = getTokenExpiry(token)
    if (remaining <= 0) {
      logout()
      return undefined
    }

    const timer = window.setTimeout(() => {
      logout()
      toast.error('Session expired. Please log in again.')
    }, remaining)

    return () => window.clearTimeout(timer)
  }, [token])

  const login = (jwtToken) => {
    const decodedUser = getUserFromToken(jwtToken)
    if (!decodedUser) return
    localStorage.setItem('token', jwtToken)
    setToken(jwtToken)
    setUser(decodedUser)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    navigate('/login', { replace: true })
  }

  const updateUser = (userData) => {
    setUser((current) => ({ ...current, ...userData }))
  }

  const value = useMemo(
    () => ({ user, token, isAuthenticated, login, logout, updateUser, isLoading }),
    [user, token, isAuthenticated, isLoading]
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
