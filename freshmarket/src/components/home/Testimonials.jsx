import { ScrollReveal } from '@/components/common/ScrollReveal'
import { CheckCircle } from 'lucide-react'
import './Testimonials.css'

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

const StarRating = () => {
  return (
    <div className="testimonial-stars">
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
    <section className="testimonials-section">
      <div className="testimonials-container">
        <ScrollReveal className="testimonials-header">
          <p className="text-[#3cb550] text-[12px] uppercase tracking-[3px] mb-3 font-semibold">
            Testimonials
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-white font-['Fraunces'] font-bold leading-tight">
            What our <em className="italic font-medium text-[#3cb550]">customers</em> say
          </h2>
        </ScrollReveal>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal 
              key={testimonial.name} 
              delay={index * 0.15}
              className="h-full"
            >
              <div className="testimonial-card">
                <StarRating />
                
                <div className="testimonial-quote-wrapper">
                  <span className="testimonial-quote-icon">“</span>
                  <p className="testimonial-quote">
                    {testimonial.quote}
                  </p>
                </div>
                
                <hr className="testimonial-divider" />
                
                <div className="testimonial-footer">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {testimonial.initials}
                    </div>
                    <div className="reviewer-details">
                      <span className="reviewer-name">{testimonial.name}</span>
                      <span className="reviewer-location">{testimonial.location}</span>
                    </div>
                  </div>
                  <div className="verified-badge">
                    <CheckCircle size={12} strokeWidth={2.5} />
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