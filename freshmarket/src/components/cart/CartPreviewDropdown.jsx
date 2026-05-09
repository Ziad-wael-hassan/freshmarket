import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { useClickOutside } from '@/hooks/useClickOutside'
import { formatCurrency } from '@/utils/formatters'
import { ShoppingBag, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export const CartPreviewDropdown = ({ isOpen, onClose }) => {
  const { items, removeItem, totalPrice, totalItems } = useCart()
  const ref = useClickOutside(onClose, isOpen)

  const handleRemove = async (item, e) => {
    e.preventDefault()
    e.stopPropagation()
    const result = await removeItem(item)
    if (result.success) {
      toast.success('Item removed')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Cart ({totalItems})
              </h3>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center py-6 text-center">
                <ShoppingBag className="mb-2 h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.slice(0, 3).map((item) => (
                  <Link
                    key={item.product._id}
                    to={`/products/${item.product._id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400" dir="ltr">
                        {item.count} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleRemove(item, e)}
                      className="flex-shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </Link>
                ))}
                {items.length > 3 && (
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    +{items.length - 3} more items
                  </p>
                )}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-100">Total</span>
                <span className="font-semibold text-primary-600" dir="ltr">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="space-y-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block w-full rounded-lg bg-primary-500 py-2 text-center text-sm font-medium text-white hover:bg-primary-600"
                >
                  View Cart
                </Link>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block w-full rounded-lg border border-gray-300 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  View Cart
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
