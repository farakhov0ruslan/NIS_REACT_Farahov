import { useEffect, type ReactNode } from 'react'
import { useAppSelector } from '@shared/lib/hooks'
import { selectLanguage } from '@app/slices/settingsSlice'
import i18n from '@shared/i18n/i18n'

interface I18nSyncProps {
  children: ReactNode
}

export const I18nSync = ({ children }: I18nSyncProps) => {
  const language = useAppSelector(selectLanguage)

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language])

  return <>{children}</>
}
