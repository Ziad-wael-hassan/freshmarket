import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { useState, useEffect } from 'react'
import { productService } from '@/services/productService'
import { useFilters } from '@/context/FilterContext'
import { normalizeProduct, unwrapApiCollection } from '@/utils/apiData'
import Hero from '@/components/home/Hero'
import { BrandsRow } from '@/components/home/BrandsRow'
import { Testimonials } from '@/components/home/Testimonials'
import { HomeCTA } from '@/components/home/HomeCTA'
import { Star, Truck, Shield, Headphones, ArrowRight } from 'lucide-react'

export const Home = () => {
  const { activeCategories } = useFilters()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const productsRes = await productService.getAll({ limit: 8 })
        const products = unwrapApiCollection(productsRes)
          .map((product) => normalizeProduct(product))
          .filter(Boolean)

        if (isMounted) {
          setFeaturedProducts(products)
        }
      } catch {
        if (isMounted) {
          setFeaturedProducts([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment processing',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Customer support available anytime',
    },
    {
      icon: Star,
      title: 'Quality Guarantee',
      description: 'Premium quality products only',
    },
  ]

  return (
    <>
      <Helmet>
        <title>FreshCart — Premium E-Commerce Experience</title>
        <meta
          name="description"
          content="Discover amazing products with fast delivery and secure payments."
        />
      </Helmet>

      <Hero />

      {/* Features Section */}
      <section className="py-16">
        <div className="container-main">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                Why Choose FreshCart?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to providing the best shopping experience
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                    <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-main">
          <ScrollReveal>
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Shop by Category
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our wide range of product categories
                </p>
              </div>
              <Link to="/categories">
                <Button variant="outline">
                  View All
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
                ))
              : activeCategories.slice(0, 6).map((category, index) => (
                  <ScrollReveal key={category._id} delay={index * 0.1}>
                    <Link to={`/products?category=${category._id}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="group aspect-square overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
                      >
                        <div className="flex h-full items-center justify-center p-6">
                          <div className="text-center">
                            <div className="mb-3 text-4xl">
                              {category.image ? (
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="h-16 w-16 rounded-lg object-cover"
                                />
                              ) : (
                                '📦'
                              )}
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {category.name}
                            </h3>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </ScrollReveal>
                ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-main">
          <ScrollReveal>
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Featured Products
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover our most popular and trending products
                </p>
              </div>
              <Link to="/products">
                <Button variant="outline">
                  View All
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <ScrollReveal key={product._id} delay={index * 0.1}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brands Row - Pass 3 */}
      <BrandsRow />

      {/* Testimonials - Pass 3 */}
      <Testimonials />

      {/* Final CTA - Pass 3 */}
      <HomeCTA />
    </>
  )
}

export default Home
