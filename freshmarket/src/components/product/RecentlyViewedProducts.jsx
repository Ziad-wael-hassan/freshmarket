import { useState, useEffect } from 'react'
import { productService } from '@/services/productService'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { normalizeProduct } from '@/utils/apiData'

export const RecentlyViewedProducts = () => {
  const { recentIds } = useRecentlyViewed()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchRecent = async () => {
      try {
        if (recentIds.length === 0) {
          if (isMounted) {
            setProducts([])
            setLoading(false)
          }
          return
        }

        if (isMounted) {
          setLoading(true)
        }

        const promises = recentIds.slice(0, 4).map((id) => productService.getById(id).catch(() => null))
        const results = await Promise.all(promises)
        const normalizedProducts = results
          .filter(Boolean)
          .map((response) => normalizeProduct(response))
          .filter(Boolean)

        if (isMounted) {
          setProducts(normalizedProducts)
        }
      } catch {
        if (isMounted) {
          setProducts([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchRecent()

    return () => {
      isMounted = false
    }
  }, [recentIds])

  if (!loading && products.length === 0) return null

  return (
    <section className="py-12">
      <div className="container-main">
        <ScrollReveal>
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Recently Viewed
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product, index) => (
                <ScrollReveal key={product._id || `recent-${index}`} delay={index * 0.1}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
        </div>
      </div>
    </section>
  )
}
