import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cartService } from '@/services/cartService'

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await cartService.get()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
  }
})

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartService.add(productId)
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
      const response = await cartService.updateQuantity(productId, count)
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
      const response = await cartService.remove(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart')
    }
  }
)

export const clearCartItems = createAsyncThunk('cart/clearCartItems', async (_, { rejectWithValue }) => {
  try {
    await cartService.clear()
    return { data: { products: [], numOfCartItems: 0, totalCartPrice: 0 } }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to clear cart')
  }
})

const initialState = {
  items: [],
  numOfCartItems: 0,
  totalPrice: 0,
  cartId: null,
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
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data?.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data?.totalCartPrice || 0
        state.cartId = action.payload.data?._id || null
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data?.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data?.totalCartPrice || 0
        state.cartId = action.payload.data?._id || null
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data?.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data?.totalCartPrice || 0
        state.cartId = action.payload.data?._id || null
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data?.products || []
        state.numOfCartItems = action.payload.numOfCartItems || 0
        state.totalPrice = action.payload.data?.totalCartPrice || 0
        state.cartId = action.payload.data?._id || null
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(clearCartItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.loading = false
        state.items = []
        state.numOfCartItems = 0
        state.totalPrice = 0
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, resetCart } = cartSlice.actions
export default cartSlice.reducer
