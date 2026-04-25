import SectionHeading from '../ui/SectionHeading.jsx'

function SolutionSection({ content }) {
  return (
    <section id="rozwiazanie" className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />
      <p className="text-slate-700">{content.body}</p>
    </section>
  )
}

export default SolutionSection
