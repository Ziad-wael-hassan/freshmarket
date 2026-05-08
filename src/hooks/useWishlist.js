import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist, fetchWishlist } from '@/features/wishlist/wishlistSlice'

export const useWishlist = () => {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist)

  const toggleItem = useCallback(
    async (productId) => {
      const isWishlisted = wishlist.itemIds.includes(productId)
      try {
        await dispatch(toggleWishlist({ productId, isWishlisted })).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch, wishlist.itemIds]
  )

  const removeItem = useCallback(
    async (productId) => {
      try {
        await dispatch(toggleWishlist({ productId, isWishlisted: true })).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch]
  )

  const clearWishlist = useCallback(async () => {
    try {
      for (const item of wishlist.items) {
        const id = item._id || item
        await dispatch(toggleWishlist({ productId: id, isWishlisted: true })).unwrap()
      }
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }, [dispatch, wishlist.items])

  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.itemIds.includes(productId)
    },
    [wishlist.itemIds]
  )

  const refreshWishlist = useCallback(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  return {
    wishlist,
    toggleItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    refreshWishlist,
    isLoading: wishlist.loading,
    loading: wishlist.loading,
    items: wishlist.items,
    itemIds: wishlist.itemIds,
  }
}
