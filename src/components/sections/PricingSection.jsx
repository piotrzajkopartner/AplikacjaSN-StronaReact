import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function PricingSection({ content }) {
  return (
    <section id="cena" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />

      <Card as="div" className="border-slate-300">
        <ul className="space-y-2 text-sm text-slate-700">
          {content.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">{content.note}</p>
      </Card>
    </section>
  )
}

export default PricingSection
