import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import { getStoredSettings, setStoredSettings } from '@shared/lib/localStorage'

type Theme = 'light' | 'dark'
type Language = 'en' | 'ru'
type PageSize = 10 | 20 | 50

interface SettingsState {
  theme: Theme
  language: Language
  pageSize: PageSize
}

const initialState: SettingsState = {
  theme: getStoredSettings<Theme>('settings_theme', 'light'),
  language: getStoredSettings<Language>('settings_language', 'en'),
  pageSize: getStoredSettings<PageSize>('settings_pageSize', 10),
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
      setStoredSettings('settings_theme', action.payload)
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload
      setStoredSettings('settings_language', action.payload)
    },
    setPageSize(state, action: PayloadAction<PageSize>) {
      state.pageSize = action.payload
      setStoredSettings('settings_pageSize', action.payload)
    },
  },
})

export const { setTheme, setLanguage, setPageSize } = settingsSlice.actions
export default settingsSlice.reducer

export const selectTheme = (state: RootState) => state.settings.theme
export const selectLanguage = (state: RootState) => state.settings.language
export const selectPageSize = (state: RootState) => state.settings.pageSize
