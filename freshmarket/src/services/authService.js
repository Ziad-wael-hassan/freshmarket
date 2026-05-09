import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

// For Google Auth exchange, we use the local backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

/**
 * Authentication API service (Enhanced with Google Auth Exchange)
 */
export const authService = {
  /**
   * Exchange Firebase ID token for app JWT
   * @param {object} payload - { firebaseToken }
   * @returns {Promise}
   */
  googleAuth: (payload) => axiosInstance.post(`${BACKEND_URL}/auth/google`, payload),

  /**
   * Fetch the currently authenticated user profile
   */
  getProfile: (config = {}) => axiosInstance.get(`${BACKEND_URL}/api/v1/users/profile`, config),

  /**
   * Update user profile
   * @param {object} data - User data to update
   */
  updateProfile: (data) => axiosInstance.put(`${BACKEND_URL}/api/v1/users/updateMe`, data),
}
