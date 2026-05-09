import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { wishlistService } from '@/services/wishlistService'
import { normalizeProduct, unwrapApiData } from '@/utils/apiData'

const extractWishlistItems = (payload) => {
  const unwrapped = unwrapApiData(payload)

  if (Array.isArray(unwrapped)) {
    return unwrapped
  }

  if (Array.isArray(unwrapped?.data)) {
    return unwrapped.data
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

const normalizeWishlistItem = (item) => {
  const productSource = item?.product && typeof item.product === 'object' ? item.product : item
  const normalizedProduct = normalizeProduct(productSource)

  if (!normalizedProduct?._id) {
    return null
  }

  return {
    ...normalizedProduct,
    wishlistItemId: item?.wishlistItemId || item?._id || item?.id || normalizedProduct._id,
  }
}

const mapWishlistPayload = (payload) => {
  const items = extractWishlistItems(payload).map(normalizeWishlistItem).filter(Boolean)
  const itemIds = items.map((item) => item._id).filter(Boolean)
  const countFromPayload = Number(payload?.count ?? payload?.results)

  return {
    items,
    itemIds,
    count: Number.isFinite(countFromPayload) && countFromPayload >= 0 ? countFromPayload : itemIds.length,
  }
}

const applyWishlistState = (state, payload) => {
  const normalized = mapWishlistPayload(payload)
  state.items = normalized.items
  state.itemIds = normalized.itemIds
  state.count = normalized.count
}

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.get()
      console.log('Wishlist Response:', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist')
    }
  }
)

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async ({ product, productId, isWishlisted }, { getState, rejectWithValue }) => {
    try {
      const id = productId || product?._id
      if (isWishlisted) {
        const existingItem = getState().wishlist.items.find(
          (item) => item._id === id || item.wishlistItemId === id
        )
        await wishlistService.remove(existingItem?.wishlistItemId || id)
      } else {
        await wishlistService.add(product)
      }
      return { skipRefresh: true }
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
        applyWishlistState(state, action.payload)
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
        if (action.payload?.skipRefresh) {
          const toggledId = action.meta.arg.productId || action.meta.arg.product?._id
          const idx = state.itemIds.indexOf(toggledId)
          if (idx !== -1) {
            state.items.splice(idx, 1)
            state.itemIds.splice(idx, 1)
            state.count = state.itemIds.length
          } else {
            state.itemIds.push(toggledId)
            state.count = state.itemIds.length
          }
        } else {
          applyWishlistState(state, action.payload)
        }
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, resetWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
