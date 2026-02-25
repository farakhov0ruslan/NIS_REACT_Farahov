import { useEffect, type ReactNode } from 'react'
import { useAppSelector } from '@shared/lib/hooks'
import { selectTheme } from '@app/slices/settingsSlice'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}
