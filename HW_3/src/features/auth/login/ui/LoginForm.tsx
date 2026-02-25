import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@shared/lib/hooks'
import { useLoginMutation } from '@entities/user/api/authApi'
import { setCredentials } from '@entities/user/model/authSlice'
import {
  setStoredToken,
  findLocalUser,
  makeLocalToken,
} from '@shared/lib/localStorage'

export const LoginForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string; api?: string }>({})

  const validate = () => {
    const next: typeof errors = {}
    if (!username.trim()) next.username = t('auth.usernameRequired')
    if (password.length < 4) next.password = t('auth.passwordRequired')
    return next
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length) {
      setErrors(validation)
      return
    }
    setErrors({})

    try {
      const user = await login({ username, password, expiresInMins: 60 }).unwrap()
      setStoredToken(user.token)
      dispatch(setCredentials(user))
      navigate('/')
      return
    } catch {
      // DummyJSON login failed — try locally registered users
    }

    const localUser = findLocalUser(username, password)
    if (localUser) {
      const token = makeLocalToken(username)
      setStoredToken(token)
      dispatch(
        setCredentials({
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          image: localUser.image,
          token,
        }),
      )
      navigate('/')
      return
    }

    setErrors({ api: t('errors.invalidCredentials') })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.api && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {errors.api}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="username">{t('auth.username')}</label>
        <input
          id="username"
          type="text"
          className={`form-input${errors.username ? ' error' : ''}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        {errors.username && <span className="form-error">{errors.username}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">{t('auth.password')}</label>
        <input
          id="password"
          type="password"
          className={`form-input${errors.password ? ' error' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>
      <button type="submit" className="btn btn-primary form-submit" disabled={isLoading}>
        {isLoading ? t('common.loading') : t('auth.signIn')}
      </button>
      <p className="form-hint">{t('auth.loginHint')}</p>
    </form>
  )
}
