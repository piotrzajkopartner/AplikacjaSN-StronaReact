import Button from '../ui/Button.jsx'
import PlaceholderImage from '../ui/PlaceholderImage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function DemoPreviewSection({ content }) {
  return (
    <section id="demo-preview" className="relative overflow-visible rounded-3xl bg-slate-50 p-6 md:p-12 mb-16 mt-16 animate-fade-in-up border border-slate-200">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />

      <div className="mt-12 grid gap-8 md:grid-cols-2 relative z-10">
        {content.placeholders.map((item) => (
          <div key={item.title} className="transform transition-transform duration-500 hover:-translate-y-2">
            <PlaceholderImage
              title={item.title}
              description={item.description}
              alt={item.alt}
              className="bg-white shadow-2xl shadow-blue-900/10 border-slate-200"
            />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button to={content.cta.href} variant="primary" className="px-8 py-3 text-lg animate-pulse-slow">
          {content.cta.label}
        </Button>
      </div>
    </section>
  )
}

export default DemoPreviewSection
