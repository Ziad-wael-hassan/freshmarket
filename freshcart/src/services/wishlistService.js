import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

/**
 * Wishlist API service
 */
export const wishlistService = {
  /**
   * Get user's wishlist
   * @returns {Promise}
   */
  get: () => axiosInstance.get(API.WISHLIST.GET),

  /**
   * Add product to wishlist
   * @param {string} productId - Product ID
   * @returns {Promise}
   */
  add: (productId) => axiosInstance.post(API.WISHLIST.ADD, { productId }),

  /**
   * Remove product from wishlist
   * @param {string} wishlistItemId - Wishlist item ID
   * @returns {Promise}
   */
  remove: (wishlistItemId) => axiosInstance.delete(API.WISHLIST.REMOVE(wishlistItemId)),
}
