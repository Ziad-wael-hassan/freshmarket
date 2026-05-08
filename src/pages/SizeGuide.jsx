import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Ruler, Shirt, Users, Footprints, Info } from 'lucide-react'

const categories = [
  { id: 'men', label: 'Men', icon: Shirt },
  { id: 'women', label: 'Women', icon: Users },
  { id: 'kids', label: 'Kids', icon: Users },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
]

const sizeCharts = {
  men: {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rows: [
      { label: 'Chest (in)', values: ['34-36', '36-38', '38-40', '40-42', '42-44', '44-46'] },
      { label: 'Waist (in)', values: ['28-30', '30-32', '32-34', '34-36', '36-38', '38-40'] },
      { label: 'Hip (in)', values: ['34-36', '36-38', '38-40', '40-42', '42-44', '44-46'] },
      { label: 'Sleeve (in)', values: ['31-32', '32-33', '33-34', '34-35', '35-36', '36-37'] },
    ],
  },
  women: {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rows: [
      { label: 'Bust (in)', values: ['30-32', '32-34', '34-36', '36-38', '38-40', '40-42'] },
      { label: 'Waist (in)', values: ['24-26', '26-28', '28-30', '30-32', '32-34', '34-36'] },
      { label: 'Hip (in)', values: '32-34 34-36 36-38 38-40 40-42 42-44'.split(' ') },
      { label: 'Inseam (in)', values: ['29-30', '30-31', '31-32', '32-33', '33-34', '34-35'] },
    ],
  },
  kids: {
    sizes: ['2T', '3T', '4T', '5-6', '7-8', '10-12'],
    rows: [
      { label: 'Height (in)', values: ['33-36', '36-39', '39-42', '42-48', '48-54', '54-60'] },
      { label: 'Weight (lbs)', values: ['28-32', '32-36', '36-42', '42-52', '52-66', '66-88'] },
      { label: 'Chest (in)', values: ['20-21', '21-22', '22-23', '23-25', '25-27', '27-30'] },
    ],
  },
  shoes: {
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    rows: [
      { label: 'EU Size', values: ['36', '37', '38', '39', '41', '42', '43', '44'] },
      { label: 'UK Size', values: ['3', '4', '5', '6', '7', '8', '9', '10'] },
      { label: 'Foot Length (cm)', values: ['22', '23', '24', '25', '26', '27', '28', '29'] },
    ],
  },
}

const tips = [
  'Measure yourself wearing the undergarments you plan to wear with the item',
  'Use a soft measuring tape and keep it snug but not tight',
  'For chest/bust: measure around the fullest part',
  'For waist: measure around your natural waistline (narrowest part)',
  'For inseam: measure from the crotch seam to the bottom of the ankle',
  'If you are between sizes, we recommend sizing up for a more comfortable fit',
]

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState('men')

  const chart = sizeCharts[activeTab]

  return (
    <>
      <Helmet>
        <title>Size Guide — FreshCart</title>
        <meta
          name="description"
          content="Find your perfect fit with FreshCart's detailed size charts for men, women, kids, and shoes."
        />
      </Helmet>

      <div className="container-main py-12">
        <Breadcrumbs items={[{ label: 'Size Guide' }]} />

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
              <Ruler className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Size Guide</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Find your perfect fit with our detailed size charts
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeTab === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'border border-gray-300 text-gray-700 hover:border-primary-300 hover:text-primary-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400'
                  }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Size Chart Table */}
        <ScrollReveal delay={0.2}>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/80">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-gray-100 min-w-[140px]">
                    Measurement
                  </th>
                  {chart.sizes.map((size) => (
                    <th
                      key={size}
                      className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {chart.rows.map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300">
                      {row.label}
                    </td>
                    {row.values.map((val, i) => (
                      <td key={i} className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Measuring Tips */}
        <ScrollReveal delay={0.3}>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-5 w-5 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Measuring Tips</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}

export default SizeGuide
