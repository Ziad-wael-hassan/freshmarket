import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { Heart, ShoppingBag, ArrowLeft, Trash2, ShoppingCart } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import toast from 'react-hot-toast'

export const Wishlist = () => {
  const { items, clearWishlist, loading } = useWishlist()
  const { addItem } = useCart()

  const handleAddAllToCart = async () => {
    let successCount = 0
    for (const item of items) {
      const result = await addItem(item._id)
      if (result.success) successCount++
    }
    if (successCount > 0) {
      toast.success(`Successfully added ${successCount} items to your cart!`)
    }
  }

  if (loading) {
    return (
      <div className="container-main py-12">
        <div className="mb-12">
          <div className="h-10 w-48 rounded-2xl bg-surface skeleton-shimmer mb-4" />
          <div className="h-6 w-64 rounded-xl bg-surface skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        <div className="container-main py-20">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto rounded-3xl border border-border-custom border-dashed bg-surface overflow-hidden shadow-sm">
              <EmptyState
                icon={Heart}
                title="Your wishlist is empty"
                description="Save items you love for later. Start browsing and add some products to your wishlist to keep track of what you want!"
                actionLabel="Explore Products"
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
        <title>My Wishlist ({items.length}) — FreshCart</title>
      </Helmet>

      <div className="container-main py-12">
        <ScrollReveal>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Link
                to="/products"
                className="group mb-4 inline-flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <ArrowLeft size={16} />
                </div>
                <span className="font-semibold tracking-tight">Continue Shopping</span>
              </Link>
              <h1 className="text-4xl font-bold tracking-tight text-text-primary font-display">My Wishlist</h1>
              <p className="text-lg text-text-secondary font-body mt-2">
                You have <span className="text-text-primary font-bold">{items.length} items</span> saved for later
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                onClick={handleAddAllToCart}
                className="rounded-full px-8 border-border-custom hover:bg-primary-500/10 hover:text-primary-500 font-bold"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add All to Cart
              </Button>
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="text-red-500 hover:bg-red-500/10 border-red-500/20 rounded-full px-8 font-bold transition-all"
              >
                <Trash2 size={18} className="mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product, index) => (
            <ScrollReveal key={product._id} delay={index * 0.05}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {/* Summary Footer */}
        <ScrollReveal delay={0.2}>
          <div className="mt-20 rounded-[2.5rem] border border-border-custom bg-surface p-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-inner">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary tracking-tight font-display">
                    Ready to complete your look?
                  </h3>
                  <p className="text-text-secondary font-medium mt-1">
                    Your saved items are waiting for you in the cart.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Button variant="outline" asChild className="flex-1 md:flex-none rounded-2xl py-6 px-10 border-border-custom text-lg font-bold">
                  <Link to="/cart">View Shopping Cart</Link>
                </Button>
                <Button asChild className="flex-1 md:flex-none rounded-2xl py-6 px-10 text-lg font-bold shadow-lg shadow-primary-500/25 transition-all hover:translate-y-[-2px]">
                  <Link to="/checkout">Checkout Now</Link>
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
