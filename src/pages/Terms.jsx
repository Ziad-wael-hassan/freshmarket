import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Link } from 'react-router-dom'
import { Shield, ChevronRight } from 'lucide-react'

const sections = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'orders', label: 'Orders & Payments' },
  { id: 'shipping', label: 'Shipping & Returns' },
  { id: 'responsibilities', label: 'User Responsibilities' },
  { id: 'prohibited', label: 'Prohibited Activities' },
  { id: 'intellectual', label: 'Intellectual Property' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact Us' },
]

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service — FreshCart</title>
        <meta name="description" content="Terms and conditions governing the use of FreshCart e-commerce platform." />
      </Helmet>

      <div className="container-main py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 px-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Sections
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                  >
                    <ChevronRight size={14} />
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900">
                  <Shield className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Terms of Service
                  </h1>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: January 1, 2025
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Welcome to FreshCart. By accessing or using our platform, you agree to be bound by these Terms of Service.
                  If you do not agree with any part of these terms, please refrain from using our services.
                </p>
              </ScrollReveal>

              <ScrollReveal id="acceptance">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  By creating an account, placing an order, or browsing FreshCart, you acknowledge that you have read,
                  understood, and agree to these terms. We reserve the right to update these terms at any time, and
                  continued use of the platform constitutes acceptance of any changes.
                </p>
              </ScrollReveal>

              <ScrollReveal id="accounts">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">2. Accounts</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all
                  activities that occur under your account. You must provide accurate, current, and complete information
                  during registration. FreshCart reserves the right to suspend or terminate accounts that violate these
                  terms or engage in fraudulent activity.
                </p>
              </ScrollReveal>

              <ScrollReveal id="orders">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">3. Orders & Payments</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    All orders placed through FreshCart are subject to acceptance and availability. We reserve the right
                    to cancel or refuse any order at our discretion.
                  </p>
                  <p>
                    Prices are displayed in the applicable currency and include applicable taxes unless stated otherwise.
                    Payment must be completed at the time of purchase using one of the accepted payment methods.
                  </p>
                  <p>
                    We use secure third-party payment processors to handle transactions. FreshCart does not store your
                    full payment card details.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal id="shipping">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">4. Shipping & Returns</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    Shipping times and costs vary depending on the delivery location and shipping method selected.
                    Estimated delivery dates are provided at checkout and are not guaranteed.
                  </p>
                  <p>
                    Our return policy allows you to return most items within 30 days of delivery for a refund or
                    exchange, provided the item is unused and in its original packaging. Certain items, such as
                    perishable goods and personal care items, may be exempt from returns.
                  </p>
                  <p>
                    To initiate a return, please contact our support team at{' '}
                    <a href="mailto:support@freshcart.com" className="text-primary-600 hover:underline dark:text-primary-400">
                      support@freshcart.com
                    </a>
                    .
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal id="responsibilities">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">5. User Responsibilities</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>As a user of FreshCart, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and truthful information when creating an account or placing an order</li>
                    <li>Keep your login credentials secure and not share them with others</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Use the platform only for lawful purposes</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal id="prohibited">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">6. Prohibited Activities</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>You may not use FreshCart for any of the following:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Engaging in fraudulent, abusive, or illegal activities</li>
                    <li>Attempting to bypass our security measures or access restricted areas</li>
                    <li>Uploading malicious code, viruses, or harmful content</li>
                    <li>Interfering with the proper functioning of the platform</li>
                    <li>Scraping, data mining, or harvesting information without authorization</li>
                    <li>Impersonating another person or entity</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal id="intellectual">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">7. Intellectual Property</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  All content on FreshCart, including but not limited to text, graphics, logos, images, software, and
                  product descriptions, is the property of FreshCart or its licensors and is protected by applicable
                  intellectual property laws. You may not reproduce, distribute, modify, or create derivative works
                  without our prior written consent.
                </p>
              </ScrollReveal>

              <ScrollReveal id="liability">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">8. Limitation of Liability</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  FreshCart and its affiliates shall not be liable for any indirect, incidental, special, consequential,
                  or punitive damages arising from your use of the platform, including but not limited to loss of
                  profits, data, or business opportunities. Our total liability shall not exceed the amount paid by you
                  for the specific product or service giving rise to the claim.
                </p>
              </ScrollReveal>

              <ScrollReveal id="third-party">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">9. Third-Party Services</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  FreshCart may integrate with third-party services for payment processing, shipping, analytics, and
                  other functions. We do not control these third parties and are not responsible for their actions,
                  policies, or failures. Your interactions with third-party services are governed by their respective
                  terms and policies.
                </p>
              </ScrollReveal>

              <ScrollReveal id="changes">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">10. Changes to Terms</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may revise these terms from time to time. Changes will be posted on this page with an updated
                  effective date. We encourage you to review these terms periodically. Continued use of FreshCart after
                  changes constitutes acceptance of the revised terms.
                </p>
              </ScrollReveal>

              <ScrollReveal id="contact">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">11. Contact Us</h2>
                <div className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <p>
                    Email:{' '}
                    <a href="mailto:support@freshcart.com" className="text-primary-600 hover:underline dark:text-primary-400">
                      support@freshcart.com
                    </a>
                  </p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Commerce St, City, State 12345</p>
                  <p className="mt-4">
                    Or visit our{' '}
                    <Link to="/contact" className="text-primary-600 hover:underline dark:text-primary-400">
                      Contact Page
                    </Link>
                    .
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Terms
