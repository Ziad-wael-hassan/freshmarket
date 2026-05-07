/**
 * Format number as currency
 * @param {number} value - Value to format
 * @param {string} currency - Currency code (default: 'EGP')
 * @param {string} locale - Locale string (default: 'ar-EG')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'EGP', locale = 'ar-EG') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale string (default: 'ar-EG')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'ar-EG') => {
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale string (default: 'ar-EG')
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, locale = 'ar-EG') => {
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (!text) return ''
  return text.length > length ? `${text.slice(0, length)}...` : text
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (!num) return '0'
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
