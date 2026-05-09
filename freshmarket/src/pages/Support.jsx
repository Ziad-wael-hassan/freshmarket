import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import {
  Headphones,
  HelpCircle,
  MailQuestion,
  Truck,
  RotateCcw,
  Ruler,
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

const supportCategories = [
  {
    icon: HelpCircle,
    title: 'Help Center',
    desc: 'Find answers to common questions and browse our self-service resources.',
    link: '/help',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  },
  {
    icon: MailQuestion,
    title: 'Contact Us',
    desc: 'Get in touch with our support team via email, phone, or live chat.',
    link: '/contact',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
  },
  {
    icon: Truck,
    title: 'Shipping Info',
    desc: 'Track your delivery, check shipping methods, and learn about fees.',
    link: '/shipping',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
  },
  {
    icon: RotateCcw,
    title: 'Returns & Refunds',
    desc: 'Start a return, check our return policy, and track your refund.',
    link: '/returns',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
  },
  {
    icon: Ruler,
    title: 'Size Guide',
    desc: 'Find the perfect fit with our detailed size charts and recommendations.',
    link: '/size-guide',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
  },
]

const quickLinks = [
  { label: 'Track My Order', icon: Truck },
  { label: 'Start a Return', icon: RotateCcw },
  { label: 'Shipping Rates', icon: Truck },
  { label: 'Payment Methods', icon: HelpCircle },
]

const Support = () => {
  const [activeQ, setActiveQ] = useState(null)

  return (
    <>
      <Helmet>
        <title>Customer Support — FreshCart</title>
        <meta
          name="description"
          content="Get help with your orders, products, and account. FreshCart customer support is available 24/7."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Customer Support' }]} />

        {/* Hero */}
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 md:p-12 mb-12">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    How can we help you?
                  </h1>
                  <p className="text-primary-100 text-lg max-w-xl">
                    We are here to assist you with any questions or concerns. Our team is available around the clock.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/15 backdrop-blur-sm px-5 py-3">
                <MessageCircle className="h-6 w-6 text-white" />
                <div>
                  <p className="text-white font-semibold text-sm">24/7 Support</p>
                  <p className="text-primary-200 text-xs">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((item) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.label}>
                <Link
                  to="#"
                  className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm hover:shadow-md hover:border-primary-200 transition-all dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.label}
                  </span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Support Categories */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Browse by Topic
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {supportCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <ScrollReveal key={cat.title}>
                <Link
                  to={cat.link}
                  className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {cat.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                    Learn more
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Still Need Help */}
        <ScrollReveal>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Still need help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
              >
                <MessageCircle size={16} />
                Contact Us
              </Link>
              <Link
                to="/help"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <HelpCircle size={16} />
                Visit Help Center
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default Support
