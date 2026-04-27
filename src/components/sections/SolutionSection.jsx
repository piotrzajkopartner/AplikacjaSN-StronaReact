import SectionHeading from '../ui/SectionHeading.jsx'

function SolutionSection({ content }) {
  return (
    <section id="rozwiazanie" className="section-shell p-6 md:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl" />
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />
      <p className="relative mt-5 max-w-4xl text-sm leading-7 text-slate-700 md:text-base">{content.body}</p>
    </section>
  )
}

export default SolutionSection
