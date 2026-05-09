import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollProgress } from './ScrollProgress'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { CartFlyProvider } from '@/components/cart/CartFlyAnimation'

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white">
      <ScrollProgress />
      <ScrollToTop />
      <CartFlyProvider>
        <Navbar />
        <main className="pt-20 bg-inherit dark:bg-[#0f1117]">
          <Outlet />
        </main>
        <Footer />
      </CartFlyProvider>
    </div>
  )
}
