import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { Cookie, Settings, X } from 'lucide-react'
import Button from './Button.jsx'

const storageKey = 'sn_cookie_consent'
const necessaryPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

function hasSavedPreferences() {
  if (typeof window === 'undefined') return true

  try {
    const storedValue = window.localStorage.getItem(storageKey)
    if (storedValue === null) return false

    const preferences = JSON.parse(storedValue)
    return (
      preferences?.necessary === true &&
      preferences?.analytics === false &&
      preferences?.marketing === false
    )
  } catch {
    return false
  }
}

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(() => !hasSavedPreferences())
  const [showSettings, setShowSettings] = useState(false)
  const dialogRef = useRef(null)
  const initialFocusRef = useRef(null)
  const previousFocusRef = useRef(null)

  const restoreFocus = useCallback(() => {
    const previousFocus = previousFocusRef.current
    previousFocusRef.current = null
    window.requestAnimationFrame(() => {
      if (previousFocus?.isConnected) previousFocus.focus()
    })
  }, [])

  const closeDialog = useCallback(() => {
    setShowSettings(false)
    setIsOpen(false)
    restoreFocus()
  }, [restoreFocus])

  useEffect(() => {
    const handleOpenSettings = () => {
      previousFocusRef.current = document.activeElement
      setIsOpen(true)
      setShowSettings(true)
    }

    window.addEventListener('openCookieSettings', handleOpenSettings)
    return () => {
      window.removeEventListener('openCookieSettings', handleOpenSettings)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const focusFrame = window.requestAnimationFrame(() => {
      ;(initialFocusRef.current || dialogRef.current)?.focus()
    })
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeDialog()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeDialog, isOpen, showSettings])

  const saveNecessaryPreferences = () => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(necessaryPreferences))
    } catch {
      // The banner can still be dismissed for this session when storage is unavailable.
    }
    closeDialog()
  }

  const openSettings = (event) => {
    previousFocusRef.current = event.currentTarget
    setShowSettings(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isOpen ? (
          <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto sm:justify-start sm:p-6">
            {showSettings ? (
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-auto fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={closeDialog}
              />
            ) : null}

            <motion.div
              ref={dialogRef}
              role="dialog"
              tabIndex={-1}
              aria-modal={showSettings ? 'true' : undefined}
              aria-labelledby="cookie-consent-title"
              aria-describedby="cookie-consent-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto relative z-10 m-4 flex max-h-[calc(100dvh-2rem)] w-full flex-col gap-4 overflow-y-auto overscroll-contain rounded-2xl bg-white/95 p-6 shadow-2xl shadow-[#00aeff]/10 ring-1 ring-slate-200/60 backdrop-blur-2xl sm:m-0 sm:max-h-[calc(100dvh-3rem)] sm:w-[460px]"
            >
              {showSettings ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-slate-800">
                      <Settings aria-hidden="true" className="h-5 w-5 text-[#00aeff]" />
                      <h2 id="cookie-consent-title" className="text-lg font-semibold">Ustawienia strony</h2>
                    </div>
                    <button
                      ref={initialFocusRef}
                      type="button"
                      onClick={closeDialog}
                      aria-label="Zamknij ustawienia strony"
                      className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00aeff] motion-reduce:transition-none"
                    >
                      <X aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>

                  <p id="cookie-consent-description" className="mt-4 text-sm leading-relaxed text-slate-600">
                    Strona korzysta tylko z niezbędnej pamięci lokalnej. Nie ładuje narzędzi analitycznych ani marketingowych.
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800">Niezbędne</p>
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">Aktywne</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">Zapamiętują potwierdzenie ustawień oraz techniczny identyfikator publicznego demo.</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800">Analityczne</p>
                        <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600">Niewykorzystywane</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">Brak aktywnych narzędzi pomiarowych i analitycznych plików cookies.</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800">Marketingowe</p>
                        <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600">Niewykorzystywane</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">Brak pikseli reklamowych, profilowania i marketingowych plików cookies.</p>
                    </div>
                  </div>

                  <Link to="/polityka-prywatnosci" className="mt-4 rounded text-center text-xs font-semibold text-[#00aeff] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00aeff]">
                    Pełna polityka prywatności
                  </Link>
                  <Button type="button" onClick={saveNecessaryPreferences} variant="primary" className="mt-4 w-full">
                    Zapisz ustawienia niezbędne
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#00aeff]">
                      <Cookie aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 id="cookie-consent-title" className="font-semibold text-slate-800">Prywatność i pamięć lokalna</h2>
                      <p id="cookie-consent-description" className="mt-2 text-sm leading-relaxed text-slate-600">
                        Strona zapisuje tylko niezbędne ustawienia i identyfikator demo. Nie korzysta z analityki ani narzędzi marketingowych.
                      </p>
                      <Link to="/polityka-prywatnosci" className="mt-1.5 inline-block rounded text-xs text-[#00aeff] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00aeff]">
                        Więcej w polityce prywatności
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse">
                    <Button ref={initialFocusRef} type="button" onClick={saveNecessaryPreferences} variant="primary" className="w-full py-2 text-xs sm:w-auto">
                      Zapisz niezbędne
                    </Button>
                    <Button type="button" onClick={openSettings} variant="secondary" className="w-full py-2 text-xs text-slate-600 sm:w-auto">
                      <Settings aria-hidden="true" className="mr-2 h-3.5 w-3.5" /> Ustawienia
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  )
}
