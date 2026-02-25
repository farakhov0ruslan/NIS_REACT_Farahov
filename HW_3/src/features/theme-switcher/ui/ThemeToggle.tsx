import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks'
import { setTheme, selectTheme } from '@app/slices/settingsSlice'

export const ThemeToggle = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)

  const toggle = useCallback(() => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }, [dispatch, theme])

  return (
    <button className="theme-toggle" onClick={toggle} title={t('settings.theme')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
