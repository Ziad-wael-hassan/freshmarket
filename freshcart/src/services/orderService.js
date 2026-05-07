import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

/**
 * Orders API service
 */
export const orderService = {
  /**
   * Create cash order
   * @param {string} cartId - Cart ID
   * @param {object} shippingAddress - Shipping address payload
   * @returns {Promise}
   */
  cashOrder: (cartId, shippingAddress) =>
    axiosInstance.post(API.ORDERS.CASH_ORDER(cartId), { shippingAddress }),

  /**
   * Create online order and redirect session
   * @param {string} cartId - Cart ID
   * @param {object} shippingAddress - Shipping address payload
   * @returns {Promise}
   */
  onlineOrder: (cartId, shippingAddress) =>
    axiosInstance.post(
      API.ORDERS.ONLINE_ORDER(cartId),
      { shippingAddress },
      {
        params: { url: window.location.origin },
      }
    ),

  /**
   * Fetch orders for user
   * @param {string} userId - User ID
   * @returns {Promise}
   */
  getUserOrders: (userId) => axiosInstance.get(API.ORDERS.USER_ORDERS(userId)),

  /**
   * Get single order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise}
   */
  getOrder: (orderId) => axiosInstance.get(API.ORDERS.GET(orderId)),
}
