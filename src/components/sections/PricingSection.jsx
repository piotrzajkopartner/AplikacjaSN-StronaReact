import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { BorderBeam } from '../magicui/border-beam.jsx'

function PricingSection({ content }) {
  return (
    <section id="cena" className="space-y-8 animate-fade-in-up">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.6fr]">
        <Card as="div" className="relative overflow-hidden border-t-4 border-t-brand-blue bg-white shadow-[0_24px_70px_rgba(0,174,255,0.12)]">
          <BorderBeam duration={8} size={250} />
          <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand-blue/10 blur-2xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-blue">Abonament</p>
          <p className="mt-4 text-4xl font-bold leading-none md:text-5xl text-brand-text">300 zł</p>
          <p className="mt-2 text-base font-medium text-brand-muted">netto / miesiąc</p>
          <p className="mt-6 text-sm leading-relaxed text-brand-muted">Bez limitów stanowisk, użytkowników i procesowanych dokumentów po stronie licencji.</p>
          <div className="mt-6 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue ring-1 ring-inset ring-blue-500/20">
            Subiekt nexo PRO
          </div>
        </Card>

        <Card as="div" className="bg-slate-50/80 border-slate-200">
          <ul className="space-y-4 text-sm text-brand-text">
            {content.bullets.map((item) => (
              <li key={item} className="flex gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,174,255,0.6)]" aria-hidden="true" />
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4 text-sm font-medium text-brand-blue">{content.note}</p>
        </Card>
      </div>
    </section>
  )
}

export default PricingSection
