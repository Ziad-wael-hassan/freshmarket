import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { WishlistButton } from './WishlistButton'
import { useState } from 'react'
import { QuickViewModal } from './QuickViewModal'

export const ProductCardActions = ({ product, productId }) => {
  const [showQuickView, setShowQuickView] = useState(false)
  const id = productId || product?._id

  return (
    <>
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <WishlistButton product={product} productId={id} />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowQuickView(true)
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-200 dark:bg-elevated/90 text-text-secondary hover:text-primary-500"
        >
          <Eye size={18} />
        </motion.button>
      </div>

      <QuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        productId={id}
      />
    </>
  )
}
