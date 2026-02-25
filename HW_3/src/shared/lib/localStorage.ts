export const getStoredToken = (): string | null => {
  return localStorage.getItem('token')
}

export const setStoredToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const removeStoredToken = (): void => {
  localStorage.removeItem('token')
}

export const getStoredSettings = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export const setStoredSettings = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export interface LocalUser {
  id: number
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  image: string
}

const LOCAL_USERS_KEY = 'local_users'

export const getLocalUsers = (): LocalUser[] =>
  getStoredSettings<LocalUser[]>(LOCAL_USERS_KEY, [])

export const saveLocalUser = (user: LocalUser): void => {
  setStoredSettings(LOCAL_USERS_KEY, [...getLocalUsers(), user])
}

export const findLocalUser = (username: string, password: string): LocalUser | null =>
  getLocalUsers().find((u) => u.username === username && u.password === password) ?? null

export const getLocalUserByUsername = (username: string): LocalUser | null =>
  getLocalUsers().find((u) => u.username === username) ?? null

export const isLocalToken = (token: string): boolean => token.startsWith('local:')

export const makeLocalToken = (username: string): string => `local:${username}`

export const getUsernameFromLocalToken = (token: string): string => token.replace('local:', '')
