import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { orderService } from '@/services/orderService'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User as UserIcon, Mail, Phone, Calendar, Edit3, ShoppingBag, Heart, Package, Lock, Eye, EyeOff } from 'lucide-react'
import { authService } from '@/services/authService'
import { normalizeUser, unwrapApiCollection } from '@/utils/apiData'
import { changePasswordSchema } from '@/validations/profile'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
})

const StatCard = ({ icon: Icon, label, value, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(value)
    if (start === end) return
    
    let totalMiliseconds = 800
    let incrementTime = (totalMiliseconds / end)
    
    let timer = setInterval(() => {
      start += 1
      setDisplayValue(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)
    
    return () => clearInterval(timer)
  }, [value])

  return (
    <ScrollReveal delay={delay}>
      <div className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-border-custom shadow-sm group hover:border-primary-500/30 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-text-secondary group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
            <Icon size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</p>
            <p className="text-2xl font-black text-text-primary">{displayValue}</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { itemIds: wishlistItems } = useWishlist()
  const { totalItems: cartItemCount } = useCart()
  const [ordersCount, setOrdersCount] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '—'
  const profileInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'

  useEffect(() => {
    if (!user?._id) return

    let isMounted = true

    const fetchStats = async () => {
      try {
        const response = await orderService.getUserOrders(user._id)
        const orders = unwrapApiCollection(response)
        if (isMounted) {
          setOrdersCount(orders.length)
        }
      } catch {
        if (isMounted) {
          setOrdersCount(0)
        }
      }
    }
    fetchStats()

    return () => {
      isMounted = false
    }
  }, [user?._id])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  })

  useEffect(() => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    })
  }, [reset, user?.email, user?.name, user?.phone])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const updatedProfile = await updateProfile(data)
      const normalizedUser = normalizeUser(updatedProfile)
      reset({
        name: normalizedUser?.name || data.name,
        email: normalizedUser?.email || data.email,
        phone: normalizedUser?.phone || data.phone || '',
      })
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  })

  const handleChangePassword = async (data) => {
    setChangePasswordLoading(true)
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        password: data.newPassword,
        rePassword: data.confirmPassword,
      })
      toast.success('Password changed successfully')
      resetPasswordForm()
      setShowChangePassword(false)
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to change password'
      toast.error(message)
    } finally {
      setChangePasswordLoading(false)
    }
  }

  if (!user?._id) {
    return (
      <div className="container-main py-32 text-center">
        <div className="skeleton-shimmer h-8 w-48 mx-auto rounded mb-4" />
        <div className="skeleton-shimmer h-4 w-64 mx-auto rounded" />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>My Profile — FreshCart</title>
      </Helmet>

      <div className="container-main py-12">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-3">My Account</h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Welcome back, <span className="text-text-primary font-semibold">{user.name}</span>. 
              Manage your personal details and track your activity.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal>
              <div className="rounded-3xl border border-border-custom bg-surface p-8 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-muted">
                      {profileInitial}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">Personal Profile</h2>
                      <p className="text-sm text-text-secondary">Basic information for your account</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="rounded-full px-6">
                      <Edit3 size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-primary ml-1">
                          Full Name
                        </label>
                        <Input
                          {...register('name')}
                          error={errors.name?.message}
                          placeholder="Enter your full name"
                          className="rounded-xl border-border-custom bg-muted focus:bg-surface transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-primary ml-1">
                          Email Address
                        </label>
                        <Input
                          {...register('email')}
                          type="email"
                          disabled={user?.email?.includes('gmail') || user?.provider === 'google'}
                          error={errors.email?.message}
                          placeholder="Enter your email"
                          className="rounded-xl border-border-custom bg-muted focus:bg-surface transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 max-w-md">
                      <label className="text-sm font-semibold text-text-primary ml-1">
                        Phone Number (Optional)
                      </label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        error={errors.phone?.message}
                        placeholder="Enter your phone number"
                        className="rounded-xl border-border-custom bg-muted focus:bg-surface transition-all"
                      />
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-border-custom">
                      <Button type="submit" loading={loading} className="rounded-full px-8">
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel} className="rounded-full px-8">
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-4 rounded-2xl bg-muted/30 border border-border-custom/50">
                      <p className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">Identity</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <UserIcon className="h-5 w-5 text-primary-500" />
                          <div>
                            <p className="text-[10px] text-text-secondary uppercase font-bold">Display Name</p>
                            <p className="font-semibold text-text-primary">{user.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary-500" />
                          <div>
                            <p className="text-[10px] text-text-secondary uppercase font-bold">Primary Email</p>
                            <p className="font-semibold text-text-primary">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/30 border border-border-custom/50">
                      <p className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">Security & Meta</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary-500" />
                          <div>
                            <p className="text-[10px] text-text-secondary uppercase font-bold">Member Since</p>
                            <p className="font-semibold text-text-primary">{memberSince}</p>
                          </div>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary-500" />
                            <div>
                              <p className="text-[10px] text-text-secondary uppercase font-bold">Contact Phone</p>
                              <p className="font-semibold text-text-primary">{user.phone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Change Password */}
            <ScrollReveal>
              <div className="rounded-3xl border border-border-custom bg-surface p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-primary-500" />
                    <h3 className="text-xl font-bold text-text-primary">Change Password</h3>
                  </div>
                  {!showChangePassword && (
                    <Button variant="outline" size="sm" onClick={() => setShowChangePassword(true)} className="rounded-full px-6">
                      Update
                    </Button>
                  )}
                </div>

                {showChangePassword && (
                  <form onSubmit={handlePasswordSubmit(handleChangePassword)} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary ml-1">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...registerPassword('currentPassword')}
                          type={showCurrent ? 'text' : 'password'}
                          placeholder="Enter current password"
                          className="pl-10 pr-10"
                          error={passwordErrors.currentPassword?.message}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary ml-1">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...registerPassword('newPassword')}
                          type={showNew ? 'text' : 'password'}
                          placeholder="Enter new password"
                          className="pl-10 pr-10"
                          error={passwordErrors.newPassword?.message}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary ml-1">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...registerPassword('confirmPassword')}
                          type={showConfirm ? 'text' : 'password'}
                          placeholder="Confirm new password"
                          className="pl-10 pr-10"
                          error={passwordErrors.confirmPassword?.message}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-border-custom">
                      <Button type="submit" loading={changePasswordLoading} className="rounded-full px-8">
                        Save Password
                      </Button>
                      <Button type="button" variant="outline" onClick={() => { setShowChangePassword(false); resetPasswordForm() }} className="rounded-full px-8">
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <ScrollReveal delay={0.1}>
                <Link to="/orders" className="group p-6 rounded-2xl bg-surface border border-border-custom hover:border-primary-500/30 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-xl bg-muted text-text-secondary group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 mb-4 flex items-center justify-center">
                    <Package size={24} />
                  </div>
                  <h4 className="font-bold text-text-primary mb-1">Orders</h4>
                  <p className="text-xs text-text-secondary">Track deliveries</p>
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Link to="/wishlist" className="group p-6 rounded-2xl bg-surface border border-border-custom hover:border-primary-500/30 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-xl bg-muted text-text-secondary group-hover:bg-red-500 group-hover:text-white transition-all duration-300 mb-4 flex items-center justify-center">
                    <Heart size={24} />
                  </div>
                  <h4 className="font-bold text-text-primary mb-1">Wishlist</h4>
                  <p className="text-xs text-text-secondary">Manage favorites</p>
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <Link to="/cart" className="group p-6 rounded-2xl bg-surface border border-border-custom hover:border-primary-500/30 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-xl bg-muted text-text-secondary group-hover:bg-green-500 group-hover:text-white transition-all duration-300 mb-4 flex items-center justify-center">
                    <ShoppingBag size={24} />
                  </div>
                  <h4 className="font-bold text-text-primary mb-1">My Cart</h4>
                  <p className="text-xs text-text-secondary">Proceed to checkout</p>
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-text-primary mb-4 px-1">Overview</h3>
            <StatCard icon={Package} label="Total Orders" value={ordersCount} delay={0.1} />
            <StatCard icon={Heart} label="Wishlist" value={wishlistItems.length} delay={0.2} />
            <StatCard icon={ShoppingBag} label="Cart Items" value={cartItemCount} delay={0.3} />

            
            <div className="mt-8 p-6 rounded-3xl bg-primary-500/5 border border-primary-500/10 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-text-primary mb-2">Need help?</h4>
                <p className="text-sm text-text-secondary mb-4">Our support team is available 24/7 to assist you with any questions.</p>
                <Button variant="outline" size="sm" asChild className="rounded-full w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Mail size={120} className="text-primary-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
