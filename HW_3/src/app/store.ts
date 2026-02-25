import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@entities/user/model/authSlice'
import settingsReducer from './slices/settingsSlice'
import { authApi } from '@entities/user/api/authApi'
import { productsApi } from '@entities/product/api/productsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
