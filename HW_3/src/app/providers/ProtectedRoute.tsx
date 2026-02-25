import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@shared/lib/hooks'
import { selectIsAuthenticated } from '@entities/user/model/authSlice'

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export const PublicOnlyRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return <Outlet />
}
