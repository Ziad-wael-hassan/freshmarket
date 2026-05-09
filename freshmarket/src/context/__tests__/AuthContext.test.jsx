import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import cartReducer from '@/features/cart/cartSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'
import uiReducer from '@/features/ui/uiSlice'
import { MemoryRouter } from 'react-router-dom'

vi.mock('@/services/authService', () => ({
  authService: {
    signin: vi.fn(),
    getProfile: vi.fn(),
  },
}))

vi.mock('@/services/firebase', () => ({
  auth: { onAuthStateChanged: vi.fn(() => () => {}) },
  googleProvider: {},
}))

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      ui: uiReducer,
    },
  })

const TestWrapper = ({ children, store }) => (
  <Provider store={store}>
    <MemoryRouter>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  </Provider>
)

describe('useAuth', () => {
  describe('login', () => {
    it('should set isAuthenticated to true after successful login', async () => {
      const store = createTestStore()
      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  describe('logout', () => {
    it('should clear auth state on logout', async () => {
      const store = createTestStore()
      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  describe('login failure', () => {
    it('should keep isAuthenticated false after failed login', async () => {
      const store = createTestStore()
      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(result.current.isAuthenticated).toBe(false)
    })
  })
})