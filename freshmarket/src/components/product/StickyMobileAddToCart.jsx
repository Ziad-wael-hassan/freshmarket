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
          className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-border-custom bg-surface/95 backdrop-blur-xl p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.1)] lg:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-muted/50 rounded-xl border border-border-custom overflow-hidden">
              <button
                onClick={() => onQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-12 h-12 flex items-center justify-center text-text-primary hover:bg-primary-500/10 disabled:opacity-30 transition-colors"
                aria-label="Decrease quantity"
              >
                <span className="text-xl font-medium">−</span>
              </button>
              <span className="w-10 text-center font-bold text-base text-text-primary">{quantity}</span>
              <button
                onClick={() => onQuantityChange(1)}
                disabled={quantity >= (product.quantity || 1)}
                className="w-12 h-12 flex items-center justify-center text-text-primary hover:bg-primary-500/10 disabled:opacity-30 transition-colors"
                aria-label="Increase quantity"
              >
                <span className="text-xl font-medium">+</span>
              </button>
            </div>
            <Button
              onClick={onAddToCart}
              disabled={product.quantity === 0}
              className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20 active:scale-95 transition-transform"
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
