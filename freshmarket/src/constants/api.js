/**
 * API endpoint constants
 */

export const API = {
  // Auth endpoints
  AUTH: {
    SIGNUP: '/api/v1/auth/signup',
    SIGNIN: '/api/v1/auth/signin',
    FORGOT_PASSWORD: '/api/v1/auth/forgotPasswords',
    VERIFY_RESET_CODE: '/api/v1/auth/verifyResetCode',
    RESET_PASSWORD: '/api/v1/auth/resetPassword',
  },

  // Users endpoints
  USERS: {
    PROFILE: '/api/v1/users/profile',
    UPDATE_PROFILE: '/api/v1/users/updateMe',
    CHANGE_PASSWORD: '/api/v1/users/changeMyPassword',
  },

  // Products endpoints
  PRODUCTS: {
    LIST: '/api/v1/products',
    GET: (id) => `/api/v1/products/${id}`,
  },

  // Categories endpoints
  CATEGORIES: {
    LIST: '/api/v1/categories',
    GET: (id) => `/api/v1/categories/${id}`,
  },

  // Brands endpoints
  BRANDS: {
    LIST: '/api/v1/brands',
    GET: (id) => `/api/v1/brands/${id}`,
  },

  // Cart endpoints
  CART: {
    GET: '/api/v1/cart',
    ADD: '/api/v1/cart',
    UPDATE: (id) => `/api/v1/cart/${id}`,
    REMOVE: (id) => `/api/v1/cart/${id}`,
    CLEAR: '/api/v1/cart',
    APPLY_COUPON: '/api/v1/cart/applyCoupon',
  },

  // Wishlist endpoints
  WISHLIST: {
    GET: '/api/v1/wishlist',
    ADD: '/api/v1/wishlist',
    REMOVE: (id) => `/api/v1/wishlist/${id}`,
  },

  // Orders endpoints
  ORDERS: {
    CASH_ORDER: (cartId) => `/api/v1/orders/${cartId}`,
    ONLINE_ORDER: (cartId) => `/api/v1/orders/checkout-session/${cartId}`,
    USER_ORDERS: (userId) => `/api/v1/orders/user/${userId}`,
    GET: (id) => `/api/v1/orders/${id}`,
  },
}

/**
 * Route paths constants
 */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  CATEGORIES: '/categories',
  CATEGORY_PRODUCTS: (id) => `/categories/${id}`,
  BRANDS: '/brands',
  BRAND_PRODUCTS: (id) => `/brands/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_CART: (cartId) => `/checkout/${cartId}`,
  WISHLIST: '/wishlist',
  ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NOT_FOUND: '*',
}
