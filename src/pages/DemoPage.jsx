import Button from '../components/ui/Button.jsx'
import { siteContent } from '../content/siteContent.js'
import DemoAppShell from '../features/demo/DemoAppShell.jsx'

function DemoPage() {
  const { demoPage } = siteContent

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">
              {demoPage.badge}
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{demoPage.headline}</h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">{demoPage.description}</p>

            <ul className="mt-5 grid gap-2 text-sm text-slate-100 md:grid-cols-2">
              {demoPage.highlights.map((item) => (
                <li key={item} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/#kontakt" variant="premium">
                Umow prezentacje 1:1
              </Button>
              <Button to="/" variant="secondary" className="border-white/35 bg-white/10 text-white hover:bg-white/20">
                Wroc na strone glowna
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {demoPage.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold text-cyan-100">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6 border-t border-white/15 pt-4 text-xs text-slate-200/90">
          Demo pokazuje przebieg operacyjny bez ingerencji w dane produkcyjne klienta.
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white/90 p-3 text-xs text-slate-600 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <span className="font-semibold text-slate-900">Dlaczego ta prezentacja domyka sprzedaz:</span>
          <span className="rounded-md bg-slate-100 px-2 py-1">konkretne scenariusze operacyjne</span>
          <span className="rounded-md bg-slate-100 px-2 py-1">mierzalna wartosc biznesowa</span>
          <span className="rounded-md bg-slate-100 px-2 py-1">jasny plan wdrozenia</span>
        </div>
      </section>

      <DemoAppShell />
    </div>
  )
}

export default DemoPage
