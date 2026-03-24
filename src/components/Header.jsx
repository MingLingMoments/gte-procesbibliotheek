import { Link } from 'react-router-dom'
import GteLogo from './GteLogo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-[#2D2D2D] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline text-white">
          <GteLogo className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-semibold leading-tight">GTE Procesbibliotheek</h1>
            <p className="text-xs text-white/60 leading-tight">Green Teams Europe</p>
          </div>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
