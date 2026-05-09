import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '@/services/productService'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { ScrollReveal } from '@/components/common/ScrollReveal'

export const RecentlyViewedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const stored = localStorage.getItem('recentlyViewed')
        const ids = stored ? JSON.parse(stored) : []
        if (ids.length === 0) {
          setLoading(false)
          return
        }

        const promises = ids.slice(0, 4).map((id) =>
          productService.getById(id).catch(() => null)
        )
        const results = await Promise.all(promises)
        setProducts(results.filter(Boolean).map((r) => r.data))
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecent()
  }, [])

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
