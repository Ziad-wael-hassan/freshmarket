import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCartItems,
  fetchCart,
} from '@/features/cart/cartSlice'
import { useAuth } from '@/context/AuthContext'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  addToLocalCart,
  clearLocalCart,
  getLocalCartCount,
  getLocalCartTotal,
  removeFromLocalCart,
  updateLocalCartQuantity,
} from '@/utils/localCart'
import { normalizeProduct } from '@/utils/apiData'
import { extractErrorMessage } from '@/utils/extractErrorMessage'
import toast from 'react-hot-toast'

const GUEST_CART_KEY = 'freshcart-guest-cart'

const getCartIdentifiers = (value) => {
  if (!value) {
    return { cartItemId: null, fallbackId: null }
  }

  if (typeof value === 'string') {
    return { cartItemId: value, fallbackId: null }
  }

  if (typeof value === 'object') {
    const cartItemId = value._id || value.id || value.cartItemId || value.product?._id || null
    const fallbackId =
      value.product?._id && value.product._id !== cartItemId ? value.product._id : value.productId || null

    return { cartItemId, fallbackId }
  }

  return { cartItemId: null, fallbackId: null }
}

export const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { isAuthenticated } = useAuth()
  const [guestCart] = useLocalStorage(GUEST_CART_KEY, [])

  const guestItems = useMemo(
    () =>
      guestCart.map((item) => {
        const product = normalizeProduct(item.product)

        if (!product?._id) {
          return null
        }

        return {
          _id: product._id,
          product,
          count: item.quantity,
          price: Number(product?.priceAfterDiscount ?? product?.price ?? 0) || 0,
        }
      }).filter(Boolean),
    [guestCart]
  )

  const guestTotalItems = useMemo(() => getLocalCartCount(), [guestCart])
  const guestTotalPrice = useMemo(() => getLocalCartTotal(), [guestCart])

  const addItem = useCallback(
    async (productOrId, quantity = 1) => {
      const requestedQuantity = Number(quantity) > 0 ? Number(quantity) : 1

      if (!isAuthenticated) {
        const product = normalizeProduct(productOrId)

        if (!product?._id) {
          return {
            success: false,
            error: 'Guest cart actions require full product details.',
          }
        }

        addToLocalCart(product, requestedQuantity)
        return { success: true }
      }

      const productId =
        typeof productOrId === 'string' ? productOrId : normalizeProduct(productOrId)?._id

      if (!productId) {
        return { success: false, error: 'Missing product identifier.' }
      }

      try {
        if (requestedQuantity === 1) {
          await dispatch(addToCart(productId)).unwrap()
        } else {
          await Promise.all(
            Array.from({ length: requestedQuantity }, () => dispatch(addToCart(productId)).unwrap())
          )
        }

        return { success: true }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast.error(message)
        return { success: false, error: message }
      }
    },
    [dispatch, isAuthenticated]
  )

  const updateItem = useCallback(
    async (itemOrId, count) => {
      if (!isAuthenticated) {
        const { fallbackId, cartItemId } = getCartIdentifiers(itemOrId)
        const productId = fallbackId || cartItemId

        if (!productId) {
          return { success: false, error: 'Missing cart item identifier.' }
        }

        updateLocalCartQuantity(productId, count)
        return { success: true }
      }

      const { cartItemId, fallbackId } = getCartIdentifiers(itemOrId)

      if (!cartItemId) {
        return { success: false, error: 'Missing cart item identifier.' }
      }

      try {
        await dispatch(updateCartItem({ cartItemId, fallbackId, count })).unwrap()
        return { success: true }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast.error(message)
        return { success: false, error: message }
      }
    },
    [dispatch, isAuthenticated]
  )

  const removeItem = useCallback(
    async (itemOrId) => {
      if (!isAuthenticated) {
        const { fallbackId, cartItemId } = getCartIdentifiers(itemOrId)
        const productId = fallbackId || cartItemId

        if (!productId) {
          return { success: false, error: 'Missing cart item identifier.' }
        }

        removeFromLocalCart(productId)
        return { success: true }
      }

      const { cartItemId, fallbackId } = getCartIdentifiers(itemOrId)

      if (!cartItemId) {
        return { success: false, error: 'Missing cart item identifier.' }
      }

      try {
        await dispatch(removeFromCart({ cartItemId, fallbackId })).unwrap()
        return { success: true }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast.error(message)
        return { success: false, error: message }
      }
    },
    [dispatch, isAuthenticated]
  )

  const clearCart = useCallback(async () => {
    if (!isAuthenticated) {
      clearLocalCart()
      return { success: true }
    }

    try {
      await dispatch(clearCartItems()).unwrap()
      return { success: true }
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return { success: false, error: message }
    }
  }, [dispatch, isAuthenticated])

  const refreshCart = useCallback(() => {
    if (isAuthenticated) {
      dispatch(fetchCart())
    }
  }, [dispatch, isAuthenticated])

  const resolvedItems = isAuthenticated ? cart.items : guestItems
  const resolvedTotalItems = isAuthenticated ? cart.numOfCartItems : guestTotalItems
  const resolvedTotalPrice = isAuthenticated ? cart.totalPrice : guestTotalPrice

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart,
    isLoading: isAuthenticated ? cart.loading : false,
    items: resolvedItems,
    totalPrice: resolvedTotalPrice,
    numOfCartItems: resolvedTotalItems,
    totalItems: resolvedTotalItems,
    cartId: isAuthenticated ? cart.cartId : null,
  }
}
