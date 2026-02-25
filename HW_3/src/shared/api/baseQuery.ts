import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@app/store'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://dummyjson.com',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token ?? localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})
