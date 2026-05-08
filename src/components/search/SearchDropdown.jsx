import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { productService } from '@/services/productService'
import { useDebounce } from '@/hooks/useDebounce'
import { useClickOutside } from '@/hooks/useClickOutside'
import { formatCurrency } from '@/utils/formatters'
import { productMatchesSearch } from '@/utils/search'
import { Search, Clock, TrendingUp } from 'lucide-react'

export const SearchDropdown = ({ query, onSelect, isOpen, onClose }) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recentSearches') || '[]')
    } catch { return [] }
  })
  const ref = useClickOutside(onClose, isOpen)

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setLoading(true)
      try {
        const response = await productService.getAll({ limit: 50 })
        const allProducts = response.data.data || []
        const filtered = allProducts.filter((p) =>
          productMatchesSearch(p, debouncedQuery)
        )
        setResults(filtered.slice(0, 5))
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  const handleSelect = (product) => {
    const updated = [product.title, ...recentSearches.filter(s => s !== product.title)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
    onSelect?.(product)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          {query.length < 2 ? (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <>
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    Recent Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
                          setRecentSearches(updated)
                          localStorage.setItem('recentSearches', JSON.stringify(updated))
                          onSelect?.(term)
                          onClose()
                        }}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {recentSearches.length === 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Search size={14} />
                  Type to search products...
                </div>
              )}
            </div>
          ) : loading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                Products
              </div>
              {results.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  onClick={() => handleSelect(product)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                      {product.title}
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 p-4 text-sm text-gray-500 dark:text-gray-400">
              <TrendingUp size={14} />
              No products found for "{query}"
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
