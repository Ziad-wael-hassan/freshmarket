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
      <section className="relative py-24 overflow-hidden">
        {/* Subtle Radial Atmosphere Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <div className="container-main relative z-10">
          <ScrollReveal>
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
                Why Choose FreshCart?
              </h2>
              <p className="text-base md:text-lg text-text-secondary font-medium leading-relaxed opacity-70">
                Experience the pinnacle of grocery shopping with our premium service 
                tailored for your modern lifestyle.
              </p>
            </div>
          </ScrollReveal>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative flex flex-col h-full rounded-[2rem] border border-border-custom bg-surface/40 backdrop-blur-xl p-8 text-center shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] hover:border-primary-500/50 hover:bg-surface/60 overflow-hidden"
                >
                  {/* Subtle Inner Glow for Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  {/* Icon Container with Radial Glow */}
                  <div className="relative mb-8 mx-auto">
                    {/* Background Radial Glow */}
                    <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_12px_24px_rgba(34,197,94,0.5)] transition-all duration-500">
                      <feature.icon className="h-8 w-8 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-text-primary tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    {feature.description}
                  </p>
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
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Shop by Category
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our wide range of product categories
                </p>
              </div>
              <Link to="/categories" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">
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
                        className="group aspect-square overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg dark:bg-gray-800 border border-border-custom h-full flex flex-col"
                      >
                        <div className="flex flex-1 items-center justify-center p-6">
                          <div className="text-center">
                            <div className="mb-4 transform transition-transform group-hover:scale-110 duration-500">
                              {category.image ? (
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="h-16 w-16 md:h-20 md:w-20 rounded-2xl object-cover shadow-sm mx-auto"
                                />
                              ) : (
                                <span className="text-5xl block">📦</span>
                              )}
                            </div>
                            <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
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
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Featured Products
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover our most popular and trending products
                </p>
              </div>
              <Link to="/products" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">
                  View All
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
