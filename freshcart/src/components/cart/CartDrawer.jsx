import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/formatters'
import { X, ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'

export const CartDrawer = ({ isOpen, onClose }) => {
  const { items, updateItem, removeItem, clearCart, totalItems, totalPrice } = useCart()

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return

    const result = await updateItem(productId, newQuantity)
    if (!result.success) {
      toast.error('Failed to update quantity')
    }
  }

  const handleRemoveItem = async (productId) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl dark:bg-gray-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Shopping Cart ({totalItems})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Your cart is empty
                  </h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
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
                      key={item.product._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                    >
                      {/* Product Image */}
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.product._id}`}
                          onClick={onClose}
                          className="block"
                        >
                          <h4 className="truncate text-sm font-medium text-gray-900 hover:text-primary-600 dark:text-gray-100">
                            {item.product.title}
                          </h4>
                        </Link>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-primary-600">
                            {formatCurrency(item.price)}
                          </span>
                          {item.product.priceAfterDiscount && (
                            <span className="text-xs text-gray-500 line-through">
                              {formatCurrency(item.product.price)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.product._id, item.count - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.count}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product._id, item.count + 1)}
                            disabled={item.count >= item.product.quantity}
                            className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 dark:border-gray-700">
                <div className="mb-4 flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600">{formatCurrency(totalPrice)}</span>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleClearCart} variant="outline" className="w-full">
                    Clear Cart
                  </Button>
                  <Button onClick={onClose} asChild className="w-full">
                    <Link to="/cart">View Full Cart</Link>
                  </Button>
                  <Button onClick={onClose} asChild className="w-full">
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
