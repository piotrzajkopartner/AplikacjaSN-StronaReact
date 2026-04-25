import Button from '../ui/Button.jsx'
import PlaceholderImage from '../ui/PlaceholderImage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function DemoPreviewSection({ content }) {
  return (
    <section id="demo-preview" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />

      <div className="grid gap-4 md:grid-cols-2">
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

      <Button to={content.cta.href} variant="secondary">
        {content.cta.label}
      </Button>
    </section>
  )
}

export default DemoPreviewSection
