import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGetProductByIdQuery } from '@entities/product/api/productsApi'
import { Spinner } from '@shared/ui/Spinner'
import { ErrorMessage } from '@shared/ui/ErrorMessage'

export const ProductDetailPage = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id))

  if (isLoading) return <Spinner />
  if (isError || !product) return <ErrorMessage message={t('errors.loadingFailed')} />

  return (
    <div className="product-detail">
      <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem' }}>
        ← {t('products.back')}
      </button>
      <div className="product-detail-header">
        <img className="product-detail-img" src={product.thumbnail} alt={product.title} />
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-price">${product.price}</div>
          <div className="product-detail-meta">
            <span>{t('products.rating')}: ★ {product.rating}</span>
            <span>{t('products.category')}: {product.category}</span>
            <span>{t('products.brand')}: {product.brand}</span>
            <span>{t('products.stock')}: {product.stock}</span>
          </div>
        </div>
      </div>
      <div className="product-detail-description">{product.description}</div>
    </div>
  )
}
