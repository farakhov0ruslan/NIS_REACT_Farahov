import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const SearchBar = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') ?? '')
  const committedQuery = useRef(searchParams.get('q') ?? '')

  useEffect(() => {
    const timer = setTimeout(() => {
      const newQ = value.trim()
      if (newQ === committedQuery.current) return
      committedQuery.current = newQ
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        if (newQ) {
          next.set('q', newQ)
        } else {
          next.delete('q')
        }
        next.set('page', '1')
        return next
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [value, setSearchParams])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return (
    <input
      type="search"
      className="search-input"
      placeholder={t('products.search')}
      value={value}
      onChange={handleChange}
    />
  )
}
