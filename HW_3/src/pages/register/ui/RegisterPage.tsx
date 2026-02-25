import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { saveLocalUser, getLocalUserByUsername } from '@shared/lib/localStorage'

export const RegisterPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [fields, setFields] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  })
  const [errors, setErrors] = useState<Partial<typeof fields> & { api?: string }>({})
  const [success, setSuccess] = useState(false)

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }))

  const validate = () => {
    const next: typeof errors = {}
    if (!fields.username.trim()) next.username = t('auth.usernameRequired')
    if (fields.password.length < 4) next.password = t('auth.passwordRequired')
    if (!fields.firstName.trim()) next.firstName = t('register.firstNameRequired')
    if (!fields.lastName.trim()) next.lastName = t('register.lastNameRequired')
    if (!fields.email.includes('@')) next.email = t('register.emailRequired')
    return next
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length) {
      setErrors(validation)
      return
    }
    setErrors({})

    if (getLocalUserByUsername(fields.username)) {
      setErrors({ api: t('register.userExists') })
      return
    }

    saveLocalUser({
      id: Date.now(),
      username: fields.username,
      password: fields.password,
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      image: `https://i.pravatar.cc/128?u=${fields.username}`,
    })

    setSuccess(true)
    setTimeout(() => navigate('/login'), 2000)
  }

  if (success) {
    return (
      <div className="form-wrapper">
        <div className="form-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('register.success')}</p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            {t('register.redirecting')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h1>{t('auth.register')}</h1>
        <form onSubmit={handleSubmit} noValidate>
          {errors.api && (
            <div className="error-message" style={{ marginBottom: '1rem' }}>
              {errors.api}
            </div>
          )}
          {(
            [
              { key: 'username', label: t('auth.username'), type: 'text', autoComplete: 'username' },
              { key: 'password', label: t('auth.password'), type: 'password', autoComplete: 'new-password' },
              { key: 'firstName', label: t('auth.firstName'), type: 'text', autoComplete: 'given-name' },
              { key: 'lastName', label: t('auth.lastName'), type: 'text', autoComplete: 'family-name' },
              { key: 'email', label: t('auth.email'), type: 'email', autoComplete: 'email' },
            ] as const
          ).map(({ key, label, type, autoComplete }) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{label}</label>
              <input
                id={key}
                type={type}
                autoComplete={autoComplete}
                className={`form-input${errors[key] ? ' error' : ''}`}
                value={fields[key]}
                onChange={set(key)}
              />
              {errors[key] && <span className="form-error">{errors[key]}</span>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary form-submit">
            {t('auth.signUp')}
          </button>
        </form>
        <div className="form-link">
          {t('auth.haveAccount')} <Link to="/login">{t('auth.signIn')}</Link>
        </div>
      </div>
    </div>
  )
}
