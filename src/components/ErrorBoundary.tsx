import React, { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  public state: State = {}

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    const { errorInfo, error } = this.state as State
    if (errorInfo) {
      // Error path
      return (
        <div>
          <>
            <h2>Something went wrong !</h2>
            {console.error(error?.toString(), errorInfo.componentStack)}
            <details style={{ whiteSpace: 'pre-wrap' }}>
              Please contact support for further assistance
            </details>
          </>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary