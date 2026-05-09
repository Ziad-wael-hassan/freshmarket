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
    if (!img || !src || src === '/placeholder-product.png') {
      setIsError(true)
      return
    }

    const handleLoad = () => setIsLoaded(true)
    const handleError = () => setIsError(true)

    setIsLoaded(false)
    setIsError(false)

    if (img.complete) {
      if (img.naturalWidth === 0) {
        setIsError(true)
      } else {
        setIsLoaded(true)
      }
    } else {
      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)
    }

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }
  }, [src])

  const hasValidSrc = src && src !== '/placeholder-product.png'

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center', className)}>
      {(!isLoaded && !isError) && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-sm animate-pulse"
          aria-hidden="true"
        />
      )}

      {hasValidSrc && !isError && (
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
      )}

      {(!hasValidSrc || isError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
          <svg className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium">No Image</span>
        </div>
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'
