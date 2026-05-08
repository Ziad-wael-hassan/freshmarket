import { cn } from '@/utils/cn'
import { Star } from 'lucide-react'

export const Rating = ({ value = 0, count = 0, showCount = true }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            i < Math.floor(value) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
          )}
        />
      ))}
      {showCount && (
        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
          {value.toFixed(1)} {count > 0 && `(${count})`}
        </span>
      )}
    </div>
  )
}
