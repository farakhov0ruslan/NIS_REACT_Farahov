import { Outlet } from 'react-router-dom'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

export const PrivateLayout = () => (
  <div className="layout">
    <Header />
    <div className="layout-body">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  </div>
)
