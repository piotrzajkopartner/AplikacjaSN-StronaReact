import { useState } from 'react'
import Button from '../components/ui/Button.jsx'
import { siteContent } from '../content/siteContent.js'
import DemoAppShell from '../features/demo/DemoAppShell.jsx'
import MobilePickingDemo from '../features/demo/mobile/MobilePickingDemo.jsx'
import { MagicCard } from '../components/magicui/magic-card.jsx'
import { CheckCircle2, ArrowRight, Monitor, Smartphone } from 'lucide-react'

const demoTabs = [
  { id: 'web', label: 'Panel webowy', icon: Monitor },
  { id: 'mobile', label: 'Aplikacja mobilna', icon: Smartphone },
]

function DemoPage() {
  const { demoPage } = siteContent
  const [activeDemo, setActiveDemo] = useState('web')

  const handleTabKeyDown = (event, currentTab) => {
    const currentIndex = demoTabs.findIndex(({ id }) => id === currentTab)
    let nextIndex = currentIndex
    const isNavigationKey = ['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % demoTabs.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + demoTabs.length) % demoTabs.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = demoTabs.length - 1
    if (!isNavigationKey) return

    event.preventDefault()
    if (nextIndex === currentIndex) return

    const nextTab = demoTabs[nextIndex].id
    setActiveDemo(nextTab)
    document.getElementById(`demo-tab-${nextTab}`)?.focus()
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl md:p-10">
        {/* Blurred background orbs for mesh gradient effect */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-96 w-96 animate-pulse-slow rounded-full bg-blue-400/10 blur-[100px]" />
        <div
          className="pointer-events-none absolute -bottom-20 left-12 h-80 w-80 animate-pulse-slow rounded-full bg-sky-300/10 blur-[100px]"
          style={{ animationDelay: '1.5s' }}
        />

        <div className="pointer-events-none relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="pointer-events-auto max-w-3xl animate-fade-in-up">
            <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-blue ring-1 ring-inset ring-blue-500/10 shadow-sm">
              {demoPage.badge}
            </p>
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              {demoPage.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
              {demoPage.description}
            </p>

            <ul className="mt-8 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
              {demoPage.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span className="font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button to="/#kontakt" variant="premium" className="group">
                Umów prezentację
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button to="/" variant="secondary">
                Wróć na stronę główną
              </Button>
            </div>
          </div>

          <div
            className="pointer-events-auto grid gap-4 sm:grid-cols-3 lg:grid-cols-1 animate-fade-in-up transition-transform duration-700 hover:-translate-y-1 lg:ml-8"
            style={{ animationDelay: '0.2s' }}
          >
            {demoPage.stats.map((stat) => (
              <MagicCard
                key={stat.label}
                className="flex flex-col items-start justify-center p-6 shadow-sm border-slate-200/60 bg-white/50 backdrop-blur-md"
                gradientColor="#D9D9D955"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold tracking-tight text-brand-blue">{stat.value}</span>
                </div>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                  {stat.label}
                </p>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="demo-switcher-title">
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="px-1">
            <p id="demo-switcher-title" className="text-sm font-black text-slate-900">
              Wybierz środowisko demonstracyjne
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Panel w przeglądarce lub interaktywny przepływ aplikacji na Androida.
            </p>
          </div>
          <div
            role="tablist"
            aria-label="Wersja demonstracyjna"
            className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1"
          >
            {demoTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`demo-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={activeDemo === id}
                aria-controls={`demo-panel-${id}`}
                tabIndex={activeDemo === id ? 0 : -1}
                onClick={() => setActiveDemo(id)}
                onKeyDown={(event) => handleTabKeyDown(event, id)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:text-sm motion-reduce:transition-none ${
                  activeDemo === id
                    ? 'bg-white text-brand-blue shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="demo-panel-web"
          role="tabpanel"
          aria-labelledby="demo-tab-web"
          hidden={activeDemo !== 'web'}
        >
          <DemoAppShell />
        </div>
        <div
          id="demo-panel-mobile"
          role="tabpanel"
          aria-labelledby="demo-tab-mobile"
          hidden={activeDemo !== 'mobile'}
        >
          <MobilePickingDemo />
        </div>
      </section>
    </div>
  )
}

export default DemoPage
