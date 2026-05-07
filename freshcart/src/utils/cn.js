import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with support for overrides
 * @param {...any} inputs - Classes to merge
 * @returns {string} Merged class string
 */
export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}
