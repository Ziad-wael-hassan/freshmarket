import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { formatCurrency } from '@/utils/formatters'
import { Heart, ShoppingCart, ShoppingBag, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export const Wishlist = () => {
  const { items, removeItem, clearWishlist, loading } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = async (product) => {
    const result = await addItem(product._id)
    if (result.success) {
      toast.success('Added to cart!')
    } else {
      toast.error('Failed to add to cart')
    }
  }

  const handleRemoveFromWishlist = async (productId) => {
    const result = await removeItem(productId)
    if (result.success) {
      toast.success('Removed from wishlist')
    } else {
      toast.error('Failed to remove from wishlist')
    }
  }

  const handleClearWishlist = async () => {
    const result = await clearWishlist()
    if (result.success) {
      toast.success('Wishlist cleared')
    } else {
      toast.error('Failed to clear wishlist')
    }
  }

  const handleAddAllToCart = async () => {
    let successCount = 0
    let failCount = 0

    for (const item of items) {
      const result = await addItem(item._id)
      if (result.success) {
        successCount++
      } else {
        failCount++
      }
    }

    if (successCount > 0) {
      toast.success(`Added ${successCount} items to cart`)
    }
    if (failCount > 0) {
      toast.error(`Failed to add ${failCount} items to cart`)
    }
  }

  if (loading) {
    return (
      <div className="container-main py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>My Wishlist — FreshCart</title>
        </Helmet>

        <div className="container-main py-16">
          <ScrollReveal>
            <div className="text-center">
              <Heart className="mx-auto mb-6 h-24 w-24 text-gray-300 dark:text-gray-600" />
              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                Your wishlist is empty
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Save items you love for later. Start browsing and add some products to your
                wishlist.
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
        <title>My Wishlist ({items.length}) — FreshCart</title>
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
              <Heart className="h-6 w-6 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                My Wishlist ({items.length})
              </h1>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleAddAllToCart}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={16} />
                Add All to Cart
              </Button>
              <Button
                variant="outline"
                onClick={handleClearWishlist}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Clear Wishlist
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product, index) => (
            <ScrollReveal key={product._id} delay={index * 0.1}>
              <div className="group relative">
                <ProductCard product={product} />

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-3">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Summary */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-primary-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Ready to checkout?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {items.length} items in your wishlist
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link to="/cart">View Cart</Link>
                </Button>
                <Button asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default Wishlist
