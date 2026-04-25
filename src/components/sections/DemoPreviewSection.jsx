import Button from '../ui/Button.jsx'
import PlaceholderImage from '../ui/PlaceholderImage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function DemoPreviewSection({ content }) {
  return (
    <section id="demo-preview" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {content.placeholders.map((item) => (
          <PlaceholderImage
            key={item.title}
            title={item.title}
            description={item.description}
            alt={item.alt}
            className="bg-white"
          />
        ))}
      </div>

      <div className="mt-6">
        <Button to={content.cta.href} variant="secondary">
          {content.cta.label}
        </Button>
      </div>
    </section>
  )
}

export default DemoPreviewSection
