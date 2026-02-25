import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks'
import { setLanguage, selectLanguage } from '@app/slices/settingsSlice'
import i18n from '@shared/i18n/i18n'

export const LanguageSwitcher = () => {
  const dispatch = useAppDispatch()
  const language = useAppSelector(selectLanguage)

  const change = useCallback(
    (lang: 'en' | 'ru') => {
      dispatch(setLanguage(lang))
      i18n.changeLanguage(lang)
    },
    [dispatch],
  )

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn${language === 'en' ? ' active' : ''}`}
        onClick={() => change('en')}
      >
        EN
      </button>
      <button
        className={`lang-btn${language === 'ru' ? ' active' : ''}`}
        onClick={() => change('ru')}
      >
        RU
      </button>
    </div>
  )
}
