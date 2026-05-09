import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ShoppingCart } from 'lucide-react'

export const StickyMobileAddToCart = ({ visible, product, quantity, onQuantityChange, onAddToCart }) => {
  if (!product) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] dark:border-gray-700 dark:bg-gray-900 lg:hidden"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600">
              <button
                onClick={() => onQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400"
              >
                -
              </button>
              <span className="px-4 py-2 font-medium min-w-[2.5rem] text-center">{quantity}</span>
              <button
                onClick={() => onQuantityChange(1)}
                disabled={quantity >= (product.quantity || 1)}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400"
              >
                +
              </button>
            </div>
            <Button
              onClick={onAddToCart}
              disabled={product.quantity === 0}
              className="flex-1"
              size="lg"
            >
              <ShoppingCart size={18} className="mr-2" />
              {product.quantity === 0 ? 'Out of Stock' : `Add to Cart`}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
