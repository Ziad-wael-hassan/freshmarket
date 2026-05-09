import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Users,
  GraduationCap,
  Coffee,
  Dumbbell,
  Laptop,
  Plane,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Shield,
  Star,
  Target,
  Zap,
} from 'lucide-react'

const benefits = [
  { icon: Heart, label: 'Health Insurance', desc: 'Comprehensive medical, dental, and vision for you and your family', color: 'from-rose-500/20 to-rose-500/5 border-rose-500/20' },
  { icon: Laptop, label: 'Remote First', desc: 'Work from anywhere — home, office, or a café in Bali', color: 'from-blue-500/20 to-blue-500/5 border-blue-500/20' },
  { icon: DollarSign, label: 'Top-Tier Pay', desc: 'Competitive salary + equity + annual performance bonuses', color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20' },
  { icon: GraduationCap, label: 'Learning Fund', desc: '$5,000 annual budget for courses, conferences, and books', color: 'from-violet-500/20 to-violet-500/5 border-violet-500/20' },
  { icon: Plane, label: 'Flexible PTO', desc: 'Unlimited vacation — take the time you need to recharge', color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20' },
  { icon: Coffee, label: 'Kitchen Staple', desc: 'Fully stocked with snacks, drinks, and barista-grade coffee', color: 'from-amber-500/20 to-amber-500/5 border-amber-500/20' },
  { icon: Dumbbell, label: 'Wellness Budget', desc: 'Gym membership, fitness classes, or meditation apps — on us', color: 'from-green-500/20 to-green-500/5 border-green-500/20' },
  { icon: Users, label: 'Team Retreats', desc: 'Quarterly offsites and an annual company-wide retreat', color: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20' },
]

const openPositions = [
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote / New York, NY',
    type: 'Full-time',
    tags: ['React', 'TypeScript', 'Next.js'],
    featured: true,
  },
  {
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    tags: ['Node.js', 'Python', 'PostgreSQL'],
    featured: false,
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
    featured: false,
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    tags: ['E-commerce', 'Agile', 'Data-driven'],
    featured: false,
  },
  {
    title: 'Customer Support Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
    tags: ['Communication', 'Problem-solving'],
    featured: false,
  },
  {
    title: 'Marketing Coordinator',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'Full-time',
    tags: ['Social Media', 'Content', 'Analytics'],
    featured: false,
  },
]

const values = [
  { icon: Target, label: 'Mission-Driven', desc: 'Every feature we ship, every decision we make starts with our customers.' },
  { icon: Shield, label: 'Radical Transparency', desc: 'We share wins, failures, and lessons openly. No politics, just progress.' },
  { icon: Zap, label: 'Bias for Action', desc: 'We move fast, iterate, and improve. Perfection is the enemy of progress.' },
  { icon: Star, label: 'Elevate Each Other', desc: 'Your growth is our growth. We invest in people, not just products.' },
]

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers — FreshCart</title>
        <meta
          name="description"
          content="Join the FreshCart team. View open positions, learn about our culture and benefits, and start your career with us."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Careers' }]} />

        {/* ===== HERO ===== */}
        <ScrollReveal>
          <div className="relative isolate mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 lg:p-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,197,94,0.12),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(34,197,94,0.06),transparent_50%)]" />
            <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 rounded-full bg-primary-400/5 blur-3xl" />

            {/* Decorative dots */}
            <svg className="absolute right-8 top-8 h-20 w-20 text-white/5" viewBox="0 0 80 80">
              <circle cx="8" cy="8" r="2" fill="currentColor" />
              <circle cx="24" cy="8" r="2" fill="currentColor" />
              <circle cx="40" cy="8" r="2" fill="currentColor" />
              <circle cx="56" cy="8" r="2" fill="currentColor" />
              <circle cx="72" cy="8" r="2" fill="currentColor" />
              <circle cx="8" cy="24" r="2" fill="currentColor" />
              <circle cx="24" cy="24" r="2" fill="currentColor" />
              <circle cx="40" cy="24" r="2" fill="currentColor" />
              <circle cx="56" cy="24" r="2" fill="currentColor" />
              <circle cx="72" cy="24" r="2" fill="currentColor" />
              <circle cx="8" cy="40" r="2" fill="currentColor" />
              <circle cx="24" cy="40" r="2" fill="currentColor" />
              <circle cx="40" cy="40" r="2" fill="currentColor" />
              <circle cx="56" cy="40" r="2" fill="currentColor" />
              <circle cx="72" cy="40" r="2" fill="currentColor" />
            </svg>

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <Briefcase className="h-8 w-8 text-primary-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                    Join Our Team
                  </h1>
                  <p className="mt-2 max-w-xl text-base text-gray-400">
                    Help us shape the future of online shopping. We are building something remarkable —
                    and we want you to be part of it.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-xl border border-primary-500/20 bg-primary-500/10 px-5 py-3 backdrop-blur-sm">
                <Users className="h-5 w-5 text-primary-400" />
                <div>
                  <p className="text-sm font-semibold text-primary-300">200+ Team Members</p>
                  <p className="text-xs text-primary-400/70">Across 15 countries</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== CULTURE + VALUES ===== */}
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Culture */}
          <ScrollReveal>
            <div className="rounded-2xl border border-gray-200/80 bg-white/50 p-7 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Our Culture</h2>
              <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
                At FreshCart, we believe great work happens when smart, passionate people are given
                autonomy and trust. We are builders, problem-solvers, and collaborators who thrive on
                complexity and celebrate small wins.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
                Diversity isn't just a metric — it is how we build better products. We hire for
                potential, not pedigree, and we create space for every voice to be heard.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {values.map((v) => {
                  const Icon = v.icon
                  return (
                    <div
                      key={v.label}
                      className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 dark:border-gray-800 dark:bg-gray-800/50"
                    >
                      <Icon className="h-4 w-4 text-primary-500" />
                      <p className="mt-1.5 text-xs font-semibold text-gray-900 dark:text-gray-200">{v.label}</p>
                      <p className="mt-0.5 text-[10px] leading-tight text-gray-500 dark:text-gray-500">{v.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-gray-200/80 bg-white/50 p-7 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Join?</h2>
              <div className="mt-5 space-y-4">
                {[
                  { stat: '10M+', label: 'Happy customers served' },
                  { stat: '$50M', label: 'Funding raised' },
                  { stat: '97%', label: 'Employee satisfaction' },
                  { stat: '40+', label: 'Nationalities on the team' },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                    <span className="text-lg font-bold text-primary-500">{item.stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ===== BENEFITS ===== */}
        <ScrollReveal>
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Benefits & Perks
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              We invest in our people — because you deserve the best.
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {benefits.map((ben, idx) => {
            const Icon = ben.icon
            return (
              <ScrollReveal key={ben.label} delay={idx * 0.03}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`group rounded-2xl border bg-gradient-to-br p-5 shadow-sm transition-all hover:shadow-md ${ben.color}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                    <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                    {ben.label}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {ben.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* ===== OPEN POSITIONS ===== */}
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Open Positions
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {openPositions.length} roles available — find yours.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mb-14 space-y-3">
          {openPositions.map((job, idx) => (
            <ScrollReveal key={job.title} delay={idx * 0.04}>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
                className={`group relative overflow-hidden rounded-2xl border bg-white/50 p-5 backdrop-blur-sm transition-all hover:shadow-md md:p-6 ${
                  job.featured
                    ? 'border-primary-500/30 bg-gradient-to-r from-primary-500/5 to-transparent dark:from-primary-500/5'
                    : 'border-gray-200/80 hover:border-primary-500/20 dark:border-gray-800 dark:hover:border-primary-500/20 dark:bg-gray-900/50'
                }`}
              >
                {job.featured && (
                  <div className="absolute right-0 top-0">
                    <div className="flex items-center gap-1 rounded-bl-xl bg-primary-500 px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                      <Sparkles size={10} />
                      Featured
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
                      <Badge variant={job.featured ? 'success' : 'info'}>{job.department}</Badge>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="text-gray-400" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} className="text-gray-400" />
                        {job.type}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant={job.featured ? 'default' : 'outline'} size="sm" className="shrink-0">
                      Apply Now
                      <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <ScrollReveal>
          <div className="group relative isolate overflow-hidden rounded-2xl border border-gray-200/80 bg-white/50 p-8 text-center backdrop-blur-sm transition-all hover:border-primary-500/20 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.03),transparent_60%)]" />
            <Sparkles className="relative mx-auto h-8 w-8 text-primary-500" />
            <h2 className="relative mt-3 text-xl font-bold text-gray-900 dark:text-white">
              Do not see the right fit?
            </h2>
            <p className="relative mt-1 text-sm text-gray-500 dark:text-gray-400">
              We are always scouting for exceptional talent. Send us your resume — we will reach out
              when something opens up.
            </p>
            <motion.div
              className="relative mt-6 inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button variant="outline" size="lg">
                Send Your Resume
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default Careers
