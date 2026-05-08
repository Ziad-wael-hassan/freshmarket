import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { orderService } from '@/services/orderService'
import { useAuth } from '@/context/AuthContext'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { Package, ShoppingBag, ChevronRight } from 'lucide-react'

const statusVariant = {
  pending: 'warning',
  paid: 'success',
  placed: 'info',
  delivered: 'success',
  cancelled: 'error',
}

export const Orders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await orderService.getUserOrders(user.id)
        setOrders(response.data?.data || response.data || [])
      } catch (error) {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user?.id])

  if (loading) {
    return (
      <div className="container-main py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>My Orders — FreshCart</title>
      </Helmet>

      <div className="container-main py-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Orders</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Track and manage your orders
            </p>
          </div>
        </ScrollReveal>

        {orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="You haven't placed any orders yet. Start shopping to see your orders here."
            actionLabel="Start Shopping"
            actionLink="/products"
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <ScrollReveal key={order._id} delay={index * 0.05}>
                <Link
                  to={`/orders/${order._id}`}
                  className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                        <Package className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Order #{order._id?.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(order.createdAt)} &middot; {order.cartItems?.length || 0} items
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(order.totalOrderPrice || order.totalPrice)}
                        </p>
                        <Badge variant={statusVariant[order.status] || 'default'}>
                          {order.status || 'Pending'}
                        </Badge>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Orders
