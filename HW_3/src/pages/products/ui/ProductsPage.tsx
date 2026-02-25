import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@shared/lib/hooks'
import { selectPageSize } from '@app/slices/settingsSlice'
import { useGetProductsQuery, useSearchProductsQuery } from '@entities/product/api/productsApi'
import { SearchBar } from '@features/product-search'
import { Pagination } from '@features/product-pagination'
import { Spinner } from '@shared/ui/Spinner'
import { ErrorMessage } from '@shared/ui/ErrorMessage'
import { EmptyState } from '@shared/ui/EmptyState'

export const ProductsPage = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const pageSize = useAppSelector(selectPageSize)

  const query = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? 1)
  const skip = useMemo(() => (page - 1) * pageSize, [page, pageSize])

  const listResult = useGetProductsQuery(
    { limit: pageSize, skip },
    { skip: !!query },
  )

  const searchResult = useSearchProductsQuery(
    { q: query, limit: pageSize, skip },
    { skip: !query },
  )

  const { data, isLoading, isError } = query ? searchResult : listResult

  return (
    <div>
      <h1 className="page-title">{t('products.title')}</h1>
      <div className="products-toolbar">
        <SearchBar />
      </div>

      {isLoading && <Spinner />}
      {isError && <ErrorMessage message={t('errors.loadingFailed')} />}
      {!isLoading && !isError && data?.products.length === 0 && (
        <EmptyState message={t('products.empty')} />
      )}

      {!isLoading && !isError && data && data.products.length > 0 && (
        <>
          <div className="products-grid">
            {data.products.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="product-card">
                <img
                  className="product-card-img"
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />
                <div className="product-card-body">
                  <div className="product-card-category">{product.category}</div>
                  <div className="product-card-title">{product.title}</div>
                  <div className="product-card-footer">
                    <span className="product-card-price">${product.price}</span>
                    <span className="product-card-rating">★ {product.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Pagination total={data.total} pageSize={pageSize} />
        </>
      )}
    </div>
  )
}
