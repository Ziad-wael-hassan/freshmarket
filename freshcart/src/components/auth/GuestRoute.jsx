import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export const GuestRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    // Redirect to the intended page or home if user is already authenticated
    const returnUrl = location.state?.returnUrl || '/'
    return <Navigate to={returnUrl} replace />
  }

  return children
}
