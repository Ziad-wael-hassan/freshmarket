/**
 * Extract a human-readable error message from an API error object.
 * Used across all async hooks for consistent user-facing error messages.
 * @param {Error|object} error - Error from axios or a thunk
 * @returns {string} User-friendly error message
 */
export const extractErrorMessage = (error) => {
  if (!error) return 'Something went wrong. Please try again.'

  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors
    const firstError = Array.isArray(errors)
      ? errors[0]?.message || errors[0]
      : Object.values(errors)[0]?.message || Object.values(errors)[0]
    return firstError || 'Validation error occurred'
  }

  if (error.message === 'Network Error') {
    return 'No internet connection. Please check your network.'
  }

  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.'
  }

  if (error.message === 'Request cancelled') {
    return 'Request was cancelled'
  }

  return error.message || 'Something went wrong. Please try again.'
}