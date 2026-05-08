import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { LazyImage } from '@/components/common/LazyImage'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/formatters'
import { cn } from '@/utils/cn'
import toast from 'react-hot-toast'

export const ProductCard = ({ product, className = '' }) => {
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product._id)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await addItem(product._id)
    if (result.success) {
      toast.success('Added to cart!')
    } else {
      toast.error('Failed to add to cart')
    }
  }

  const handleToggleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await toggleItem(product._id)
    if (result.success) {
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
    } else {
      toast.error('Failed to update wishlist')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      <Link to={`/products/${product._id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <LazyImage
            src={product.imageCover}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20',
                  isWishlisted && 'bg-red-500 text-white hover:bg-red-600'
                )}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Quick view"
              >
                <Eye size={16} />
              </motion.button>
            </div>
          </div>

          {/* Stock Status Badge */}
          {product.quantity <= 5 && product.quantity > 0 && (
            <div className="absolute top-3 left-3 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
              Only {product.quantity} left
            </div>
          )}

          {product.quantity === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-lg bg-gray-900 px-3 py-1 text-sm font-medium text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {product.title}
          </h3>

          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-bold text-primary-600">
              {formatCurrency(product.price)}
            </span>
            {product.priceAfterDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.priceAfterDiscount)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.ratingsAverage && (
            <div className="mb-3 flex items-center gap-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.floor(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.ratingsAverage.toFixed(1)})
              </span>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className="w-full"
            size="sm"
          >
            <ShoppingCart size={16} className="mr-2" />
            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </Link>
    </motion.div>
  )
}

// Skeleton version for loading states
export const ProductCardSkeleton = ({ className = '' }) => {
  return (
    <div className={cn('rounded-xl border border-gray-200 dark:border-gray-700', className)}>
      <div className="aspect-square skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
        <div className="h-4 skeleton-shimmer rounded w-1/2" />
        <div className="h-8 skeleton-shimmer rounded w-full" />
      </div>
    </div>
  )
}
