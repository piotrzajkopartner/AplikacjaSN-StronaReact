import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings, X } from 'lucide-react'
import Button from './Button.jsx'
import { cn } from '../../lib/utils'

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsOpen(true)
      setShowSettings(true)
    }
    window.addEventListener('openCookieSettings', handleOpenSettings)
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings)
  }, [])

  useEffect(() => {
    const consent = localStorage.getItem('sn_cookie_consent')
    if (!consent) {
      // Delay opening slightly for effect
      const timer = setTimeout(() => setIsOpen(true), 1500)
      return () => clearTimeout(timer)
    } else {
      try {
        setPreferences(JSON.parse(consent))
      } catch (e) {
        // Fallback if parsing fails
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const prefs = { necessary: true, analytics: true, marketing: true }
    setPreferences(prefs)
    localStorage.setItem('sn_cookie_consent', JSON.stringify(prefs))
    setIsOpen(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('sn_cookie_consent', JSON.stringify(preferences))
    setIsOpen(false)
  }

  const togglePreference = (key) => {
    if (key === 'necessary') return
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const Switch = ({ checked, onChange, disabled }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aeff] focus-visible:ring-offset-2",
        checked ? "bg-[#00aeff]" : "bg-slate-300",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:justify-start sm:p-6 pointer-events-none">
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm pointer-events-auto"
              onClick={() => setShowSettings(false)}
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "relative pointer-events-auto flex w-full flex-col gap-4 bg-white/90 backdrop-blur-2xl shadow-2xl shadow-[#00aeff]/10 ring-1 ring-slate-200/60 sm:w-[420px] p-6",
              showSettings ? "z-10 m-4 sm:m-0 rounded-2xl" : "m-4 sm:m-0 rounded-2xl"
            )}
          >
            {!showSettings ? (
              <>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#00aeff]">
                    <Cookie className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Ciasteczka & Prywatność</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Ta strona korzysta z plików cookie, aby zagwarantować Ci najwyższą jakość świadczonych usług B2B i analizować ruch.
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row-reverse sm:justify-start">
                  <Button onClick={handleAcceptAll} variant="primary" className="w-full sm:w-auto text-xs py-2 min-h-0">
                    Akceptuj wszystkie
                  </Button>
                  <Button onClick={() => setShowSettings(true)} variant="secondary" className="w-full sm:w-auto text-slate-600 hover:text-slate-900 text-xs py-2 min-h-0">
                    <Settings className="mr-2 h-3.5 w-3.5" /> Ustawienia
                  </Button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Settings className="h-5 w-5 text-[#00aeff]" />
                    <h3 className="font-semibold text-lg">Preferencje</h3>
                  </div>
                  <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Niezbędne</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-4">Podstawowe pliki wymagane do działania serwisu. Nie można ich wyłączyć.</p>
                    </div>
                    <Switch checked={preferences.necessary} disabled={true} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Analityczne</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-4">Zanonimizowane dane o ruchu pomagające rozwijać nasz produkt.</p>
                    </div>
                    <Switch checked={preferences.analytics} onChange={() => togglePreference('analytics')} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Marketingowe</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-4">Pozwalają na dopasowanie treści i reklam do Twoich potrzeb.</p>
                    </div>
                    <Switch checked={preferences.marketing} onChange={() => togglePreference('marketing')} />
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                  <Button onClick={handleSavePreferences} variant="primary" className="w-full">
                    Zapisz preferencje
                  </Button>
                  <Button onClick={handleAcceptAll} variant="secondary" className="w-full">
                    Akceptuj wszystkie
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
