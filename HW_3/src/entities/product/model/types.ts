export interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  category: string
  brand: string
  stock: number
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface GetProductsParams {
  limit: number
  skip: number
}

export interface SearchProductsParams {
  q: string
  limit: number
  skip: number
}
