import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

/**
 * Category API service
 */
export const categoryService = {
  getAll: () => axiosInstance.get(API.CATEGORIES.LIST),
  getById: (id) => axiosInstance.get(API.CATEGORIES.GET(id)),
}
