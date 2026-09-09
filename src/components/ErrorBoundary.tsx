import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled error in the app tree:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <div className="glass max-w-md rounded-glass p-8 text-center">
          <h1 className="text-xl font-semibold">Algo quebrou por aqui</h1>
          <p className="mt-3 text-sm text-ink-muted">
            Recarregue a página. Se persistir, me avise em{' '}
            <a className="text-brand-400 underline" href="mailto:lucasfelipaaa@gmail.com">
              lucasfelipaaa@gmail.com
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg"
          >
            Recarregar
          </button>
        </div>
      </div>
    )
  }
}
