import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { orderService } from '@/services/orderService'
import { useAuth } from '@/context/AuthContext'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { unwrapApiCollection } from '@/utils/apiData'
import { Package, ShoppingBag, ChevronRight } from 'lucide-react'

const statusVariant = {
  pending: 'warning',
  paid: 'success',
  placed: 'info',
  delivered: 'success',
  cancelled: 'error',
}

const getOrderStatus = (order) => {
  if (order.status) return order.status
  if (order.isDelivered) return 'delivered'
  if (order.isPaid) return 'paid'
  return 'pending'
}

export const Orders = () => {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await orderService.getUserOrders(user._id)
      setOrders(unwrapApiCollection(response))
    } catch {
      setError('Unable to load your orders. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [user?._id])

  useEffect(() => {
    // If auth is still loading, wait
    if (isAuthLoading) return
    
    // If no user, stop loading and let the protect route (or empty state) handle it
    if (!user?._id) {
      setLoading(false)
      return
    }

    fetchOrders()
  }, [user?._id, isAuthLoading, fetchOrders])

  if (loading) {
    return (
      <div className="container-main py-12">
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-border-custom bg-surface p-6 h-32 skeleton-shimmer" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-main py-20 text-center">
        <ErrorState 
          title="Something went wrong" 
          message={error} 
          onRetry={fetchOrders}
        />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>My Orders — FreshCart</title>
      </Helmet>

      <div className="container-main py-12">
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-3">My Orders</h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Track your deliveries, view order history, and manage your recent purchases.
            </p>
          </div>
        </ScrollReveal>

        {orders.length === 0 ? (
          <div className="py-20 bg-surface rounded-3xl border border-border-custom border-dashed">
            <EmptyState
              icon={Package}
              title="No orders yet"
              description="Your order history is empty. Start exploring our collection to place your first order!"
              actionLabel="Start Shopping"
              actionLink="/products"
            />
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => {
              const status = getOrderStatus(order)

              return (
              <ScrollReveal key={order._id} delay={index * 0.05}>
                <Link
                  to={`/orders/${order._id}`}
                  className="group block rounded-2xl border border-border-custom bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary-500/30 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                        <Package className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-lg font-bold text-text-primary">
                            Order #{order._id?.slice(-8).toUpperCase()}
                          </p>
                          <Badge variant={statusVariant[status] || 'default'} className="capitalize">
                            {status}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary flex items-center gap-2">
                          <span className="font-medium text-text-primary">{formatDate(order.createdAt)}</span>
                          <span className="opacity-30">|</span>
                          <span>{order.cartItems?.length || 0} items</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-border-custom pt-4 md:pt-0">
                      <div className="md:text-right">
                        <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Total Amount</p>
<p className="text-xl font-black text-text-primary" dir="ltr">
                           {formatCurrency(order.totalOrderPrice || order.totalPrice)}
                        </p>
                      </div>
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted text-text-secondary group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default Orders
