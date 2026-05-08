import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProduct } from '@/hooks/useProduct'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/formatters'
import { X, Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

export const QuickViewModal = ({ isOpen, onClose, productId }) => {
  const { product, loading } = useProduct(productId)
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)

  const isWishlisted = isInWishlist(productId)
  const hasDiscount = product?.priceAfterDiscount && product.priceAfterDiscount < product.price

  const handleAddToCart = async () => {
    const result = await addItem(productId)
    if (result.success) {
      toast.success('Added to cart!')
      onClose()
    } else {
      toast.error('Failed to add to cart')
    }
  }

  const handleToggleWishlist = async () => {
    const result = await toggleItem(productId)
    if (result.success) {
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-800"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>

              {loading ? (
                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                  <div className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
                  <div className="space-y-4">
                    <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              ) : !product ? (
                <div className="p-8 text-center text-gray-500">Product not found</div>
              ) : (
                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                  <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {product.title}
                    </h2>

                    {product.ratingsAverage && (
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < Math.floor(product.ratingsAverage)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity || 0})
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary-600">
                        {formatCurrency(hasDiscount ? product.priceAfterDiscount : product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600">
                        <button
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(q => Math.min(q + 1, product.quantity || 1))}
                          className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleAddToCart} className="flex-1" disabled={product.quantity === 0}>
                        <ShoppingCart size={16} className="mr-2" />
                        {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleToggleWishlist}
                        className={isWishlisted ? 'text-red-600 border-red-200' : ''}
                      >
                        <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
