import { Component, type ReactNode, type ErrorInfo } from 'react'
import i18n from '@shared/i18n/i18n'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="error-boundary">
            <h2>{i18n.t('common.error')}</h2>
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ hasError: false })}
            >
              {i18n.t('common.reload')}
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
