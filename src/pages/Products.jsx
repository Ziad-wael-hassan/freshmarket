import { useState, useEffect, useRef } from 'react'
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
import { Pagination } from '@/components/common/Pagination'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { productMatchesSearch } from '@/utils/search'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/utils/cn'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [showFilters, setShowFilters] = useState(false)

  // Separate search input (immediate) from debounced keyword (for URL/API/chips)
  const [searchInput, setSearchInput] = useState(searchParams.get('keyword') || '')
  const debouncedKeyword = useDebounce(searchInput, 500)

  // Filter states — keyword is NOT stored here; handled via debouncedKeyword above
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    sort: searchParams.get('sort') || '-createdAt',
    page: parseInt(searchParams.get('page')) || 1,
    limit: 20,
  })

  // Guard: when URL changes externally (Navbar search, browser nav), sync into input
  // but NEVER overwrite while the user is actively typing
  const isTyping = useRef(false)
  useEffect(() => {
    const urlKeyword = searchParams.get('keyword') || ''
    if (isTyping.current) return
    if (urlKeyword !== searchInput) {
      setSearchInput(urlKeyword)
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL only when debounced keyword or filters change (not on every keystroke)
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedKeyword) params.set('keyword', debouncedKeyword)
    if (filters.category) params.set('category', filters.category)
    if (filters.brand) params.set('brand', filters.brand)
    if (filters.sort !== '-createdAt') params.set('sort', filters.sort)
    if (filters.page > 1) params.set('page', filters.page.toString())
    setSearchParams(params, { replace: true })
  }, [filters, debouncedKeyword]) // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch products — depends on filters + debouncedKeyword
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = { sort: filters.sort }
        const hasKeyword = debouncedKeyword?.trim()

        if (hasKeyword) {
          params.page = 1
          params.limit = 200
        } else {
          params.page = filters.page
          params.limit = filters.limit
        }

        if (filters.category?.trim()) {
          params.category = filters.category
        }

        if (filters.brand?.trim()) {
          params.brand = filters.brand
        }

        const response = await productService.getAll(params)
        let resultProducts = response.data.data || []

        if (hasKeyword) {
          const matching = resultProducts.filter((p) =>
            productMatchesSearch(p, debouncedKeyword)
          )
          const totalFiltered = matching.length
          const startIndex = (filters.page - 1) * filters.limit
          resultProducts = matching.slice(startIndex, startIndex + filters.limit)

          setPagination({
            page: filters.page,
            totalPages: Math.ceil(totalFiltered / filters.limit) || 1,
            total: totalFiltered,
          })
        } else {
          setPagination({
            page: response.data.page || filters.page,
            totalPages: Math.ceil((response.data.results || 0) / filters.limit) || 1,
            total: response.data.results || 0,
          })
        }

        setProducts(resultProducts)
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
        // Extract data arrays from response - they have structure { data: [...] }
        const categoriesData = Array.isArray(categoriesRes.data?.data) 
          ? categoriesRes.data.data 
          : []
        const brandsData = Array.isArray(brandsRes.data?.data) 
          ? brandsRes.data.data 
          : []
        
        setCategories(categoriesData)
        setBrands(brandsData)
      } catch (err) {
        console.error('Failed to fetch filters:', err)
        setCategories([])
        setBrands([])
      }
    }

    fetchFilters()
  }, [])

  const updateFilter = (key, value) => {
    if (key === 'keyword') {
      setSearchInput(value)
      isTyping.current = true
      return
    }
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1,
    }))
  }

  const clearFilters = () => {
    setSearchInput('')
    setFilters({
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

  const hasActiveFilters = debouncedKeyword || filters.category || filters.brand

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
              <div className="relative flex-1 max-w-lg lg:max-w-xl">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-primary-500" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => { setSearchInput(e.target.value); isTyping.current = true }}
                    onFocus={() => { isTyping.current = true }}
                    onBlur={() => { isTyping.current = false }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-12 pr-12 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800/40 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-500 dark:focus:bg-gray-800 dark:focus:ring-primary-400/20"
                  />
                  {searchInput && (
                    <button
                      onClick={() => { setSearchInput(''); isTyping.current = false }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
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
                {debouncedKeyword && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                    Search: {debouncedKeyword}
                    <button onClick={() => { setSearchInput(''); isTyping.current = false }}>
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
            ) : !loading && products.length === 0 ? (
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
              <>
                <ScrollReveal delay={0.2}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </ScrollReveal>
                {pagination.totalPages > 1 && (
                  <ScrollReveal delay={0.3}>
                    <div className="mt-8">
                      <Pagination
                        page={filters.page}
                        totalPages={pagination.totalPages}
                        onChange={(newPage) => updateFilter('page', newPage)}
                      />
                    </div>
                  </ScrollReveal>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
