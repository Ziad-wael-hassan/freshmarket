import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { useState, useEffect } from 'react'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { Search, ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react'

export const Home = () => {
  const navigate = useNavigate()
  const [heroSearch, setHeroSearch] = useState('')
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
        // Extract data arrays from response
        const products = productsRes.data?.data || productsRes.data || []
        const categories = Array.isArray(categoriesRes.data) 
          ? categoriesRes.data 
          : categoriesRes.data?.data || []
        
        setFeaturedProducts(products)
        setCategories(categories.slice(0, 6))
      } catch (error) {
        console.error('Failed to fetch home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
        {/* Background glow effects */}
        <div className="absolute -top-40 -right-40 h-[320px] w-[320px] rounded-full bg-primary-500/10 dark:bg-primary-500/20 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-[260px] w-[260px] rounded-full bg-primary-400/5 dark:bg-emerald-500/10 blur-[80px]" />

        <div className="relative container-main py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-11 lg:items-center">
            {/* Left Column — 55% */}
            <div className="lg:col-span-6 space-y-8">
              <ScrollReveal>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                    Fresh groceries<br />
                    <span className="text-primary-600 dark:text-primary-400">delivered in minutes</span>
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                    Shop fresh produce, organic food, and daily essentials with free delivery on your first order.
                  </p>
                </div>
              </ScrollReveal>

              {/* Search Bar */}
              <ScrollReveal delay={0.1}>
                <div className="max-w-xl">
                  <div className="relative group">
                    <div className="flex items-center bg-gray-100/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full overflow-hidden transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-primary-500/50 group-focus-within:border-primary-500/50">
                      <Search className="ml-5 h-5 w-5 text-gray-400 dark:text-white/50 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search groceries, fruits, vegetables..."
                        value={heroSearch}
                        onChange={(e) => setHeroSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && heroSearch.trim()) {
                            navigate(`/products?keyword=${encodeURIComponent(heroSearch.trim())}`)
                          }
                        }}
                        className="flex-1 bg-transparent h-12 md:h-14 px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-sm md:text-base"
                      />
                      <button
                        onClick={() => {
                          if (heroSearch.trim()) {
                            navigate(`/products?keyword=${encodeURIComponent(heroSearch.trim())}`)
                          }
                        }}
                        className="h-9 md:h-11 px-5 md:px-6 mr-1.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm font-medium transition-all shadow-lg shadow-primary-500/20 flex-shrink-0"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {/* Popular Suggestions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-500">Popular:</span>
                    {['Milk', 'Bread', 'Fruits', 'Protein'].map((item) => (
                      <button
                        key={item}
                        onClick={() => navigate(`/products?keyword=${item}`)}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all text-xs"
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {/* Category Chips */}
                  {categories.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {categories.slice(0, 4).map((cat) => (
                        <Link
                          key={cat._id}
                          to={`/products?category=${cat._id}`}
                          className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-500/20 hover:text-primary-800 dark:hover:text-primary-200 transition-all text-xs"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal delay={0.15}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/products">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25">
                      Order Now
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link
                    to="/categories"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 dark:border-white/20 px-8 text-base font-medium text-gray-700 dark:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/40 active:scale-95"
                  >
                    Explore Menu
                  </Link>
                </div>
              </ScrollReveal>

              {/* Stats */}
              <ScrollReveal delay={0.2}>
                <div className="flex items-center gap-6 md:gap-10 pt-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">10k+</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Products</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200 dark:bg-white/10" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">30min</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Delivery</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200 dark:bg-white/10" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9★</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column — 45% — Floating Product Cards */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <ScrollReveal delay={0.3}>
                {/* Glow behind cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 dark:from-primary-500/20 to-primary-600/5 dark:to-primary-600/10 rounded-full blur-3xl" />

                {!loading && featuredProducts.length > 0 && (
                  <div className="relative grid grid-cols-2 gap-4">
                    {featuredProducts.slice(0, 2).map((product, i) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                        className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:bg-gray-50 dark:hover:bg-white/10 transition-all group"
                      >
                        <Link to={`/products/${product._id}`} className="h-full flex flex-col">
                          <div className="relative overflow-hidden">
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="w-full h-28 md:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-3 flex-1 flex flex-col">
                            <p className="text-xs md:text-sm text-gray-600 dark:text-white/70 line-clamp-2 min-h-[2.5rem]">
                              {product.title}
                            </p>
                            <p className="text-sm md:text-base font-semibold text-primary-600 dark:text-primary-400 mt-auto">
                              ${product.price}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollReveal>
            </div>
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

export default Home
