import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist, fetchWishlist } from '@/features/wishlist/wishlistSlice'

export const useWishlist = () => {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist)

  const toggleItem = useCallback(
    async (productId) => {
      try {
        await dispatch(toggleWishlist(productId)).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch]
  )

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
    isInWishlist,
    refreshWishlist,
    isLoading: wishlist.status === 'loading',
    items: wishlist.items,
    itemIds: wishlist.itemIds,
  }
}
