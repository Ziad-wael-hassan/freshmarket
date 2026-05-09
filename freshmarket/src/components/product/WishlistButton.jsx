import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart, Loader2 } from 'lucide-react'
import { useWishlist } from '@/hooks/useWishlist'
import { cn } from '@/utils/cn'

export const WishlistButton = ({ product, productId, className = '' }) => {
  const { toggleItem, isInWishlist } = useWishlist()
  const id = productId || product?._id
  const isWishlisted = isInWishlist(id)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const pendingRef = useRef(false)

  const handleToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (pendingRef.current) return
    pendingRef.current = true
    setIsLoading(true)
    setIsAnimating(true)

    try {
      // Pass the full product object if available to avoid 400 errors on the backend
      const result = await toggleItem(product || id)
      if (result.requiresAuth) return
      setTimeout(() => setIsAnimating(false), 500)
    } finally {
      setIsLoading(false)
      pendingRef.current = false
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'relative flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-200 dark:bg-elevated/90 disabled:opacity-50 disabled:cursor-not-allowed',
        isWishlisted ? 'text-red-500' : 'text-text-secondary hover:text-red-400',
        className
      )}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <motion.div
          animate={isAnimating ? {
            scale: [1, 1.35, 1],
            transition: { duration: 0.5 }
          } : {}}
        >
          <Heart
            size={18}
            fill={isWishlisted ? 'currentColor' : 'none'}
            className={cn('transition-colors', isWishlisted && 'drop-shadow-sm')}
          />
        </motion.div>
      )}
    </motion.button>
  )
}