import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors dark:text-gray-400 dark:hover:text-primary-400"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight size={14} className="text-gray-400" />
              {isLast ? (
                <span className="text-primary-600 font-medium dark:text-primary-400">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-gray-500 hover:text-primary-600 transition-colors dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
