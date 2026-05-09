import { ScrollReveal } from '@/components/common/ScrollReveal'
import { CheckCircle } from 'lucide-react'

const testimonials = [
  {
    quote: "The quality of the scarves I ordered was incredible. Fast shipping and the packaging was beautiful — felt like a luxury unboxing experience.",
    name: "Sarah M.",
    location: "Cairo, Egypt",
    rating: 5,
    initials: "SM"
  },
  {
    quote: "Found exactly what I was looking for after years of searching. The search experience is so clean and the checkout was seamless.",
    name: "Ahmed K.",
    location: "Dubai, UAE",
    rating: 5,
    initials: "AK"
  },
  {
    quote: "Great range of electronics at fair prices. Customer support actually responded within minutes. Will definitely order again.",
    name: "Layla R.",
    location: "Riyadh, KSA",
    rating: 5,
    initials: "LR"
  }
]

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-[2px] mb-4">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className="w-4 h-4 text-[#3cb550]" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export const Testimonials = () => {
  return (
    <section className="py-[80px]">
      <div className="max-w-[1280px] mx-auto px-4">
        <ScrollReveal>
          <p className="text-center text-[11px] text-[#3cb550] uppercase tracking-[2px] mb-3 font-['DM_Sans']">
            Reviews
          </p>
          <h2 className="text-center text-[36px] text-white font-['Fraunces'] font-bold mb-12">
            What our customers say
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <div 
                className="bg-[#161b27] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-[28px]"
              >
                <StarRating rating={testimonial.rating} />
                
                <p className="font-['DM_Sans'] text-[15px] text-[#d1d5db] leading-[1.7] italic mb-5">
                  <span className="text-[#3cb550] text-[24px]">"</span>
                  {testimonial.quote}
                  <span className="text-[#3cb550] text-[24px]">"</span>
                </p>
                
                <div className="border-t border-[rgba(255,255,255,0.06)] my-5" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #1a4d2e 0%, #3cb550 100%)'
                      }}
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-white text-[14px] font-semibold">{testimonial.name}</p>
                      <p className="text-[#6b7280] text-[12px]">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#3cb550] text-[11px]">
                    <CheckCircle size={12} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials