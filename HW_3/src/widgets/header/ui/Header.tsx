import { memo } from 'react'
import { useAppSelector } from '@shared/lib/hooks'
import { selectUser } from '@entities/user/model/authSlice'
import { LanguageSwitcher } from '@features/language-switcher'
import { ThemeToggle } from '@features/theme-switcher'
import { LogoutButton } from '@features/auth/logout'

export const Header = memo(() => {
  const user = useAppSelector(selectUser)

  return (
    <header className="header">
      <span className="header-logo">E-commerce Admin</span>
      <div className="header-actions">
        <LanguageSwitcher />
        <ThemeToggle />
        {user && (
          <span className="header-user">
            {user.firstName} {user.lastName}
          </span>
        )}
        <LogoutButton />
      </div>
    </header>
  )
})

Header.displayName = 'Header'
