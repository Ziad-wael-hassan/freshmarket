import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { loginSchema } from '@/validations/auth'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle, isAuthenticated, isLoading, authInitialized } = useAuth()
  const [isLoggingInWithGoogle, setIsLoggingInWithGoogle] = useState(false)
  const returnUrl = location.state?.returnUrl || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (authInitialized && isAuthenticated) {
      navigate(returnUrl, { replace: true })
    }
  }, [authInitialized, isAuthenticated, navigate, returnUrl])

  const onSubmit = async (data) => {
    await login(data, returnUrl)
  }

  const handleGoogleLogin = async () => {
    setIsLoggingInWithGoogle(true)
    await loginWithGoogle()
    setIsLoggingInWithGoogle(false)
  }

  return (
    <>
      <Helmet>
        <title>Login — FreshCart</title>
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
            <h2 className="text-3xl font-bold tracking-tight text-text-primary">Welcome back</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Sign in with your FreshCart account to access orders, profile, wishlist, and checkout.
            </p>
          </div>

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

            <div>
              <label className="mb-2 block text-sm font-medium text-text-primary">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  error={errors.password?.message}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="relative z-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-text-secondary/70">
              <span className="h-px flex-1 bg-border-custom" />
              <span>or</span>
              <span className="h-px flex-1 bg-border-custom" />
            </div>

            <div className="mt-5 space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={isLoggingInWithGoogle}
                className="group relative flex w-full justify-center items-center rounded-xl border border-border-custom bg-surface px-4 py-3 text-sm font-medium text-text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isLoggingInWithGoogle ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
                ) : (
                  <>
                    <GoogleIcon />
                    Continue with Google
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-text-secondary">
                Google sign-in is preserved for identity, but it does not grant protected API access until a backend token exchange exists.
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-text-secondary mt-2 relative z-10">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Login
