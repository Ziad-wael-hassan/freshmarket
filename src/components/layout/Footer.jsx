import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'Categories', href: '/categories' },
      { name: 'Brands', href: '/brands' },
      { name: 'New Arrivals', href: '/products?sort=newest' },
      { name: 'Sale', href: '/products?onSale=true' },
    ],
    account: [
      { name: 'My Account', href: '/profile' },
      { name: 'Orders', href: '/orders' },
      { name: 'Wishlist', href: '/wishlist' },
      { name: 'Cart', href: '/cart' },
      { name: 'Login', href: '/login' },
    ],
    support: [
      { name: 'Support', href: '/support' },
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-2xl font-bold text-white">FreshCart</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-sm">
                Your one-stop destination for quality products at amazing prices. Shop with
                confidence and enjoy fast, reliable delivery.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary-400" />
                  <span className="text-sm">support@freshcart.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary-400" />
                  <span className="text-sm">123 Commerce St, City, State 12345</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Shop Links */}
          <div>
            <ScrollReveal delay={0.1}>
              <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Account Links */}
          <div>
            <ScrollReveal delay={0.2}>
              <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
              <ul className="space-y-2">
                {footerLinks.account.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Support Links */}
          <div>
            <ScrollReveal delay={0.3}>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Company Links */}
          <div>
            <ScrollReveal delay={0.4}>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-gray-800">
        <div className="container-main py-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Truck className="h-8 w-8 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Free Shipping</h4>
                  <p className="text-sm text-gray-400">On orders over $50</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Secure Payment</h4>
                  <p className="text-sm text-gray-400">100% secure transactions</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <RotateCcw className="h-8 w-8 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Easy Returns</h4>
                  <p className="text-sm text-gray-400">30-day return policy</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-main py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-gray-400">
                © {currentYear} FreshCart. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
