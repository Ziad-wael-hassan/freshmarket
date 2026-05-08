import { useState, useEffect } from 'react'
import { brandService } from '@/services/brandService'
import { getErrorMessage } from '@/utils/getErrorMessage'

export const useBrands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await brandService.getAll()
        setBrands(response.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  return { brands, loading, error }
}
