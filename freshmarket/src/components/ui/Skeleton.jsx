import { cn } from '@/utils/cn'

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200 dark:bg-gray-700', className)}
      {...props}
    />
  )
}
