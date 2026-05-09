import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '@/context/AuthContext'
import { fetchCart, resetCart } from '@/features/cart/cartSlice'
import { fetchWishlist, resetWishlist } from '@/features/wishlist/wishlistSlice'

/**
 * HydrationHandler manages the synchronization of global state (cart, wishlist)
 * with the authentication state. It dispatches fetch actions when a user logs in
 * and reset actions when they log out.
 * 
 * IMPORTANT: Only fetches cart/wishlist when user is truly authenticated,
 * NOT during initial load or when auth is not yet initialized.
 * This prevents 401 loops for guest users.
 */
export const HydrationHandler = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading: isAuthLoading, authInitialized } = useAuth()
  const lastUserId = useRef(null)

  useEffect(() => {
    // Wait for auth to be fully initialized before making any decisions
    if (!authInitialized) {
      if (import.meta.env.DEV) {
        console.log('[HydrationHandler] Waiting for auth to initialize...')
      }
      return
    }

    // Wait for any ongoing auth operations to complete
    if (isAuthLoading) {
      if (import.meta.env.DEV) {
        console.log('[HydrationHandler] Auth is loading, waiting...')
      }
      return
    }

    const currentId = user?._id || user?.id

    // Only hydrate if user is actually authenticated with a valid ID
    if (isAuthenticated && currentId) {
      // Only hydrate if the user has changed
      if (lastUserId.current !== currentId) {
        if (import.meta.env.DEV) {
          console.log('[HydrationHandler] User authenticated, fetching cart and wishlist...')
        }
        dispatch(fetchCart())
        dispatch(fetchWishlist())
        lastUserId.current = currentId
      }
    } else {
      // User is not authenticated (guest)
      // Only reset if we previously had a user (logged out)
      if (lastUserId.current !== null) {
        if (import.meta.env.DEV) {
          console.log('[HydrationHandler] User unauthenticated, resetting cart and wishlist...')
        }
        dispatch(resetCart())
        dispatch(resetWishlist())
        lastUserId.current = null
      }
      // For guests, do NOT fetch cart/wishlist - let them use local storage
    }
  }, [isAuthenticated, user, isAuthLoading, authInitialized, dispatch])

  return null
}