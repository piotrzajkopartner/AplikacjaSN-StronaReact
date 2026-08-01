import SectionHeading from '../ui/SectionHeading.jsx'

function DeploymentSection({ content }) {
  return (
    <section id="wdrozenie" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.intro} />
      <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {content.steps.map((step, index) => (
          <li key={step.title} className="relative rounded-xl border border-slate-200 bg-slate-50 p-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="mt-4 text-base font-semibold text-brand-text">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default DeploymentSection
