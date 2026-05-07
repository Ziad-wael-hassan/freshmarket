import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

/**
 * Brand API service
 */
export const brandService = {
  getAll: () => axiosInstance.get(API.BRANDS.LIST),
  getById: (id) => axiosInstance.get(API.BRANDS.GET(id)),
}
