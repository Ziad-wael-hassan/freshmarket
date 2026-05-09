import { useState, useEffect } from 'react'
import { productService } from '@/services/productService'
import { extractErrorMessage } from '@/utils/extractErrorMessage'

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productService.getAll(params)
        const data = response.data
        setProducts(data.data || [])
        setTotalPages(data.totalPages || 1)
        setTotal(data.total || 0)
      } catch (err) {
        setError(extractErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [JSON.stringify(params)])

  return { products, loading, error, totalPages, total }
}
