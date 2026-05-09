import { useState, useEffect } from 'react'
import { categoryService } from '@/services/categoryService'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { unwrapApiCollection } from '@/utils/apiData'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await categoryService.getAll()
        if (isMounted) {
          setCategories(unwrapApiCollection(response))
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

    fetchCategories()

    return () => {
      isMounted = false
    }
  }, [])

  return { categories, loading, error }
}
