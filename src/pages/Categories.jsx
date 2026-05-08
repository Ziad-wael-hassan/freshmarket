import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { categoryService } from '@/services/categoryService'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { LazyImage } from '@/components/common/LazyImage'
import { getErrorMessage } from '@/utils/getErrorMessage'

export const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await categoryService.getAll()
        setCategories(response.data?.data || response.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="container-main py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-64 mb-8" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-main py-8">
        <ErrorState title="Failed to load categories" message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Categories — FreshCart</title>
      </Helmet>

      <div className="container-main py-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shop by Category</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Browse our wide selection of categories
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <ScrollReveal key={category._id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Link
                  to={`/products?category=${category._id}`}
                  className="group relative block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <LazyImage
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
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

export default Categories
