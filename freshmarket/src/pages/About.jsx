import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Heart,
  Shield,
  Award,
  Truck,
  Users,
  TrendingUp,
  ArrowRight,
  Quote,
} from 'lucide-react'

const stats = [
  { label: 'Happy Customers', value: '500K+', icon: Users },
  { label: 'Products Available', value: '50K+', icon: Award },
  { label: 'Orders Delivered', value: '2M+', icon: Truck },
  { label: 'Years in Business', value: '10+', icon: TrendingUp },
]

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'We are committed to reducing our environmental footprint through eco-friendly packaging, carbon-neutral shipping, and responsible sourcing.',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
  },
  {
    icon: Heart,
    title: 'Customer First',
    desc: 'Every decision we make starts with our customers. Your satisfaction drives everything we do, from product selection to delivery experience.',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
  },
  {
    icon: Shield,
    title: 'Trust & Quality',
    desc: 'We rigorously vet each product and seller to ensure you receive only authentic, high-quality items. Your trust is our most valuable asset.',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  },
  {
    icon: Truck,
    title: 'Fast & Reliable',
    desc: 'Our logistics network ensures your orders arrive on time, every time. We partner with top carriers to provide the fastest delivery options.',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
  },
]

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us — FreshCart</title>
        <meta
          name="description"
          content="Discover the FreshCart story. Learn about our mission to provide quality products at amazing prices with exceptional service."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero */}
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 md:p-12 mb-12">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIvPjwvZz48L2c+PC9zdmc+')]" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white">F</span>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">About FreshCart</h1>
                  <p className="text-primary-100 text-lg">Quality products, exceptional service</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ScrollReveal>
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  FreshCart was born in 2015 from a simple idea: shopping for quality products should be
                  easy, enjoyable, and accessible to everyone. What started as a small online store has grown
                  into a trusted marketplace serving hundreds of thousands of customers worldwide.
                </p>
                <p>
                  Our founders, a team of e-commerce veterans and technology enthusiasts, recognized that
                  online shoppers craved more than just low prices — they wanted a seamless experience,
                  authentic products, and a brand they could trust.
                </p>
                <p>
                  Today, FreshCart partners with thousands of brands and manufacturers to bring you
                  everything from everyday essentials to specialty items, all curated for quality and value.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                To empower every person on the planet to find exactly what they need, at a fair price,
                delivered with care and speed. We believe great shopping should be simple.
              </p>
              <div className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg p-4">
                <Quote className="h-5 w-5 text-primary-500 mb-1" />
                <p className="text-sm italic text-gray-700 dark:text-gray-300">
                  "We do not just sell products — we create experiences that bring joy and convenience
                  to everyday life."
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">— FreshCart Founding Team</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <ScrollReveal key={stat.label}>
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <Icon className="mx-auto h-6 w-6 text-primary-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {values.map((val) => {
            const Icon = val.icon
            return (
              <ScrollReveal key={val.title}>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all dark:border-gray-700 dark:bg-gray-800">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${val.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{val.desc}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="rounded-xl bg-gray-50 p-8 text-center dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Want to join our team?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              We are always looking for talented individuals who share our passion for great products
              and exceptional service.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
            >
              View Open Positions
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default About
