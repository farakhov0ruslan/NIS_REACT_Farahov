import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@shared/api/baseQuery'
import type {
  Product,
  ProductsResponse,
  GetProductsParams,
  SearchProductsParams,
} from '../model/types'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    searchProducts: builder.query<ProductsResponse, SearchProductsParams>({
      query: ({ q, limit, skip }) =>
        `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} = productsApi
