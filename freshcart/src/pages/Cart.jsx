import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/formatters'
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'

export const Cart = () => {
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

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart — FreshCart</title>
        </Helmet>

        <div className="container-main py-16">
          <ScrollReveal>
            <div className="text-center">
              <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-gray-300 dark:text-gray-600" />
              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                Your cart is empty
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({totalItems}) — FreshCart</title>
      </Helmet>

      <div className="container-main py-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/products"
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <ArrowLeft size={20} />
                Continue Shopping
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Shopping Cart ({totalItems})
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Clear Cart
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/products/${item.product._id}`}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.product._id}`} className="block">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-primary-600 dark:text-gray-100">
                          {item.product.title}
                        </h3>
                      </Link>

                      <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {item.product.brand && <span>Brand: {item.product.brand.name}</span>}
                        {item.product.category && (
                          <span>Category: {item.product.category.name}</span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-xl font-bold text-primary-600">
                          {formatCurrency(item.price)}
                        </span>
                        {item.product.priceAfterDiscount && (
                          <>
                            <span className="text-lg text-gray-500 line-through">
                              {formatCurrency(item.product.price)}
                            </span>
                            <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
                              Save{' '}
                              {Math.round(
                                ((item.product.price - item.price) / item.product.price) * 100
                              )}
                              %
                            </span>
                          </>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.product._id, item.count - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">{item.count}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product._id, item.count + 1)}
                            disabled={item.count >= item.product.quantity}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Subtotal: {formatCurrency(item.price * item.count)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(totalPrice * 0.08)}
                    </span>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-primary-600">
                      {formatCurrency(totalPrice + totalPrice * 0.08)}
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/checkout">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Link>
                  </Button>

                  <Button variant="outline" asChild className="w-full">
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>

                {/* Security Features */}
                <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span>Secure checkout</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span>Free returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </>
  )
}
