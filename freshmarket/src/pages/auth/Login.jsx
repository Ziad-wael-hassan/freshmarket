import { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3">
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
  const { loginWithGoogle, isAuthenticated, isLoading, authInitialized } = useAuth()
  const returnUrl = location.state?.returnUrl || '/'

  useEffect(() => {
    if (authInitialized && isAuthenticated) {
      navigate(returnUrl, { replace: true })
    }
  }, [authInitialized, isAuthenticated, navigate, returnUrl])

  const handleGoogleLogin = async (e) => {
    if (e) e.preventDefault()
    await loginWithGoogle()
  }

  return (
    <>
      <Helmet>
        <title>Login — FreshCart</title>
      </Helmet>

      <div className="flex min-h-[calc(100vh-160px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none z-0 animate-pulse" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg space-y-10 rounded-[2.5rem] bg-surface/40 backdrop-blur-2xl p-10 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 relative z-10"
        >
          {/* Noise overlay for the card */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none opacity-[0.03] mix-blend-overlay">
            <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg' className="w-full h-full">
              <filter id='noiseFilterCard'>
                <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/>
              </filter>
              <rect width='100%' height='100%' filter='url(#noiseFilterCard)'/>
            </svg>
          </div>

          <div className="text-center space-y-6">
            <Link to="/" className="inline-block">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-3xl font-black text-white mx-auto shadow-[0_8px_32px_rgba(60,181,80,0.4)]"
              >
                F
              </motion.div>
            </Link>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold tracking-tight text-text-primary">Welcome back</h2>
              <p className="text-base text-text-secondary font-medium opacity-80">
                Experience the future of fresh groceries.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group relative flex h-[56px] w-full justify-center items-center rounded-2xl border border-white/10 bg-white/5 px-6 text-lg font-semibold text-white transition-all duration-500 hover:bg-white/10 hover:border-primary-500/50 hover:shadow-[0_0_40px_rgba(60,181,80,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </motion.button>

            <p className="text-center text-sm text-text-secondary/60 font-medium px-4">
              Join thousands of shoppers enjoying premium delivery and exclusive local deals.
            </p>
          </div>

          <div className="pt-4 text-center border-t border-white/5">
            <p className="text-xs text-text-secondary/40 font-medium uppercase tracking-widest leading-relaxed">
              By continuing, you agree to our <br/>
              <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link> & <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Login
