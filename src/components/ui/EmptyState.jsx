import { cn } from '@/utils/cn'
import { Button } from './Button'
import { Link } from 'react-router-dom'

export const EmptyState = ({ icon: Icon, title, description, actionLabel, actionLink, onAction, className }) => {
  return (
    <div className={cn('text-center', className)}>
      {Icon && (
        <Icon className="mx-auto mb-6 h-24 w-24 text-gray-300 dark:text-gray-600" />
      )}
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      {description && (
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">{description}</p>
      )}
      {actionLink && (
        <Button asChild size="lg">
          <Link to={actionLink}>{actionLabel}</Link>
        </Button>
      )}
      {onAction && !actionLink && (
        <Button onClick={onAction} size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
