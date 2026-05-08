import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import {
  Search,
  ChevronDown,
  Package,
  Truck,
  RotateCcw,
  User,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const faqCategories = [
  {
    id: 'orders',
    label: 'Orders',
    icon: Package,
    count: 4,
    questions: [
      { q: 'How do I place an order?', a: 'Browse our catalog, add items to your cart, and proceed to checkout. You will need to create an account or log in to complete your purchase.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or canceled within 1 hour of placement. Contact our support team immediately with your order number for assistance.' },
      { q: 'How will I know my order is confirmed?', a: 'You will receive an order confirmation email with your order details and tracking information once the order is placed.' },
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, PayPal, and bank transfers. All payments are processed securely.' },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping',
    icon: Truck,
    count: 4,
    questions: [
      { q: 'What shipping options are available?', a: 'We offer standard (5-7 business days), express (2-3 business days), and overnight (next business day) shipping options.' },
      { q: 'How much does shipping cost?', a: 'Standard shipping is free on orders over $50. Express shipping starts at $12.99 and overnight at $24.99. Rates vary by location.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.' },
      { q: 'How can I track my order?', a: 'Once your order ships, you will receive a tracking number via email. You can also track your order in your account dashboard.' },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Refunds',
    icon: RotateCcw,
    count: 4,
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 30-day return policy from the date of delivery. Items must be unused and in their original packaging.' },
      { q: 'How do I start a return?', a: 'Log into your account, go to your orders, and click "Return" on the item you wish to return. Follow the instructions to generate a return label.' },
      { q: 'How long do refunds take?', a: 'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.' },
      { q: 'Who pays for return shipping?', a: 'We provide free return shipping on defective or incorrect items. For other returns, a small return shipping fee may apply.' },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    icon: User,
    count: 3,
    questions: [
      { q: 'How do I create an account?', a: 'Click "Login" in the top right corner and select "Create Account". Fill in your details and verify your email address.' },
      { q: 'I forgot my password. What should I do?', a: 'Click "Forgot Password" on the login page. Enter your email address and we will send you a password reset link.' },
      { q: 'How do I update my personal information?', a: 'Log into your account and navigate to your Profile page. You can update your name, email, phone number, and shipping addresses there.' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    icon: ShoppingBag,
    count: 3,
    questions: [
      { q: 'Are your products authentic?', a: 'Yes, all products sold on FreshCart are 100% authentic and sourced directly from manufacturers or authorized distributors.' },
      { q: 'What if an item is out of stock?', a: 'You can sign up for back-in-stock notifications on the product page. We will email you as soon as the item is available.' },
      { q: 'Do you offer product warranties?', a: 'Most products come with a manufacturer warranty. Warranty duration varies by product category. Check the product page for details.' },
    ],
  },
]

const quickTopics = [
  { label: 'Track My Order', icon: Package },
  { label: 'Start a Return', icon: RotateCcw },
  { label: 'Shipping Rates', icon: Truck },
  { label: 'Reset Password', icon: User },
]

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openCategory, setOpenCategory] = useState(null)
  const [openQuestions, setOpenQuestions] = useState({})
  const [searchFocused, setSearchFocused] = useState(false)

  const toggleQuestion = (qId) => {
    setOpenQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }))
  }

  const toggleCategory = (catId) => {
    setOpenCategory((prev) => (prev === catId ? null : catId))
    setOpenQuestions({})
  }

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories
    const q = searchQuery.toLowerCase()
    return faqCategories
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.questions.length > 0)
  }, [searchQuery])

  return (
    <>
      <Helmet>
        <title>Help Center — FreshCart</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about orders, shipping, returns, and more at FreshCart."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Help Center' }]} />

        {/* ===== HERO ===== */}
        <ScrollReveal>
          <div className="relative isolate mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 lg:p-16 text-center dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.08),transparent_60%)]" />
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <HelpCircle className="h-8 w-8 text-primary-400" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                How can we help?
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base text-gray-400">
                Search our knowledge base or browse topics below. We have got answers to all your questions.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== SEARCH ===== */}
        <ScrollReveal delay={0.1}>
          <div className="relative mx-auto mb-10 max-w-2xl">
            <div
              className={`rounded-2xl border transition-all duration-300 ${
                searchFocused
                  ? 'border-primary-500/50 shadow-lg shadow-primary-500/10'
                  : 'border-gray-200 shadow-sm dark:border-gray-700'
              } bg-white dark:bg-gray-900`}
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full rounded-2xl border-0 bg-transparent py-5 pl-14 pr-4 text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== QUICK TOPICS ===== */}
        {!searchQuery && (
          <div className="mb-12">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500">
              Or pick a topic
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickTopics.map((topic) => {
                const Icon = topic.icon
                return (
                  <motion.button
                    key={topic.label}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary-500/30 hover:text-primary-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-primary-500/30 dark:hover:text-primary-400"
                  >
                    <Icon size={16} className="text-primary-500" />
                    {topic.label}
                    <ChevronRight size={14} className="text-gray-400" />
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}

        {/* ===== FAQ SECTION ===== */}
        <div className="mx-auto max-w-3xl">
          {filteredCategories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-gray-200 bg-white/50 p-12 text-center backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50"
            >
              <Search className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                No results for "{searchQuery}"
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try different keywords or browse categories below.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredCategories.map((cat, catIdx) => {
                const Icon = cat.icon
                const isOpen = openCategory === cat.id
                return (
                  <ScrollReveal key={cat.id} delay={catIdx * 0.05}>
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all dark:border-gray-800 dark:bg-gray-900">
                      <motion.button
                        onClick={() => toggleCategory(cat.id)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        whileTap={{ scale: 0.995 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                            <Icon size={20} />
                          </div>
                          <div>
                            <span className="text-base font-bold text-gray-900 dark:text-white">
                              {cat.label}
                            </span>
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-500">
                              {cat.questions.length} articles
                            </span>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
                        >
                          <ChevronDown size={16} className="text-gray-500" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-gray-100 dark:border-gray-800">
                              {cat.questions.map((item, qIdx) => {
                                const qId = `${cat.id}-${qIdx}`
                                const isQOpen = openQuestions[qId]
                                return (
                                  <div
                                    key={qId}
                                    className="border-b border-gray-100 last:border-b-0 dark:border-gray-800"
                                  >
                                    <motion.button
                                      onClick={() => toggleQuestion(qId)}
                                      className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                                      whileTap={{ scale: 0.998 }}
                                    >
                                      <span className="pr-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {item.q}
                                      </span>
                                      <motion.div
                                        animate={{ rotate: isQOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="shrink-0"
                                      >
                                        <ChevronDown size={15} className="text-gray-400" />
                                      </motion.div>
                                    </motion.button>

                                    <AnimatePresence initial={false}>
                                      {isQOpen && (
                                        <motion.div
                                          key="answer"
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                                          className="overflow-hidden"
                                        >
                                          <div className="border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                              {item.a}
                                            </p>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          )}
        </div>

        {/* ===== STILL NEED HELP ===== */}
        <ScrollReveal delay={0.2}>
          <div className="group relative mt-14 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/50 p-8 text-center backdrop-blur-sm transition-all hover:border-primary-500/20 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.03),transparent_60%)]" />
            <MessageCircle className="relative mx-auto h-8 w-8 text-primary-500" />
            <h2 className="relative mt-3 text-xl font-bold text-gray-900 dark:text-white">
              Still looking for answers?
            </h2>
            <p className="relative mt-1 text-sm text-gray-500 dark:text-gray-400">
              Our support team is ready to help you 24/7.
            </p>
            <Link
              to="/contact"
              className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-primary-500/40"
            >
              <MessageCircle size={16} />
              Contact Support
              <ChevronRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default Help
