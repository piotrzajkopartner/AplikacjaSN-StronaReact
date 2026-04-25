import SectionHeading from '../ui/SectionHeading.jsx'

function SolutionSection({ content }) {
  return (
    <section id="rozwiazanie" className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />
      <p className="mt-5 max-w-4xl text-sm leading-relaxed text-slate-700 md:text-base">{content.body}</p>
    </section>
  )
}

export default SolutionSection
