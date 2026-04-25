import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function ProblemSection({ content }) {
  return (
    <section id="problem" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.intro} />

      <div className="grid gap-4 md:grid-cols-3">
        {content.cards.map((card, index) => (
          <Card key={card.title} className="border-rose-100/70 bg-gradient-to-b from-white to-rose-50/40">
            <div className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
              0{index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{card.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ProblemSection
