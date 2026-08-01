import { useState } from 'react'
import {
  CheckCircle2,
  Database,
  FileText,
  MousePointerClick,
  ScanLine,
  Smartphone,
} from 'lucide-react'
import MobileAppMockup from '../../../components/product/MobileAppMockup.jsx'

const screenLabels = {
  documents: 'Lista dokumentów',
  serials: 'Numery SN',
  picking: 'Kompletacja',
}

const actionLabels = {
  complete: 'Pozycja oznaczona jako kompletna',
  decrement: 'Zmniejszono zebraną ilość',
  increment: 'Zwiększono zebraną ilość',
  missing: 'Oznaczono brak towaru',
  note: 'Dodano notatkę DEMO',
  refresh: 'Odświeżono lokalny widok',
  reset: 'Wyzerowano postęp pozycji',
  save: 'Zapisano numery lokalnie',
  'scan-item': 'Odczyt skanera zwiększył kompletację',
  'scan-search': 'Kod trafił do wyszukiwarki',
  'scan-serial': 'Uzupełniono pole numeru SN',
  'scan-series': 'Dodano numer w trybie seryjnym',
  'scanner-open': 'Otwarto skaner w telefonie',
}

function MobilePickingDemo() {
  const [currentScreen, setCurrentScreen] = useState('documents')
  const [lastAction, setLastAction] = useState('Demo uruchomione na pełnej liście dokumentów')

  const handleAction = (action, details) => {
    setLastAction(actionLabels[action] || details?.message || 'Wykonano lokalną akcję DEMO')
  }

  return (
    <section
      aria-labelledby="mobile-app-demo-title"
      className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-300/30"
    >
      <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(70,103,245,0.28),_transparent_46%)] px-5 py-7 text-white sm:px-8 lg:px-10">
        <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-200">
          <Smartphone aria-hidden="true" className="h-4 w-4" />
          Aplikacja na Androida
        </p>
        <h2 id="mobile-app-demo-title" className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
          Przejdź przez rzeczywisty przepływ aplikacji
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
          Zacznij od listy dokumentów, otwórz dowolną kartę i sprawdź numery seryjne,
          kompletację oraz skaner działający bez dostępu do kamery.
        </p>
      </div>

      <div className="grid gap-7 bg-[#f4f7fc] p-4 sm:p-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(18rem,1.2fr)] lg:items-start lg:p-8">
        <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24">
          <MobileAppMockup
            onScreenChange={setCurrentScreen}
            onAction={handleAction}
          />
        </div>

        <aside className="space-y-4 lg:pt-8" aria-label="Instrukcja aplikacji mobilnej">
          <div className="rounded-2xl border border-[#dde6f2] bg-white p-5 shadow-[0_10px_30px_rgba(12,24,42,0.08)] sm:p-6">
            <div className="flex items-center gap-2 text-[#2f4bcc]">
              <MousePointerClick aria-hidden="true" className="h-5 w-5" />
              <h3 className="text-sm font-black uppercase tracking-[0.08em]">Jak przejść demo</h3>
            </div>
            <ol className="mt-5 space-y-4 text-sm font-bold text-slate-800">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#161d2b] text-xs text-white">1</span>
                <span>Wybierz dokument</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#161d2b] text-xs text-white">2</span>
                <span>Przełącz Numery SN/Kompletacja</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#161d2b] text-xs text-white">3</span>
                <span>Użyj skanera lub akcji</span>
              </li>
            </ol>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl border border-[#dde6f2] bg-white p-4 shadow-sm">
              <p className="flex items-center gap-2 text-[0.6875rem] font-black uppercase tracking-wide text-slate-500">
                <FileText aria-hidden="true" className="h-4 w-4 text-[#4667f5]" />
                Aktualny widok
              </p>
              <p className="mt-2 text-base font-black text-[#161d2b]" aria-live="polite">
                {screenLabels[currentScreen]}
              </p>
            </div>
            <div className="rounded-2xl border border-[#dde6f2] bg-white p-4 shadow-sm">
              <p className="flex items-center gap-2 text-[0.6875rem] font-black uppercase tracking-wide text-slate-500">
                <ScanLine aria-hidden="true" className="h-4 w-4 text-[#4667f5]" />
                Ostatnia akcja
              </p>
              <p className="mt-2 text-sm font-bold leading-5 text-[#161d2b]" aria-live="polite">
                {lastAction}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
            <p className="flex items-center gap-2 text-sm font-black">
              <Database aria-hidden="true" className="h-4 w-4" />
              Wyłącznie dane DEMO
            </p>
            <p className="mt-2 text-xs leading-5 text-emerald-800">
              Firmy, dokumenty, NIP-y i numery seryjne są fikcyjne. NIP-y pozostają zamaskowane,
              a wszystkie zmiany działają tylko lokalnie w tej prezentacji.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              Bez backendu, kamery i wysyłania danych
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default MobilePickingDemo
