import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Settings,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useCartFly } from '@/components/cart/CartFlyAnimation'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { CartPreviewDropdown } from '@/components/cart/CartPreviewDropdown'
import { cn } from '@/utils/cn'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCartPreview, setShowCartPreview] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  const { scrollY } = useScroll()
  const { isAuthenticated, user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { numOfCartItems } = useCart()
  const { itemIds: wishlistIds } = useWishlist()
  const { registerCartIcon } = useCartFly()
  const cartButtonRef = useRef(null)

  useEffect(() => {
    registerCartIcon(cartButtonRef.current)
  }, [registerCartIcon])

  const userMenuRef = useClickOutside(() => setShowUserMenu(false), showUserMenu)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80)
  })

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/brands', label: 'Brands' },
  ]

  const userMenuItems = [
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/orders', label: 'Orders', icon: Settings },
  ]

  return (
    <motion.nav
      className={cn(
        'fixed left-0 right-0 top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300',
        isScrolled && 'shadow-sm'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-main">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">F</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">FreshCart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors font-medium after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistIds.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-medium"
                >
                  {wishlistIds.length}
                </motion.span>
              )}
            </Link>

            {/* Cart with Preview */}
            <div
              className="relative"
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <button
                ref={cartButtonRef}
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {numOfCartItems > 0 && (
                  <motion.span
                    key={numOfCartItems}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-medium"
                  >
                    {numOfCartItems}
                  </motion.span>
                )}
              </button>
              <CartPreviewDropdown isOpen={showCartPreview} onClose={() => setShowCartPreview(false)} />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: isDark ? 0 : 180, scale: [0.6, 1] }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  aria-label="User menu"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-medium shadow-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>

                      {userMenuItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <item.icon size={16} />
                          {item.label}
                        </Link>
                      ))}

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-primary-500/20 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200"
              >
                <User size={16} />
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors md:hidden rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden"
            >
              <div className="container-main py-4">
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {!isAuthenticated && (
                    <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors font-medium"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </motion.nav>
  )
}
