import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CookieConsent from '../ui/CookieConsent.jsx'

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
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
