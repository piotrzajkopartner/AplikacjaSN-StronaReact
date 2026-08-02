import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { BorderBeam } from '../magicui/border-beam.jsx'
import { Check, Sparkles } from 'lucide-react'

function PricingSection({ content }) {
  return (
    <section id="cena" className="space-y-8 animate-fade-in-up">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.6fr] items-stretch">
        <Card as="div" className="relative flex flex-col items-center justify-between text-center p-8 md:p-10 h-full overflow-hidden border-t-4 border-t-brand-blue bg-gradient-to-b from-sky-50/70 via-white to-white shadow-[0_20px_60px_rgba(0,174,255,0.12)]">
          <BorderBeam duration={8} size={250} />
          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-brand-blue/15 blur-3xl" />
          
          <div className="flex flex-col items-center space-y-4 w-full my-auto py-4">
            {/* Etykieta Abonament */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-blue border border-sky-200/80 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
              <span>{content.planLabel}</span>
            </div>

            {/* Cena */}
            <div className="my-2">
              <span className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 block">
                {content.price}
              </span>
              <span className="mt-1.5 text-sm font-semibold text-slate-500 block">
                {content.priceSuffix}
              </span>
            </div>

            {/* Opis */}
            <p className="text-sm leading-relaxed text-slate-600 max-w-xs mx-auto font-normal">
              {content.planDescription}
            </p>

            {/* Subiekt nexo PRO + Android */}
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/90 px-4 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{content.compatibilityLabel}</span>
            </div>
          </div>

          {/* Przycisk CTA */}
          <div className="pt-6 w-full max-w-xs">
            <a href="#kontakt" className="w-full block">
              <Button className="w-full justify-center text-sm py-3 font-semibold shadow-md">
                Zapytaj o abonament
              </Button>
            </a>
          </div>
        </Card>

        <Card as="div" className="flex flex-col justify-between p-8 md:p-10 bg-slate-50/80 border-slate-200 h-full">
          <ul className="space-y-3.5 text-sm text-brand-text">
            {content.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-sky-200 hover:shadow-md">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-brand-blue">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span className="leading-relaxed font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-blue-100 bg-blue-50/80 p-4 text-xs md:text-sm font-medium text-brand-blue leading-relaxed">
            {content.note}
          </p>
        </Card>
      </div>
    </section>
  )
}

export default PricingSection

