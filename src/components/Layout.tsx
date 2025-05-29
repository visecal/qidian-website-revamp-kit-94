
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-800 text-gray-100">
      <div className="relative mx-auto min-h-screen max-w-screen-lg">
        <Header />
        <main className="px-4 py-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
