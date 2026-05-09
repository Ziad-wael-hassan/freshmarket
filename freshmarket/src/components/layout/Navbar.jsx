import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  ShoppingCart,
  Heart,
  History,
  Menu,
  User,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useCartFly } from '@/components/cart/CartFlyAnimation'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'
import './Navbar.css'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  const { user, token, isAuthenticated, isLoading, authInitialized, logout } = useAuth()
  const { numOfCartItems } = useCart()
  const { itemIds: wishlistIds } = useWishlist()
  const { registerCartIcon } = useCartFly()
  const cartButtonRef = useRef(null)
  const profileMenuRef = useClickOutside(() => setIsProfileMenuOpen(false), isProfileMenuOpen)
  const displayName = user?.name?.trim() || user?.email?.trim() || 'User'
  const displayEmail = user?.email?.trim() || ''
  const displayInitial = displayName.charAt(0)?.toUpperCase() || 'U'
  const isAuthReady = authInitialized && !isLoading
  const isLoggedIn = Boolean(token && isAuthenticated)
  const showProfileMenu = isAuthReady && isLoggedIn

  useEffect(() => {
    if (cartButtonRef.current) {
      registerCartIcon(cartButtonRef.current)
    }
  }, [registerCartIcon])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80)
  })

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/brands', label: 'Brands' },
  ]

  return (
    <header className={cn('nav-wrapper', isScrolled && 'scrolled')}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-[1.02]">
          <img 
            src="/branding/green-cart.svg" 
            alt="FreshCart Logo" 
            className="h-8 w-auto object-contain drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.4)] transition-all duration-300 dark:drop-shadow-[0_0_6px_rgba(34,197,94,0.3)]" 
          />
          <span className="text-xl font-extrabold tracking-tight text-text-primary group-hover:text-primary-500 transition-colors drop-shadow-sm dark:text-white">
            FreshCart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cn('nav-link', isActive && 'active')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Wishlist */}
          <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
            <Heart size={22} />
            {wishlistIds.length > 0 && (
              <span className="nav-badge">{wishlistIds.length}</span>
            )}
          </Link>

          {/* Cart */}
          <button
            ref={cartButtonRef}
            onClick={() => setIsCartDrawerOpen(true)}
            className="nav-icon-btn"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={22} />
            {numOfCartItems > 0 && (
              <span className="nav-badge">{numOfCartItems}</span>
            )}
          </button>

          {/* History/Orders */}
          <Link to="/orders" className="nav-icon-btn" aria-label="Orders">
            <History size={22} />
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle className="ml-2" />

          {/* User Profile / Login */}
          {!isAuthReady ? (
            <div
              className="ml-2 h-11 w-11 animate-pulse rounded-full border border-gray-200 bg-surface/70 dark:border-gray-700 dark:bg-gray-800/70"
              aria-hidden="true"
            />
          ) : showProfileMenu ? (
            <div ref={profileMenuRef} className="relative ml-2">
              <button
                onClick={() => setIsProfileMenuOpen((current) => !current)}
                className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 p-1 bg-surface hover:shadow-lg hover:ring-2 hover:ring-primary-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
              >
                {user?.image ? (
                  <img src={user.image} alt={displayName} className="h-9 w-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm">
                    {displayInitial}
                  </div>
                )}
              </button>
              
              {/* Floating Glass Dropdown Menu */}
              <div
                className={cn(
                  'absolute right-0 top-[130%] mt-3 w-72 rounded-[2rem] border border-gray-200 dark:border-gray-700 bg-surface/95 dark:bg-gray-900/95 backdrop-blur-xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 z-50 transform origin-top-right',
                  isProfileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4 pointer-events-none'
                )}
              >
                {/* User Info Header */}
                <div className="p-4 bg-muted/40 dark:bg-gray-800/50 rounded-[1.5rem] mb-3 flex items-center gap-4">
                  {user?.image ? (
                    <img src={user.image} alt={displayName} className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-black text-xl shadow-inner">
                      {displayInitial}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-text-primary dark:text-white truncate font-display">{displayName}</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400 truncate font-body">{displayEmail}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Link
                    to="/orders"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="p-3 rounded-2xl bg-muted/20 dark:bg-gray-800/50 hover:bg-primary-500/10 transition-colors border border-transparent hover:border-primary-500/20 text-center"
                  >
                    <p className="text-[10px] font-bold text-text-secondary dark:text-gray-400 uppercase tracking-widest mb-1">Orders</p>
                    <p className="text-lg font-black text-text-primary dark:text-white">Track</p>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="p-3 rounded-2xl bg-muted/20 dark:bg-gray-800/50 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 text-center"
                  >
                    <p className="text-[10px] font-bold text-text-secondary dark:text-gray-400 uppercase tracking-widest mb-1">Favorites</p>
                    <p className="text-lg font-black text-text-primary dark:text-white">{wishlistIds.length}</p>
                  </Link>
                </div>

                {/* Links */}
                <div className="space-y-1">
                  <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white hover:bg-muted dark:hover:bg-gray-800 transition-all">
                    <User size={18} className="text-primary-500" />
                    Account Dashboard
                  </Link>
                  <Link to="/orders" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white hover:bg-muted dark:hover:bg-gray-800 transition-all">
                    <History size={18} className="text-primary-500" />
                    Purchase History
                  </Link>
                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        logout()
                      }} 
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={18} className="text-red-500" />
                      Secure Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-login-btn ml-2 bg-text-primary text-main hover:opacity-90 font-bold px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20">
              Log In
            </Link>
          )}

          {/* Mobile Menu (Simplified for this redesign) */}
          <button className="nav-icon-btn md:hidden">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </header>
  )
}
