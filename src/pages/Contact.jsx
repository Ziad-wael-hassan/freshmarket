import { useState } from 'react'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  ChevronRight,
} from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'support@freshcart.com',
    sub: 'We respond within 24 hours',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+1 (555) 123-4567',
    sub: 'Mon–Sat, 8 AM – 8 PM EST',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: '123 Commerce Street, Suite 100',
    sub: 'New York, NY 10001, USA',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
  },
  {
    icon: MessageCircle,
    label: 'Live Chat',
    value: 'Chat with us now',
    sub: 'Average response: 2 minutes',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    toast.success('Message sent! Our team will get back to you soon.')
  }

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Contact Us — FreshCart</title>
        </Helmet>
        <div className="container-main py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/40">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Message Sent!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for reaching out. Our support team will respond within 24 hours.
            </p>
            <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
              Send Another Message
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — FreshCart</title>
        <meta name="description" content="Get in touch with FreshCart's customer support team via email, phone, or live chat." />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        {/* Header */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
                <Mail className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h1>
                <p className="text-gray-600 dark:text-gray-400">We would love to hear from you</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us more about your question or issue..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 resize-y"
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <div className="space-y-5">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <ScrollReveal key={method.label}>
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${method.color}`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {method.label}
                          </p>
                          <p className="text-sm text-primary-600 dark:text-primary-400">
                            {method.label === 'Live Chat' ? (
                              <button className="hover:underline">{method.value}</button>
                            ) : (
                              method.value
                            )}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {method.sub}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}

              {/* Business Hours */}
              <ScrollReveal delay={0.2}>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Mon – Fri</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">8:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 24/7 Badge */}
              <ScrollReveal delay={0.3}>
                <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-5 text-center">
                  <MessageCircle className="mx-auto h-8 w-8 text-white mb-2" />
                  <h3 className="font-semibold text-white">24/7 Support</h3>
                  <p className="text-primary-100 text-sm">Our team is always here to help</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
