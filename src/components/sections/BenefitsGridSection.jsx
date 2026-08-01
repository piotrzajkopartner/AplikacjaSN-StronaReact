import {
  ClipboardCheck,
  FileSearch,
  ScanLine,
  Share2,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const icons = [Share2, ClipboardCheck, ScanLine, ShieldCheck, FileSearch, UsersRound]

function BenefitsGridSection({ content }) {
  return (
    <section id="korzysci" className="space-y-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {content.cards.map((card, index) => {
          const Icon = icons[index % icons.length]

          return (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-colors hover:border-cyan-300 focus-within:border-cyan-300 motion-reduce:transition-none"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-transparent opacity-70" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-black text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default BenefitsGridSection
