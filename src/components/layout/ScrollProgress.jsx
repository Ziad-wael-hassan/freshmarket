import { motion, useScroll } from 'framer-motion'

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-primary-500"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
