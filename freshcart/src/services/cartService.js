import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

/**
 * Cart API service
 */
export const cartService = {
  /**
   * Get user's cart
   * @returns {Promise}
   */
  get: () => axiosInstance.get(API.CART.GET),

  /**
   * Add product to cart
   * @param {string} productId - Product ID
   * @returns {Promise}
   */
  add: (productId) => axiosInstance.post(API.CART.ADD, { productId }),

  /**
   * Update item quantity in cart
   * @param {string} cartItemId - Cart item ID
   * @param {number} count - New quantity
   * @returns {Promise}
   */
  updateQuantity: (cartItemId, count) => axiosInstance.put(API.CART.UPDATE(cartItemId), { count }),

  /**
   * Remove item from cart
   * @param {string} cartItemId - Cart item ID
   * @returns {Promise}
   */
  remove: (cartItemId) => axiosInstance.delete(API.CART.REMOVE(cartItemId)),

  /**
   * Clear entire cart
   * @returns {Promise}
   */
  clear: () => axiosInstance.delete(API.CART.CLEAR),

  /**
   * Apply coupon code
   * @param {string} coupon - Coupon code
   * @returns {Promise}
   */
  applyCoupon: (coupon) => axiosInstance.put(API.CART.APPLY_COUPON, { coupon }),
}
