import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Search,
  Mail,
  ChefHat,
  ShoppingBag,
  Info,
  Sparkles,
} from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: '10 Healthy Recipes to Try This Spring',
    excerpt: 'Embrace the season with these fresh, nutritious recipes that celebrate spring produce.',
    category: 'Recipes',
    author: 'Maria Chen',
    date: 'April 2, 2025',
    readTime: '5 min read',
    featured: true,
    image: null,
    tags: ['recipes', 'healthy', 'spring'],
  },
  {
    id: 2,
    title: 'How to Build a Sustainable Kitchen',
    excerpt: 'Simple swaps and habits that reduce waste and make your kitchen more eco-friendly.',
    category: 'Lifestyle',
    author: 'James Park',
    date: 'March 28, 2025',
    readTime: '7 min read',
    featured: false,
    image: null,
    tags: ['sustainability', 'kitchen', 'eco-friendly'],
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Meal Prepping',
    excerpt: 'Save time and eat well all week with our comprehensive meal prep guide.',
    category: 'Tips',
    author: 'Sarah Johnson',
    date: 'March 20, 2025',
    readTime: '10 min read',
    featured: false,
    image: null,
    tags: ['meal prep', 'guides', 'cooking'],
  },
  {
    id: 4,
    title: 'New Arrivals: Our Favorite Spring Picks',
    excerpt: 'Check out the latest products hitting our shelves this season.',
    category: 'Products',
    author: 'FreshCart Team',
    date: 'March 15, 2025',
    readTime: '4 min read',
    featured: false,
    image: null,
    tags: ['new arrivals', 'spring', 'shopping'],
  },
  {
    id: 5,
    title: 'Understanding Food Labels: What to Look For',
    excerpt: 'Decode nutrition labels like a pro and make informed choices at the grocery store.',
    category: 'Education',
    author: 'Dr. Lisa Wong',
    date: 'March 10, 2025',
    readTime: '8 min read',
    featured: false,
    image: null,
    tags: ['nutrition', 'labels', 'education'],
  },
  {
    id: 6,
    title: '5 Easy Weeknight Dinners Under $15',
    excerpt: 'Delicious budget-friendly meals that come together in under 30 minutes.',
    category: 'Recipes',
    author: 'Maria Chen',
    date: 'March 5, 2025',
    readTime: '6 min read',
    featured: false,
    image: null,
    tags: ['recipes', 'budget', 'quick meals'],
  },
]

const categories = [
  { name: 'All', count: 12 },
  { name: 'Recipes', count: 4 },
  { name: 'Lifestyle', count: 3 },
  { name: 'Tips', count: 2 },
  { name: 'Products', count: 2 },
  { name: 'Education', count: 1 },
]

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')

  const filtered = blogPosts.filter((post) => {
    const matchCategory = activeCategory === 'All' || post.category === activeCategory
    const matchSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const featuredPost = blogPosts.find((p) => p.featured)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success('Subscribed to newsletter! Check your inbox.')
    setEmail('')
  }

  return (
    <>
      <Helmet>
        <title>Blog — FreshCart</title>
        <meta
          name="description"
          content="Read the latest articles, recipes, tips, and updates from FreshCart. Discover healthy lifestyle content and product guides."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Blog' }]} />

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
              <BookOpen className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">FreshCart Blog</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Recipes, tips, and stories from our community
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Post */}
        {featuredPost && (
          <ScrollReveal>
            <Link
              to="#"
              className="group mb-10 block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 p-12 md:w-2/5 dark:from-primary-900/30 dark:to-primary-800/20">
                  <ChefHat className="h-20 w-20 text-primary-500/60" />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8 md:w-3/5">
                  <Badge variant="success">Featured Post</Badge>
                  <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{featuredPost.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {featuredPost.readTime}
                    </span>
                    <span>{featuredPost.author}</span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                    Read Article
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
              >
                {cat.name}
                <span className="ml-1 text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Article Grid */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
              className="mt-2 text-sm text-primary-600 hover:underline dark:text-primary-400"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered
              .filter((p) => !p.featured)
              .map((post) => (
                <ScrollReveal key={post.id}>
                  <Link
                    to="#"
                    className="group block rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-center rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200 p-10 dark:from-gray-700 dark:to-gray-600">
                      {post.category === 'Recipes' ? (
                        <ChefHat className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      ) : post.category === 'Lifestyle' ? (
                        <Sparkles className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      ) : post.category === 'Products' ? (
                        <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      ) : (
                        <Info className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{post.category}</Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <span className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium">
                          Read
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
          </div>
        )}

        {/* Newsletter */}
        <ScrollReveal>
          <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 md:p-10 text-center">
            <Mail className="mx-auto h-10 w-10 text-white mb-3" />
            <h2 className="text-2xl font-bold text-white mb-2">Stay in the Loop</h2>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for the latest recipes, tips, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button type="submit" className="bg-white text-primary-600 hover:bg-primary-50">
                Subscribe
              </Button>
            </form>
            <p className="text-primary-200 text-xs mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default Blog
