import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

/**
 * Products API service
 */
export const productService = {
  /**
   * Get all products with filtering and pagination
   * @param {object} params - Query parameters
   *   @param {string} params.keyword - Search keyword
   *   @param {string} params.category - Filter by category ID
   *   @param {string} params.brand - Filter by brand ID
   *   @param {number} params.page - Page number
   *   @param {number} params.limit - Items per page
   *   @param {string} params.sort - Sort field (e.g., '-price', 'title')
   * @returns {Promise}
   */
  getAll: (params = {}) => axiosInstance.get(API.PRODUCTS.LIST, { params }),

  /**
   * Get single product by ID
   * @param {string} id - Product ID
   * @returns {Promise}
   */
  getById: (id) => axiosInstance.get(API.PRODUCTS.GET(id)),

  /**
   * Get related products from same category
   * @param {string} categoryId - Category ID
   * @param {number} limit - Number of products to fetch
   * @returns {Promise}
   */
  getRelated: (categoryId, limit = 6) =>
    axiosInstance.get(API.PRODUCTS.LIST, {
      params: { category: categoryId, limit },
    }),
}
