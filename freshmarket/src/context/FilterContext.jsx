import { createContext, useContext, useState, useEffect } from 'react'
import { categoryService } from '@/services/categoryService'
import { brandService } from '@/services/brandService'
import { unwrapApiCollection } from '@/utils/apiData'
import toast from 'react-hot-toast'

let cachedCategories = null
let cachedBrands = null
let cacheError = false

const FilterContext = createContext({
  categories: [],
  brands: [],
  activeCategories: [],
  activeBrands: [],
  loading: true,
})

export const FilterProvider = ({ children }) => {
  const [categories, setCategories] = useState(cachedCategories || [])
  const [brands, setBrands] = useState(cachedBrands || [])
  const [loading, setLoading] = useState(true)

  const activeCategories = categories
  const activeBrands = brands

  useEffect(() => {
    if (cachedCategories && cachedBrands && !cacheError) {
      setCategories(cachedCategories)
      setBrands(cachedBrands)
      setLoading(false)
      return
    }

    if (cacheError) {
      cacheError = false
    }

    let isMounted = true

    const fetchDiscoveryData = async () => {
      try {
        setLoading(true)

        const [categoriesRes, brandsRes] = await Promise.all([
          categoryService.getAll(),
          brandService.getAll(),
        ])

        if (!isMounted) {
          return
        }

        const fetchedCategories = unwrapApiCollection(categoriesRes)
        const fetchedBrands = unwrapApiCollection(brandsRes)

        cachedCategories = fetchedCategories
        cachedBrands = fetchedBrands
        cacheError = false

        setCategories(fetchedCategories)
        setBrands(fetchedBrands)
      } catch {
        cacheError = true
        if (isMounted) {
          toast.error('Failed to load filters — please refresh')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchDiscoveryData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <FilterContext.Provider
      value={{
        categories,
        brands,
        activeCategories,
        activeBrands,
        loading,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
