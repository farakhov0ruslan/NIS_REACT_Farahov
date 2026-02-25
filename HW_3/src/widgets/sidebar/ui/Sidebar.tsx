import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  { to: '/', label: 'nav.dashboard', end: true },
  { to: '/products', label: 'nav.products', end: false },
  { to: '/profile', label: 'nav.profile', end: false },
  { to: '/settings', label: 'nav.settings', end: false },
] as const

export const Sidebar = memo(() => {
  const { t } = useTranslation()

  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {t(label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
})

Sidebar.displayName = 'Sidebar'
