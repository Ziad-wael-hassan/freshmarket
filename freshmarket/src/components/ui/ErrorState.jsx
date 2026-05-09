import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './Button'

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading this content.',
  onRetry,
  showRetry = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6 rounded-full bg-red-100 p-4 dark:bg-red-900/20">
        <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
      </div>

      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>

      <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">{message}</p>

      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}
