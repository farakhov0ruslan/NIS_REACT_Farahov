import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './store'
import { router } from './router'
import { ThemeProvider } from './providers/ThemeProvider'
import { I18nSync } from './providers/I18nSync'
import { AuthInit } from './providers/AuthInit'
import { ErrorBoundary } from '@widgets/error-boundary'
import './styles/global.css'

const InnerApp = () => (
  <ThemeProvider>
    <I18nSync>
      <AuthInit>
        <RouterProvider router={router} />
      </AuthInit>
    </I18nSync>
  </ThemeProvider>
)

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <InnerApp />
    </ErrorBoundary>
  </Provider>
)

export default App
