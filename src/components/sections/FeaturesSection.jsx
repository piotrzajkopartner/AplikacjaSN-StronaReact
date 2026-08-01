import { Check, FileStack, History, ScanLine, ShieldCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const icons = [FileStack, ScanLine, ShieldCheck, History]

function FeaturesSection({ content }) {
  return (
    <section id="funkcje" className="space-y-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <div className="grid gap-5 md:grid-cols-2">
        {content.groups.map((group, index) => {
          const Icon = icons[index % icons.length]

          return (
            <article
              key={group.title}
              className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg shadow-slate-900/15">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[0.625rem] font-black uppercase tracking-[0.16em] text-indigo-600">
                    Obszar 0{index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">
                    {group.title}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-600">{group.description}</p>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-800">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default FeaturesSection
