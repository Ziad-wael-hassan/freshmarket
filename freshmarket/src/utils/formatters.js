/**
 * Format number as currency
 * @param {number} value - Value to format
 * @param {string} currency - Currency code (default: 'EGP')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'EGP') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const formatDate = (date, fallback = '—') => {
  if (!date) return fallback
  const d = new Date(date)
  if (isNaN(d.getTime())) return fallback
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(d)
}

export const formatDateTime = (date, fallback = '—') => {
  if (!date) return fallback
  const d = new Date(date)
  if (isNaN(d.getTime())) return fallback

  return new Intl.DateTimeFormat('en-US', {
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
