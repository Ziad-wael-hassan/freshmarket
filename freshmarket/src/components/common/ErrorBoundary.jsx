import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    const componentName = errorInfo?.componentStack 
      ? errorInfo.componentStack.split('\n').find(line => line.includes('at '))?.replace('at ', '').split(' ')[0] || 'Unknown'
      : 'Unknown'

    const errorDetails = {
      message: error?.message || 'Unknown error',
      name: error?.name || 'Error',
      component: componentName,
      timestamp: new Date().toISOString(),
    }

    if (import.meta.env.DEV) {
      console.group('%c🔴 ErrorBoundary Caught Error', 'color: #ef4444; font-weight: bold;')
      console.error('Error Details:', errorDetails)
      console.error('Full Error:', error)
      console.error('Error Info:', errorInfo)
      console.groupEnd()
    } else {
      console.error(`[ErrorBoundary] ${errorDetails.component}: ${errorDetails.message}`)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {isDev 
                ? this.state.error?.message || 'An unexpected error occurred'
                : 'We encountered an issue. Please try again.'
              }
            </p>

            <button
              onClick={this.handleRetry}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full transition-colors shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>

            {isDev && this.state.error?.stack && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-400">
                  View Error Stack
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-40">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
