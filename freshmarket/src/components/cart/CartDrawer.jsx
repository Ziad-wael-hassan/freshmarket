import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/formatters'
import { X, ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'

export const CartDrawer = ({ isOpen, onClose }) => {
  const { items, updateItem, removeItem, clearCart, totalItems, totalPrice } = useCart()

  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return
    const productId = item.productId || item._id

    const result = await updateItem(productId, newQuantity)
    if (!result.success) {
      toast.error('Failed to update quantity')
    }
  }

  const handleRemoveItem = async (item) => {
    const productId = item.productId || item._id
    const result = await removeItem(productId)
    if (result.success) {
      toast.success('Item removed from cart')
    } else {
      toast.error('Failed to remove item')
    }
  }

  const handleClearCart = async () => {
    const result = await clearCart()
    if (result.success) {
      toast.success('Cart cleared')
    } else {
      toast.error('Failed to clear cart')
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1090] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-[1100] flex w-full flex-col overflow-hidden border-l border-border-custom bg-card shadow-2xl dark:bg-[#161b27] md:max-w-md"
          >
            {/* Header - fixed height */}
            <div className="flex shrink-0 items-center justify-between border-b border-border-custom p-6">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-text-primary">
                  Shopping Cart ({totalItems})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-text-secondary hover:bg-muted hover:text-text-primary"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items - scrolls independently */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-text-secondary/40" />
                  <h3 className="mb-2 text-lg font-medium text-text-primary">
                    Your cart is empty
                  </h3>
                  <p className="mb-6 text-text-secondary">
                    Add some products to get started
                  </p>
                  <Button onClick={onClose} asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item._id || item.productId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 rounded-lg border border-border-custom bg-surface p-4"
                    >
                      {/* Product Image */}
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={item?.image || '/placeholder-product.png'}
                          alt={item?.title || 'Product'}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item?.productId || item?._id}`}
                          onClick={onClose}
                          className="block"
                        >
                          <h4 className="truncate text-sm font-medium text-text-primary hover:text-primary-600">
                            {item?.title || 'Untitled Product'}
                          </h4>
                        </Link>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-primary-600" dir="ltr">
                            {formatCurrency(item?.price || 0)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item, (item.quantity || item.count || 1) - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-border-custom text-text-secondary hover:bg-muted"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity || item.count || 0}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item, (item.quantity || item.count || 0) + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-border-custom text-text-secondary hover:bg-muted"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - fixed height, always visible */}
            {items.length > 0 && (
              <div className="shrink-0 border-t border-border-custom p-6">
                <div className="mb-4 flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600" dir="ltr">{formatCurrency(totalPrice)}</span>
                </div>

                <div className="space-y-3">
                  <Button onClick={onClose} asChild className="w-full">
                    <Link to="/cart">View Full Cart</Link>
                  </Button>
                  <button
                    onClick={handleClearCart}
                    className="w-full text-center text-sm text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )

}
