import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-[#1D9E75] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 no-underline text-white">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl">
            G
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">GTE Procesbibliotheek</h1>
            <p className="text-xs text-white/70 leading-tight">Green Teams Europe</p>
          </div>
        </Link>
      </div>
    </header>
  )
}
