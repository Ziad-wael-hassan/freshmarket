import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollProgress } from './ScrollProgress'

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-surface-dark dark:text-gray-100">
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
