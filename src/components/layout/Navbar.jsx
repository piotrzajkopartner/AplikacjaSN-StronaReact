import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteContent } from '../../content/siteContent.js'

const baseLinkClassName =
  'rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950'

function Navbar() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const getAnchorHref = (href) => (isHomePage ? href : `/${href}`)

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/90 backdrop-blur">
      <div className="site-container flex items-center justify-between gap-3 py-3">
        <Link
          to="/"
          className="flex shrink-0 items-center"
        >
          <img 
            src="/logo.svg" 
            alt={siteContent.navigation.brand} 
            className="h-7 w-auto md:h-9" 
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Nawigacja glowna">
          {siteContent.navigation.links.map((item) => (
            <a key={item.href} href={getAnchorHref(item.href)} className={baseLinkClassName}>
              {item.label}
            </a>
          ))}
          <NavLink to="/demo" className={baseLinkClassName}>
            Demo
          </NavLink>
          <a
            href={getAnchorHref(siteContent.navigation.cta.href)}
            className="ml-2 inline-flex rounded-lg border border-blue-950 bg-blue-950 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
          >
            {siteContent.navigation.cta.label}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <NavLink to="/demo" className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700">
            Demo
          </NavLink>
          <a href={getAnchorHref('#kontakt')} className="rounded-md bg-blue-950 px-3 py-1.5 text-xs font-semibold text-white">
            Kontakt
          </a>
        </div>
      </div>

      <nav className="border-t border-slate-200/70 py-2 md:hidden" aria-label="Nawigacja sekcji mobilna">
        <div className="site-container flex gap-2 overflow-x-auto pb-1">
          {siteContent.navigation.links.map((item) => (
            <a
              key={`mobile-${item.href}`}
              href={getAnchorHref(item.href)}
              className="whitespace-nowrap rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
