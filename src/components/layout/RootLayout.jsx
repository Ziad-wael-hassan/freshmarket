import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollProgress } from './ScrollProgress'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { CartFlyProvider } from '@/components/cart/CartFlyAnimation'

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-surface-dark dark:text-gray-100">
      <ScrollProgress />
      <ScrollToTop />
      <CartFlyProvider>
        <Navbar />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
      </CartFlyProvider>
    </div>
  )
}
