import Button from '../ui/Button.jsx'
import PlaceholderImage from '../ui/PlaceholderImage.jsx'

function HeroSection({ content }) {
  return (
    <section id="hero" className="grid gap-8 rounded-2xl bg-slate-100 p-6 md:grid-cols-2 md:p-10">
      <div>
        <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
          {content.badge}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{content.headline}</h1>
        <p className="mt-4 text-slate-700">{content.body}</p>
        <p className="mt-4 text-sm font-medium text-slate-800">{content.pricingNote}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
          <Button to={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </Button>
        </div>

        <p className="mt-4 text-sm text-slate-600">{content.supportingNote}</p>
      </div>

      <PlaceholderImage
        title={content.imagePlaceholder.title}
        alt={content.imagePlaceholder.alt}
        description="Miejsce na finalny asset hero"
      />
    </section>
  )
}

export default HeroSection
