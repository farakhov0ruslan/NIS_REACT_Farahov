import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{t('errors.notFound')}</p>
      <Link to="/" className="btn btn-primary">{t('common.goHome')}</Link>
    </div>
  )
}
