import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await authService.forgotPassword(data)
      setSent(true)
      toast.success('Reset link sent — check your email')
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to send reset email'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password — FreshCart</title>
      </Helmet>

      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 rounded-2xl bg-elevated p-8 shadow-2xl border border-border-custom relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-500/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="text-center relative z-10">
            <Link to="/" className="inline-block mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-2xl font-bold text-white mx-auto shadow-lg shadow-primary-500/30">
                F
              </div>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary">Reset your password</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {sent ? (
            <div className="relative z-10 text-center space-y-6">
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-6 py-5">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  Check your email for a reset link. If it doesn't appear within a few minutes, check your spam folder.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    error={errors.email?.message}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Send Reset Link
              </Button>
            </form>
          )}

          {!sent && (
            <div className="text-center text-sm text-text-secondary relative z-10">
              Remember your password?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign In
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}

export default ForgotPassword