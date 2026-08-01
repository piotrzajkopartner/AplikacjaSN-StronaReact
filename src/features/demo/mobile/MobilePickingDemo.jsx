import { useState } from 'react'
import {
  BadgeCheck,
  CircleAlert,
  CopyX,
  MessageSquareText,
  ScanLine,
  TriangleAlert,
} from 'lucide-react'
import MobileAppMockup from '../../../components/product/MobileAppMockup.jsx'
import ScannerSimulation from '../../../components/product/ScannerSimulation.jsx'
import { mobileDemoData } from '../../../content/mobileDemoData.js'

const scenarios = [
  { id: 'valid', label: 'Poprawny skan', icon: BadgeCheck },
  { id: 'duplicate', label: 'Duplikat', icon: CopyX },
  { id: 'unknown', label: 'Nieznany kod', icon: CircleAlert },
  { id: 'missing', label: 'Brak', icon: TriangleAlert },
  { id: 'note', label: 'Notatka', icon: MessageSquareText },
]

const feedbackClasses = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-indigo-200 bg-indigo-50 text-indigo-800',
}

function MobilePickingDemo() {
  const requiredQuantity = mobileDemoData.product.requiredQuantity
  const [scanCount, setScanCount] = useState(0)
  const [activeDemonstration, setActiveDemonstration] = useState(null)
  const [feedback, setFeedback] = useState({
    id: 0,
    type: 'info',
    message: 'Wybierz scenariusz. Symulacja nie wysyła danych do backendu.',
  })

  const announce = (type, message) => {
    setFeedback((current) => ({ id: current.id + 1, type, message }))
  }

  const handleValidScan = () => {
    if (scanCount >= requiredQuantity) {
      announce('info', 'Pozycja jest już kompletna: 2 z 2 sztuk.')
      return
    }

    const nextCount = scanCount + 1
    setScanCount(nextCount)
    announce(
      'success',
      nextCount === requiredQuantity
        ? 'Poprawny skan. Pozycja została skompletowana: 2 z 2 sztuk.'
        : 'Poprawny skan. Zebrano pierwszą z 2 sztuk.',
    )
  }

  const handleScenario = (scenario) => {
    if (scenario === 'valid') {
      handleValidScan()
    } else if (scenario === 'duplicate') {
      announce('warning', 'Duplikat odrzucony. Liczba zebranych sztuk nie zmieniła się.')
    } else if (scenario === 'unknown') {
      announce('error', 'Nieznany kod. Produkt nie należy do tej pozycji dokumentu.')
    } else if (scenario === 'missing') {
      setActiveDemonstration('missing')
      announce('warning', 'Zasymulowano lokalne oznaczenie: brak towaru.')
    } else {
      setActiveDemonstration('note')
      announce('info', 'Zasymulowano lokalną notatkę do pozycji.')
    }
  }

  const handleScannerCountChange = (nextCount) => {
    setScanCount(nextCount)
    if (nextCount === 0) {
      setActiveDemonstration(null)
      announce('info', 'Postęp lokalnej symulacji został wyzerowany.')
    } else {
      announce(
        'success',
        nextCount === requiredQuantity
          ? 'Poprawny skan. Pozycja została skompletowana: 2 z 2 sztuk.'
          : 'Poprawny skan. Zebrano pierwszą z 2 sztuk.',
      )
    }
  }

  const handleMockupAction = (action) => {
    if (action === 'scan-item') handleValidScan()
    if (action === 'reset') handleScannerCountChange(0)
    if (action === 'missing' || action === 'note') handleScenario(action)
  }

  return (
    <section
      aria-labelledby="mobile-picking-title"
      className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-300/30"
    >
      <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_42%)] px-5 py-7 text-white sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-200">
              <ScanLine aria-hidden="true" className="h-4 w-4" />
              Kompletacja na Androidzie
            </p>
            <h2 id="mobile-picking-title" className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Przetestuj reakcję aplikacji na skan
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Mockup telefonu i skaner pokazują ten sam postęp 0/2, 1/2 lub 2/2. Wybierz
              poprawny albo problemowy scenariusz kompletacji.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
            <strong className="block font-extrabold">Wyłącznie lokalna symulacja</strong>
            <span className="mt-1 block text-xs leading-5 text-emerald-100/80">
              Bez backendu, kamery i wysyłania danych.
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 bg-slate-50 p-4 sm:p-6 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:p-8">
        <div className="mx-auto w-full max-w-sm self-start lg:sticky lg:top-24">
          <MobileAppMockup
            screen="picking"
            pickingStep={scanCount}
            serialStep={scanCount}
            activeAction={activeDemonstration}
            onAction={handleMockupAction}
          />
        </div>

        <div className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-indigo-600">
                  Scenariusze
                </p>
                <h3 className="mt-1 text-lg font-black text-slate-950">Wybierz odpowiedź skanera</h3>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-extrabold tabular-nums text-white">
                Zebrano {scanCount} / {requiredQuantity}
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {scenarios.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleScenario(id)}
                  aria-pressed={id === 'missing' || id === 'note' ? activeDemonstration === id : undefined}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transition-none ${
                    activeDemonstration === id
                      ? 'border-indigo-400 bg-indigo-100 text-indigo-900 ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800'
                  }`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <div
              key={feedback.id}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={`mt-4 rounded-xl border px-3 py-2.5 text-sm font-semibold leading-6 ${feedbackClasses[feedback.type]}`}
            >
              {feedback.message}
            </div>
          </div>

          <ScannerSimulation
            scanCount={scanCount}
            onScanCountChange={handleScannerCountChange}
            className="shadow-none"
          />
        </div>
      </div>
    </section>
  )
}

export default MobilePickingDemo
