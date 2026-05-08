import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { orderService } from '@/services/orderService'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { ArrowLeft, Package, CreditCard, MapPin, User } from 'lucide-react'

const statusVariant = {
  pending: 'warning',
  paid: 'success',
  placed: 'info',
  delivered: 'success',
  cancelled: 'error',
}

export const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await orderService.getOrder(id)
        setOrder(response.data?.data || response.data)
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load order details')
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <div className="container-main py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-main py-8">
        <ErrorState title="Failed to load order" message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  if (!order) return null

  return (
    <>
      <Helmet>
        <title>Order #{order._id?.slice(-8).toUpperCase()} — FreshCart</title>
      </Helmet>

      <div className="container-main py-8">
        <ScrollReveal>
          <Link
            to="/orders"
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Order #{order._id?.slice(-8).toUpperCase()}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge variant={statusVariant[order.status] || 'default'} className="text-sm px-3 py-1">
                    {order.status || 'Pending'}
                  </Badge>
                </div>

                <hr className="mb-4 border-gray-200 dark:border-gray-700" />

                <div className="space-y-4">
                  {(order.cartItems || []).map((item) => (
                    <div
                      key={item._id || item.product?._id}
                      className="flex items-center gap-4"
                    >
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                        <img
                          src={item.product?.imageCover}
                          alt={item.product?.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.product?._id}`}
                          className="font-medium text-gray-900 hover:text-primary-600 dark:text-gray-100"
                        >
                          {item.product?.title}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.count || item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency((item.count || item.quantity) * item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(order.totalOrderPrice || order.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                </div>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-gray-100">Total</span>
                  <span className="text-primary-600">
                    {formatCurrency(order.totalOrderPrice || order.totalPrice)}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Shipping Address
                </h3>
                {order.shippingAddress ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {order.shippingAddress.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {order.shippingAddress.city}, {order.shippingAddress.details}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {order.paymentMethodType || 'Cash'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Not available</p>
                )}
              </div>
            </ScrollReveal>

            <div className="flex gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/orders">View All Orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
