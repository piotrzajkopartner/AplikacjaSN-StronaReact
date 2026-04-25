import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CookieConsent from '../ui/CookieConsent.jsx'
import { SNTicker } from '../magicui/sn-ticker.jsx'

function Layout() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-x-hidden">
      {/* Tło z matrycą numerów seryjnych */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <SNTicker className="absolute bottom-0 -left-12 sm:left-4 h-[120vh] w-48 -rotate-12" direction="up" speed={80} />
        <SNTicker className="absolute top-0 -right-12 sm:right-4 h-[120vh] w-48 -rotate-12" direction="down" speed={100} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <Navbar />
        <main className="w-full flex-1 px-4 py-8 md:py-10">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </div>
  )
}

export default Layout
