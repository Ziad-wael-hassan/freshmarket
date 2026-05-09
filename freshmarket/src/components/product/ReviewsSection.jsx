import { Star, User } from 'lucide-react'

export const ReviewsSection = ({ productId, ratingsAverage, ratingsQuantity }) => {
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

      <div className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
          <User size={20} />
        </div>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          Individual review content is unavailable from the current API.
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ratings are shown from the product summary only.
        </p>
      </div>
    </div>
  )
}
