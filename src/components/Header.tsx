
import { Link } from 'react-router-dom'
import { Search, Menu, MessageCircle, ChevronLeft } from 'lucide-react'

function Header() {
  return (
    <header className="sticky top-0 z-20 bg-zinc-800 border-b border-zinc-700">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-6 h-6 cursor-pointer" />
          <Search className="w-6 h-6 cursor-pointer" />
        </div>
        
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/logo.png" 
            alt="Qidian-VP" 
            className="w-10 h-10"
          />
        </Link>
        
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 cursor-pointer" />
          <Menu className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}

export default Header
