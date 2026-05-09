import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { productService } from '@/services/productService'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useCartFly } from '@/components/cart/CartFlyAnimation'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { ImageZoom } from '@/components/product/ImageZoom'
import { ReviewsSection } from '@/components/product/ReviewsSection'
import { StickyMobileAddToCart } from '@/components/product/StickyMobileAddToCart'
import { RecentlyViewedProducts } from '@/components/product/RecentlyViewedProducts'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { formatCurrency } from '@/utils/formatters'
import { normalizeProduct, unwrapApiCollection } from '@/utils/apiData'
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus as MinusIcon,
  Plus as PlusIcon,
} from 'lucide-react'
import toast from 'react-hot-toast'

export const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showStickyBar, setShowStickyBar] = useState(false)

  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { flyItemToCart } = useCartFly()

  const resolvedProduct = normalizeProduct(product)
  const isWishlisted = isInWishlist(resolvedProduct?._id)

  useEffect(() => {
    let isMounted = true

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productService.getById(id)
        const productData = normalizeProduct(response)

        if (isMounted) {
          setProduct(productData)
          setSelectedImage(0)
          addToRecentlyViewed(id)
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (id) {
      fetchProduct()
    }

    return () => {
      isMounted = false
    }
  }, [addToRecentlyViewed, id])

  useEffect(() => {
    let isMounted = true

    const fetchRelatedProducts = async () => {
      if (!product?.category) return

      try {
        setRelatedLoading(true)
        const response = await productService.getRelated(product.category._id, 4)
        if (isMounted) {
          setRelatedProducts(unwrapApiCollection(response).map((item) => normalizeProduct(item)).filter(Boolean))
        }
      } catch (err) {
        if (isMounted) {
          setRelatedProducts([])
        }
      } finally {
        if (isMounted) {
          setRelatedLoading(false)
        }
      }
    }

    if (product) {
      fetchRelatedProducts()
    }

    return () => {
      isMounted = false
    }
  }, [product])

  useEffect(() => {
    const handler = () => {
      const productInfo = document.getElementById('product-actions')
      if (productInfo) {
        const rect = productInfo.getBoundingClientRect()
        setShowStickyBar(window.innerWidth < 1024 && rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [loading])

  const handleAddToCart = async () => {
    if (!resolvedProduct) return

    const mainImage = document.querySelector('#main-product-image')
    if (mainImage) {
      flyItemToCart(resolvedProduct.imageCover, mainImage.getBoundingClientRect())
    }

    const result = await addItem(resolvedProduct, quantity)
    if (result.success) {
      toast.success('Added to cart!')
    } else {
      toast.error('Failed to add to cart')
    }
  }

  const handleToggleWishlist = async () => {
    if (!resolvedProduct) return

    const result = await toggleItem(resolvedProduct)
    if (result.requiresAuth) {
      return
    }

    if (result.success) {
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
    } else {
      toast.error('Failed to update wishlist')
    }
  }

  const updateQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, resolvedProduct?.quantity || 1)))
  }

  if (loading) {
    return (
      <div className="container-main py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState title="Failed to load product" message={error} />
  }

  if (!resolvedProduct) {
    return <ErrorState title="Product not found" />
  }

  const productTitle =
    typeof resolvedProduct.title === 'string' && resolvedProduct.title.trim()
      ? resolvedProduct.title.trim()
      : 'Product'
  const images = [resolvedProduct.imageCover, ...(resolvedProduct.images || [])].filter(Boolean)
  const hasDiscount =
    resolvedProduct.priceAfterDiscount && resolvedProduct.priceAfterDiscount < resolvedProduct.price

  return (
    <>
      <Helmet>
        <title>{`${productTitle} — FreshCart`}</title>
        <meta
          name="description"
          content={resolvedProduct.description?.slice(0, 155) || 'Product details'}
        />
      </Helmet>

      <div className="container-main py-8 pb-32 lg:pb-8">
        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100">{resolvedProduct.title}</span>
          </nav>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <ScrollReveal>
            <div className="space-y-4">
              {/* Main Image with Zoom */}
              <ImageZoom src={images[selectedImage]} alt={resolvedProduct.title} />

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary-500'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${resolvedProduct.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100 break-words" dir="auto">
                  {resolvedProduct.title}
                </h1>

                {/* Rating */}
                {resolvedProduct.ratingsAverage > 0 && (
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(resolvedProduct.ratingsAverage)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {resolvedProduct.ratingsAverage.toFixed(1)} ({resolvedProduct.ratingsQuantity || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary-600" dir="ltr">
                    {formatCurrency(hasDiscount ? resolvedProduct.priceAfterDiscount : resolvedProduct.price)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-gray-500 line-through dark:text-gray-400" dir="ltr">
                        {formatCurrency(resolvedProduct.price)}
                      </span>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
                        Save{' '}
                        {Math.round(
                          ((resolvedProduct.price - resolvedProduct.priceAfterDiscount) / resolvedProduct.price) * 100
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {resolvedProduct.quantity > 10 ? (
                    <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      In Stock ({resolvedProduct.quantity} available)
                    </span>
                  ) : resolvedProduct.quantity > 0 ? (
                    <span className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      Only {resolvedProduct.quantity} left in stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-red-600 dark:text-red-400">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div id="product-actions" className="flex items-center gap-4">
                <span className="font-medium text-gray-900 dark:text-gray-100">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600">
                  <button
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    <MinusIcon size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(1)}
                    disabled={quantity >= (resolvedProduct.quantity || 1)}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={resolvedProduct.quantity === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {resolvedProduct.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleWishlist}
                  className={
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:border-red-800 dark:text-red-300'
                      : ''
                  }
                >
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <Truck className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <RotateCcw className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Easy Returns</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed break-words" dir="auto">
                  {resolvedProduct.description || 'No description available for this product.'}
                </p>
              </div>

              {/* Brand & Category */}
              <div className="flex flex-wrap gap-4 text-sm">
                {resolvedProduct.brand && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Brand:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {resolvedProduct.brand.name}
                    </span>
                  </div>
                )}
                {resolvedProduct.category && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Category:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {resolvedProduct.category.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Reviews Section */}
        <ScrollReveal>
          <ReviewsSection
            productId={resolvedProduct._id}
            ratingsAverage={resolvedProduct.ratingsAverage}
            ratingsQuantity={resolvedProduct.ratingsQuantity}
          />
        </ScrollReveal>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Related Products
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  You might also like these products
                </p>
              </div>
            </ScrollReveal>

            {relatedLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct, index) => (
                  <ScrollReveal key={relatedProduct._id} delay={index * 0.1}>
                    <ProductCard product={relatedProduct} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Recently Viewed */}
        <RecentlyViewedProducts />
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <StickyMobileAddToCart
        visible={showStickyBar}
        product={resolvedProduct}
        quantity={quantity}
        onQuantityChange={updateQuantity}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}

export default ProductDetail
