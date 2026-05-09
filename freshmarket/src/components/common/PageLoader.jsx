import { motion } from 'framer-motion'

export const PageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-surface">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-500 text-white">
            <span className="text-2xl font-bold">F</span>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary-500"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
