import { useState, useEffect } from 'react'
import { brandService } from '@/services/brandService'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { unwrapApiCollection } from '@/utils/apiData'

export const useBrands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchBrands = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await brandService.getAll()
        if (isMounted) {
          setBrands(unwrapApiCollection(response))
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

    fetchBrands()

    return () => {
      isMounted = false
    }
  }, [])

  return { brands, loading, error }
}
