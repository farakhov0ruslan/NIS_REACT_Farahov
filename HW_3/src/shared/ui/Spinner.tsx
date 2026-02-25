import { useTranslation } from 'react-i18next'

export const Spinner = () => {
  const { t } = useTranslation()
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <span>{t('common.loading')}</span>
    </div>
  )
}
