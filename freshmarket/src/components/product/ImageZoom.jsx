import { useState, useRef } from 'react'

export const ImageZoom = ({ src, alt }) => {
  const [zoomed, setZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [imageError, setImageError] = useState(false)
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current || imageError || !src) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosition({ x, y })
  }

  const defaultPlaceholder = '/placeholder-product.png'
  const imageSrc = imageError || !src ? defaultPlaceholder : src
  const canZoom = !imageError && !!src

  return (
    <div
      ref={ref}
      className={`relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ${canZoom ? 'cursor-crosshair' : 'cursor-default'}`}
      onMouseEnter={() => canZoom && setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        id="main-product-image"
        src={imageSrc}
        alt={alt || 'Product Image'}
        onError={() => setImageError(true)}
        className="h-full w-full object-cover transition-transform duration-200"
        style={{
          transform: zoomed && canZoom ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  )
}
