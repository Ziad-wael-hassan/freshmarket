import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Link } from 'react-router-dom'
import { Cookie, ChevronRight } from 'lucide-react'

const sections = [
  { id: 'what-are-cookies', label: 'What Are Cookies' },
  { id: 'how-we-use', label: 'How We Use Cookies' },
  { id: 'types', label: 'Types of Cookies' },
  { id: 'third-party-cookies', label: 'Third-Party Cookies' },
  { id: 'managing', label: 'Managing Cookies' },
  { id: 'tracking', label: 'Tracking Technologies' },
  { id: 'updates', label: 'Updates to This Policy' },
  { id: 'contact', label: 'Contact Us' },
]

const Cookies = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy — FreshCart</title>
        <meta name="description" content="FreshCart cookie policy explaining how we use cookies and similar tracking technologies." />
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
                  <Cookie className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Cookie Policy
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
                  This Cookie Policy explains how FreshCart uses cookies and similar tracking technologies to
                  recognize you when you visit our platform. It explains what these technologies are, why we use them,
                  and your rights to control their use.
                </p>
              </ScrollReveal>

              <ScrollReveal id="what-are-cookies">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">1. What Are Cookies</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you
                  visit a website. They are widely used to make websites work efficiently, enhance user experience,
                  and provide information to website owners. Cookies can be &quot;session&quot; cookies (deleted when
                  you close your browser) or &quot;persistent&quot; cookies (remain until they expire or are deleted).
                </p>
              </ScrollReveal>

              <ScrollReveal id="how-we-use">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">2. How We Use Cookies</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>FreshCart uses cookies for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Operation:</strong> To enable core platform functionality such as shopping cart management, user authentication, and secure checkout.</li>
                    <li><strong>Performance &amp; Analytics:</strong> To understand how visitors interact with our platform, measure traffic, and identify areas for improvement.</li>
                    <li><strong>Personalization:</strong> To remember your preferences, language settings, and recently viewed products for a tailored experience.</li>
                    <li><strong>Marketing:</strong> To deliver relevant advertisements and measure the effectiveness of our marketing campaigns.</li>
                    <li><strong>Security:</strong> To detect fraud, prevent abuse, and protect your account.</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal id="types">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">3. Types of Cookies We Use</h2>
                <div className="mt-6 space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Strictly Necessary Cookies</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      These cookies are essential for the platform to function properly. They enable core features
                      such as cart management, account login, and secure payment processing. The platform cannot
                      function without these cookies.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Performance Cookies</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      These cookies help us understand how visitors interact with our platform by collecting
                      anonymous information about page visits, load times, and error rates. This data helps us
                      optimize the platform for a better user experience.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Functional Cookies</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      These cookies remember your preferences, such as language, currency, and product view
                      settings, to provide a personalized shopping experience.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Targeting &amp; Advertising Cookies</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      These cookies are used to deliver advertisements relevant to your interests, limit the number
                      of times you see an ad, and measure the effectiveness of advertising campaigns.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal id="third-party-cookies">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">4. Third-Party Cookies</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  In addition to our own cookies, we may use third-party cookies from trusted partners for analytics,
                  advertising, and payment processing. These include services from providers such as Google Analytics,
                  Stripe, and shipping carriers. These third parties may set cookies on your device and collect data
                  subject to their own privacy policies.
                </p>
              </ScrollReveal>

              <ScrollReveal id="managing">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">5. Managing Cookies</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    You have the right to accept or reject cookies. Most web browsers automatically accept cookies,
                    but you can modify your browser settings to decline cookies if you prefer.
                  </p>
                  <p>To manage cookies in your browser:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy &amp; Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
                  </ul>
                  <p>
                    Please note that blocking certain types of cookies may impact your experience on our platform
                    and may prevent some features from functioning correctly.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal id="tracking">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">6. Other Tracking Technologies</h2>
                <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    In addition to cookies, we may use other tracking technologies such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Web Beacons:</strong> Small graphic images embedded in emails and pages to track engagement and delivery.</li>
                    <li><strong>Local Storage:</strong> Browser storage used to persist your cart, preferences, and recently viewed items.</li>
                    <li><strong>Session Storage:</strong> Temporary storage for active session data during your visit.</li>
                    <li><strong>Analytics SDKs:</strong> Software development kits integrated into our platform for usage analysis.</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal id="updates">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">7. Updates to This Policy</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation,
                  or our data practices. Changes will be posted on this page with an updated effective date. We
                  encourage you to review this policy periodically.
                </p>
              </ScrollReveal>

              <ScrollReveal id="contact">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">8. Contact Us</h2>
                <div className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                  <p>If you have questions about our use of cookies, please contact us:</p>
                  <p>
                    Email:{' '}
                    <a href="mailto:support@freshcart.com" className="text-primary-600 hover:underline dark:text-primary-400">
                      support@freshcart.com
                    </a>
                  </p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Commerce St, City, State 12345</p>
                  <p className="mt-4">
                    For more information about how we handle your personal data, please see our{' '}
                    <Link to="/privacy" className="text-primary-600 hover:underline dark:text-primary-400">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/terms" className="text-primary-600 hover:underline dark:text-primary-400">
                      Terms of Service
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

export default Cookies
