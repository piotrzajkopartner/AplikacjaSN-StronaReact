import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function BenefitsGridSection({ content }) {
  return (
    <section id="korzysci" className="space-y-8 animate-fade-in-up">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {content.cards.map((card, index) => (
          <Card key={card.title} className="hover:border-brand-blue/30 group">
            <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-blue transition-colors duration-300">{card.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted">{card.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default BenefitsGridSection
