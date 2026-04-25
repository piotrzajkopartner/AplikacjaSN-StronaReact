import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FeaturesSection({ content }) {
  return (
    <section id="funkcje" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <Card as="div">
        <ul className="space-y-2 text-sm text-slate-700">
          {content.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-500" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

export default FeaturesSection
