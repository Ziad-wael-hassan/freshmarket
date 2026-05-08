import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { brandService } from '@/services/brandService'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { LazyImage } from '@/components/common/LazyImage'
import { getErrorMessage } from '@/utils/getErrorMessage'

export const Brands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await brandService.getAll()
        setBrands(response.data?.data || response.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  if (loading) {
    return (
      <div className="container-main py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-64 mb-8" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-main py-8">
        <ErrorState title="Failed to load brands" message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Brands — FreshCart</title>
      </Helmet>

      <div className="container-main py-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shop by Brand</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Discover products from top brands
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <ScrollReveal key={brand._id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Link
                  to={`/products?brand=${brand._id}`}
                  className="group relative block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="aspect-square overflow-hidden bg-gray-50 p-8 dark:bg-gray-700">
                    <LazyImage
                      src={brand.image}
                      alt={brand.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{brand.name}</h3>
                  </div>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  )
}

export default Brands
