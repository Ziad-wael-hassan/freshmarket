import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'

const steps = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirm' },
]

export const CheckoutStepIndicator = ({ currentStep }) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                    isCompleted && 'border-primary-500 bg-primary-500 text-white',
                    isCurrent && 'border-primary-500 text-primary-600 dark:text-primary-400',
                    !isCompleted && !isCurrent && 'border-gray-300 text-gray-400 dark:border-gray-600'
                  )}
                >
                  {isCompleted ? <Check size={18} /> : index + 1}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isCompleted && 'text-primary-600 dark:text-primary-400',
                    isCurrent && 'text-gray-900 dark:text-gray-100',
                    !isCompleted && !isCurrent && 'text-gray-500 dark:text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 mt-[-1.5rem]',
                    index < currentIndex ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
