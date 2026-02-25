import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api/baseQuery'
import type { User, LoginCredentials } from '../model/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/auth/me',
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authApi
