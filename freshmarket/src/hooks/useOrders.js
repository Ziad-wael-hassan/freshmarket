import { useState, useEffect, useCallback } from 'react'
import { orderService } from '@/services/orderService'
import { extractErrorMessage } from '@/utils/extractErrorMessage'
import { useAuth } from '@/context/AuthContext'
import { unwrapApiCollection } from '@/utils/apiData'

export const useOrders = () => {
  const { user, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated || !user?._id) {
      setOrders([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await orderService.getUserOrders(user._id)
      setOrders(unwrapApiCollection(response))
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user?._id])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, loading, error, refetch: fetchOrders }
}
