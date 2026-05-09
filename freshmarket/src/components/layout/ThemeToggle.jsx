import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/utils/cn'

export const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme()
  // Treat 'system' as dark if it matches, otherwise use explicit 'dark'
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ease-in-out overflow-hidden',
        isDark ? 'bg-elevated hover:bg-muted text-yellow-100 shadow-[0_0_15px_rgba(253,224,71,0.1)]' : 'bg-muted hover:bg-gray-100 text-amber-500',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Theme"
      layout
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -90,
          scale: isDark ? 1 : 0.5,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute flex items-center justify-center"
      >
        <Moon size={20} className="fill-current opacity-80 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 90 : 0,
          scale: isDark ? 0.5 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute flex items-center justify-center"
      >
        <Sun size={20} className="fill-current" />
      </motion.div>
      
      {/* Dynamic Background Glow */}
      <motion.div 
        className={cn(
          "absolute inset-0 rounded-full blur-md pointer-events-none transition-opacity duration-700",
          isDark ? "bg-blue-400/10 opacity-100" : "bg-orange-300/20 opacity-0"
        )}
      />
    </motion.button>
  )
}
