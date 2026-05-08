import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { wishlistService } from '@/services/wishlistService'
import toast from 'react-hot-toast'

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.getWishlist()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist')
    }
  }
)

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistService.toggleWishlist(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist')
    }
  }
)

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.clearWishlist()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear wishlist')
    }
  }
)

const initialState = {
  items: [],
  itemIds: [],
  count: 0,
  loading: false,
  error: null,
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetWishlist: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data || []
        state.itemIds = action.payload.data?.map((item) => item._id) || []
        state.count = action.payload.count || action.payload.data?.length || 0
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Toggle Wishlist
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data || []
        state.itemIds = action.payload.data?.map((item) => item._id) || []
        state.count = action.payload.count || action.payload.data?.length || 0
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Clear Wishlist
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.items = []
        state.itemIds = []
        state.count = 0
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, resetWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
