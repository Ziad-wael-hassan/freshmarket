import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { useCartFly } from '@/components/cart/CartFlyAnimation'
import { LazyImage } from '@/components/common/LazyImage'
import { Button } from '@/components/ui/Button'
import { ProductCardActions } from '@/components/product/ProductCardActions'
import { formatCurrency } from '@/utils/formatters'
import { cn } from '@/utils/cn'
import toast from 'react-hot-toast'

export const ProductCard = ({ product, className = '' }) => {
  const imageRef = useRef(null)
  const { addItem } = useCart()
  const { flyItemToCart } = useCartFly()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const imageEl = imageRef.current
    if (imageEl && product?.imageCover) {
      flyItemToCart(product.imageCover, imageEl.getBoundingClientRect())
    }

    const result = await addItem(product?._id)
    if (result?.success) {
      toast.success('Added to cart!')
    } else {
      toast.error('Failed to add to cart')
    }
  }

  if (!product) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'group relative overflow-hidden rounded-xl border border-border-custom bg-card shadow-sm transition-all hover:shadow-lg h-full',
          className
        )}
      >
        <Link to={`/products/${product._id}`} className="flex h-full flex-col">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <LazyImage
              ref={imageRef}
              src={product.imageCover || '/placeholder-product.png'}
              alt={product.title || 'Product Image'}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay Actions */}
            <ProductCardActions productId={product._id} />

            {/* Stock Status Badge */}
            {product.quantity <= 5 && product.quantity > 0 && (
              <div className="absolute bottom-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-amber-500/20">
                Only {product.quantity} left
              </div>
            )}

            {product.quantity === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-black shadow-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h3 className="mb-2 line-clamp-2 text-sm font-medium text-text-primary break-words" dir="auto">
                {product?.title || 'Untitled Product'}
              </h3>

              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg font-bold text-primary-600">
                  {formatCurrency(product.priceAfterDiscount || product.price || 0)}
                </span>
                {product.priceAfterDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.price || 0)}
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.ratingsAverage !== undefined && (
                <div className="mb-3 flex items-center gap-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < Math.floor(product.ratingsAverage || 0) ? 'text-yellow-400' : 'text-gray-300'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">
                    ({(product.ratingsAverage || 0).toFixed(1)})
                  </span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="w-full mt-auto"
              size="sm"
            >
              <ShoppingCart size={16} className="mr-2" />
              {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </Link>
      </motion.div>
    </>
  )
}

// Skeleton version for loading states
export const ProductCardSkeleton = ({ className = '' }) => {
  return (
    <div className={cn('rounded-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col', className)}>
      <div className="aspect-square skeleton-shimmer flex-shrink-0" />
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-end">
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
        <div className="h-4 skeleton-shimmer rounded w-1/2" />
        <div className="h-8 skeleton-shimmer rounded w-full" />
      </div>
    </div>
  )
}
