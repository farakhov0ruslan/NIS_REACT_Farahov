import { useState, useEffect, type ReactNode } from 'react'
import { useAppDispatch } from '@shared/lib/hooks'
import { setCredentials } from '@entities/user/model/authSlice'
import { getStoredToken, removeStoredToken, isLocalToken } from '@shared/lib/localStorage'
import { useGetMeQuery } from '@entities/user/api/authApi'
import { Spinner } from '@shared/ui/Spinner'

interface AuthInitProps {
  children: ReactNode
}

export const AuthInit = ({ children }: AuthInitProps) => {
  const dispatch = useAppDispatch()
  const token = getStoredToken()
  const isLocal = token ? isLocalToken(token) : false

  // Local users and unauthenticated are ready immediately.
  // DummyJSON users need to wait for getMe to resolve.
  const [initialized, setInitialized] = useState(!token || isLocal)

  const { data, isError } = useGetMeQuery(undefined, {
    skip: !token || isLocal,
  })

  useEffect(() => {
    if (!data) return
    if (token) {
      dispatch(setCredentials({ ...data, token }))
    }
    setInitialized(true)
  }, [data, token, dispatch])

  useEffect(() => {
    if (!isError) return
    removeStoredToken()
    setInitialized(true)
  }, [isError])

  if (!initialized) return <Spinner />

  return <>{children}</>
}
