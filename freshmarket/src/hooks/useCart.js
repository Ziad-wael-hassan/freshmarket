import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCartItems,
  fetchCart,
} from '@/features/cart/cartSlice'

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
    async (productId, count) => {
      try {
        await dispatch(updateCartItem({ productId, count })).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch]
  )

  const removeItem = useCallback(
    async (productId) => {
      try {
        await dispatch(removeFromCart(productId)).unwrap()
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },
    [dispatch]
  )

  const clearCart = useCallback(async () => {
    try {
      await dispatch(clearCartItems()).unwrap()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }, [dispatch])

  const refreshCart = useCallback(() => {
    dispatch(fetchCart())
  }, [dispatch])

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart,
    isLoading: cart.loading,
    items: cart.items,
    totalPrice: cart.totalPrice,
    numOfCartItems: cart.numOfCartItems,
    totalItems: cart.numOfCartItems,
    cartId: cart.cartId,
  }
}
