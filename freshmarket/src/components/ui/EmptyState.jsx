import { cn } from '@/utils/cn'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const EmptyState = ({ icon: Icon, title, description, message, actionLabel, actionLink, onAction, cta, className }) => {
  const finalActionLabel = actionLabel || cta?.label
  const finalActionLink = actionLink || cta?.href
  const finalMessage = description || message

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}
    >
      {Icon && (
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/30 text-text-secondary/40">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      <h2 className="mb-3 text-2xl font-bold tracking-tight text-text-primary font-display">{title}</h2>
      {finalMessage && (
        <p className="mb-8 text-lg text-text-secondary max-w-md mx-auto font-body">{finalMessage}</p>
      )}
      
      {finalActionLink && (
        <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary-500/20">
          <Link to={finalActionLink}>{finalActionLabel}</Link>
        </Button>
      )}
      
      {onAction && !finalActionLink && (
        <Button onClick={onAction} size="lg" className="rounded-full px-8 shadow-lg shadow-primary-500/20">
          {finalActionLabel}
        </Button>
      )}
    </motion.div>
  )
}
