import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicOnlyRoute } from './providers/ProtectedRoute'
import { PrivateLayout } from '@widgets/private-layout'
import { Spinner } from '@shared/ui/Spinner'

const LoginPage = lazy(() => import('@pages/login').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('@pages/register').then((m) => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('@pages/dashboard').then((m) => ({ default: m.DashboardPage })))
const ProductsPage = lazy(() => import('@pages/products').then((m) => ({ default: m.ProductsPage })))
const ProductDetailPage = lazy(() => import('@pages/product-detail').then((m) => ({ default: m.ProductDetailPage })))
const ProfilePage = lazy(() => import('@pages/profile').then((m) => ({ default: m.ProfilePage })))
const SettingsPage = lazy(() => import('@pages/settings').then((m) => ({ default: m.SettingsPage })))
const NotFoundPage = lazy(() => import('@pages/not-found').then((m) => ({ default: m.NotFoundPage })))

const wrap = (element: JSX.Element) => (
  <Suspense fallback={<Spinner />}>{element}</Suspense>
)

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: wrap(<LoginPage />) },
      { path: '/register', element: wrap(<RegisterPage />) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: '/', element: wrap(<DashboardPage />) },
          { path: '/products', element: wrap(<ProductsPage />) },
          { path: '/products/:id', element: wrap(<ProductDetailPage />) },
          { path: '/profile', element: wrap(<ProfilePage />) },
          { path: '/settings', element: wrap(<SettingsPage />) },
        ],
      },
    ],
  },
  { path: '/404', element: wrap(<NotFoundPage />) },
  { path: '*', element: <Navigate to="/404" replace /> },
])
