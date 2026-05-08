import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authService } from '@/services/authService'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Mail, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react'
import toast from 'react-hot-toast'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const otpSchema = z.object({
  resetCode: z.string().length(6, 'Reset code must be 6 digits'),
})

const resetSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const ForgotPassword = () => {
  const [step, setStep] = useState('email')
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
  })

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
  })

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
  })

  const handleSendCode = async (data) => {
    setLoading(true)
    try {
      await authService.forgotPassword({ email: data.email })
      setUserEmail(data.email)
      setStep('otp')
      toast.success('Reset code sent to your email!')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send reset code')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (data) => {
    setLoading(true)
    try {
      await authService.verifyResetCode({ resetCode: data.resetCode })
      setStep('reset')
      toast.success('Code verified! Please set a new password.')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Invalid or expired code')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (data) => {
    setLoading(true)
    try {
      await authService.resetPassword({
        email: userEmail,
        newPassword: data.newPassword,
      })
      toast.success('Password reset successfully!')
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to reset password')
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
              {step === 'email' && 'Forgot your password?'}
              {step === 'otp' && 'Check your email'}
              {step === 'reset' && 'Set new password'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {step === 'email' && "Enter your email and we'll send you a reset code"}
              {step === 'otp' && `Enter the 6-digit code sent to ${userEmail}`}
              {step === 'reset' && 'Choose a new password for your account'}
            </p>
          </div>

          {step === 'email' && (
            <form onSubmit={emailForm.handleSubmit(handleSendCode)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    {...emailForm.register('email')}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    error={emailForm.formState.errors.email?.message}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Send Reset Code
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={otpForm.handleSubmit(handleVerifyCode)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reset Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    {...otpForm.register('resetCode')}
                    placeholder="Enter 6-digit code"
                    className="pl-10 text-center text-lg tracking-widest"
                    error={otpForm.formState.errors.resetCode?.message}
                    maxLength={6}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Verify Code
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-sm text-primary-600 hover:text-primary-700"
              >
                ← Change email
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <Input
                  {...resetForm.register('newPassword')}
                  type="password"
                  placeholder="Enter new password"
                  error={resetForm.formState.errors.newPassword?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <Input
                  {...resetForm.register('confirmPassword')}
                  type="password"
                  placeholder="Confirm new password"
                  error={resetForm.formState.errors.confirmPassword?.message}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Reset Password
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>
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

export default ForgotPassword
