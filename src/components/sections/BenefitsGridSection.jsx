import { MagicCard } from '../magicui/magic-card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function BenefitsGridSection({ content }) {
  return (
    <section id="korzysci" className="space-y-8 animate-fade-in-up">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {content.cards.map((card, index) => (
          <MagicCard key={card.title} className="p-8 hover:border-brand-blue/30 group cursor-default">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#00aeff] transition-colors duration-300">{card.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{card.description}</p>
          </MagicCard>
        ))}
      </div>
    </section>
  )
}

export default BenefitsGridSection
