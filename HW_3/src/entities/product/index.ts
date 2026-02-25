export type {
  Product,
  ProductsResponse,
  GetProductsParams,
  SearchProductsParams,
} from './model/types'
export {
  productsApi,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} from './api/productsApi'
