import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@shared/lib/hooks'
import { selectUser } from '@entities/user/model/authSlice'
import { LogoutButton } from '@features/auth/logout'

export const ProfilePage = () => {
  const { t } = useTranslation()
  const user = useAppSelector(selectUser)

  if (!user) return null

  return (
    <div>
      <h1 className="page-title">{t('profile.title')}</h1>
      <div className="profile-card">
        <img className="profile-avatar" src={user.image} alt={user.username} />
        <div className="profile-field">
          <span className="profile-field-label">{t('profile.fullName')}</span>
          <span className="profile-field-value">{user.firstName} {user.lastName}</span>
        </div>
        <div className="profile-field">
          <span className="profile-field-label">{t('profile.email')}</span>
          <span className="profile-field-value">{user.email}</span>
        </div>
        <div className="profile-field">
          <span className="profile-field-label">{t('auth.username')}</span>
          <span className="profile-field-value">{user.username}</span>
        </div>
        <LogoutButton className="btn btn-danger" />
      </div>
    </div>
  )
}
