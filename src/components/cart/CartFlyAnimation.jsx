import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CartFlyContext = createContext(null)

export const useCartFly = () => useContext(CartFlyContext)

export const CartFlyProvider = ({ children }) => {
  const [flyingItem, setFlyingItem] = useState(null)
  const cartIconRef = useRef(null)

  const registerCartIcon = useCallback((ref) => {
    cartIconRef.current = ref
  }, [])

  const flyItemToCart = useCallback((imageUrl, sourceRect) => {
    const targetEl = cartIconRef.current
    if (!targetEl || !sourceRect) return

    const targetRect = targetEl.getBoundingClientRect()

    setFlyingItem({
      imageUrl,
      startX: sourceRect.left + sourceRect.width / 2 - 25,
      startY: sourceRect.top + sourceRect.height / 2 - 25,
      endX: targetRect.left + targetRect.width / 2 - 25,
      endY: targetRect.top + targetRect.height / 2 - 25,
    })

    setTimeout(() => setFlyingItem(null), 700)
  }, [])

  return (
    <CartFlyContext.Provider value={{ flyItemToCart, registerCartIcon }}>
      {children}
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            key="flying-item"
            initial={{
              left: flyingItem.startX,
              top: flyingItem.startY,
              width: 50,
              height: 50,
              opacity: 1,
            }}
            animate={{
              left: flyingItem.endX,
              top: flyingItem.endY,
              width: 30,
              height: 30,
              opacity: 0.5,
              scale: 0.5,
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              left: flyingItem.startX,
              top: flyingItem.startY,
              width: 50,
              height: 50,
              zIndex: 9999,
              pointerEvents: 'none',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            }}
          >
            <img
              src={flyingItem.imageUrl}
              alt=""
              className="h-full w-full rounded-lg object-cover shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </CartFlyContext.Provider>
  )
}
