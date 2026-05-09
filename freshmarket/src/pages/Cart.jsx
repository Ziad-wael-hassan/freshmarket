import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/context/AuthContext'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/formatters'
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import toast from 'react-hot-toast'

export const Cart = () => {
  const { items, updateItem, removeItem, clearCart, totalItems, totalPrice, cartId } = useCart()
  const { isAuthenticated } = useAuth()
  const [discount] = useState(0)
  const cartItemCount = Number.isFinite(totalItems) ? totalItems : items.length
  const cartPageTitle = `Shopping Cart${cartItemCount > 0 ? ` (${cartItemCount})` : ''} — FreshCart`

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

  const subtotal = totalPrice
  const discountAmount = subtotal * (discount / 100)
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + tax

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart — FreshCart</title>
        </Helmet>

        <div className="container-main py-20">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto rounded-3xl border border-border-custom border-dashed bg-surface overflow-hidden shadow-sm">
              <EmptyState
                icon={ShoppingBag}
                title="Your cart is empty"
                description="Looks like you haven't added any items to your cart yet. Explore our latest fashion and accessories to find something you love!"
                actionLabel="Start Shopping"
                actionLink="/products"
              />
            </div>
          </ScrollReveal>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{cartPageTitle}</title>
      </Helmet>

      <div className="container-main py-12">
        <ScrollReveal>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-3 font-display">Shopping Cart</h1>
              <p className="text-lg text-text-secondary font-body">
                You have <span className="text-text-primary font-bold">{cartItemCount} items</span> in your cart
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                asChild
                className="rounded-full px-6 border-border-custom"
              >
                <Link to="/products" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 hover:bg-red-500/10 border-red-500/20 rounded-full px-6 transition-all duration-300"
              >
                <Trash2 size={18} className="mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <ScrollReveal key={item._id || item.productId} delay={index * 0.05}>
                <div className="group relative flex flex-col sm:flex-row gap-6 rounded-3xl border border-border-custom bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary-500/30">
                  {/* Product Image */}
                  <Link
                    to={`/products/${item?.productId || item?._id}`}
                    className="h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0 overflow-hidden rounded-2xl bg-muted shadow-inner"
                  >
                    <img
                      src={item?.image || '/placeholder-product.png'}
                      alt={item?.title || 'Product'}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <Link to={`/products/${item?.productId || item?._id}`}>
                        <h3 className="text-xl font-bold text-text-primary hover:text-primary-500 transition-colors line-clamp-1 font-display">
                          {item?.title || 'Untitled Product'}
                        </h3>
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="p-2 rounded-full text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary/60 font-body">
                      {item.brand && <span>Brand: {item.brand}</span>}
                      {item.category && (
                        <>
                          <span className="opacity-30">•</span>
                          <span>{item.category}</span>
                        </>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-text-primary" dir="ltr">
                            {formatCurrency(item.price || 0)}
                          </span>
                      </div>

                      <div className="flex items-center gap-4 bg-muted/50 p-1.5 rounded-2xl border border-border-custom shadow-inner">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateQuantity(item, (item.quantity || item.count || 1) - 1)}
                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface text-text-primary hover:bg-primary-500 hover:text-white transition-all shadow-sm border border-border-custom"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-bold text-lg font-display">{item.quantity || item.count || 0}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item, (item.quantity || item.count || 0) + 1)}
                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface text-text-primary hover:bg-primary-500 hover:text-white transition-all shadow-sm border border-border-custom disabled:opacity-30"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div className="sticky top-24 rounded-3xl border border-border-custom bg-surface p-8 shadow-xl">
                <h2 className="mb-8 text-2xl font-bold text-text-primary tracking-tight font-display">
                  Order Summary
                </h2>

                <div className="space-y-5 mb-8 font-body">
                  <div className="flex justify-between text-lg">
                    <span className="text-text-secondary font-medium">Subtotal</span>
                    <span className="font-bold text-text-primary" dir="ltr">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-text-secondary font-medium">Shipping</span>
                    <span className="font-black text-green-500 uppercase tracking-widest text-xs">Free</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-text-secondary font-medium">Estimated Tax</span>
                    <span className="font-bold text-text-primary" dir="ltr">{formatCurrency(tax)}</span>
                  </div>
                  
                  <div className="pt-6 border-t border-border-custom">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1 opacity-60">Total Amount</p>
                        <p className="text-4xl font-black text-text-primary tracking-tighter font-display" dir="ltr">
                          {formatCurrency(total)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button asChild className="w-full rounded-2xl py-7 text-lg font-bold shadow-lg shadow-primary-500/25 transition-all duration-300 hover:translate-y-[-2px]" size="lg">
                      <Link to={isAuthenticated && cartId ? `/checkout/${cartId}` : '/login'}>
                        {isAuthenticated && cartId ? 'Checkout Now' : 'Log In to Checkout'}
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-6 opacity-20 grayscale transition-all duration-500 hover:opacity-50">
                    <CreditCard size={24} />
                    <div className="h-4 w-8 bg-text-secondary/20 rounded-sm" />
                    <div className="h-4 w-8 bg-text-secondary/20 rounded-sm" />
                    <div className="h-4 w-8 bg-text-secondary/20 rounded-sm" />
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

export default Cart
