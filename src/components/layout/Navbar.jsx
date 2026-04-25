import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteContent } from '../../content/siteContent.js'

const baseLinkClassName = 'rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'

function Navbar() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="text-sm font-semibold uppercase tracking-wide text-slate-900">
          {siteContent.navigation.brand}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Nawigacja glowna">
          {siteContent.navigation.links.map((item) => (
            <a
              key={item.href}
              href={location.pathname === '/' ? item.href : `/${item.href}`}
              className={baseLinkClassName}
            >
              {item.label}
            </a>
          ))}
          <NavLink to="/demo" className={baseLinkClassName}>
            Demo
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
