import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { wishlistService } from '@/services/wishlistService'

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.get()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist')
    }
  }
)

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async ({ productId, isWishlisted }, { rejectWithValue }) => {
    try {
      if (isWishlisted) {
        await wishlistService.remove(productId)
      } else {
        await wishlistService.add(productId)
      }
      const response = await wishlistService.get()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist')
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
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data || []
        state.itemIds = action.payload.data?.map((item) => item._id || item) || []
        state.count = action.payload.count || action.payload.data?.length || 0
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(toggleWishlist.pending, (state) => {
        state.error = null
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data || []
        state.itemIds = action.payload.data?.map((item) => item._id || item) || []
        state.count = action.payload.count || action.payload.data?.length || 0
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, resetWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
