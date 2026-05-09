import { Star, User } from 'lucide-react'
import { formatDate } from '@/utils/formatters'

const sampleReviews = [
  {
    _id: '1',
    name: 'Ahmed Hassan',
    rating: 5,
    comment: 'Excellent product! Exactly as described, fast shipping, and great quality. Highly recommended!',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: '2',
    name: 'Sara Mohamed',
    rating: 4,
    comment: 'Good product for the price. The quality is decent and delivery was on time.',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    _id: '3',
    name: 'Omar Ali',
    rating: 5,
    comment: 'Perfect! Will definitely buy again. The packaging was excellent and the product exceeded expectations.',
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
]

export const ReviewsSection = ({ productId, ratingsAverage, ratingsQuantity }) => {
  const reviews = sampleReviews

  return (
    <div className="mt-8 lg:mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Customer Reviews
        {ratingsQuantity > 0 && (
          <span className="ml-2 text-lg font-normal text-gray-500">({ratingsQuantity})</span>
        )}
      </h2>

      <div className="mb-8 flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {ratingsAverage?.toFixed(1) || '0.0'}
          </div>
          <div className="mt-1 flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(ratingsAverage || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{ratingsQuantity || 0} reviews</p>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{review.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(review.date)}</p>
              </div>
              <div className="ml-auto flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
