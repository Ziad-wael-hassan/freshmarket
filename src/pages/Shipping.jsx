import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import {
  Truck,
  Package,
  Plane,
  Clock,
  MapPin,
  Search,
  CheckCircle,
  ChevronRight,
  Shield,
} from 'lucide-react'

const shippingMethods = [
  {
    icon: Package,
    name: 'Standard Shipping',
    price: '$4.99 / Free over $50',
    time: '5–7 business days',
    desc: 'Reliable and affordable delivery for everyday orders.',
    features: ['Tracking included', 'Door-to-door delivery', 'Signature not required'],
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  },
  {
    icon: Truck,
    name: 'Express Shipping',
    price: '$12.99',
    time: '2–3 business days',
    desc: 'Faster delivery for when you need it sooner.',
    features: ['Priority processing', 'Real-time tracking', 'SMS notifications'],
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
  },
  {
    icon: Plane,
    name: 'Overnight Shipping',
    price: '$24.99',
    time: 'Next business day',
    desc: 'Get your order by tomorrow — order before 2 PM.',
    features: ['Guaranteed delivery', 'Premium tracking', 'Signature on delivery'],
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
  },
]

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Information — FreshCart</title>
        <meta
          name="description"
          content="Learn about FreshCart's shipping options, delivery timelines, tracking, and shipping fees."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Shipping Info' }]} />

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
              <Truck className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shipping Information</h1>
              <p className="text-gray-600 dark:text-gray-400">Fast, reliable delivery right to your door</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Shipping Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {shippingMethods.map((method) => {
            const Icon = method.icon
            return (
              <ScrollReveal key={method.name}>
                <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${method.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{method.desc}</p>
                  <div className="mb-3">
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {method.price}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={12} />
                      {method.time}
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {method.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle size={14} className="mt-0.5 text-primary-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Tracking & Delivery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ScrollReveal>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Search className="h-5 w-5 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Track Your Order</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Once your order ships, you will receive a tracking number via email. You can also track
                your order from your account dashboard.
              </p>
              <ol className="space-y-3 text-sm">
                {['Log into your FreshCart account', 'Go to "My Orders"', 'Click "Track" on your order', 'View real-time tracking updates'].map(
                  (step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                        {i + 1}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 pt-0.5">{step}</span>
                    </li>
                  )
                )}
              </ol>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Delivery Information</h2>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Processing Time</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Orders are processed within 1–2 business days after payment confirmation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Delivery Areas</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We deliver to all 50 US states and over 50 countries worldwide.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Delivery Attempts</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our carriers make up to 3 delivery attempts before holding your package.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">P.O. Boxes</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We do not ship to P.O. boxes for express and overnight deliveries.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Free Shipping Banner */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 p-6 md:p-8 text-center md:text-left md:flex md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Free Shipping on Orders Over $50</h3>
              <p className="text-primary-100 text-sm">
                Applies to standard shipping within the continental US.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-4 md:mt-0 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Start Shopping
              <ChevronRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default Shipping
