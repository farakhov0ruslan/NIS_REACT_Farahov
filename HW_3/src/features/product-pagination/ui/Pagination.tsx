import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface PaginationProps {
  total: number
  pageSize: number
}

export const Pagination = ({ total, pageSize }: PaginationProps) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? 1)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const goTo = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', String(page))
        return next
      })
    },
    [setSearchParams],
  )

  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button
        className="btn btn-ghost"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        ←
      </button>
      <span className="pagination-info">
        {t('products.page', { current: currentPage, total: totalPages })}
      </span>
      <button
        className="btn btn-ghost"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        →
      </button>
    </div>
  )
}
