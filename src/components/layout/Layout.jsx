import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CookieConsent from '../ui/CookieConsent.jsx'
import { SNTicker } from '../magicui/sn-ticker.jsx'
import { LaserReveal } from '../magicui/laser-reveal.jsx'

function Layout() {
  return (
    <div className="relative min-h-screen text-slate-900 overflow-x-hidden">
      {/* Animacja Laserowa na wejściu */}
      <LaserReveal />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
       
      {/* Tło z matrycą numerów seryjnych */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-70">
        <SNTicker className="absolute bottom-[-10vh] left-[-2rem] sm:left-0 md:left-[1vw] lg:left-[2vw] xl:left-[3vw] h-[120vh] w-64 -rotate-12" direction="up" speed={80} />
        <SNTicker className="absolute top-[-10vh] right-[-2rem] sm:right-0 md:right-[1vw] lg:right-[2vw] xl:right-[3vw] h-[120vh] w-64 -rotate-12" direction="down" speed={100} />
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
