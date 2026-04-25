import SectionHeading from '../ui/SectionHeading.jsx'

function SecuritySection({ content }) {
  return (
    <section id="bezpieczenstwo" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <p className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-sm leading-relaxed text-slate-700">{content.body1}</p>
        <p className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-sm leading-relaxed text-slate-700">{content.body2}</p>
      </div>
    </section>
  )
}

export default SecuritySection
