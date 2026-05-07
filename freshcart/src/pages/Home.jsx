import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { useState, useEffect } from 'react'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react'

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productService.getAll({ limit: 8 }),
          categoryService.getAll(),
        ])
        setFeaturedProducts(productsRes.data.data || [])
        setCategories(categoriesRes.data?.slice(0, 6) || [])
      } catch (error) {
        console.error('Failed to fetch home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const heroSlides = [
    {
      title: 'Fresh & Quality Products',
      subtitle: 'Discover amazing deals on premium products',
      cta: 'Shop Now',
      image: '/api/placeholder/600/400',
    },
    {
      title: 'Fast & Free Delivery',
      subtitle: 'Get your orders delivered quickly',
      cta: 'Learn More',
      image: '/api/placeholder/600/400',
    },
  ]

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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-main py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 lg:text-6xl">
                  Welcome to <span className="text-primary-600">FreshCart</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 lg:text-xl">
                  Your premium destination for quality products, exceptional service, and unbeatable
                  deals.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link to="/products">
                    <Button size="lg" className="w-full sm:w-auto">
                      Shop Now
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Browse Categories
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 p-8">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4 text-6xl">🛒</div>
                      <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-200">
                        Premium Shopping
                      </h3>
                      <p className="text-primary-600 dark:text-primary-300">Experience the best</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
              : categories.map((category, index) => (
                  <ScrollReveal key={category._id} delay={index * 0.1}>
                    <Link to={`/categories/${category._id}`}>
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

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 text-white">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Ready to Start Shopping?</h2>
            <p className="mb-8 text-lg opacity-90 lg:text-xl">
              Join thousands of satisfied customers and experience premium shopping
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Get Started Today
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
