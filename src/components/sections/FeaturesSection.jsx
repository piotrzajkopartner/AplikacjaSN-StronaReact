import { MagicCard } from '../magicui/magic-card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FeaturesSection({ content }) {
  return (
    <section id="funkcje" className="space-y-8 animate-fade-in-up">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item, index) => (
          <MagicCard key={item} className="flex flex-col gap-4 p-6 hover:border-brand-blue/30 cursor-default">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,174,255,0.6)]" aria-hidden="true" />
            </div>
            <p className="text-sm leading-relaxed text-slate-700 font-medium">{item}</p>
          </MagicCard>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
