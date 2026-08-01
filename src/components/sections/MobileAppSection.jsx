import { useState } from 'react'
import { ClipboardCheck, Database, Smartphone } from 'lucide-react'
import MobileAppMockup from '../product/MobileAppMockup.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const screens = [
  { id: 'documents', label: 'Lista dokumentów' },
  { id: 'serials', label: 'Numery SN' },
  { id: 'picking', label: 'Kompletacja' },
]

const facts = [
  {
    title: 'Interfejs dla Androida',
    description: 'Duże pola dotykowe i czytelny układ wspierają pracę przy towarze.',
    icon: Smartphone,
  },
  {
    title: 'Dokument i pozycja pod ręką',
    description: 'Magazynier widzi wymagane ilości, zapisane SN i bieżący status.',
    icon: Database,
  },
  {
    title: 'Postęp, braki i notatki',
    description: 'Stan kompletacji można zapisać i uzupełnić informacją dla zespołu.',
    icon: ClipboardCheck,
  },
]

function MobileAppSection() {
  const [activeScreen, setActiveScreen] = useState('documents')

  return (
    <section id="aplikacja-mobilna" className="space-y-8">
      <SectionHeading
        eyebrow="Aplikacja mobilna"
        title="Android prowadzi magazyniera przez dokument, SN i kompletację."
        description="Przełącz widok, aby zobaczyć ten sam demonstracyjny proces z trzech perspektyw."
      />

      <div className="section-shell grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-center lg:p-10">
        <div>
          <div
            className="grid gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1 sm:grid-cols-3"
            role="group"
            aria-label="Wybierz ekran aplikacji Android"
          >
            {screens.map((screen) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActiveScreen(screen.id)}
                aria-pressed={activeScreen === screen.id}
                className={`min-h-11 rounded-xl px-3 py-2 text-sm font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transition-none ${
                  activeScreen === screen.id
                    ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-950'
                }`}
              >
                {screen.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            {facts.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white/85 p-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 text-xs font-semibold leading-5 text-slate-500">
            Widoki na tej stronie wykorzystują wyłącznie dane demonstracyjne.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-10 rounded-full bg-indigo-200/50 blur-3xl" />
          <MobileAppMockup
            screen={activeScreen}
            onScreenChange={setActiveScreen}
            className="relative max-w-[21rem]"
          />
        </div>
      </div>
    </section>
  )
}

export default MobileAppSection
