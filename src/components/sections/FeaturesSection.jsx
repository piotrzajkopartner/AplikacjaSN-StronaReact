import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FeaturesSection({ content }) {
  return (
    <section id="funkcje" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <Card as="div" className="border-blue-100 bg-gradient-to-br from-white to-blue-50/40">
        <ul className="space-y-3 text-sm text-slate-700 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {content.items.map((item) => (
            <li key={item} className="flex gap-3 rounded-lg border border-slate-200/80 bg-white/70 px-3 py-3">
              <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-blue-700" aria-hidden="true" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

export default FeaturesSection
