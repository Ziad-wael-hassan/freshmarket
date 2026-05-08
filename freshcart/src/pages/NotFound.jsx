import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Home, ArrowLeft } from 'lucide-react'

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found — FreshCart</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-8">
        <ScrollReveal className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-9xl font-bold text-primary-500 mb-4">404</div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist. It might have been moved, deleted,
              or you entered the wrong URL.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home size={18} className="mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/products">
                <ArrowLeft size={18} className="mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <p className="text-gray-500 dark:text-gray-500">
              If you believe this is an error, please{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700">
                contact us
              </a>
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </>
  )
}
