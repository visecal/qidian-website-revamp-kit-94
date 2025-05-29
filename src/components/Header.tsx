
import { Link } from 'react-router-dom'
import { Search, Menu, MessageCircle, ChevronLeft } from 'lucide-react'

function Header() {
  return (
    <header className="sticky top-0 z-20 bg-zinc-900 border-b border-zinc-700">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-5 h-5 text-white cursor-pointer" />
          <Search className="w-5 h-5 text-white cursor-pointer" />
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-red-600 px-3 py-1 rounded text-white font-bold text-sm">
            QP
          </div>
        </Link>
        
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5 text-white cursor-pointer" />
          <Menu className="w-5 h-5 text-white cursor-pointer" />
        </div>
      </div>
    </header>
  )
}

export default Header
