import { useState, useEffect } from 'react'
import { productService } from '@/services/productService'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { normalizeProduct } from '@/utils/apiData'

export const useProduct = (id) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    let isMounted = true

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productService.getById(id)
        if (isMounted) {
          setProduct(normalizeProduct(response))
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  return { product, loading, error }
}
