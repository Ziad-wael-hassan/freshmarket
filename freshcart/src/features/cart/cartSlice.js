import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cartService } from '@/services/cartService'
import toast from 'react-hot-toast'

// Async thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await cartService.getCart()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
  }
})

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart')
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, count }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItem(productId, count)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart item')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart')
    }
  }
)

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    const response = await cartService.clearCart()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to clear cart')
  }
})

const initialState = {
  items: [],
  numOfCartItems: 0,
  totalPrice: 0,
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data.totalCartPrice || 0
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data.totalCartPrice || 0
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data.totalCartPrice || 0
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data.totalCartPrice || 0
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = []
        state.numOfCartItems = 0
        state.totalPrice = 0
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, resetCart } = cartSlice.actions
export default cartSlice.reducer
