import Button from '../ui/Button.jsx'
import PlaceholderImage from '../ui/PlaceholderImage.jsx'

function HeroSection({ content }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 p-6 md:p-10 bg-grid-slate-100"
    >
      {/* Blurred background orbs for mesh gradient effect */}
      <div className="pointer-events-none absolute -right-16 -top-24 h-96 w-96 rounded-full bg-blue-400/20 blur-[100px] animate-pulse-slow" />
      <div className="pointer-events-none absolute -bottom-20 left-12 h-80 w-80 rounded-full bg-sky-300/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div className="animate-fade-in-up">
          <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-blue ring-1 ring-inset ring-blue-500/10">
            {content.badge}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-brand-text md:text-6xl">{content.headline}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">{content.body}</p>

          <div className="mt-6 rounded-xl border border-brand-blue/20 bg-blue-50/50 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-sm font-semibold text-brand-blue">{content.pricingNote}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={content.primaryCta.href}>
              {content.primaryCta.label}
            </Button>
            <Button to={content.secondaryCta.href} variant="secondary">
              {content.secondaryCta.label}
            </Button>
          </div>

          <p className="mt-5 text-sm text-brand-muted">{content.supportingNote}</p>
        </div>

        <div className="animate-fade-in-up transition-transform duration-700 hover:-translate-y-2" style={{ animationDelay: '0.2s' }}>
          <PlaceholderImage
            title={content.imagePlaceholder.title}
            alt={content.imagePlaceholder.alt}
            description="Miejsce na finalny asset hero"
            className="border-slate-200 bg-white shadow-2xl shadow-blue-900/10"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
