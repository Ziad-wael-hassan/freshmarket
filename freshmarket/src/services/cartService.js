import axiosInstance from './axiosInstance'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
const BASE_PATH = `${BACKEND_URL}/api/v1/cart`

/**
 * Cart API service (Migrated to custom backend)
 */
export const cartService = {
  /**
   * Get user's cart
   */
  get: () => axiosInstance.get(BASE_PATH),

  /**
   * Add product to cart
   * @param {object} product - Product details { productId, title, image, price }
   */
  add: (product) => axiosInstance.post(BASE_PATH, product),

  /**
   * Update item quantity in cart
   * @param {string} productId - Product ID
   * @param {number} count - New quantity
   */
  updateQuantity: (productId, count) => axiosInstance.put(`${BASE_PATH}/${productId}`, { count }),

  /**
   * Remove item from cart
   * @param {string} productId - Product ID
   */
  remove: (productId) => axiosInstance.delete(`${BASE_PATH}/${productId}`),

  /**
   * Clear entire cart
   */
  clear: () => axiosInstance.delete(BASE_PATH),
}
