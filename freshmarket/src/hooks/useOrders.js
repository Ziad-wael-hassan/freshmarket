import { useState, useEffect, useCallback } from 'react'
import { orderService } from '@/services/orderService'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { getUserFromToken } from '@/utils/tokenUtils'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem('token')
      const user = getUserFromToken(token)
      if (!user?.id) return
      const response = await orderService.getUserOrders(user.id)
      setOrders(response.data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, loading, error, refetch: fetchOrders }
}
