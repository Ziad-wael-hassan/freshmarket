import { useState, useEffect } from 'react'

export const useScrollDirection = () => {
  const [direction, setDirection] = useState('up')
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY
      setDirection(currentY > lastY && currentY > 80 ? 'down' : 'up')
      setLastY(currentY)
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [lastY])

  return direction
}
