import { useState, useRef, useEffect, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const LazyImage = forwardRef(({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPg==',
  ...props
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const handleLoad = () => setIsLoaded(true)
    const handleError = () => setIsError(true)

    if (img.complete) {
      setIsLoaded(true)
    } else {
      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)
    }

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }
  }, [src])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {!isLoaded && !isError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        {...props}
      />

      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-400">
            <div className="text-2xl">📷</div>
            <div className="text-sm mt-1">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'
