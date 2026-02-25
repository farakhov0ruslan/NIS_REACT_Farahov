import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@shared/lib/hooks'
import { selectUser } from '@entities/user/model/authSlice'
import { useGetProductsQuery } from '@entities/product/api/productsApi'
import { Spinner } from '@shared/ui/Spinner'
import { ErrorMessage } from '@shared/ui/ErrorMessage'

export const DashboardPage = () => {
  const { t } = useTranslation()
  const user = useAppSelector(selectUser)
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 1, skip: 0 })

  return (
    <div>
      <p className="dashboard-welcome">
        {t('dashboard.welcome', { name: user?.firstName ?? user?.username })}
      </p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-label">{t('dashboard.totalProducts')}</div>
          <div className="stat-card-value">
            {isLoading ? <Spinner /> : isError ? <ErrorMessage message={t('errors.loadingFailed')} /> : (data?.total ?? '—')}
          </div>
        </div>
      </div>
      <p className="page-title" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
        {t('dashboard.quickLinks')}
      </p>
      <div className="quick-links">
        <Link to="/products" className="btn btn-primary">{t('nav.products')}</Link>
        <Link to="/profile" className="btn btn-ghost">{t('nav.profile')}</Link>
        <Link to="/settings" className="btn btn-ghost">{t('nav.settings')}</Link>
      </div>
    </div>
  )
}
