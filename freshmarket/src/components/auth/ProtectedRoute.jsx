import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, authInitialized } = useAuth()
  const location = useLocation()

  // Wait for auth to initialize before making any routing decisions
  // This prevents premature redirects during hydration
  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          {/* Branded loader for better UX */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <img 
              src="/branding/green-cart.svg" 
              alt="Loading" 
              className="absolute inset-2 w-10 h-10 object-contain"
            />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // If auth is initialized but still loading an operation, show loader
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Please wait...</p>
        </div>
      </div>
    )
  }

  // Auth initialized and not loading - check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnUrl: location.pathname }} replace />
  }

  return children
}
