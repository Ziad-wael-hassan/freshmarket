import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

export const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      let start = Math.max(2, page - 1)
      let end = Math.min(totalPages - 1, page + 1)

      if (page <= 2) {
        start = 2
        end = Math.min(4, totalPages - 1)
      }
      if (page >= totalPages - 1) {
        start = Math.max(2, totalPages - 3)
        end = totalPages - 1
      }

      if (start > 2) pages.push('...')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <ChevronLeft size={18} />
      </button>

      {getPageNumbers().map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
              p === page
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
