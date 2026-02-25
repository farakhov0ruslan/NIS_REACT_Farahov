import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User, AuthState } from './types'
import type { RootState } from '@app/store'
import {
  isLocalToken,
  getUsernameFromLocalToken,
  getLocalUserByUsername,
} from '@shared/lib/localStorage'

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token')
  if (token && isLocalToken(token)) {
    const username = getUsernameFromLocalToken(token)
    const localUser = getLocalUserByUsername(username)
    if (localUser) {
      return {
        user: {
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          image: localUser.image,
          token,
        },
        token,
        isLoading: false,
        error: null,
      }
    }
  }
  return { user: null, token: null, isLoading: false, error: null }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState,
  reducers: {
    setCredentials(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.token = action.payload.token
      state.error = null
    },
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const { setCredentials, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) => state.auth.token !== null
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading
export const selectAuthError = (state: RootState) => state.auth.error
