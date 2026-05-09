import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/hooks/useWishlist'
import { cn } from '@/utils/cn'
import { useState } from 'react'

export const WishlistButton = ({ productId, className = '' }) => {
  const { toggleItem, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(productId)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAnimating(true)
    await toggleItem(productId)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-200 dark:bg-elevated/90',
        isWishlisted ? 'text-red-500' : 'text-text-secondary hover:text-red-400',
        className
      )}
    >
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
    </motion.button>
  )
}
