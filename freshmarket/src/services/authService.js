import axiosInstance from './axiosInstance'
import { API } from '@/constants/api'

/**
 * Authentication API service
 */
export const authService = {
  /**
   * Register new user
   * @param {object} data - { name, email, password, rePassword, phone }
   * @returns {Promise}
   */
  signup: (data) => axiosInstance.post(API.AUTH.SIGNUP, data),

  /**
   * Login user
   * @param {object} data - { email, password }
   * @returns {Promise}
   */
  signin: (data) => axiosInstance.post(API.AUTH.SIGNIN, data),

  /**
   * Request password reset
   * @param {object} data - { email }
   * @returns {Promise}
   */
  forgotPassword: (data) => axiosInstance.post(API.AUTH.FORGOT_PASSWORD, data),

  /**
   * Verify reset code
   * @param {object} data - { resetCode }
   * @returns {Promise}
   */
  verifyResetCode: (data) => axiosInstance.post(API.AUTH.VERIFY_RESET_CODE, data),

  /**
   * Reset password with new password
   * @param {object} data - { email, newPassword }
   * @returns {Promise}
   */
  resetPassword: (data) => axiosInstance.put(API.AUTH.RESET_PASSWORD, data),

  /**
   * Change password (authenticated)
   * @param {object} data - { currentPassword, password, passwordConfirm }
   * @returns {Promise}
   */
  changePassword: (data) => axiosInstance.put(API.USERS.CHANGE_PASSWORD, data),

  /**
   * Update user profile
   * @param {object} data - User data to update
   * @returns {Promise}
   */
  updateProfile: (data) => axiosInstance.put(API.USERS.UPDATE_PROFILE, data),
}
