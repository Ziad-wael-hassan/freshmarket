import { ScrollReveal } from '@/components/common/ScrollReveal'

const brands = [
  'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 
  'Zara', 'H&M', 'Levi\'s', 'Dyson', 'Philips'
]

export const BrandsRow = () => {
  return (
    <section className="py-[60px]">
      <div className="max-w-[1280px] mx-auto px-4">
        <ScrollReveal>
          <p className="text-center text-[12px] text-[#6b7280] uppercase tracking-[2px] mb-8 font-['DM_Sans']">
            Brands We Carry
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center items-center gap-[32px] overflow-x-auto scrollbar-hide">
            {brands.map((brand, index) => (
              <span 
                key={brand} 
                className="font-['DM_Sans'] text-[16px] font-semibold text-[#4b5563] hover:text-white transition-colors duration-200 whitespace-nowrap cursor-default"
              >
                {brand}
                {index < brands.length - 1 && (
                  <span className="mx-[20px] text-[#2e3348]">·</span>
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default BrandsRow