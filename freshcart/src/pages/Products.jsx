import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import { brandService } from '@/services/brandService'
import { useDebounce } from '@/hooks/useDebounce'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { ErrorState } from '@/components/ui/ErrorState'
import { Button } from '@/components/ui/Button'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { Filter, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/utils/cn'

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    sort: searchParams.get('sort') || '-createdAt',
    page: parseInt(searchParams.get('page')) || 1,
    limit: 20,
  })

  const debouncedKeyword = useDebounce(filters.keyword, 500)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value.toString())
      }
    })
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const params = {
          ...filters,
          keyword: debouncedKeyword,
        }
        const response = await productService.getAll(params)
        setProducts(response.data.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters, debouncedKeyword])

  // Fetch categories and brands
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          categoryService.getAll(),
          brandService.getAll(),
        ])
        setCategories(categoriesRes.data || [])
        setBrands(brandsRes.data || [])
      } catch (err) {
        console.error('Failed to fetch filters:', err)
      }
    }

    fetchFilters()
  }, [])

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1, // Reset to page 1 when other filters change
    }))
  }

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      brand: '',
      sort: '-createdAt',
      page: 1,
      limit: 20,
    })
  }

  const sortOptions = [
    { value: '-createdAt', label: 'Newest' },
    { value: '-sold', label: 'Best Selling' },
    { value: '-ratingsAverage', label: 'Highest Rated' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
  ]

  const hasActiveFilters = filters.keyword || filters.category || filters.brand

  return (
    <>
      <Helmet>
        <title>Products — FreshCart</title>
        <meta name="description" content="Browse our extensive collection of quality products." />
      </Helmet>

      <div className="container-main py-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Products</h1>

            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.keyword}
                  onChange={(e) => updateFilter('keyword', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-10 focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                />
                {filters.keyword && (
                  <button
                    onClick={() => updateFilter('keyword', '')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Sort and Filter Toggle */}
              <div className="flex items-center gap-3">
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {filters.keyword && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                    Search: {filters.keyword}
                    <button onClick={() => updateFilter('keyword', '')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                    Category: {categories.find((c) => c._id === filters.category)?.name}
                    <button onClick={() => updateFilter('category', '')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.brand && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                    Brand: {brands.find((b) => b._id === filters.brand)?.name}
                    <button onClick={() => updateFilter('brand', '')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={cn(
              'w-64 flex-shrink-0 space-y-6',
              showFilters ? 'block' : 'hidden lg:block'
            )}
          >
            <ScrollReveal>
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      'block w-full rounded px-3 py-2 text-left text-sm transition-colors',
                      !filters.category
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => updateFilter('category', category._id)}
                      className={cn(
                        'block w-full rounded px-3 py-2 text-left text-sm transition-colors',
                        filters.category === category._id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Brands</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('brand', '')}
                    className={cn(
                      'block w-full rounded px-3 py-2 text-left text-sm transition-colors',
                      !filters.brand
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    )}
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand._id}
                      onClick={() => updateFilter('brand', brand._id)}
                      className={cn(
                        'block w-full rounded px-3 py-2 text-left text-sm transition-colors',
                        filters.brand === brand._id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      )}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <ErrorState title="Failed to load products" message={error} />
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
