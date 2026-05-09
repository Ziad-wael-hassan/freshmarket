import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    title: 'Fresh & Quality Products',
    subtitle: 'Discover amazing deals on premium products handpicked for you',
    cta: 'Shop Now',
    link: '/products',
    bg: 'from-primary-50 to-primary-100 dark:from-gray-900 dark:to-primary-900/20',
    image: 'https://img.freepik.com/free-vector/shopping-concept-illustration_114360-1060.jpg',
    gradient: 'from-primary-600 to-primary-800',
  },
  {
    title: 'Fast & Free Delivery',
    subtitle: 'Get your orders delivered to your doorstep with free shipping on orders over $50',
    cta: 'Learn More',
    link: '/products',
    bg: 'from-blue-50 to-blue-100 dark:from-gray-900 dark:to-blue-900/20',
    image: 'https://img.freepik.com/free-vector/delivery-service-illustration_114360-1401.jpg',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    title: 'Secure Shopping Experience',
    subtitle: 'Shop with confidence with our 100% secure payment processing and easy returns',
    cta: 'Get Started',
    link: '/register',
    bg: 'from-emerald-50 to-emerald-100 dark:from-gray-900 dark:to-emerald-900/20',
    image: 'https://img.freepik.com/free-vector/security-concept-illustration_114360-2800.jpg',
    gradient: 'from-emerald-600 to-emerald-800',
  },
]

export const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      className="hero-carousel"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <section
            className={`relative overflow-hidden bg-gradient-to-br ${slide.bg}`}
          >
            <div className="container-main py-16 lg:py-24">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl font-bold text-gray-900 dark:text-gray-100 lg:text-5xl"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg text-gray-600 dark:text-gray-400 lg:text-xl max-w-lg"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Link to={slide.link}>
                      <Button size="lg">
                        {slide.cta}
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full max-w-lg mx-auto h-80 object-contain"
                    />
                  </motion.div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-5 blur-3xl rounded-full`}
                  />
                </motion.div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
