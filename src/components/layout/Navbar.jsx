import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteContent } from '../../content/siteContent.js'

const baseLinkClassName =
  'rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-white hover:text-slate-950 hover:shadow-sm'

function Navbar() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const getAnchorHref = (href) => (isHomePage ? href : `/${href}`)

  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/76 shadow-sm shadow-slate-200/50 backdrop-blur-xl">
      <div className="site-container flex items-center justify-between gap-3 py-2.5">
        <Link
          to="/"
          className="flex shrink-0 items-center"
        >
          <img 
            src="/logo.svg" 
            alt={siteContent.navigation.brand} 
            className="h-12 w-auto drop-shadow-sm md:h-16 lg:h-[72px]" 
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/70 p-1 shadow-inner shadow-white md:flex" aria-label="Nawigacja glowna">
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
            className="ml-1 inline-flex rounded-full border border-brand-blue bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-blue/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-blue-hover hover:shadow-lg hover:shadow-brand-blue/30"
          >
            {siteContent.navigation.cta.label}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <NavLink to="/demo" className="rounded-full border border-slate-300 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
            Demo
          </NavLink>
          <a href={getAnchorHref('#kontakt')} className="rounded-full bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-brand-blue/30">
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
              className="whitespace-nowrap rounded-full border border-slate-300 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
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
