import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import {
  Newspaper,
  ExternalLink,
  Download,
  Calendar,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

const pressMentions = [
  {
    outlet: 'TechCrunch',
    title: 'FreshCart Raises $50M Series B to Expand Grocery Delivery',
    date: 'March 15, 2025',
    url: '#',
    type: 'featured',
  },
  {
    outlet: 'Forbes',
    title: 'How FreshCart Is Revolutionizing Online Grocery Shopping',
    date: 'February 28, 2025',
    url: '#',
    type: 'featured',
  },
  {
    outlet: 'The Verge',
    title: 'FreshCart Launches AI-Powered Recommendation Engine',
    date: 'January 20, 2025',
    url: '#',
    type: 'article',
  },
  {
    outlet: 'Business Insider',
    title: 'The Fastest Growing E-Commerce Startups of 2025',
    date: 'January 10, 2025',
    url: '#',
    type: 'mention',
  },
  {
    outlet: 'Bloomberg',
    title: 'FreshCart CEO Discusses Expansion Plans and Market Strategy',
    date: 'December 5, 2024',
    url: '#',
    type: 'article',
  },
  {
    outlet: 'Wall Street Journal',
    title: 'Online Grocery Sector Sees Record Growth Amid Changing Consumer Habits',
    date: 'November 18, 2024',
    url: '#',
    type: 'mention',
  },
]

const pressReleases = [
  {
    title: 'FreshCart Announces Partnership with Local Farms for Farm-to-Table Delivery',
    date: 'March 1, 2025',
  },
  {
    title: 'FreshCart Launches Same-Day Delivery in 15 New Markets',
    date: 'February 10, 2025',
  },
  {
    title: 'FreshCart Appoints New Chief Technology Officer',
    date: 'January 15, 2025',
  },
  {
    title: 'FreshCart Achieves Carbon-Neutral Shipping Certification',
    date: 'December 20, 2024',
  },
]

const Press = () => {
  return (
    <>
      <Helmet>
        <title>Press — FreshCart</title>
        <meta
          name="description"
          content="FreshCart in the news. Read press releases, media mentions, and company announcements."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Press' }]} />

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
              <Newspaper className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Press</h1>
              <p className="text-gray-600 dark:text-gray-400">
                News, media mentions, and company announcements
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured */}
            <ScrollReveal>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                In the News
              </h2>
            </ScrollReveal>
            <div className="space-y-4 mb-10">
              {pressMentions.map((item) => (
                <ScrollReveal key={item.title}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary-200 transition-all dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {item.outlet}
                          </span>
                          {item.type === 'featured' && (
                            <Badge variant="success">Featured</Badge>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar size={12} />
                          {item.date}
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 mt-1 flex-shrink-0 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {/* Press Releases */}
            <ScrollReveal>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Press Releases
              </h2>
            </ScrollReveal>
            <div className="space-y-3 mb-10">
              {pressReleases.map((pr) => (
                <ScrollReveal key={pr.title}>
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {pr.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar size={12} />
                          {pr.date}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Media Contact */}
            <ScrollReveal>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Media Contact
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  For press inquiries, please contact:
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Sarah Johnson
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Head of Communications
                </p>
                <a
                  href="mailto:press@freshcart.com"
                  className="text-sm text-primary-600 hover:underline dark:text-primary-400"
                >
                  press@freshcart.com
                </a>
              </div>
            </ScrollReveal>

            {/* Media Kit */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-center">
                <Download className="mx-auto h-8 w-8 text-white mb-2" />
                <h3 className="font-semibold text-white mb-1">Media Kit</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Download our brand assets and press kit.
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-white text-primary-600 hover:bg-primary-50"
                >
                  <Download size={14} className="mr-2" />
                  Download Kit
                </Button>
              </div>
            </ScrollReveal>

            {/* Quick Links */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'About FreshCart', to: '/about' },
                    { label: 'Careers', to: '/careers' },
                    { label: 'Blog', to: '/blog' },
                  ].map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex items-center justify-between text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.label}
                        <ChevronRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </>
  )
}

export default Press
