import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function ProblemSection({ content }) {
  return (
    <section id="problem" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.intro} />

      <div className="grid gap-4 md:grid-cols-3">
        {content.cards.map((card) => (
          <Card key={card.title}>
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{card.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ProblemSection
