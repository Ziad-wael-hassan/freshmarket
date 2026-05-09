import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { orderService } from '@/services/orderService'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/context/AuthContext'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CheckoutStepIndicator } from '@/components/checkout/CheckoutStepIndicator'
import { formatCurrency } from '@/utils/formatters'
import { CreditCard, Wallet, Truck, ArrowLeft, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const checkoutSchema = z.object({
  name: z.string().min(3, 'Full name must be at least 3 characters'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  details: z.string().min(5, 'Address details are required'),
})

export const Checkout = () => {
  const { cartId } = useParams()
  const navigate = useNavigate()
  const { cart, items, totalPrice, numOfCartItems, clearCart } = useCart()
  const { user } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('shipping')

  const actualCartId = cartId || cart?.cartId

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || '',
      city: '',
      phone: user?.phone || '',
      details: '',
    },
  })

  useEffect(() => {
    if (!actualCartId && items.length === 0) {
      navigate('/cart')
    }
  }, [actualCartId, items, navigate])

  const onSubmit = async (data) => {
    if (!actualCartId) {
      toast.error('No cart found. Please add items to your cart first.')
      return
    }

    setLoading(true)
    setStep('confirm')
    try {
      const shippingAddress = {
        name: data.name,
        city: data.city,
        phone: data.phone,
        details: data.details,
      }

      if (paymentMethod === 'cash') {
        await orderService.cashOrder(actualCartId, shippingAddress)
        await clearCart()
        toast.success('Order placed successfully!')
        navigate('/orders', { replace: true })
      } else {
        const response = await orderService.onlineOrder(actualCartId, shippingAddress)
        const sessionUrl = response.data?.session?.url
        if (sessionUrl) {
          window.location.href = sessionUrl
        } else {
          toast.error('Failed to initialize payment. Please try again.')
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (!actualCartId || items.length === 0) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Checkout — FreshCart</title>
      </Helmet>

      <div className="container-main py-8">
        <ScrollReveal>
          <button
            onClick={() => navigate('/cart')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
        </ScrollReveal>

        <CheckoutStepIndicator currentStep={step} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Shipping Address
                </h2>
                <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <Input
                      {...register('name')}
                      placeholder="Enter full name"
                      error={errors.name?.message}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <Input
                        {...register('city')}
                        placeholder="Enter city"
                        error={errors.city?.message}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="Enter phone number"
                        error={errors.phone?.message}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address Details
                    </label>
                    <textarea
                      {...register('details')}
                      rows={3}
                      placeholder="Street, building, apartment number..."
                      className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:placeholder:text-gray-400"
                    />
                    {errors.details && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.details.message}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                      paymentMethod === 'cash'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => { setPaymentMethod('cash'); setStep('payment') }}
                      className="h-4 w-4 text-primary-600"
                    />
                    <Wallet className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Cash on Delivery</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pay when you receive</p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                      paymentMethod === 'online'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => { setPaymentMethod('online'); setStep('payment') }}
                      className="h-4 w-4 text-primary-600"
                    />
                    <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Credit Card</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay securely with Stripe
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product?._id} className="flex items-center gap-3">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                        <img
                          src={item.product?.imageCover}
                          alt={item.product?.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.product?.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400" dir="ltr">
                          Qty: {item.count} × {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Items</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {numOfCartItems}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100" dir="ltr">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-gray-100">Total</span>
                  <span className="text-primary-600" dir="ltr">{formatCurrency(totalPrice)}</span>
                </div>

                <Button
                  type="submit"
                  form="checkout-form"
                  className="mt-6 w-full"
                  size="lg"
                  loading={loading}
                >
                  {paymentMethod === 'cash' ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Place Order
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Pay Online
                    </>
                  )}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
