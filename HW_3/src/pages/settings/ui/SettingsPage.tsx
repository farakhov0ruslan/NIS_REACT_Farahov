import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks'
import { setPageSize, selectPageSize } from '@app/slices/settingsSlice'
import { ThemeToggle } from '@features/theme-switcher'
import { LanguageSwitcher } from '@features/language-switcher'

const PAGE_SIZES = [10, 20, 50] as const

export const SettingsPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const pageSize = useAppSelector(selectPageSize)

  return (
    <div>
      <h1 className="page-title">{t('settings.title')}</h1>

      <div className="settings-section">
        <h2>{t('settings.theme')}</h2>
        <div className="settings-row">
          <span className="settings-label">{t('settings.theme')}</span>
          <ThemeToggle />
        </div>
      </div>

      <div className="settings-section">
        <h2>{t('settings.language')}</h2>
        <div className="settings-row">
          <span className="settings-label">{t('settings.language')}</span>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="settings-section">
        <h2>{t('settings.pageSize')}</h2>
        <div className="settings-row">
          <span className="settings-label">{t('settings.pageSize')}</span>
          <select
            className="select"
            value={pageSize}
            onChange={(e) => dispatch(setPageSize(Number(e.target.value) as 10 | 20 | 50))}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
