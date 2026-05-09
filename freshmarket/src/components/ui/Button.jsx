import { cloneElement, forwardRef, isValidElement } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95',
        outline:
          'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800',
        ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
        link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-5 py-2',
        lg: 'h-14 px-10 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export const Button = forwardRef(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }))
    const loadingContent = (
      <>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Loading...
      </>
    )

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ...props,
        ref,
        className: cn(classes, children.props.className),
        children: loading ? loadingContent : children.props.children,
      })
    }

    if (loading) {
      return (
        <button
          className={classes}
          ref={ref}
          disabled
          {...props}
        >
          {loadingContent}
        </button>
      )
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
