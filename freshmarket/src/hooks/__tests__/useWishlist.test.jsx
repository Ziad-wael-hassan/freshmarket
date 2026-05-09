import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { useWishlist } from '@/hooks/useWishlist'
import cartReducer from '@/features/cart/cartSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'
import uiReducer from '@/features/ui/uiSlice'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(() => ({ isAuthenticated: true })),
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
  <Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
)

describe('useWishlist', () => {
  describe('toggle on', () => {
    it('should return toggleItem function', async () => {
      const store = createTestStore({
        wishlist: { items: [], itemIds: [], count: 0, loading: false, error: null },
      })

      const { result } = renderHook(() => useWishlist(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(typeof result.current.toggleItem).toBe('function')
    })
  })

  describe('toggle off', () => {
    it('should return toggleItem function that can remove an item', async () => {
      const store = createTestStore({
        wishlist: {
          items: [{ _id: 'prod-1', name: 'Test Product' }],
          itemIds: ['prod-1'],
          count: 1,
          loading: false,
          error: null,
        },
      })

      const { result } = renderHook(() => useWishlist(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(typeof result.current.toggleItem).toBe('function')
      expect(result.current.isInWishlist('prod-1')).toBe(true)
    })
  })

  describe('state persists', () => {
    it('should expose count from wishlist state', async () => {
      const store = createTestStore({
        wishlist: {
          items: [{ _id: 'prod-1', name: 'Test' }],
          itemIds: ['prod-1'],
          count: 1,
          loading: false,
          error: null,
        },
      })

      const { result } = renderHook(() => useWishlist(), {
        wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
      })

      expect(result.current.count).toBe(1)
    })
  })
})