import { Link } from 'react-router-dom'
import { ScrollReveal } from '@/components/common/ScrollReveal'

export const HomeCTA = () => {
  return (
    <section 
      className="py-[120px]"
      style={{ backgroundColor: '#0b0f1a' }}
    >
      <div className="max-w-[640px] mx-auto px-4 text-center">
        <ScrollReveal>
          <p className="text-[11px] text-[#3cb550] uppercase tracking-[3px] mb-4 font-['DM_Sans']">
            Start Shopping
          </p>
          <h2 className="text-[48px] text-white font-['Fraunces'] font-bold leading-[1.2] mb-4">
            Everything you need, all in one place.
          </h2>
          <p className="text-[16px] text-[#9ca3af] font-['DM_Sans'] mt-4">
            Thousands of products. Trusted brands. Delivered to your door.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Link 
            to="/products"
            className="inline-block mt-9 bg-[#3cb550] text-white px-10 py-[14px] rounded-full text-[16px] font-['DM_Sans'] font-semibold hover:bg-[#2ea843] transition-all duration-200 hover:-translate-y-[1px]"
          >
            Shop Now →
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-[12px] text-[#4b5563] font-['DM_Sans'] mt-4">
            Free shipping on orders over $50 · No account required
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default HomeCTA