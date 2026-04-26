import Button from '../components/ui/Button.jsx'
import { siteContent } from '../content/siteContent.js'
import DemoAppShell from '../features/demo/DemoAppShell.jsx'
import { InteractiveGridPattern } from '../components/magicui/interactive-grid-pattern.jsx'
import { MagicCard } from '../components/magicui/magic-card.jsx'
import { CheckCircle2, ArrowRight } from 'lucide-react'

function DemoPage() {
  const { demoPage } = siteContent

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl md:p-10">
        <InteractiveGridPattern
          className="absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
          width={40}
          height={40}
          squares={[40, 40]}
        />

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
                Umów prezentację 1:1
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

        <div className="relative mt-12 border-t border-slate-200/60 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs">
            <div className="text-slate-500 font-medium flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Demo pokazuje przebieg operacyjny bez ingerencji w dane produkcyjne klienta.
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-400 uppercase tracking-[0.1em] text-[10px] mr-1">
                Dlaczego ta prezentacja domyka sprzedaż:
              </span>
              <span className="rounded-md border border-slate-200/80 bg-white px-2.5 py-1 text-slate-600 font-semibold shadow-sm">
                konkretne scenariusze operacyjne
              </span>
              <span className="rounded-md border border-slate-200/80 bg-white px-2.5 py-1 text-slate-600 font-semibold shadow-sm">
                mierzalna wartość biznesowa
              </span>
              <span className="rounded-md border border-slate-200/80 bg-white px-2.5 py-1 text-slate-600 font-semibold shadow-sm">
                jasny plan wdrożenia
              </span>
            </div>
          </div>
        </div>
      </section>

      <DemoAppShell />
    </div>
  )
}

export default DemoPage
