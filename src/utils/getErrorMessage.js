/**
 * Extract and format error message from API response
 * @param {Error} error - Error object from API call
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  // API error response with custom message
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  // API error with validation errors object
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors
    const firstError = Array.isArray(errors)
      ? errors[0]?.message || errors[0]
      : Object.values(errors)[0]?.message || Object.values(errors)[0]
    return firstError || 'Validation error occurred'
  }

  // Network errors
  if (error.message === 'Network Error') {
    return 'No internet connection. Please check your network.'
  }

  // Request timeout
  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.'
  }

  // Axios specific errors
  if (error.message === 'Request cancelled') {
    return 'Request was cancelled'
  }

  // Generic fallback
  return error.message || 'Something went wrong. Please try again.'
}

/**
 * Handle error in a standardized way
 * @param {Error} error - Error object
 * @returns {object} Standardized error object
 */
export const handleError = (error) => {
  const message = getErrorMessage(error)
  const statusCode = error.response?.status || null
  const data = error.response?.data || null

  return {
    message,
    statusCode,
    data,
    isNetworkError: error.message === 'Network Error',
    isValidationError: error.response?.data?.errors !== undefined,
  }
}
