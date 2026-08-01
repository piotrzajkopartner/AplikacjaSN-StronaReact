import DesktopAppMockup from '../product/DesktopAppMockup.jsx'
import Button from '../ui/Button.jsx'

function HeroSection({ content }) {
  return (
    <section
      id="hero"
      className="surface-panel relative overflow-hidden rounded-[2rem] p-6 md:p-10 lg:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_right,black,transparent_58%)]"
      />
      <div className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-cyan-200/35 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-28 right-8 h-96 w-96 rounded-full bg-indigo-200/35 blur-[110px]" />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1.18fr)] lg:items-center">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-200 bg-cyan-50/90 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-800 shadow-sm">
            {content.badge}
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.045em] text-slate-950 md:text-6xl">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
            {content.body}
          </p>

          <div className="mt-6 max-w-xl rounded-2xl border border-indigo-200 bg-white/85 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-sm font-bold leading-6 text-indigo-800">{content.pricingNote}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={content.primaryCta.href} variant="premium">
              {content.primaryCta.label}
            </Button>
            <Button to={content.secondaryCta.href} variant="secondary">
              {content.secondaryCta.label}
            </Button>
          </div>

          <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-brand-muted">
            {content.supportingNote}
          </p>
        </div>

        <div className="relative lg:pl-2">
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-indigo-200/30 blur-3xl" />
          <div inert aria-hidden="true" className="relative">
            <DesktopAppMockup />
          </div>
          <p className="relative mt-3 text-center text-xs font-semibold text-slate-500">
            Aktualny widok panelu webowego na bezpiecznych danych demonstracyjnych
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
