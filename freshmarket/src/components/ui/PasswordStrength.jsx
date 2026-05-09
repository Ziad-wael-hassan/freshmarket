import { useMemo } from 'react'
import { cn } from '@/utils/cn'

export const PasswordStrength = ({ password = '' }) => {
  const { score, label, color, width } = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '', width: '0%' }

    let s = 0
    if (password.length >= 6) s += 20
    if (password.length >= 10) s += 10
    if (/[a-z]/.test(password)) s += 15
    if (/[A-Z]/.test(password)) s += 15
    if (/[0-9]/.test(password)) s += 15
    if (/[^a-zA-Z0-9]/.test(password)) s += 15
    if (password.length >= 14) s += 10
    s = Math.min(s, 100)

    let label, color
    if (s < 30) { label = 'Weak'; color = 'bg-red-500' }
    else if (s < 60) { label = 'Fair'; color = 'bg-orange-500' }
    else if (s < 80) { label = 'Good'; color = 'bg-yellow-500' }
    else { label = 'Strong'; color = 'bg-green-500' }

    return { score: s, label, color, width: `${s}%` }
  }, [password])

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={cn('h-full rounded-full transition-all duration-300', color)}
          style={{ width }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Password strength: <span className="font-medium">{label}</span>
      </p>
    </div>
  )
}
