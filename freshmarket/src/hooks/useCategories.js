import { useState, useEffect } from 'react'
import { categoryService } from '@/services/categoryService'
import { getErrorMessage } from '@/utils/getErrorMessage'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await categoryService.getAll()
        setCategories(response.data || [])
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}
