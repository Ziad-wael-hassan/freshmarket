# 🛒 FreshCart — Portfolio-Level E-Commerce Application
### Product Requirements Document & Full Implementation Plan

> **Version:** 1.0  
> **Stack:** React + Vite + React Router v6 + Axios + Tailwind CSS v3 + Framer Motion + React Hook Form + Zod + Redux Toolkit  
> **API Base URL:** `https://ecommerce.routemisr.com`  
> **Design Reference:** FreshCart Figma  
> **Target:** Production-quality portfolio project that demonstrates senior frontend engineering skills

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Tooling](#2-tech-stack--tooling)
3. [Folder Structure](#3-folder-structure)
4. [Authentication & Security System](#4-authentication--security-system)
5. [API Service Layer](#5-api-service-layer)
6. [State Management Architecture](#6-state-management-architecture)
7. [Routing Architecture](#7-routing-architecture)
8. [Pages & Features Breakdown](#8-pages--features-breakdown)
9. [UI/UX Design System](#9-uiux-design-system)
10. [Animations & Motion System](#10-animations--motion-system)
11. [Performance Optimization](#11-performance-optimization)
12. [Custom Hooks Reference](#12-custom-hooks-reference)
13. [Reusable Components Library](#13-reusable-components-library)
14. [Dark Mode System](#14-dark-mode-system)
15. [Error Handling Strategy](#15-error-handling-strategy)
16. [SEO & Accessibility](#16-seo--accessibility)
17. [Implementation Phases (Roadmap)](#17-implementation-phases-roadmap)
18. [Environment Variables](#18-environment-variables)
19. [Deployment](#19-deployment)
20. [What Makes This Stand Out](#20-what-makes-this-stand-out)

---

## 1. Project Overview

### Goal
Build a **production-level React e-commerce SPA** based on the FreshCart design with significant enhancements in DX, UX, performance, and architecture that make it portfolio-worthy and differentiated from typical bootcamp clones.

### Key Differentiators vs. a Basic Clone
| Basic Clone | This Project |
|-------------|--------------|
| No loading states | Skeleton loaders everywhere |
| Hardcoded logic | Feature-based architecture with clean separation |
| No animation | Framer Motion page transitions + scroll reveals |
| Basic auth | JWT + interceptors + auto-logout + token refresh logic |
| No dark mode | Persistent dark mode with system preference detection |
| No error handling | Full error boundary + toast + empty state system |
| Inline API calls | API service layer with Axios instances |
| Context only | Redux Toolkit (cart/wishlist) + Context (auth/theme) |
| No search | Debounced search + filter + sort + pagination |
| Poor mobile UX | Fully responsive + smooth mobile nav + bottom sheet modals |

### Core Features
- **Auth:** Register, Login, Forgot/Reset Password, JWT persistence, auto-logout
- **Products:** Listing, filtering, sorting, search, pagination, detail page
- **Cart:** Full cart management, quantity updates, coupon codes, checkout
- **Wishlist:** Add/remove, sync with cart, persisted per user
- **Orders:** Place order (online & cash), order history, order details
- **Categories & Brands:** Landing, browse by category/brand
- **Profile:** User info, address management, change password

---

## 2. Tech Stack & Tooling

### Core
```
react@18                  → UI framework
vite@5                    → Build tool (fast HMR, ESM)
react-router-dom@6        → Routing (data router)
axios@1                   → HTTP client with interceptors
tailwindcss@3             → Utility-first CSS
```

### State Management
```
@reduxjs/toolkit          → Cart, Wishlist, UI state
react-redux               → React bindings
redux-persist             → Persist cart/wishlist to localStorage
```

### Forms & Validation
```
react-hook-form@7         → Form state management
zod@3                     → Schema validation
@hookform/resolvers       → Bridge between RHF and Zod
```

### Animation
```
framer-motion@11          → Page transitions, scroll animations, micro-interactions
```

### UI Utilities
```
react-hot-toast           → Toast notification system
react-helmet-async        → Dynamic <head> / SEO
react-intersection-observer → Scroll reveal trigger
@radix-ui/react-dialog    → Accessible modal system
@radix-ui/react-select    → Accessible select/dropdown
lucide-react              → Icon system (consistent, tree-shakeable)
swiper                    → Hero + product carousels
```

### Dev Tooling
```
eslint + @eslint/react    → Linting
prettier                  → Code formatting
husky + lint-staged       → Pre-commit hooks
```

---

## 3. Folder Structure

```
freshcart/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── main.jsx                    # App entry — providers wrapping
│   ├── App.jsx                     # Router definition
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── animations/             # Lottie JSON files if used
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Tooltip.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── ProgressBar.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   └── ScrollProgress.jsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCardSkeleton.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   ├── ProductSort.jsx
│   │   │   └── ProductSearch.jsx
│   │   │
│   │   ├── cart/
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── GuestRoute.jsx
│   │   │
│   │   └── common/
│   │       ├── PageTransition.jsx
│   │       ├── ScrollReveal.jsx
│   │       ├── LazyImage.jsx
│   │       └── Pagination.jsx
│   │
│   ├── features/                   # Feature-based Redux slices
│   │   ├── cart/
│   │   │   ├── cartSlice.js
│   │   │   └── cartThunks.js
│   │   ├── wishlist/
│   │   │   ├── wishlistSlice.js
│   │   │   └── wishlistThunks.js
│   │   └── ui/
│   │       └── uiSlice.js          # Drawer open state, modal state, etc.
│   │
│   ├── context/
│   │   ├── AuthContext.jsx         # JWT user state
│   │   └── ThemeContext.jsx        # Dark mode state
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Categories.jsx
│   │   ├── CategoryProducts.jsx
│   │   ├── Brands.jsx
│   │   ├── BrandProducts.jsx
│   │   ├── Profile.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   └── NotFound.jsx
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useWishlist.js
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   ├── useScrollDirection.js
│   │   ├── useScrollProgress.js
│   │   ├── useMediaQuery.js
│   │   ├── useClickOutside.js
│   │   └── useIntersectionObserver.js
│   │
│   ├── services/                   # API service layer
│   │   ├── axiosInstance.js        # Axios config + interceptors
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   ├── wishlistService.js
│   │   ├── orderService.js
│   │   ├── categoryService.js
│   │   └── brandService.js
│   │
│   ├── store/
│   │   ├── index.js                # Redux store + redux-persist config
│   │   └── rootReducer.js
│   │
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── formatDate.js
│   │   ├── truncateText.js
│   │   ├── getErrorMessage.js
│   │   ├── tokenUtils.js           # Decode JWT, check expiry
│   │   └── cn.js                   # Tailwind className merge utility
│   │
│   ├── constants/
│   │   ├── routes.js               # Route path constants
│   │   ├── queryKeys.js            # React Query cache keys (if used)
│   │   └── api.js                  # API endpoint constants
│   │
│   ├── validations/                # Zod schemas
│   │   ├── authSchemas.js
│   │   ├── checkoutSchema.js
│   │   └── profileSchema.js
│   │
│   └── styles/
│       ├── globals.css             # Tailwind base + custom CSS vars
│       └── animations.css          # CSS keyframes if not in Framer
│
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 4. Authentication & Security System

### JWT Flow Overview
```
User Login/Register
      ↓
  API returns token
      ↓
  Store token in localStorage
      ↓
  Decode token → extract user data + expiry
      ↓
  Set token in Axios default headers
      ↓
  On every app load → check token validity
      ↓
  If expired → clear token + redirect to /login
```

### `AuthContext.jsx` — Full Spec

```jsx
// State shape
const authState = {
  user: null,              // { _id, name, email, phone, role }
  token: null,             // raw JWT string
  isAuthenticated: false,
  isLoading: true,         // true while validating on app boot
}

// Context methods
const authContext = {
  login(token),            // store token, decode user, set axios header
  logout(),                // clear token, reset state, redirect
  updateUser(userData),    // update profile info without re-login
}
```

### Auto Login on App Boot
On `main.jsx` load:
1. Read token from `localStorage`
2. Use `tokenUtils.isTokenValid(token)` — check `exp` claim
3. If valid → call `login(token)` to hydrate auth state
4. If expired → call `logout()` silently
5. Show a global loading spinner until this check completes

### `tokenUtils.js`
```js
// Decode JWT payload (base64)
export const decodeToken = (token) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

// Check if token expiry time has passed
export const isTokenValid = (token) => {
  if (!token) return false
  const { exp } = decodeToken(token)
  return Date.now() < exp * 1000
}

// Get remaining time in ms
export const getTokenExpiry = (token) => {
  const { exp } = decodeToken(token)
  return exp * 1000 - Date.now()
}
```

### Auto Logout on Token Expiry
```js
// In AuthContext, after login():
useEffect(() => {
  if (!token) return
  const remaining = getTokenExpiry(token)
  const timer = setTimeout(() => {
    logout()
    toast.error('Session expired. Please log in again.')
  }, remaining)
  return () => clearTimeout(timer)
}, [token])
```

### Axios Interceptors — `axiosInstance.js`
```js
// REQUEST interceptor: attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// RESPONSE interceptor: handle 401/403
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid server-side → force logout
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### Protected & Guest Routes

**`ProtectedRoute.jsx`** — Requires authentication
```jsx
// If not authenticated → redirect to /login
// Passes `returnUrl` in location state so user is sent back after login
```

**`GuestRoute.jsx`** — Blocks authenticated users
```jsx
// If authenticated → redirect to /
// Used on Login, Register, Forgot Password pages
```

### Form Validation — Zod Schemas

```js
// authSchemas.js

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(8, 'Minimum 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  rePassword: z.string(),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
}).refine(data => data.password === data.rePassword, {
  message: 'Passwords do not match',
  path: ['rePassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8),
})
```

### Auth API Endpoints
```
POST /api/v1/auth/signup       → Register
POST /api/v1/auth/signin       → Login
POST /api/v1/auth/forgotPasswords  → Request reset code
POST /api/v1/auth/verifyResetCode  → Verify OTP
PUT  /api/v1/auth/resetPassword    → Set new password
PUT  /api/v1/users/changeMyPassword → Change password (auth required)
PUT  /api/v1/users/updateMe         → Update profile (auth required)
```

---

## 5. API Service Layer

### `axiosInstance.js`
```js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptors attached here (see section 4)
export default axiosInstance
```

### `productService.js`
```js
export const productService = {
  getAll: (params) => axiosInstance.get('/api/v1/products', { params }),
  // params: { limit, page, keyword, sort, category, brand }

  getById: (id) => axiosInstance.get(`/api/v1/products/${id}`),

  getRelated: (categoryId) =>
    axiosInstance.get('/api/v1/products', {
      params: { category: categoryId, limit: 6 },
    }),
}
```

### `cartService.js`
```js
export const cartService = {
  get: ()                  => axiosInstance.get('/api/v1/cart'),
  add: (productId)         => axiosInstance.post('/api/v1/cart', { productId }),
  updateQty: (id, count)   => axiosInstance.put(`/api/v1/cart/${id}`, { count }),
  remove: (id)             => axiosInstance.delete(`/api/v1/cart/${id}`),
  clear: ()                => axiosInstance.delete('/api/v1/cart'),
  applyCoupon: (coupon)    => axiosInstance.put('/api/v1/cart/applyCoupon', { coupon }),
}
```

### `wishlistService.js`
```js
export const wishlistService = {
  get: ()           => axiosInstance.get('/api/v1/wishlist'),
  add: (productId)  => axiosInstance.post('/api/v1/wishlist', { productId }),
  remove: (id)      => axiosInstance.delete(`/api/v1/wishlist/${id}`),
}
```

### `orderService.js`
```js
export const orderService = {
  cashOrder: (cartId, shippingAddress) =>
    axiosInstance.post(`/api/v1/orders/${cartId}`, { shippingAddress }),
  onlineOrder: (cartId, shippingAddress) =>
    axiosInstance.post(`/api/v1/orders/checkout-session/${cartId}`, { shippingAddress }, {
      params: { url: window.location.origin },
    }),
  getUserOrders: (userId) =>
    axiosInstance.get(`/api/v1/orders/user/${userId}`),
}
```

---

## 6. State Management Architecture

### Decision: Hybrid Approach
| Concern | Solution | Why |
|---------|----------|-----|
| Auth user/token | Context API | Simple, no persistence needed beyond localStorage |
| Dark mode | Context API | Simple global toggle |
| Cart data | Redux Toolkit + redux-persist | Complex updates, optimistic UI, persisted |
| Wishlist | Redux Toolkit + redux-persist | Synced across pages, persisted |
| UI state (drawers, modals) | Redux Toolkit (uiSlice) | Accessible from anywhere |
| Server data (products, orders) | Local component state + custom hooks | Keeps it simple without React Query |

### Cart Slice Shape
```js
{
  cartId: null,
  items: [],               // [{ product, count, price }]
  totalPrice: 0,
  totalAfterDiscount: 0,
  numOfCartItems: 0,
  appliedCoupon: null,
  status: 'idle',          // 'idle' | 'loading' | 'updating' | 'error'
  optimisticItems: [],     // used during optimistic updates
}
```

### Optimistic UI Pattern for Cart
When a user increases quantity:
1. **Immediately** update `optimisticItems` in Redux
2. Fire the API call in the background
3. If success → replace with real server data
4. If failure → revert `optimisticItems` and show error toast

### Wishlist Slice Shape
```js
{
  items: [],               // [{ _id, title, price, imageCover, ... }]
  itemIds: [],             // Set of product IDs for O(1) lookup
  status: 'idle',
}
```

### `store/index.js`
```js
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist'],   // only persist these
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
```

---

## 7. Routing Architecture

### Route Definitions
```jsx
// App.jsx — using createBrowserRouter (Data Router API)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,          // Navbar + Footer + ScrollProgress
    children: [
      { index: true,       element: <Home /> },
      { path: 'products',  element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'categories', element: <Categories /> },
      { path: 'categories/:id', element: <CategoryProducts /> },
      { path: 'brands',    element: <Brands /> },
      { path: 'brands/:id', element: <BrandProducts /> },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'cart',          element: <Cart /> },
          { path: 'checkout/:cartId', element: <Checkout /> },
          { path: 'orders',        element: <Orders /> },
          { path: 'orders/:id',    element: <OrderDetail /> },
          { path: 'wishlist',      element: <Wishlist /> },
          { path: 'profile',       element: <Profile /> },
        ],
      },
    ],
  },

  // Guest routes (redirect if authenticated)
  {
    element: <GuestRoute />,
    children: [
      { path: 'login',          element: <Login /> },
      { path: 'register',       element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },

  { path: '*', element: <NotFound /> },
])
```

### Lazy-Loaded Routes
```jsx
// All page components are lazy-loaded
const Home         = lazy(() => import('./pages/Home'))
const Products     = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
// ... etc.

// Wrapped in Suspense with a page-level skeleton
<Suspense fallback={<PageLoader />}>
  <Outlet />
</Suspense>
```

---

## 8. Pages & Features Breakdown

### 8.1 Home Page
**Sections:**
1. **Hero carousel** — Featured categories with Swiper + autoplay + smooth transitions
2. **Featured Categories strip** — Horizontally scrollable, animated on entry
3. **Featured Products grid** — 8 products, skeleton on load, add-to-cart inline
4. **Promotional banner** — Full-width CTA section
5. **Best Sellers section** — Scroll-reveal cards

**Enhancements:**
- Hero slides animate in from the side with Framer Motion
- Category cards have scale + shadow on hover
- Product cards show wishlist heart icon on hover
- "Add to Cart" button has loading spinner while API is in flight

---

### 8.2 Products Listing Page

**URL Structure:** `/products?page=1&sort=-price&keyword=milk&category=xxx`

**Features:**
- Search bar with 500ms debounced input
- Filter sidebar (by category, brand, price range, rating)
- Sort select (Price Low-High, High-Low, Newest, Top Rated)
- Pagination (query param-based, URL stays shareable)
- 20 products per page
- Responsive: sidebar becomes a bottom sheet on mobile

**Filter State:**
```js
const [filters, setFilters] = useState({
  keyword: '',
  category: '',
  brand: '',
  sort: '-createdAt',
  page: 1,
  limit: 20,
})
```

**URL Sync:** `useSearchParams()` hook syncs filters to URL so the page is bookmarkable and shareable.

---

### 8.3 Product Detail Page

**Sections:**
1. Breadcrumb
2. Image gallery (main image + thumbnail row)
3. Product info (title, brand, price, rating stars, sold count)
4. Quantity selector + Add to Cart
5. Wishlist toggle
6. Description tab
7. Related products horizontal scroll

**Enhancements:**
- Image gallery with smooth Framer Motion crossfade on thumbnail click
- Quantity selector with animated counter
- "In Cart" state shown with a green checkmark
- Sticky Add-to-Cart bar on mobile when scrolling past the fold

---

### 8.4 Cart Page

**Features:**
- Cart items with image, name, price, quantity controls
- Remove item with confirm (animated removal)
- Coupon code input with validation feedback
- Order summary with original price, discount, total
- "Proceed to Checkout" CTA
- Empty cart state with illustration + CTA to shop

**Optimistic Update:**
- Quantity changes are reflected immediately in UI
- API call fires in background
- On fail: revert + toast error

---

### 8.5 Checkout Page

**Steps:**
1. **Shipping Address** form (name, city, phone, details)
2. **Payment Method** selection (Cash / Credit Card)
3. **Order Summary** preview
4. **Place Order** CTA

**Payment:**
- **Cash on Delivery:** call `/orders/:cartId` → redirect to order success page
- **Online Payment:** call `/orders/checkout-session/:cartId` → redirect to Stripe session URL (provided by API)

**Validation:** Zod schema validates all fields before submission

---

### 8.6 Wishlist Page

**Features:**
- Grid of wishlisted products
- Remove from wishlist (animated card exit)
- "Add to Cart" directly from wishlist
- Empty state if no items

---

### 8.7 Orders History Page

**Features:**
- List of orders with order ID, date, total, status badge
- Click to expand order detail
- Status color-coding: Pending (amber), Paid (green), Delivered (blue)

---

### 8.8 Auth Pages

**Login:**
- Email + password
- Show/hide password toggle
- Remember Me checkbox
- Link to forgot password
- Animated form entry

**Register:**
- Name, email, phone, password, confirm password
- Real-time Zod validation per field
- Password strength indicator bar
- Terms acceptance checkbox

**Forgot Password (3 steps on one route):**
- Step 1: Enter email → send reset code
- Step 2: Enter 6-digit OTP code
- Step 3: Enter new password + confirm

**UX Detail:** Multi-step form uses local state machine (`'email' | 'otp' | 'reset'`) with animated step transitions.

---

### 8.9 Profile Page

**Sections:**
- Avatar (initials-based avatar with gradient)
- Edit profile form (name, email, phone)
- Change password form (current + new + confirm)
- Saved addresses

---

### 8.10 Categories & Brands Pages

- Grid layout with category/brand image cards
- Clicking navigates to filtered product listing
- Animated card grid with stagger entry

---

### 8.11 Not Found (404) Page

**Design:**
- Large animated "404" text
- Friendly message
- "Go Home" and "Browse Products" CTAs
- Animated illustration or floating elements

---

## 9. UI/UX Design System

### Color Tokens (Tailwind Config)
```js
// tailwind.config.js
colors: {
  primary: {
    50:  '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',  // FreshCart green
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
  surface: {
    DEFAULT: '#ffffff',
    dark: '#0f172a',        // dark mode background
  },
  muted: {
    DEFAULT: '#f8fafc',
    dark: '#1e293b',        // dark mode card background
  }
}
```

### Typography
```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

/* Syne → Headings (distinctive, editorial) */
/* DM Sans → Body (clean, modern, readable) */
```

### Spacing & Layout
- Container max-width: `1280px`, centered with `px-4 md:px-8`
- Grid: 2 cols mobile → 3 cols tablet → 4 cols desktop for products
- Card padding: `p-4` consistently
- Section spacing: `py-16` between sections

### Component Variants Pattern (Button example)
```jsx
// Button.jsx using `class-variance-authority` (cva)
const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 ring-primary-500',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95',
        outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
        ghost:   'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        danger:  'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'h-8  px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)
```

### Skeleton Loaders
Every data-fetching component has a corresponding skeleton:
```jsx
// ProductCardSkeleton.jsx
<div className="animate-pulse rounded-xl overflow-hidden">
  <div className="h-48 bg-gray-200 dark:bg-gray-700" />
  <div className="p-4 space-y-2">
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
  </div>
</div>
```

### Toast System
Using `react-hot-toast` with custom styling:
```jsx
// main.jsx
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: isDark ? '#1e293b' : '#fff',
      color: isDark ? '#f8fafc' : '#0f172a',
      border: '1px solid',
      borderColor: isDark ? '#334155' : '#e2e8f0',
    },
    success: { iconTheme: { primary: '#22c55e' } },
    error: { iconTheme: { primary: '#ef4444' } },
  }}
/>
```

### Empty States
Each empty state has:
- Relevant illustration (SVG inline)
- Descriptive heading
- Helpful subtext
- Primary CTA

Examples:
- Empty Cart: "Your cart is empty" → "Start Shopping" button
- Empty Wishlist: "Nothing saved yet" → "Explore Products" button
- No Search Results: "No products found" → "Clear Filters" button

### Navbar Behavior
- **Scrolled past 80px:** background transitions to solid white/dark + shadow
- **Scroll direction up:** navbar slides back in (hidden on scroll down)
- Cart icon shows animated badge with item count
- Mobile: hamburger → slide-in drawer nav
- Sticky scroll progress bar underneath navbar

---

## 10. Animations & Motion System

### Page Transitions
```jsx
// PageTransition.jsx
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

// Wrap every page with AnimatePresence in App.jsx
<AnimatePresence mode="wait">
  <motion.div key={location.pathname} {...pageVariants}>
    <Outlet />
  </motion.div>
</AnimatePresence>
```

### Scroll Reveal (Stagger)
```jsx
// ScrollReveal.jsx — uses useInView from react-intersection-observer
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
```

### Product Card Hover
```jsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  className="rounded-xl shadow-md hover:shadow-xl transition-shadow"
>
```

### Cart Drawer
```jsx
// Slides in from the right
const drawerVariants = {
  closed: { x: '100%', transition: { type: 'tween', duration: 0.3 } },
  open:   { x: 0,      transition: { type: 'spring', damping: 30, stiffness: 300 } },
}
```

### Cart Item Removal
```jsx
// AnimatePresence wraps cart items list
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.product._id}
      layout
      exit={{ opacity: 0, x: 40, height: 0 }}
      transition={{ duration: 0.25 }}
    >
      <CartItem item={item} />
    </motion.div>
  ))}
</AnimatePresence>
```

### Add to Cart Button State
```jsx
// Button cycles through: idle → loading → success → idle
const [state, setState] = useState('idle') // 'idle' | 'loading' | 'success'

// On success: show checkmark for 1.5s then reset
```

### Scroll Progress Bar
```jsx
// ScrollProgress.jsx
const { scrollYProgress } = useScroll()
// Framer Motion scaleX on a fixed top bar
<motion.div
  style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
  className="fixed top-0 left-0 right-0 h-0.5 bg-primary-500 z-50 origin-left"
/>
```

### Number Counter Animation
```jsx
// For cart totals and prices — animate from old value to new value
import { useSpring, animated } from 'framer-motion'
```

---

## 11. Performance Optimization

### Code Splitting
- All routes are `lazy()`-loaded
- Heavy components (e.g. Swiper, Recharts if used) are split

### Image Optimization
- Lazy loading via `loading="lazy"` attribute + `LazyImage.jsx` wrapper
- `BlurDataURL` placeholder using a 10px blurred thumbnail
- Proper `width` and `height` to prevent layout shift (CLS)

### Memoization
```jsx
// ProductCard is memo'd — only re-renders if product data or wishlist state changes
const ProductCard = React.memo(({ product }) => { ... })

// Filter/sort derived data is useMemo'd
const filteredProducts = useMemo(
  () => applyFilters(products, filters),
  [products, filters]
)
```

### Debounced Search
```js
// useDebounce.js
export const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
```

### API Call Deduplication
- Products list is NOT fetched on every page visit if data is fresh (<5 min)
- Cart is fetched once on auth and updated locally (optimistic) after

### Bundle Size
```js
// vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor:  ['react', 'react-dom', 'react-router-dom'],
        motion:  ['framer-motion'],
        redux:   ['@reduxjs/toolkit', 'react-redux'],
        ui:      ['swiper', 'react-hot-toast'],
      }
    }
  }
}
```

---

## 12. Custom Hooks Reference

| Hook | Purpose |
|------|---------|
| `useAuth()` | Access auth context (user, login, logout, isAuthenticated) |
| `useCart()` | Cart actions (add, remove, update) + cart state from Redux |
| `useWishlist()` | Toggle wishlist item, check if item is wishlisted |
| `useDebounce(value, delay)` | Debounce any value (for search) |
| `useLocalStorage(key, initial)` | Sync state to localStorage |
| `useScrollDirection()` | Returns `'up' \| 'down'` — used for Navbar hide behavior |
| `useScrollProgress()` | Returns scroll progress 0–1 — for progress bar |
| `useMediaQuery(query)` | Returns boolean for responsive JS logic |
| `useClickOutside(ref, handler)` | Trigger callback when clicking outside element |
| `useIntersectionObserver(ref, options)` | Returns `inView` boolean for scroll animations |
| `useProducts(params)` | Fetches products, handles loading/error state |
| `useProduct(id)` | Fetches single product by ID |
| `useCategories()` | Fetches all categories |
| `useBrands()` | Fetches all brands |
| `useOrders()` | Fetches user's orders |

---

## 13. Reusable Components Library

### `<Button variant size isLoading disabled />`
- Variants: primary, outline, ghost, danger
- Shows spinner when `isLoading={true}`
- Disabled state prevents double-clicks during API calls

### `<Input label name error register />`
- Integrated with React Hook Form `register`
- Shows red border + error message below on validation failure
- Animated error message entry with Framer Motion

### `<Skeleton width height className />`
- Pulse animation variant
- Used for any data that is loading

### `<Modal isOpen onClose title children footer />`
- Built on Radix UI Dialog for accessibility
- Animated entry with Framer Motion scale + fade
- Closes on backdrop click or Escape key
- Focus-trapping for keyboard users

### `<EmptyState icon title description cta />`
- Consistent empty state across the app

### `<Pagination page totalPages onChange />`
- Page number buttons + prev/next
- Ellipsis for large page counts
- URL param synced

### `<LazyImage src alt className placeholder />`
- Fade in when loaded
- Blur placeholder while loading
- Error fallback image

### `<ProductCard product />`
- Shows: image, brand, name, price, rating, "Add to Cart" button
- Wishlist heart overlaid on image
- Hover: card lifts, action buttons appear
- "In Cart" visual state

### `<Rating value count />`
- Star icons with partial fill support
- Shows average + total count

### `<Badge variant />`
- Variants: success, warning, error, info
- Used for order status labels

### `<ScrollReveal children delay />`
- Wraps any content in scroll-triggered animation

---

## 14. Dark Mode System

### Implementation
```jsx
// ThemeContext.jsx
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage('theme', () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### Tailwind Config
```js
// tailwind.config.js
darkMode: 'class',  // toggle via .dark class on <html>
```

### Usage Pattern
```jsx
// All components use dark: variant
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
```

### Toggle Button (Navbar)
```jsx
<motion.button
  whileTap={{ scale: 0.9 }}
  onClick={toggle}
  aria-label="Toggle dark mode"
>
  {isDark ? <Sun /> : <Moon />}
</motion.button>
```

---

## 15. Error Handling Strategy

### Hierarchy of Error Handling

1. **Field-level:** Zod validation in forms (inline under each input)
2. **Request-level:** Axios response handling in service layer
3. **Component-level:** Error state UI when API call fails
4. **Page-level:** Error boundary with "Try Again" button
5. **Global-level:** 401 interceptor forces logout

### `getErrorMessage.js` Utility
```js
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message
  if (error.response?.data?.errors) {
    return Object.values(error.response.data.errors)[0]
  }
  if (error.message === 'Network Error') return 'No internet connection'
  if (error.code === 'ECONNABORTED') return 'Request timed out'
  return 'Something went wrong. Please try again.'
}
```

### Error Toast Pattern
```js
// In any async action:
try {
  await cartService.add(productId)
  toast.success('Added to cart!')
} catch (error) {
  toast.error(getErrorMessage(error))
}
```

### Error State Component
```jsx
<ErrorState
  title="Failed to load products"
  message={errorMessage}
  onRetry={refetch}
/>
```

---

## 16. SEO & Accessibility

### Dynamic Page Titles
```jsx
// Every page uses react-helmet-async
<Helmet>
  <title>{product.title} — FreshCart</title>
  <meta name="description" content={product.description.slice(0, 155)} />
  <meta property="og:title" content={product.title} />
  <meta property="og:image" content={product.imageCover} />
</Helmet>
```

### Accessibility Checklist
- [ ] All interactive elements have `aria-label` or visible text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Focus visible on all keyboard-navigable elements
- [ ] Modal focus-trapping via Radix UI
- [ ] Form inputs have associated `<label>` elements
- [ ] Images have meaningful `alt` text
- [ ] Loading states announce to screen readers via `aria-live`
- [ ] Skip to main content link at top of page
- [ ] Cart badge announces count changes: `aria-label="Cart, 3 items"`

### Keyboard Navigation
- Navbar items fully navigable with Tab/Enter
- Cart drawer closeable with Escape
- Modal closeable with Escape
- Product cards support Enter to navigate

---

## 17. Implementation Phases (Roadmap)

### Phase 1 — Foundation (Week 1)
- [ ] Vite + React project setup
- [ ] Tailwind CSS + dark mode config
- [ ] Folder structure scaffolding
- [ ] Axios instance + interceptors
- [ ] AuthContext + JWT utilities
- [ ] Protected/Guest routes
- [ ] Navbar + Footer + Layout components
- [ ] Scroll progress bar
- [ ] Toast system setup
- [ ] Dark mode toggle

### Phase 2 — Auth Pages (Week 1-2)
- [ ] Login page with form validation
- [ ] Register page with password strength
- [ ] Forgot Password multi-step flow
- [ ] Reset Password page
- [ ] Auto-login on app boot
- [ ] Auto-logout on token expiry

### Phase 3 — Products (Week 2)
- [ ] Home page with skeleton loaders
- [ ] Hero carousel (Swiper)
- [ ] Featured categories section
- [ ] Product card component
- [ ] Products listing page
- [ ] Debounced search
- [ ] Filter sidebar
- [ ] Sort dropdown
- [ ] Pagination
- [ ] Product detail page
- [ ] Image gallery
- [ ] Related products

### Phase 4 — Cart & Wishlist (Week 3)
- [ ] Redux Toolkit store setup
- [ ] Cart slice + thunks
- [ ] Wishlist slice + thunks
- [ ] Cart drawer (slide-in)
- [ ] Cart page
- [ ] Optimistic cart updates
- [ ] Coupon code functionality
- [ ] Wishlist page

### Phase 5 — Checkout & Orders (Week 3-4)
- [ ] Checkout page
- [ ] Shipping address form
- [ ] Payment method selection
- [ ] Cash order flow
- [ ] Online payment redirect
- [ ] Order success page
- [ ] Orders history page
- [ ] Order detail page

### Phase 6 — Animations & Polish (Week 4)
- [ ] Framer Motion page transitions
- [ ] Scroll reveal animations on all sections
- [ ] Product card hover animations
- [ ] Cart item add/remove animations
- [ ] Auth form step animations
- [ ] Loading animations
- [ ] 404 page

### Phase 7 — Performance & SEO (Week 5)
- [ ] Lazy-load all routes
- [ ] Memoize heavy components
- [ ] Image lazy loading
- [ ] Dynamic meta tags (react-helmet-async)
- [ ] Bundle analysis + optimization
- [ ] Lighthouse audit target: 90+ score

### Phase 8 — QA & Deployment (Week 5)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit
- [ ] Error handling edge cases
- [ ] Deploy to Vercel
- [ ] Custom domain (optional)
- [ ] README + Demo GIF for portfolio

---

## 18. Environment Variables

```bash
# .env
VITE_API_BASE_URL=https://ecommerce.routemisr.com

# .env.example  (commit this, not .env)
VITE_API_BASE_URL=
```

---

## 19. Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**`vercel.json`** for SPA routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Build Config
```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false,
  },
  resolve: {
    alias: { '@': '/src' },   // clean imports: import { X } from '@/components/ui'
  },
})
```

---

## 20. What Makes This Stand Out

### For Recruiters / Senior Devs Reviewing the Code

1. **Architecture** — Feature-based folder structure, separation of concerns (services / hooks / slices / pages), clean naming
2. **Auth sophistication** — Auto-logout timer, interceptors, token validation on boot — not just "store token in localStorage"
3. **Optimistic UI** — Cart updates feel instant; failure reverts gracefully
4. **Animation quality** — Framer Motion is used purposefully (page transitions, scroll reveals, micro-interactions) — not random bouncing
5. **Form UX** — React Hook Form + Zod with real-time per-field validation, not just on-submit alerts
6. **Dark mode** — Persisted, system-preference-aware, applied via CSS class (no flash)
7. **Accessibility** — Radix UI primitives, keyboard nav, ARIA attributes
8. **Performance** — Code splitting, lazy routes, memoized components, debounced search
9. **Error resilience** — Every error case is handled gracefully with user-facing feedback
10. **URL-driven state** — Filters/sort/page are in URL query params (bookmarkable, shareable)

### Live Demo Checklist (What to Show)
- [ ] Open on mobile — fully responsive, smooth mobile nav
- [ ] Toggle dark mode — instant, no flash
- [ ] Search products — debounced, URL updates
- [ ] Filter by category + sort — URL stays shareable
- [ ] Add to cart — button animates, cart count badge updates, drawer slides in
- [ ] Wishlist toggle — heart animates, persisted on refresh
- [ ] Checkout with Cash — order confirmed, cart clears
- [ ] Profile → change password
- [ ] Refresh page while logged in — stays logged in (auto-login)
- [ ] Wait for token to expire — auto-logout with toast message

---

## Appendix A — API Quick Reference

| Feature | Method | Endpoint |
|---------|--------|----------|
| Register | POST | `/api/v1/auth/signup` |
| Login | POST | `/api/v1/auth/signin` |
| Forgot Password | POST | `/api/v1/auth/forgotPasswords` |
| Verify OTP | POST | `/api/v1/auth/verifyResetCode` |
| Reset Password | PUT | `/api/v1/auth/resetPassword` |
| Get All Products | GET | `/api/v1/products` |
| Get Product | GET | `/api/v1/products/:id` |
| Get Categories | GET | `/api/v1/categories` |
| Get Brands | GET | `/api/v1/brands` |
| Get Cart | GET | `/api/v1/cart` |
| Add to Cart | POST | `/api/v1/cart` |
| Update Cart Item | PUT | `/api/v1/cart/:id` |
| Remove Cart Item | DELETE | `/api/v1/cart/:id` |
| Apply Coupon | PUT | `/api/v1/cart/applyCoupon` |
| Get Wishlist | GET | `/api/v1/wishlist` |
| Add to Wishlist | POST | `/api/v1/wishlist` |
| Remove Wishlist | DELETE | `/api/v1/wishlist/:id` |
| Cash Order | POST | `/api/v1/orders/:cartId` |
| Online Order | POST | `/api/v1/orders/checkout-session/:cartId` |
| Get User Orders | GET | `/api/v1/orders/user/:userId` |
| Update Profile | PUT | `/api/v1/users/updateMe` |
| Change Password | PUT | `/api/v1/users/changeMyPassword` |

---

## Appendix B — Package.json (Core Dependencies)

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "axios": "^1.7.2",
    "framer-motion": "^11.3.0",
    "react-hook-form": "^7.52.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "@reduxjs/toolkit": "^2.2.7",
    "react-redux": "^9.1.2",
    "redux-persist": "^6.0.0",
    "react-hot-toast": "^2.4.1",
    "react-helmet-async": "^2.0.5",
    "react-intersection-observer": "^9.13.0",
    "swiper": "^11.1.9",
    "lucide-react": "^0.427.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-select": "^2.1.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^3.4.9",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "eslint": "^9.9.0",
    "prettier": "^3.3.3"
  }
}
```

---

*Built with intention. Every detail matters. This is not a tutorial project — it's a portfolio statement.*

# 🛒 FreshCart PRD — Addendum v2
### Missing UI/UX Specs from Figma Reverse Engineering

> **Purpose:** This file extends the main PRD (`FreshCart_PRD_Implementation_Plan.md`) with all missing UI/UX specifications, interaction details, and advanced features identified from the Figma reverse-engineering document. Read this alongside the main PRD — do not build without both.

---

## Table of Contents

1. [Navbar — Missing Enhancements](#1-navbar--missing-enhancements)
2. [Hero Section — Full Spec](#2-hero-section--full-spec)
3. [Categories Section — Card Spec](#3-categories-section--card-spec)
4. [Product Card — Missing Interactions](#4-product-card--missing-interactions)
5. [Product Detail — Missing Features](#5-product-detail--missing-features)
6. [Form UX — Floating Labels & Password Strength](#6-form-ux--floating-labels--password-strength)
7. [Micro-Interactions — Full Catalog](#7-micro-interactions--full-catalog)
8. [Dark Mode — Transition Animation](#8-dark-mode--transition-animation)
9. [Global App Loader](#9-global-app-loader)
10. [Advanced / Premium Features](#10-advanced--premium-features)
11. [Checkout — Step Indicator](#11-checkout--step-indicator)
12. [Animated Counters](#12-animated-counters)
13. [Typography Alternatives](#13-typography-alternatives)
14. [UX Quality Commandments](#14-ux-quality-commandments)
15. [Updated Folder Structure Additions](#15-updated-folder-structure-additions)
16. [Updated Roadmap Additions](#16-updated-roadmap-additions)

---

## 1. Navbar — Missing Enhancements

### 1.1 Sticky Navbar with Blur Effect

The main PRD covers scroll direction hide/show behavior. What's missing is the visual treatment on scroll:

```jsx
// Navbar.jsx — scroll-aware className
const { scrollY } = useScrollPosition() // from useScrollProgress hook

const navbarClass = cn(
  'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
  scrollY > 80
    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50'
    : 'bg-white dark:bg-gray-900'
)
```

**Behavior Detail:**
- Below 80px scroll → plain solid background
- Above 80px → `backdrop-blur-md` + semi-transparent bg + subtle border
- Transition is smooth (300ms ease)
- Dark mode uses dark semi-transparent equivalent

---

### 1.2 Cart Preview Dropdown (Mini Cart)

A hover/click mini-cart should appear from the cart icon. This is a **distinct component from the CartDrawer** — it's a compact preview.

**Trigger:** Click on cart icon in navbar (not hover — avoids accidental opens on mobile)

**`CartPreviewDropdown.jsx` — Spec:**

```
┌──────────────────────────────────┐
│  Your Cart (3 items)        ✕   │
├──────────────────────────────────┤
│  [img] Product Name              │
│        $12.99        Qty: 2  🗑  │
├──────────────────────────────────┤
│  [img] Product Name              │
│        $8.50         Qty: 1  🗑  │
├──────────────────────────────────┤
│  Total: $34.48                   │
│  [View Cart]    [Checkout →]     │
└──────────────────────────────────┘
```

**Implementation:**
```jsx
// Framer Motion — drop down from navbar
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.15 } },
}
```

**Rules:**
- Max 3 items visible, rest shows scroll
- "View Cart" → navigates to `/cart`
- "Checkout →" → navigates to `/checkout/:cartId`
- Empty state: "Your cart is empty 🛒" with a shop CTA
- Closes on click outside (`useClickOutside` hook)
- Closes on `Escape` key
- Does NOT appear on mobile — mobile always opens full CartDrawer

---

### 1.3 Search — Suggestions Dropdown

The main PRD covers debounced search. Missing: the **visual suggestions dropdown**.

**`SearchDropdown.jsx` — Spec:**

```
┌──────────────────────────────────┐
│ 🕐 Recent Searches               │
│    milk          organic bread   │
├──────────────────────────────────┤
│ 🔍 Suggestions for "org"         │
│    Organic Milk                  │
│    Organic Bread                 │
│    Organic Cheese                │
├──────────────────────────────────┤
│ Press Enter to search all        │
└──────────────────────────────────┘
```

**Behavior:**
- Appears when search input is focused AND has value ≥ 2 chars
- Recent searches pulled from `localStorage` (max 5 stored)
- Live suggestions come from debounced API call to `/api/v1/products?keyword=X&limit=5`
- Each suggestion is keyboard-navigable (↑↓ arrows, Enter to select)
- Clicking a suggestion navigates to `/products?keyword=X`
- Recent searches cleared via "Clear" button
- Loading indicator: small spinner inside the search input right icon slot

**Storing Recent Searches:**
```js
// utils/recentSearches.js
const KEY = 'freshcart_recent_searches'
const MAX = 5

export const getRecentSearches = () =>
  JSON.parse(localStorage.getItem(KEY) || '[]')

export const addRecentSearch = (term) => {
  const existing = getRecentSearches().filter(s => s !== term)
  const updated = [term, ...existing].slice(0, MAX)
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export const clearRecentSearches = () =>
  localStorage.removeItem(KEY)
```

---

## 2. Hero Section — Full Spec

The main PRD mentions a hero carousel. Missing: the detailed **two-column layout spec** and **animation details**.

### 2.1 Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   LEFT COLUMN (55%)          RIGHT COLUMN (45%)     │
│                                                     │
│   [Tagline — bold, large]    [Product/banner image] │
│   [Subtext — muted]          (animated float)       │
│   [Shop Now CTA]                                    │
│   [Secondary CTA]                                   │
│                                                     │
│   ● ○ ○  (slide dots)                               │
└─────────────────────────────────────────────────────┘
```

**Mobile:** Stacks vertically. Image moves above text.

### 2.2 Hero Animation Sequence

On each slide entry, animate in this order:
1. Background color fades in (150ms)
2. Tagline text slides up + fades in (300ms, delay 0ms)
3. Subtext fades in (300ms, delay 100ms)
4. CTA buttons scale in (300ms, delay 200ms)
5. Product image slides in from right + fades (400ms, delay 0ms)

```jsx
// Hero text container stagger
const heroTextVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const heroItemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}
```

### 2.3 Floating Product Image Effect

The hero product image should gently float up and down:
```jsx
// Floating animation on hero image
<motion.img
  animate={{ y: [0, -12, 0] }}
  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
  src={slide.image}
  alt={slide.title}
/>
```

### 2.4 Parallax Background

Use `useScroll` + `useTransform` to apply subtle parallax on the hero section background:
```jsx
const { scrollYProgress } = useScroll()
const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%'])

<motion.div style={{ y: bgY }} className="absolute inset-0 hero-bg" />
```

---

## 3. Categories Section — Card Spec

### 3.1 Card Structure
```
┌─────────────────┐
│                 │
│   [Category     │  ← image, aspect-square, object-cover
│    Image]       │
│                 │
├─────────────────┤
│  Category Name  │  ← centered, semibold, 14px
│  XX Products    │  ← muted, 12px
└─────────────────┘
```

### 3.2 Hover Interaction — Full Detail

This was only partially described in the original PRD. Full spec:

```jsx
<motion.div
  whileHover="hover"
  initial="rest"
  animate="rest"
  className="rounded-2xl overflow-hidden cursor-pointer"
>
  {/* Image wrapper — clips the zoom */}
  <div className="overflow-hidden aspect-square">
    <motion.img
      variants={{
        rest:  { scale: 1 },
        hover: { scale: 1.08, transition: { duration: 0.4, ease: 'easeOut' } },
      }}
      src={category.image}
    />
  </div>

  {/* Card container elevation */}
  <motion.div
    variants={{
      rest:  { boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
      hover: { boxShadow: '0 12px 30px rgba(0,0,0,0.12)', y: -2 },
    }}
    transition={{ duration: 0.3 }}
  />
</motion.div>
```

**Rules:**
- Image zooms **inside the card bounds** (parent has `overflow-hidden`)
- Card slightly elevates (y: -2px) on hover
- Shadow deepens smoothly
- NO sudden jumps — all eased

---

## 4. Product Card — Missing Interactions

### 4.1 Quick Action Buttons on Hover

On desktop hover, two overlay buttons appear on the product image:

```
┌────────────────────────┐
│  ❤ Wishlist  👁 Quick  │  ← appear on hover, fade+slide up from bottom of image
│                        │
│   [Product Image]      │
│                        │
└────────────────────────┘
│  Brand Name            │
│  Product Title         │
│  ★★★★☆  (4.2)         │
│  $12.99                │
│  [+ Add to Cart]       │
└────────────────────────┘
```

```jsx
// Quick action overlay — appears on card hover
<motion.div
  variants={{
    rest:  { opacity: 0, y: 8 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }}
  className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 px-3"
>
  <button aria-label="Add to wishlist">❤</button>
  <button aria-label="Quick view">👁</button>
</motion.div>
```

### 4.2 Image Zoom on Card Hover

Same pattern as categories — the product image zooms in slightly while clipped:
```jsx
// inside ProductCard.jsx
<div className="overflow-hidden rounded-t-xl aspect-[4/3]">
  <motion.img
    variants={{
      rest:  { scale: 1 },
      hover: { scale: 1.06 },
    }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    src={product.imageCover}
    loading="lazy"
  />
</div>
```

### 4.3 Flying Product to Cart Animation

When "Add to Cart" is clicked, an image of the product "flies" from the card to the cart icon in the navbar. This is the signature micro-interaction.

**Implementation approach:**
```jsx
// 1. On add-to-cart click, get the product image's getBoundingClientRect()
// 2. Get the cart icon's getBoundingClientRect()
// 3. Create a floating clone element absolutely positioned at product coords
// 4. Animate it via Framer Motion to the cart icon's coords
// 5. On animation complete: remove clone, update cart badge with pop animation

// CartFlyAnimation.jsx — portal-rendered flying image
const flyToCart = (productImageRef, cartIconRef, imageSrc) => {
  const from = productImageRef.current.getBoundingClientRect()
  const to   = cartIconRef.current.getBoundingClientRect()

  // Render animated clone via portal at document.body level
  // Motion: from { x: from.x, y: from.y, scale: 1, opacity: 1 }
  //         to   { x: to.x,   y: to.y,   scale: 0.1, opacity: 0 }
  // Duration: 0.6s, ease: easeIn (accelerates toward cart)
}
```

**Note:** This is an **optional enhancement** but adds significant wow-factor. Implement after core cart works. Use a React Portal to render the flying element above all other z-indexes.

---

## 5. Product Detail — Missing Features

### 5.1 Image Zoom on Hover

The product gallery main image should support zoom on hover:

```jsx
// Approach: CSS transform origin at cursor position
// onMouseMove → calculate cursor position relative to image
// Apply scale(1.5) with transform-origin at cursor

const handleMouseMove = (e) => {
  const { left, top, width, height } = imgRef.current.getBoundingClientRect()
  const x = ((e.clientX - left) / width) * 100
  const y = ((e.clientY - top) / height) * 100
  setTransformOrigin(`${x}% ${y}%`)
  setIsZoomed(true)
}
```

**CSS:**
```css
.zoom-image {
  transition: transform 0.1s ease;
  transform-origin: var(--origin-x) var(--origin-y);
}
.zoom-image:hover {
  transform: scale(1.5);
  cursor: crosshair;
}
```

### 5.2 Stock Status Indicator

Below the product title, show a live stock badge:

```jsx
// Stock status mapping
const stockStatus = {
  inStock:     { label: 'In Stock',     color: 'text-green-600 bg-green-50' },
  lowStock:    { label: 'Only 3 left!', color: 'text-amber-600 bg-amber-50' },
  outOfStock:  { label: 'Out of Stock', color: 'text-red-600   bg-red-50'   },
}

// quantity > 5 → inStock
// quantity 1-5 → lowStock
// quantity === 0 → outOfStock
```

### 5.3 Reviews Section

Below the product description, render a reviews section:

```
★★★★☆  4.2 out of 5
─────────────────────────────
5★ ████████████░░  75%
4★ ██████░░░░░░░░  40%
3★ ███░░░░░░░░░░░  20%
2★ █░░░░░░░░░░░░░  8%
1★ █░░░░░░░░░░░░░  5%
```

**Note:** The Route API may not return reviews. If no reviews endpoint exists, render a placeholder UI with a "Be the first to review" CTA. Do NOT fake review data.

### 5.4 Sticky Add-to-Cart Bar (Mobile)

On mobile, when the user scrolls past the main product info section, a sticky bar appears at the bottom:

```
┌────────────────────────────────────┐
│  $12.99    [−] 2 [+]  [Add to Cart]│  ← fixed at bottom, safe area padding
└────────────────────────────────────┘
```

```jsx
// useIntersectionObserver on the main CTA section
// When main CTA is OUT of viewport → show sticky bar
// When main CTA is IN viewport → hide sticky bar
// Animate: slide up from bottom (y: 80 → 0)
```

---

## 6. Form UX — Floating Labels & Password Strength

### 6.1 Floating Label Input

Inputs should use the **floating label pattern** — the label starts inside the input and floats above when focused or filled:

```jsx
// FloatingInput.jsx
const FloatingInput = ({ label, name, type, register, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue,  setHasValue]  = useState(false)
  const isFloating = isFocused || hasValue

  return (
    <div className="relative">
      <input
        {...register(name)}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(!!e.target.value)
        }}
        className={cn(
          'peer w-full border rounded-xl px-4 pt-6 pb-2 outline-none transition-all',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
          error ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
        )}
        {...props}
      />

      {/* Floating Label */}
      <motion.label
        animate={{
          y: isFloating ? -10 : 0,
          scale: isFloating ? 0.78 : 1,
          color: isFocused ? '#0AAD0A' : '#6b7280',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute left-4 top-4 origin-left pointer-events-none"
      >
        {label}
      </motion.label>

      {/* Error message — animated */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1 ml-1"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Animated bottom border accent */}
      <motion.div
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 origin-left rounded-full"
      />
    </div>
  )
}
```

### 6.2 Password Strength Indicator

On the Register page, below the password field, show a strength bar:

```
Strength: [████████░░░░] Strong
```

```js
// utils/passwordStrength.js
export const getPasswordStrength = (password) => {
  let score = 0
  if (password.length >= 8)           score++
  if (/[A-Z]/.test(password))         score++
  if (/[a-z]/.test(password))         score++
  if (/[0-9]/.test(password))         score++
  if (/[^A-Za-z0-9]/.test(password))  score++

  return {
    score,      // 0–5
    label: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][score],
    color: ['bg-red-500', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'][score],
  }
}
```

```jsx
// PasswordStrengthBar.jsx
const { score, label, color } = getPasswordStrength(watchedPassword)

<div className="mt-2 space-y-1">
  <div className="flex gap-1">
    {[1,2,3,4,5].map(i => (
      <motion.div
        key={i}
        animate={{ opacity: i <= score ? 1 : 0.2 }}
        className={cn('h-1 flex-1 rounded-full transition-all', i <= score ? color : 'bg-gray-200')}
      />
    ))}
  </div>
  <p className="text-xs text-gray-500">{label}</p>
</div>
```

### 6.3 Show/Hide Password Toggle

```jsx
// Inside password input wrapper
<button
  type="button"
  onClick={() => setShowPassword(p => !p)}
  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
  aria-label={showPassword ? 'Hide password' : 'Show password'}
>
  <AnimatePresence mode="wait">
    {showPassword
      ? <motion.span key="hide" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><EyeOff size={16} /></motion.span>
      : <motion.span key="show" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Eye size={16} /></motion.span>
    }
  </AnimatePresence>
</button>
```

---

## 7. Micro-Interactions — Full Catalog

The main PRD covers some micro-interactions. This section is the **definitive complete list**.

### 7.1 Button Press Feedback
```jsx
// All buttons: scale down 3% on tap/click
<motion.button whileTap={{ scale: 0.97 }} whileHover={{ brightness: 1.05 }}>
```

### 7.2 Wishlist Heart Animation
```jsx
// Heart icon — bounces on toggle, fills with color
const heartVariants = {
  idle:   { scale: 1 },
  tap:    { scale: [1, 1.4, 0.9, 1.1, 1], transition: { duration: 0.4 } },
}

// Color transition: gray → red (filled)
// Use framer-motion animate={{ color: isWishlisted ? '#ef4444' : '#9ca3af' }}
```

### 7.3 Cart Badge Count Update
```jsx
// When item count changes, badge pops
<motion.span
  key={count}                         // key change triggers re-animation
  initial={{ scale: 1.6, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
  className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full"
>
  {count}
</motion.span>
```

### 7.4 Quantity Selector Counter
```jsx
// When quantity number changes, the number animates out-up and in-up
<AnimatePresence mode="wait">
  <motion.span
    key={quantity}
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0,  opacity: 1 }}
    exit={{    y: -10, opacity: 0 }}
    transition={{ duration: 0.15 }}
  >
    {quantity}
  </motion.span>
</AnimatePresence>
```

### 7.5 Toast Entry Animation (Custom Styling)
```js
// react-hot-toast custom enter/exit via className
// Slide in from right, slide out to right
toast.custom((t) => (
  <motion.div
    initial={{ x: 80, opacity: 0 }}
    animate={t.visible ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
    className="bg-white dark:bg-gray-800 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3"
  >
    {/* icon + message */}
  </motion.div>
))
```

### 7.6 Page Loading Progress Bar (NProgress-style)
A thin green line at the very top of the viewport that fills during route transitions:
```jsx
// Use the ScrollProgress component already planned, but also
// trigger a fake "loading" animation during lazy route Suspense
// Start on navigation intent, complete when component mounts
```

### 7.7 Add to Cart Button State Machine
```
idle → loading → success → idle (after 1.5s)

idle:     [+ Add to Cart]           (green, normal)
loading:  [⟳ Adding...]             (green, spinner, disabled)
success:  [✓ Added!]                (green checkmark, briefly)
```

```jsx
const [state, setState] = useState('idle') // 'idle' | 'loading' | 'success'

const handleAddToCart = async () => {
  setState('loading')
  try {
    await cartService.add(product._id)
    dispatch(fetchCart())
    setState('success')
    setTimeout(() => setState('idle'), 1500)
    toast.success('Added to cart!')
  } catch (err) {
    setState('idle')
    toast.error(getErrorMessage(err))
  }
}
```

### 7.8 Input Focus Ring Animation
```jsx
// Animated ring expands from 0 on focus using ring-offset
className="transition-all duration-200 focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-0"
// The ring visually "blooms" outward — Tailwind's transition handles this
```

### 7.9 Skeleton Shimmer Direction
Default Tailwind `animate-pulse` is opacity-based. For a more premium feel, use a shimmer sweep:
```css
/* globals.css */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Dark mode */
.dark .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #1e293b 25%,
    #334155 50%,
    #1e293b 75%
  );
  background-size: 200% 100%;
}
```

---

## 8. Dark Mode — Transition Animation

The main PRD covers the toggle logic. Missing: the **visual transition animation** when switching themes.

### 8.1 Smooth Color Interpolation
```css
/* globals.css — apply to root */
:root {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

/* But NOT for images or transforms — would slow layout */
*, *::before, *::after {
  transition-property: background-color, color, border-color, box-shadow;
  transition-duration: 0.25s;
  transition-timing-function: ease;
}
```

**IMPORTANT:** Only transition color-related properties. Never add `transition: all` — this causes performance issues on scroll.

### 8.2 Toggle Button Animation
```jsx
// Sun/Moon icon morphs on toggle
<motion.div
  animate={{ rotate: isDark ? 0 : 180, scale: [0.6, 1] }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {isDark ? <Sun size={18} /> : <Moon size={18} />}
</motion.div>
```

### 8.3 No Flash on Initial Load (FOUC Prevention)
Inject a blocking script in `index.html` BEFORE React loads to set the dark class synchronously:
```html
<!-- index.html — inside <head>, BEFORE any scripts -->
<script>
  (function() {
    const theme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  })()
</script>
```

---

## 9. Global App Loader

### 9.1 Full-Screen Loader

Displayed during:
- Initial app boot while validating JWT token
- Any global async gate before the app becomes interactive

```jsx
// AppLoader.jsx
const AppLoader = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-[9999]">
    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <img src="/logo.svg" alt="FreshCart" className="w-32" />
    </motion.div>

    {/* Loading dots */}
    <div className="flex gap-2 mt-6">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary-500"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  </div>
)
```

**Usage in `main.jsx`:**
```jsx
const { isLoading } = useAuth()

// Show AppLoader while auth is being validated
if (isLoading) return <AppLoader />
```

### 9.2 Route-Level Page Skeleton (Suspense Fallback)

When a lazy route chunk is loading, show a generic page skeleton instead of a blank screen:

```jsx
// PageLoader.jsx — used as Suspense fallback
const PageLoader = () => (
  <div className="container mx-auto px-4 py-8">
    {/* Simulates a product grid page skeleton */}
    <div className="h-8 w-48 skeleton-shimmer rounded-lg mb-8" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
)
```

---

## 10. Advanced / Premium Features

These were listed in the Figma PRD as "Optional Premium Features." Here is the **full implementation spec** for each.

### 10.1 Recently Viewed Products

**Where it appears:** Bottom of Product Detail page — "Recently Viewed" horizontal scroll strip.

**Implementation:**
```js
// utils/recentlyViewed.js
const KEY = 'freshcart_recently_viewed'
const MAX = 10

export const addRecentlyViewed = (product) => {
  const existing = getRecentlyViewed().filter(p => p._id !== product._id)
  const updated = [product, ...existing].slice(0, MAX)
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export const getRecentlyViewed = () =>
  JSON.parse(localStorage.getItem(KEY) || '[]')
```

Call `addRecentlyViewed(product)` inside `useEffect` when `ProductDetail` mounts.

**UI:** Horizontal scroll row of mini product cards. Visible on product detail page after the main content.

---

### 10.2 Quick View Modal

**Trigger:** "Quick View" button that appears on product card hover (see section 4.1).

**Modal Content:**
```
┌────────────────────────────────────────────────┐
│                                          ✕     │
│  [Product Image]    Product Title              │
│                     ★★★★☆  4.2                │
│                     $12.99 / kg                │
│                     Brief description...       │
│                                                │
│                     [−] 1 [+]                  │
│                     [Add to Cart]              │
│                     [View Full Details →]      │
└────────────────────────────────────────────────┘
```

**Implementation:**
```jsx
// uiSlice.js — add quickView state
quickView: {
  isOpen: false,
  productId: null,
}

// QuickViewModal.jsx
// Uses Radix UI Dialog
// Fetches product by ID when opened
// Shows skeleton while loading
// Full add-to-cart + wishlist functionality
```

**Animation:** Scale in from 0.9 → 1 with fade, backdrop blur.

---

### 10.3 Infinite Scroll (Alternative to Pagination)

On the `/products` page, offer infinite scroll as a UX mode. Detect when the user is near the bottom of the page and auto-fetch the next page.

```jsx
// useInfiniteProducts.js
const useInfiniteProducts = (filters) => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Intersection Observer on a sentinel div at bottom of list
  const sentinelRef = useRef()
  useIntersectionObserver(sentinelRef, {
    onIntersect: () => {
      if (hasMore && !isLoadingMore) fetchMore()
    }
  })

  // ...
}
```

**Loading state:** Show 4 `ProductCardSkeleton` items at the bottom while next page loads.

**Note:** Decide between pagination and infinite scroll at implementation time. Infinite scroll is better for mobile UX; pagination is better for performance and URL shareability. The recommended approach is **pagination with a "Load More" button** — best of both worlds.

---

### 10.4 Search Suggestions with Highlighted Matching Text

When showing search suggestions, highlight the matching portion of the product name:

```jsx
// HighlightMatch.jsx
const HighlightMatch = ({ text, query }) => {
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="bg-primary-100 text-primary-700 not-italic">{part}</mark>
          : part
      )}
    </span>
  )
}
```

---

### 10.5 Animated Counters

For any number that changes (cart total, product sold count, order total), animate it rolling up/down to the new value.

```jsx
// hooks/useAnimatedNumber.js
import { useSpring, animated } from 'framer-motion'

// Simple approach: animate the number display
const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    spring.set(value)
  }, [value])

  return (
    <animated.span>
      {spring.to(v => `${prefix}${v.toFixed(2)}${suffix}`)}
    </animated.span>
  )
}

// Usage:
// <AnimatedNumber value={cartTotal} prefix="$" />
// <AnimatedNumber value={soldCount} suffix=" sold" />
```

---

### 10.6 Compare Products (Optional)

Allow users to select up to 3 products and compare them side-by-side.

**UI:**
- Checkbox or "Compare" button on each product card
- Sticky comparison bar at the bottom of screen when 1+ products selected
- Clicking "Compare" opens a comparison table modal

**State:**
```js
// compareSlice.js
{
  products: [],  // max 3 product objects
  isBarVisible: false,
}
```

**Comparison Table:**
```
                Product A   Product B   Product C
Price           $12.99      $8.50       $15.00
Brand           Brand X     Brand Y     Brand Z
Rating          4.2 ★       3.8 ★       4.7 ★
Category        Dairy       Bakery      Dairy
Sold            1200        850         2100
```

**Note:** This is the most complex optional feature. Skip it if timeline is tight. Include it if you want maximum portfolio impact.

---

## 11. Checkout — Step Indicator

The main PRD has the 3-step checkout flow but is missing the **visual step progress indicator**.

### 11.1 Step Indicator Component

```
①────────②────────③
Shipping  Payment  Confirm
```

```jsx
// CheckoutStepper.jsx
const steps = ['Shipping', 'Payment', 'Confirm']

const CheckoutStepper = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-10">
    {steps.map((step, i) => (
      <React.Fragment key={step}>
        {/* Step circle */}
        <motion.div
          animate={{
            backgroundColor: i < currentStep ? '#0AAD0A' : i === currentStep ? '#0AAD0A' : '#e5e7eb',
            scale: i === currentStep ? 1.15 : 1,
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm relative z-10"
        >
          {i < currentStep
            ? <Check size={16} />          // completed — checkmark
            : i + 1                        // pending/active — number
          }
        </motion.div>

        {/* Step label */}
        <span className={cn(
          'absolute mt-14 text-xs font-medium',
          i <= currentStep ? 'text-primary-600' : 'text-gray-400'
        )}>
          {step}
        </span>

        {/* Connector line */}
        {i < steps.length - 1 && (
          <div className="flex-1 h-0.5 mx-2 relative overflow-hidden bg-gray-200">
            <motion.div
              animate={{ scaleX: i < currentStep ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 bg-primary-500 origin-left"
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
)
```

### 11.2 Step Transition Animation

When moving between steps, the form content transitions:
```jsx
// Slide left when advancing, slide right when going back
const direction = newStep > currentStep ? 1 : -1

const stepVariants = {
  enter:  { x:    50 * direction, opacity: 0 },
  center: { x: 0,                  opacity: 1 },
  exit:   { x:   -50 * direction, opacity: 0 },
}
```

---

## 12. Animated Counters

For the **Home page stats section** (if added as a premium section), animate numbers counting up when they enter the viewport.

### 12.1 Stats Section
```
┌──────────┬──────────┬──────────┬──────────┐
│  50,000+ │  5,000+  │  1,000+  │  100+    │
│ Customers│ Products │ Brands   │ Cities   │
└──────────┴──────────┴──────────┴──────────┘
```

### 12.2 Count-Up Hook
```js
// hooks/useCountUp.js
export const useCountUp = (target, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView && startOnView) return
    let startTime
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(easeOutQuart(progress) * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return { count, ref }
}

const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4)
```

---

## 13. Typography Alternatives

The main PRD uses **Syne + DM Sans**. The Figma PRD specifies **Inter or Public Sans**.

### Decision Guide:

| Choice | When to Use | Feel |
|--------|-------------|------|
| **Syne + DM Sans** (main PRD) | For a more editorial, distinctive portfolio look | Modern, editorial, stands out |
| **Inter** | If matching the Figma design closer | Clean, neutral, familiar |
| **Public Sans** | Government/utility aesthetic | Functional, serious |
| **Plus Jakarta Sans + Inter** | ⭐ Recommended balance | Friendly + clean, great for e-commerce |

### Recommended Pairing for Portfolio Impact:
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');

/* CSS Variables */
:root {
  --font-display: 'Plus Jakarta Sans', sans-serif;  /* Headings, CTAs */
  --font-body:    'Inter', sans-serif;               /* Body text, labels */
}
```

---

## 14. UX Quality Commandments

These rules are not code — they are **engineering principles** that must be applied throughout every component.

### The Application Must NEVER:
1. Show a blank white screen (always have skeleton, loader, or empty state)
2. Freeze during async operations (always disable buttons, show spinners)
3. Silently fail (every error must surface a toast or inline message)
4. Show stale data without indicating it (add loading indicators on refetch)
5. Let the user accidentally double-submit a form (disable on submit, re-enable on complete)
6. Show a broken image (always have `onError` fallback for `<img>` elements)
7. Have invisible focus states (all interactive elements must have `:focus-visible` styles)
8. Lose scroll position on navigation (use scroll restoration in React Router)
9. Break on mobile (test every feature on 375px width)
10. Have unstyled dark mode elements (every component needs `dark:` variants)

### The Application Must ALWAYS:
1. Give immediate feedback on every interaction
2. Animate state transitions smoothly
3. Respect the user's system preferences (dark mode, reduced motion)
4. Show exactly how many items are in the cart
5. Persist user choices (cart, wishlist, dark mode, recently viewed)
6. Gracefully recover from network errors
7. Be usable with keyboard alone
8. Load fast on a 3G connection (lazy load, skeleton UI)
9. Confirm destructive actions (e.g., clearing cart, removing items)
10. Celebrate user success (success toasts, success pages with animation)

### Reduced Motion Support
```css
/* Always respect user's motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```jsx
// In Framer Motion — check reduced motion preference
import { useReducedMotion } from 'framer-motion'

const prefersReduced = useReducedMotion()
const variants = prefersReduced ? {} : animationVariants
```

---

## 15. Updated Folder Structure Additions

Add these files/folders to the structure in the main PRD:

```
src/
├── components/
│   ├── product/
│   │   ├── QuickViewModal.jsx          ← NEW
│   │   ├── RecentlyViewed.jsx          ← NEW
│   │   ├── CompareBar.jsx              ← NEW (optional)
│   │   └── CompareModal.jsx            ← NEW (optional)
│   │
│   ├── ui/
│   │   ├── FloatingInput.jsx           ← NEW
│   │   ├── PasswordStrengthBar.jsx     ← NEW
│   │   ├── AnimatedNumber.jsx          ← NEW
│   │   ├── CheckoutStepper.jsx         ← NEW
│   │   ├── CartPreviewDropdown.jsx     ← NEW
│   │   └── SearchDropdown.jsx          ← NEW
│   │
│   └── common/
│       ├── AppLoader.jsx               ← NEW
│       ├── PageLoader.jsx              ← NEW
│       └── CartFlyAnimation.jsx        ← NEW (optional, portal-based)
│
├── hooks/
│   ├── useCountUp.js                   ← NEW
│   ├── useProducts.js                  ← NEW (data fetching hook)
│   └── useRecentlyViewed.js            ← NEW
│
├── utils/
│   ├── recentSearches.js               ← NEW
│   ├── recentlyViewed.js               ← NEW
│   └── passwordStrength.js             ← NEW
│
└── features/
    ├── compare/
    │   └── compareSlice.js             ← NEW (optional)
    └── ui/
        └── uiSlice.js                  ← ADD quickView state shape
```

---

## 16. Updated Roadmap Additions

Add these tasks to the relevant phases in the main PRD roadmap:

### Phase 1 — Foundation (Add)
- [ ] `index.html` dark mode FOUC prevention script
- [ ] `AppLoader.jsx` global boot loader
- [ ] Shimmer skeleton CSS in `globals.css`
- [ ] `FloatingInput.jsx` base component

### Phase 2 — Auth (Add)
- [ ] Password strength indicator on register
- [ ] Show/hide password toggle with animation
- [ ] Floating label inputs on all auth forms

### Phase 3 — Products (Add)
- [ ] Hero floating image animation
- [ ] Hero parallax background
- [ ] Category card image zoom on hover
- [ ] Product card quick action buttons overlay
- [ ] Product card image zoom on hover
- [ ] `SearchDropdown.jsx` with suggestions + recent searches
- [ ] `CartPreviewDropdown.jsx` in Navbar

### Phase 4 — Cart & Wishlist (Add)
- [ ] Wishlist heart bounce animation
- [ ] Cart badge pop animation on count change
- [ ] Quantity counter flip animation
- [ ] Add-to-cart button state machine (idle → loading → success)
- [ ] Cart fly animation (flying product image to cart icon)

### Phase 5 — Checkout (Add)
- [ ] `CheckoutStepper.jsx` with animated connector lines
- [ ] Step transition slide animation between checkout steps

### Phase 6 — Animations (Add)
- [ ] Dark mode transition CSS + FOUC prevention
- [ ] Skeleton shimmer (replace pulse with sweep)
- [ ] Reduced motion media query support
- [ ] `AnimatedNumber.jsx` component for cart totals
- [ ] `useCountUp` hook + stats section on home

### Phase 7 — Advanced Features (Add — if time allows)
- [ ] Recently Viewed products on product detail
- [ ] Quick View Modal
- [ ] Search suggestion highlight matching text
- [ ] Infinite scroll / Load More on products page
- [ ] Compare products (optional)

---

## Summary — What Was Missing vs. Main PRD

| # | Missing Feature | Section in This Doc |
|---|-----------------|---------------------|
| 1 | Navbar blur effect on scroll | §1.1 |
| 2 | Cart preview dropdown (mini cart) | §1.2 |
| 3 | Search suggestions dropdown + recent searches | §1.3 |
| 4 | Hero two-column layout + floating image + parallax | §2 |
| 5 | Category card image zoom spec | §3 |
| 6 | Product card quick action overlay on hover | §4.1 |
| 7 | Product card image zoom spec | §4.2 |
| 8 | Flying product to cart animation | §4.3 |
| 9 | Product detail image zoom | §5.1 |
| 10 | Stock status indicator | §5.2 |
| 11 | Reviews section | §5.3 |
| 12 | Mobile sticky add-to-cart bar | §5.4 |
| 13 | Floating label input component | §6.1 |
| 14 | Password strength bar | §6.2 |
| 15 | Show/hide password toggle animation | §6.3 |
| 16 | Full micro-interactions catalog | §7 |
| 17 | Dark mode color transition CSS | §8.1 |
| 18 | Dark mode FOUC prevention script | §8.3 |
| 19 | Global app loader (boot screen) | §9.1 |
| 20 | Route-level page skeleton (Suspense fallback) | §9.2 |
| 21 | Recently Viewed Products | §10.1 |
| 22 | Quick View Modal | §10.2 |
| 23 | Infinite Scroll / Load More | §10.3 |
| 24 | Search suggestion text highlighting | §10.4 |
| 25 | Animated counters / AnimatedNumber | §10.5 |
| 26 | Compare Products | §10.6 |
| 27 | Checkout step indicator + transitions | §11 |
| 28 | Count-up hook for stats section | §12 |
| 29 | Typography alternatives + recommendation | §13 |
| 30 | UX Quality Commandments | §14 |

---

*This document and the main PRD together form the complete blueprint. Build both — ship one. The details are what separate a portfolio project from a tutorial clone.*
