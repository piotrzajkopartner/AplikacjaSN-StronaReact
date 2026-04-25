import { Link, NavLink } from 'react-router-dom'

const baseLinkClassName = 'rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-sm font-semibold uppercase tracking-wide text-slate-900">
          Partner Numery Seryjne
        </Link>

        <nav className="flex items-center gap-2" aria-label="Nawigacja glowna">
          <NavLink to="/" className={baseLinkClassName} end>
            Start
          </NavLink>
          <NavLink to="/demo" className={baseLinkClassName}>
            Demo
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
