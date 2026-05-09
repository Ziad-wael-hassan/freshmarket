import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Link } from 'react-router-dom'
import { Lock, ChevronRight } from 'lucide-react'

const sections = [
  { id: 'information', label: 'Information We Collect' },
  { id: 'usage', label: 'How We Use Your Information' },
  { id: 'sharing', label: 'Information Sharing' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'children', label: 'Children&apos;s Privacy' },
  { id: 'policy-changes', label: 'Policy Changes' },
  { id: 'contact', label: 'Contact Us' },
]

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — FreshCart</title>
        <meta name="description" content="FreshCart privacy policy explaining how we collect, use, and protect your personal data." />
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
                  <Lock className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Privacy Policy
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
                  At FreshCart, we take your privacy seriously. This Privacy Policy describes how we collect, use,
                  store, and protect your personal information when you use our e-commerce platform. By using
                  FreshCart, you consent to the practices described in this policy.
                </p>
              </ScrollReveal>

              <ScrollReveal id="information">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">1. Information We Collect</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>We collect the following types of information to provide and improve our services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, phone number, shipping address, and account credentials.</li>
                    <li><strong>Order Information:</strong> Products purchased, order history, payment details (processed securely by third-party providers), and delivery preferences.</li>
                    <li><strong>Device &amp; Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent on pages, and referring URLs.</li>
                    <li><strong>Communication Data:</strong> Messages sent through our support channels, email correspondence, and survey responses.</li>
                    <li><strong>Preferences:</strong> Wishlist items, saved searches, product preferences, and notification settings.</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal id="usage">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">2. How We Use Your Information</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>We use your information for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Processing and fulfilling your orders</li>
                    <li>Managing your account and providing customer support</li>
                    <li>Sending order confirmations, shipping updates, and service notifications</li>
                    <li>Personalizing your shopping experience and recommending products</li>
                    <li>Improving our platform, products, and services</li>
                    <li>Detecting and preventing fraud, abuse, and security incidents</li>
                    <li>Sending marketing communications with your consent</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal id="sharing">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">3. Information Sharing</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    We do not sell your personal information to third parties. We may share your information with
                    trusted service providers who help us operate our platform, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment processors for transaction processing</li>
                    <li>Shipping carriers for order delivery</li>
                    <li>Analytics providers to help us understand platform usage</li>
                    <li>Customer service tools to manage support requests</li>
                  </ul>
                  <p>
                    These third parties are contractually obligated to protect your data and may only use it for the
                    specific services they provide.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal id="data-security">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">4. Data Security</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  We implement industry-standard security measures to protect your personal information, including
                  encryption in transit (TLS/SSL), secure data storage, access controls, and regular security audits.
                  However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </ScrollReveal>

              <ScrollReveal id="your-rights">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">5. Your Rights</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                    <li><strong>Objection:</strong> Object to certain processing activities, including marketing</li>
                    <li><strong>Withdrawal of Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                  </ul>
                  <p>
                    To exercise any of these rights, contact us at{' '}
                    <a href="mailto:support@freshcart.com" className="text-primary-600 hover:underline dark:text-primary-400">
                      support@freshcart.com
                    </a>
                    .
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal id="cookies">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">6. Cookies &amp; Tracking</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  FreshCart uses cookies and similar tracking technologies to enhance your browsing experience, analyze
                  platform traffic, and serve personalized content. For detailed information about the cookies we use,
                  please see our{' '}
                  <Link to="/cookies" className="text-primary-600 hover:underline dark:text-primary-400">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </ScrollReveal>

              <ScrollReveal id="third-party">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">7. Third-Party Services</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our platform integrates with third-party services for payment processing, shipping, analytics, and
                  other functionality. These third parties have their own privacy policies governing the use of your
                  information. We encourage you to review their policies before providing any personal data.
                </p>
              </ScrollReveal>

              <ScrollReveal id="children">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">8. Children&apos;s Privacy</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  FreshCart is not intended for use by individuals under the age of 18. We do not knowingly collect
                  personal information from children. If we become aware that a child has provided us with personal
                  data, we will take steps to delete it promptly.
                </p>
              </ScrollReveal>

              <ScrollReveal id="policy-changes">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">9. Policy Changes</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an
                  updated effective date. We encourage you to review this policy periodically to stay informed about
                  how we protect your information.
                </p>
              </ScrollReveal>

              <ScrollReveal id="contact">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">10. Contact Us</h2>
                <div className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                  <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
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

export default Privacy
