import SectionHeading from '../ui/SectionHeading.jsx'
import { Monitor, Smartphone } from 'lucide-react'

const interfaces = [
  {
    label: 'Panel webowy',
    detail: 'Dokumenty, statusy, numery SN i historia',
    icon: Monitor,
  },
  {
    label: 'Aplikacja Android',
    detail: 'Skanowanie, kompletacja i zapis postępu',
    icon: Smartphone,
  },
]

function SolutionSection({ content }) {
  return (
    <section id="rozwiazanie" className="section-shell p-6 md:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-end">
        <div>
          <SectionHeading eyebrow={content.subheadline} title={content.headline} />
          <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-700 md:text-base">{content.body}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {interfaces.map(({ label, detail, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-950">{label}</h3>
                <p className="mt-0.5 text-xs font-medium leading-5 text-slate-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
