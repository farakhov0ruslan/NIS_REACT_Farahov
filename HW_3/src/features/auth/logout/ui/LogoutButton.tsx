import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@shared/lib/hooks'
import { logout } from '@entities/user/model/authSlice'
import { removeStoredToken } from '@shared/lib/localStorage'

interface LogoutButtonProps {
  className?: string
}

export const LogoutButton = ({ className = 'btn btn-ghost' }: LogoutButtonProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    dispatch(logout())
    removeStoredToken()
    navigate('/login')
  }, [dispatch, navigate])

  return (
    <button className={className} onClick={handleLogout}>
      {t('nav.logout')}
    </button>
  )
}
