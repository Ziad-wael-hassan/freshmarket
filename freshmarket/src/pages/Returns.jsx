import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import {
  Truck,
  RotateCcw,
  CheckCircle,
  Package,
  CreditCard,
  Clock,
  AlertCircle,
  ArrowRight,
  Mail,
  Shield,
  Leaf,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

const returnSteps = [
  {
    icon: Package,
    title: 'Initiate Your Return',
    desc: 'Log into your account, go to "My Orders", and click "Return" on the item you want to return. Our system will guide you through the process in under 2 minutes.',
    highlight: 'Takes less than 2 minutes',
  },
  {
    icon: Mail,
    title: 'Print Your Label',
    desc: 'Receive a prepaid return shipping label instantly via email. Print and attach it securely to your package — no special printer required.',
    highlight: 'Prepaid label included',
  },
  {
    icon: Truck,
    title: 'Ship It Back',
    desc: 'Drop your package at any authorized shipping location. Keep the receipt as proof — your return is covered from the moment it is scanned.',
    highlight: 'Free pickup available',
  },
  {
    icon: CreditCard,
    title: 'Get Refunded',
    desc: 'Once received and inspected, your refund is processed within 5–7 business days. Funds return to your original payment method automatically.',
    highlight: '5–7 business days',
  },
]

const conditions = [
  'Return within 30 days of delivery — no questions asked',
  'Items must be unused with original tags and packaging',
  'All accessories, manuals, and inserts must be included',
  'Clearance and final sale items are marked as non-returnable',
  'Gift cards and digital products are non-refundable',
]

const timeline = [
  { label: 'Item Received', value: 'Day 1', color: 'bg-emerald-500' },
  { label: 'Quality Check', value: 'Days 1–3', color: 'bg-blue-500' },
  { label: 'Refund Initiated', value: 'Days 3–7', color: 'bg-amber-500' },
  { label: 'Funds Available', value: 'Days 5–10', color: 'bg-primary-500' },
]

const Returns = () => {
  return (
    <>
      <Helmet>
        <title>Returns & Refunds — FreshCart</title>
        <meta
          name="description"
          content="Hassle-free returns within 30 days. FreshCart's premium return experience makes it easy to shop with confidence."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Returns & Refunds' }]} />

        {/* ===== HERO SECTION ===== */}
        <ScrollReveal>
          <div className="relative isolate mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 lg:p-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,197,94,0.12),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,197,94,0.06),transparent_50%)]" />
            <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 rounded-full bg-primary-400/5 blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <RotateCcw className="h-8 w-8 text-primary-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                      Returns & Refunds
                    </h1>
                    <p className="mt-2 max-w-xl text-base text-gray-400">
                      Hassle-free returns within 30 days. We believe in making things right.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 backdrop-blur-sm">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">No Restocking Fee</p>
                    <p className="text-xs text-emerald-400/70">Ever. On every return.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== POLICY BANNER ===== */}
        <ScrollReveal delay={0.1}>
          <div className="relative mb-14 overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-transparent p-6 md:p-8 dark:from-primary-500/5 dark:via-primary-500/[0.02]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <Sparkles className="mt-1 h-6 w-6 text-primary-400" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">30-Day Happiness Guarantee</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Not thrilled? Send it back. No forms to fill, no hurdles to jump.
                  </p>
                </div>
              </div>
              <Link
                to="/orders"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-primary-500/40"
              >
                Start a Return
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== MAIN LAYOUT ===== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-10">
          {/* ===== STEPS ===== */}
          <div className="lg:col-span-2">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              How It Works
            </h2>

            <div className="relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-transparent max-md:hidden" />

              {returnSteps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <ScrollReveal key={step.title} delay={idx * 0.1}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="group relative mb-6 flex items-start gap-5 rounded-2xl border border-gray-200/80 bg-white/50 p-6 backdrop-blur-sm transition-all hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary-500/20"
                    >
                      {/* Step Number */}
                      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-all group-hover:border-primary-500/30 group-hover:shadow-primary-500/10 dark:border-gray-700 dark:bg-gray-800">
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-sm">
                          {idx + 1}
                        </span>
                        <Icon className="h-7 w-7 text-primary-500" />
                      </div>

                      <div className="flex-1 pt-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                          <span className="inline-flex items-center gap-1 rounded-full border border-primary-500/20 bg-primary-50 px-2.5 py-0.5 text-[11px] font-medium text-primary-600 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-400">
                            <Sparkles size={10} />
                            {step.highlight}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                )
              })}

              <ScrollReveal delay={0.4}>
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-50/50 p-5 dark:border-amber-500/10 dark:bg-amber-500/5">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-gray-200">Important:</strong> Refunds are
                    issued to your original payment method. Gift card purchases are credited back to your
                    gift card balance. International returns may incur shipping costs.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="space-y-6">
            {/* Conditions */}
            <ScrollReveal>
              <div className="rounded-2xl border border-gray-200/80 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-500/10">
                    <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Return Conditions</h3>
                </div>
                <ul className="space-y-3.5">
                  {conditions.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Refund Timeline */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-gray-200/80 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-500/10">
                    <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Refund Timeline</h3>
                </div>
                <div className="space-y-0">
                  {timeline.map((item, idx) => (
                    <div key={item.label} className="group relative flex items-center gap-4 pb-4 last:pb-0">
                      {idx < timeline.length - 1 && (
                        <div className="absolute left-[11px] top-5 h-full w-px bg-gray-200 dark:bg-gray-700" />
                      )}
                      <div
                        className={`relative z-10 h-[22px] w-[22px] shrink-0 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-110 dark:border-gray-900 ${item.color}`}
                      />
                      <div className="flex flex-1 items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.label}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-500">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.2}>
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-center dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.1),transparent_60%)]" />
                <Package className="relative mx-auto h-8 w-8 text-primary-400" />
                <h3 className="relative mt-3 font-bold text-white">Ready to return?</h3>
                <p className="relative mt-1 text-sm text-gray-400">
                  Head to your orders to get started in seconds.
                </p>
                <Link
                  to="/orders"
                  className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-primary-500/40"
                >
                  My Orders
                  <ChevronRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </>
  )
}

export default Returns
