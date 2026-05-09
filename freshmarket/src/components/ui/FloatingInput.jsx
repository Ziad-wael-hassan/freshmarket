import { forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'

export const FloatingInput = forwardRef(({ label, error, className, type = 'text', ...props }, ref) => {
  const [focused, setFocused] = useState(false)
  const hasValue = props.value || props.defaultValue

  return (
    <div className="relative">
      <input
        ref={ref}
        type={type}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
        className={cn(
          'peer w-full rounded-lg border border-gray-300 bg-white px-3 pt-5 pb-2 text-sm outline-none transition-colors focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        placeholder=""
        {...props}
      />
      <label
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-400',
          (focused || hasValue) && 'top-2 text-xs text-primary-600 dark:text-primary-400'
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
})

FloatingInput.displayName = 'FloatingInput'
