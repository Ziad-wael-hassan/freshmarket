/**
 * Local Cart utilities for guest users
 * Allows guests to use cart without authentication
 * Cart is stored in localStorage and can be merged after login
 */

const LOCAL_CART_KEY = 'freshcart-guest-cart'

/**
 * Get the local cart from localStorage
 * @returns {Array} Array of cart items
 */
export const getLocalCart = () => {
  try {
    const cart = localStorage.getItem(LOCAL_CART_KEY)
    if (import.meta.env.DEV) {
      console.log('[LocalCart] Retrieved local cart:', cart ? JSON.parse(cart).length : 0, 'items')
    }
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[LocalCart] Error getting local cart:', error)
    }
    return []
  }
}

/**
 * Save the local cart to localStorage
 * @param {Array} items - Array of cart items
 */
export const setLocalCart = (items) => {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items))
    if (import.meta.env.DEV) {
      console.log('[LocalCart] Saved local cart with', items.length, 'items')
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[LocalCart] Error saving local cart:', error)
    }
  }
}

/**
 * Add an item to the local cart
 * @param {Object} product - Product object with at least _id
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {Array} Updated cart items
 */
export const addToLocalCart = (product, quantity = 1) => {
  const cart = getLocalCart()
  const existingIndex = cart.findIndex(item => item.product._id === product._id)
  
  if (existingIndex > -1) {
    // Update quantity of existing item
    cart[existingIndex].quantity += quantity
  } else {
    // Add new item
    cart.push({ product, quantity })
  }
  
  setLocalCart(cart)
  return cart
}

/**
 * Remove an item from the local cart
 * @param {string} productId - ID of the product to remove
 * @returns {Array} Updated cart items
 */
export const removeFromLocalCart = (productId) => {
  const cart = getLocalCart()
  const filteredCart = cart.filter(item => item.product._id !== productId)
  setLocalCart(filteredCart)
  return filteredCart
}

/**
 * Update the quantity of an item in the local cart
 * @param {string} productId - ID of the product
 * @param {number} quantity - New quantity (if 0, removes item)
 * @returns {Array} Updated cart items
 */
export const updateLocalCartQuantity = (productId, quantity) => {
  const cart = getLocalCart()
  
  if (quantity <= 0) {
    return removeFromLocalCart(productId)
  }
  
  const updatedCart = cart.map(item => 
    item.product._id === productId 
      ? { ...item, quantity }
      : item
  )
  
  setLocalCart(updatedCart)
  return updatedCart
}

/**
 * Clear the local cart
 */
export const clearLocalCart = () => {
  localStorage.removeItem(LOCAL_CART_KEY)
  if (import.meta.env.DEV) {
    console.log('[LocalCart] Cleared local cart')
  }
}

/**
 * Get the total number of items in the local cart
 * @returns {number} Total item count
 */
export const getLocalCartCount = () => {
  const cart = getLocalCart()
  return cart.reduce((total, item) => total + item.quantity, 0)
}

/**
 * Get the local cart total price (estimated)
 * @returns {number} Estimated total price
 */
export const getLocalCartTotal = () => {
  const cart = getLocalCart()
  return cart.reduce((total, item) => {
    const price = item.product?.price || 0
    return total + (price * item.quantity)
  }, 0)
}

/**
 * Check if local cart has items
 * @returns {boolean} True if cart has items
 */
export const hasLocalCartItems = () => {
  const cart = getLocalCart()
  return cart.length > 0
}

/**
 * Merge local cart with server cart after login
 * This should be called after successful authentication
 * @param {Function} addToServerCart - Function to add item to server cart
 * @returns {Promise<boolean>} True if merge was successful
 */
export const mergeLocalCartWithServer = async (addToServerCart) => {
  const localCart = getLocalCart()
  
  if (localCart.length === 0) {
    if (import.meta.env.DEV) {
      console.log('[LocalCart] No local cart to merge')
    }
    return true
  }
  
  if (import.meta.env.DEV) {
    console.log('[LocalCart] Merging', localCart.length, 'items to server cart')
  }
  
  try {
    // Add each item to server cart sequentially
    for (const item of localCart) {
      await addToServerCart(item.product._id)
    }
    
    // Clear local cart after successful merge
    clearLocalCart()
    
    if (import.meta.env.DEV) {
      console.log('[LocalCart] Successfully merged cart')
    }
    
    return true
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[LocalCart] Error merging cart:', error)
    }
    return false
  }
}

export default {
  getLocalCart,
  setLocalCart,
  addToLocalCart,
  removeFromLocalCart,
  updateLocalCartQuantity,
  clearLocalCart,
  getLocalCartCount,
  getLocalCartTotal,
  hasLocalCartItems,
  mergeLocalCartWithServer,
}