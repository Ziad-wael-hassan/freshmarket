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
  const hasClearedGuestState = useRef(false)

  useEffect(() => {
    if (!authInitialized) {
      return
    }

    if (isAuthLoading) {
      return
    }

    const currentId = user?._id || user?.id

    if (isAuthenticated && currentId) {
      if (lastUserId.current !== currentId) {
        dispatch(fetchCart())
        dispatch(fetchWishlist())
        lastUserId.current = currentId
      }

      hasClearedGuestState.current = false
    } else {
      if (!hasClearedGuestState.current || lastUserId.current !== null) {
        dispatch(resetCart())
        dispatch(resetWishlist())
      }

      lastUserId.current = null
      hasClearedGuestState.current = true
    }
  }, [isAuthenticated, user, isAuthLoading, authInitialized, dispatch])

  return null
}
