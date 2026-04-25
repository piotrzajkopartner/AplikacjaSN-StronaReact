import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function PricingSection({ content }) {
  return (
    <section id="cena" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1.6fr]">
        <Card as="div" className="border-blue-900/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-200">Abonament</p>
          <p className="mt-4 text-4xl font-bold leading-none md:text-5xl">300 zł</p>
          <p className="mt-2 text-base font-medium text-blue-100">netto / miesiąc</p>
          <p className="mt-5 text-sm leading-relaxed text-slate-200">Bez limitów stanowisk, użytkowników i procesowanych dokumentów po stronie licencji.</p>
        </Card>

        <Card as="div" className="border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30">
          <ul className="space-y-3 text-sm text-slate-700">
            {content.bullets.map((item) => (
              <li key={item} className="flex gap-3 rounded-lg border border-emerald-100 bg-white px-3 py-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">{content.note}</p>
        </Card>
      </div>
    </section>
  )
}

export default PricingSection
