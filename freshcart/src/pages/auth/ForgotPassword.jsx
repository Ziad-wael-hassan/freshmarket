import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // TODO: Implement forgot password API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setEmailSent(true)
      toast.success('Password reset email sent!')
    } catch (error) {
      toast.error('Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password — FreshCart</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-8">
        <ScrollReveal className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">FreshCart</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {emailSent ? 'Check your email' : 'Forgot your password?'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {emailSent
                ? `We've sent a password reset link to ${getValues('email')}`
                : "Enter your email address and we'll send you a link to reset your password"}
            </p>
          </div>

          {!emailSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
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
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
                <p className="text-sm text-green-800 dark:text-green-200">
                  If an account with that email exists, we've sent you a password reset link. Please
                  check your email and follow the instructions.
                </p>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link to="/login">
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              ← Back to Login
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}
