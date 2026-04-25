import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CookieConsent from '../ui/CookieConsent.jsx'
import { SNTicker } from '../magicui/sn-ticker.jsx'
import { LaserReveal } from '../magicui/laser-reveal.jsx'

function Layout() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-x-hidden">
      {/* Animacja Laserowa na wejściu */}
      <LaserReveal />
      
      {/* Tło z matrycą numerów seryjnych */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden flex justify-center">
        <div className="relative w-full max-w-[1500px] h-full">
          <SNTicker className="absolute bottom-0 -left-12 sm:left-4 md:left-12 lg:left-24 h-[120vh] w-64 -rotate-12" direction="up" speed={80} />
          <SNTicker className="absolute top-0 -right-12 sm:right-4 md:right-12 lg:right-24 h-[120vh] w-64 -rotate-12" direction="down" speed={100} />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <Navbar />
        <main className="w-full flex-1 py-8 md:py-10 lg:py-12">
          <div className="site-container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </div>
  )
}

export default Layout
