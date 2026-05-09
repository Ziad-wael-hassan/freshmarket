import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../features/cart/cartSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'
import uiReducer from '../features/ui/uiSlice'

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  ui: uiReducer,
})

const persistConfig = {
  key: 'freshcart-root',
  storage,
  whitelist: ['cart', 'wishlist'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
