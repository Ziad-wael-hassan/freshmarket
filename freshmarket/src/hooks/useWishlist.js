import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { toggleWishlist, fetchWishlist } from '@/features/wishlist/wishlistSlice'
import { useAuth } from '@/context/AuthContext'
import { extractErrorMessage } from '@/utils/extractErrorMessage'

const guestWishlistState = {
  items: [],
  itemIds: [],
  count: 0,
  loading: false,
  error: null,
}

export const useWishlist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const wishlist = useSelector((state) => state.wishlist)
  const { isAuthenticated } = useAuth()

  const requireAuthenticatedWishlist = useCallback(() => {
    if (isAuthenticated) {
      return true
    }

    toast.error('Please log in to manage your wishlist.')
    navigate('/login', {
      state: {
        returnUrl: `${location.pathname}${location.search}`,
      },
    })

    return false
  }, [isAuthenticated, location.pathname, location.search, navigate])

  const toggleItem = useCallback(
    async (productOrId) => {
      if (!requireAuthenticatedWishlist()) {
        return { success: false, requiresAuth: true }
      }

      const product = typeof productOrId === 'object' ? productOrId : null
      const productId = product?._id || productOrId
      
      const isWishlisted = wishlist.itemIds.includes(productId)
      
      try {
        const wishlistPayload = {
          productId,
          isWishlisted,
          product: product ? {
            productId: product._id,
            title: product.title,
            image: product.imageCover,
            price: product.priceAfterDiscount || product.price,
            category: product.category?.name,
            brand: product.brand?.name,
            ratingsAverage: product.ratingsAverage
          } : null
        }
        
        await dispatch(toggleWishlist(wishlistPayload)).unwrap()
        return { success: true }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast.error(message)
        return { success: false, error: message }
      }
    },
    [dispatch, requireAuthenticatedWishlist, wishlist.itemIds]
  )

  const removeItem = useCallback(
    async (productId) => {
      if (!requireAuthenticatedWishlist()) {
        return { success: false, requiresAuth: true }
      }

      try {
        await dispatch(toggleWishlist({ productId, isWishlisted: true })).unwrap()
        return { success: true }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast.error(message)
        return { success: false, error: message }
      }
    },
    [dispatch, requireAuthenticatedWishlist]
  )

  const clearWishlist = useCallback(async () => {
    if (!requireAuthenticatedWishlist()) {
      return { success: false, requiresAuth: true }
    }

    try {
      const itemsToRemove = wishlist.items.map((item) => item._id || item.id || item)
      await Promise.all(
        itemsToRemove.map((id) =>
          dispatch(toggleWishlist({ productId: id, isWishlisted: true })).unwrap()
        )
      )
      return { success: true }
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return { success: false, error: message }
    }
  }, [dispatch, requireAuthenticatedWishlist, wishlist.items])

  const isInWishlist = useCallback(
    (productId) => {
      if (!isAuthenticated) {
        return false
      }

      return wishlist.itemIds.includes(productId)
    },
    [isAuthenticated, wishlist.itemIds]
  )

  const refreshWishlist = useCallback(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist())
    }
  }, [dispatch, isAuthenticated])

  const resolvedWishlist = isAuthenticated ? wishlist : guestWishlistState

  return {
    wishlist: resolvedWishlist,
    toggleItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    refreshWishlist,
    isLoading: resolvedWishlist.loading,
    loading: resolvedWishlist.loading,
    items: resolvedWishlist.items,
    itemIds: resolvedWishlist.itemIds,
    count: resolvedWishlist.count,
  }
}
