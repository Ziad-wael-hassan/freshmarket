import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { categoryService } from '@/services/categoryService'
import { brandService } from '@/services/brandService'
import { productService } from '@/services/productService'

const FilterContext = createContext({
  categories: [],
  brands: [],
  activeCategories: [],
  activeBrands: [],
  loading: true
})

export const FilterProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [activeCategoryIds, setActiveCategoryIds] = useState(new Set())
  const [activeBrandIds, setActiveBrandIds] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiscoveryData = async () => {
      try {
        setLoading(true)
        console.log('FilterContext: Starting discovery fetch...')
        
        const [categoriesRes, brandsRes, productsRes] = await Promise.all([
          categoryService.getAll().catch(e => ({ data: { data: [] } })),
          brandService.getAll().catch(e => ({ data: { data: [] } })),
          productService.getAll({ limit: 1000 }).catch(e => ({ data: { data: [] } })),
        ])

        const categoriesData = categoriesRes.data?.data || categoriesRes.data || []
        const brandsData = brandsRes.data?.data || brandsRes.data || []
        const productsData = productsRes.data?.data || productsRes.data || []

        console.log(`FilterContext: Fetched ${categoriesData.length} categories, ${brandsData.length} brands, ${productsData.length} products`)

        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        setBrands(Array.isArray(brandsData) ? brandsData : [])

        const catIds = new Set()
        const brIds = new Set()

        if (Array.isArray(productsData)) {
          productsData.forEach((product) => {
            if (product?.category) {
              const id = typeof product.category === 'object' ? product.category._id : product.category
              if (id) catIds.add(id)
            }
            if (product?.brand) {
              const id = typeof product.brand === 'object' ? product.brand._id : product.brand
              if (id) brIds.add(id)
            }
          })
        }

        setActiveCategoryIds(catIds)
        setActiveBrandIds(brIds)
      } catch (err) {
        console.error('FilterContext: Critical failure during discovery:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscoveryData()
  }, [])

  const activeCategories = useMemo(() => {
    if (!Array.isArray(categories)) return []
    return categories.filter((c) => activeCategoryIds.has(c?._id))
  }, [categories, activeCategoryIds])

  const activeBrands = useMemo(() => {
    if (!Array.isArray(brands)) return []
    return brands.filter((b) => activeBrandIds.has(b?._id))
  }, [brands, activeBrandIds])

  return (
    <FilterContext.Provider value={{ 
      categories, 
      brands, 
      activeCategories, 
      activeBrands, 
      loading 
    }}>
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
