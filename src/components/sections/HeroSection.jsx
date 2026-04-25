import Button from '../ui/Button.jsx'
import PlaceholderImage from '../ui/PlaceholderImage.jsx'

function HeroSection({ content }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white md:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-12 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">
            {content.badge}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{content.headline}</h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">{content.body}</p>

          <div className="mt-5 rounded-xl border border-emerald-300/35 bg-emerald-400/10 p-4">
            <p className="text-sm font-semibold text-emerald-100">{content.pricingNote}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={content.primaryCta.href} className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
              {content.primaryCta.label}
            </Button>
            <Button to={content.secondaryCta.href} variant="secondary" className="border-white/35 bg-white/10 text-white hover:bg-white/20">
              {content.secondaryCta.label}
            </Button>
          </div>

          <p className="mt-4 text-sm text-blue-100/90">{content.supportingNote}</p>
        </div>

        <PlaceholderImage
          title={content.imagePlaceholder.title}
          alt={content.imagePlaceholder.alt}
          description="Miejsce na finalny asset hero"
          className="border-white/30 bg-white/95"
        />
      </div>
    </section>
  )
}

export default HeroSection
