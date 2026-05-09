import axiosInstance from './axiosInstance'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
const BASE_PATH = `${BACKEND_URL}/api/v1/wishlist`

/**
 * Wishlist API service (Migrated to custom backend)
 */
export const wishlistService = {
  /**
   * Get user's wishlist
   */
  get: () => axiosInstance.get(BASE_PATH),

  /**
   * Add product to wishlist
   * @param {object} product - Product details { productId, title, image, price, ... }
   */
  add: (product) => axiosInstance.post(BASE_PATH, product),

  /**
   * Remove product from wishlist
   * @param {string} productId - Product ID
   */
  remove: (productId) => axiosInstance.delete(`${BASE_PATH}/${productId}`),
}
