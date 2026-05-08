import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCartItem, removeFromCart, fetchCart } from '@/features/cart/cartSlice'

export const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const addItem = useCallback(
    async (productId) => {
      try {
        await dispatch(addToCart(productId)).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch]
  )

  const updateItem = useCallback(
    async (itemId, count) => {
      try {
        await dispatch(updateCartItem(itemId, count)).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch]
  )

  const removeItem = useCallback(
    async (itemId) => {
      try {
        await dispatch(removeFromCart(itemId)).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch]
  )

  const refreshCart = useCallback(() => {
    dispatch(fetchCart())
  }, [dispatch])

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    refreshCart,
    isLoading: cart.status === 'loading',
    items: cart.optimisticItems,
    totalPrice: cart.totalPrice,
    totalAfterDiscount: cart.totalAfterDiscount,
    numOfCartItems: cart.numOfCartItems,
  }
}
