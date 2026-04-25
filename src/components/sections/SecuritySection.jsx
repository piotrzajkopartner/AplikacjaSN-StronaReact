import SectionHeading from '../ui/SectionHeading.jsx'

function SecuritySection({ content }) {
  return (
    <section id="bezpieczenstwo" className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />
      <p className="text-slate-700">{content.body1}</p>
      <p className="text-slate-700">{content.body2}</p>
    </section>
  )
}

export default SecuritySection
