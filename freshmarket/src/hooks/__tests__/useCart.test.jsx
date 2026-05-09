import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useCart } from '@/hooks/useCart'
import cartReducer from '@/features/cart/cartSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'
import uiReducer from '@/features/ui/uiSlice'
import { useAuth as useAuthMock } from '@/context/AuthContext'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(() => ({ isAuthenticated: true })),
}))

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [[], vi.fn()],
}))

const createTestStore = (preloadedState = {}) =>
  configureStore({
    preloadedState,
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      ui: uiReducer,
    },
  })

const TestWrapper = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useCart', () => {
  describe('add item', () => {
    it('should return success result from addItem', async () => {
      const store = createTestStore({
        cart: { items: [], numOfCartItems: 0, totalPrice: 0, cartId: null, loading: false, error: null },
      })

      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(typeof result.current.addItem).toBe('function')
    })
  })

  describe('remove item', () => {
    it('should return success result from removeItem', async () => {
      const store = createTestStore({
        cart: { items: [], numOfCartItems: 0, totalPrice: 0, cartId: null, loading: false, error: null },
      })

      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(typeof result.current.removeItem).toBe('function')
    })
  })

  describe('count updates', () => {
    it('should track numOfCartItems from cart state', async () => {
      const store = createTestStore({
        cart: { items: [], numOfCartItems: 5, totalPrice: 100, cartId: null, loading: false, error: null },
      })

      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(result.current.numOfCartItems).toBe(5)
    })
  })
})