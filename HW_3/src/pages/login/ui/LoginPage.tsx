import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginForm } from '@features/auth/login'

export const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h1>{t('auth.login')}</h1>
        <LoginForm />
        <div className="form-link">
          {t('auth.noAccount')}{' '}
          <Link to="/register">{t('auth.register')}</Link>
        </div>
      </div>
    </div>
  )
}
