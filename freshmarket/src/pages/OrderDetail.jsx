import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { orderService } from '@/services/orderService'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { unwrapApiData } from '@/utils/apiData'
import { ArrowLeft, Package, CreditCard, MapPin, User as UserIcon, Calendar, CheckCircle2, Truck, Clock } from 'lucide-react'

const statusVariant = {
  pending: 'warning',
  paid: 'success',
  placed: 'info',
  delivered: 'success',
  cancelled: 'error',
}

const statusIcons = {
  pending: Clock,
  paid: CheckCircle2,
  placed: Package,
  delivered: CheckCircle2,
  cancelled: Clock,
}

const getOrderStatus = (order) => {
  if (order?.status) return order.status
  if (order?.isDelivered) return 'delivered'
  if (order?.isPaid) return 'paid'
  return 'pending'
}

export const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrder = useCallback(async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await orderService.getOrder(id)
        setOrder(unwrapApiData(response))
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load order details')
      } finally {
        setLoading(false)
      }
    }, [id])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  if (loading) {
    return (
      <div className="container-main py-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 w-full rounded-3xl bg-surface skeleton-shimmer" />
          </div>
          <div className="space-y-6">
            <div className="h-48 w-full rounded-3xl bg-surface skeleton-shimmer" />
            <div className="h-48 w-full rounded-3xl bg-surface skeleton-shimmer" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-main py-20">
        <ErrorState 
          title="Order not found" 
          message={error} 
          onRetry={fetchOrder} 
        />
      </div>
    )
  }

  if (!order) return null

  const status = getOrderStatus(order)
  const StatusIcon = statusIcons[status] || Clock
  const orderReference = order?._id ? order._id.slice(-8).toUpperCase() : 'Details'

  return (
    <>
      <Helmet>
        <title>{`Order #${orderReference} — FreshCart`}</title>
      </Helmet>

      <div className="container-main py-12">
        <ScrollReveal>
          <Link
            to="/orders"
            className="group mb-8 inline-flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted group-hover:bg-primary-500 group-hover:text-white transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-semibold tracking-tight">Back to My Orders</span>
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal>
              <div className="rounded-3xl border border-border-custom bg-surface p-8 shadow-sm">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border-custom pb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-black text-text-primary tracking-tighter">
                        Order #{order._id?.slice(-8).toUpperCase()}
                      </h1>
                      <Badge variant={statusVariant[status] || 'default'} className="capitalize px-4 py-1">
                        {status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formatDate(order.createdAt)}
                      </div>
                      <span className="opacity-30">|</span>
                      <div className="flex items-center gap-1.5 text-primary-500">
                        <StatusIcon size={14} />
                        {order.isDelivered ? 'Delivered' : (order.isPaid ? 'Payment Confirmed' : 'Processing')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Items in order</p>
                    <p className="text-2xl font-black text-text-primary">{(order.cartItems || []).length} Products</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {(order.cartItems || []).map((item, idx) => (
                    <div
                      key={item._id || item.product?._id}
                      className="flex items-center gap-6 group"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-muted border border-border-custom shadow-inner">
                        <img
                          src={item.product?.imageCover}
                          alt={item.product?.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.product?._id}`}
                          className="text-lg font-bold text-text-primary hover:text-primary-500 transition-colors line-clamp-1"
                        >
                          {item.product?.title}
                        </Link>
                        <p className="text-sm text-text-secondary font-medium mt-1">
                          {item.count || item.quantity} × <span dir="ltr">{formatCurrency(item.price)}</span>
                        </p>
                      </div>
                      <div className="text-right">
<span className="font-black text-text-primary text-lg" dir="ltr">
                            {formatCurrency((item.count || item.quantity) * item.price)}
                          </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl border border-border-custom bg-surface p-8 shadow-xl">
                <h3 className="mb-6 text-xl font-bold text-text-primary tracking-tight">
                  Order Summary
                </h3>
                <div className="space-y-4 font-medium">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Subtotal</span>
<span className="text-text-primary" dir="ltr">
                          {formatCurrency(order.totalOrderPrice || order.totalPrice)}
                        </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Shipping</span>
                    <span className="text-green-500 font-bold uppercase text-xs">Free</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>Discount</span>
                      <span dir="ltr">-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  
                  <div className="pt-6 border-t border-border-custom">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1 opacity-60">Total Paid</p>
                        <span className="font-black text-text-primary tracking-tighter" dir="ltr">
                          {formatCurrency(order.totalOrderPrice || order.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl border border-border-custom bg-card p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-bold text-text-primary tracking-tight">
                  Delivery Details
                </h3>
                {order.shippingAddress ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-muted flex items-center justify-center text-text-secondary">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-0.5">Recipient</p>
                        <p className="font-bold text-text-primary">{order.shippingAddress.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-muted flex items-center justify-center text-text-secondary">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-0.5">Shipping Address</p>
                        <p className="font-bold text-text-primary line-clamp-2">
                          {order.shippingAddress.city}, {order.shippingAddress.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-muted flex items-center justify-center text-text-secondary">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-0.5">Payment Method</p>
                        <p className="font-bold text-text-primary">{order.paymentMethodType || 'Cash on Delivery'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-6 text-text-secondary italic text-sm">
                    <Package size={32} className="mb-2 opacity-20" />
                    Shipping information unavailable
                  </div>
                )}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="rounded-2xl border-border-custom">
                <Link to="/products">Shop More</Link>
              </Button>
              <Button asChild className="rounded-2xl">
                <Link to="/orders">All Orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
