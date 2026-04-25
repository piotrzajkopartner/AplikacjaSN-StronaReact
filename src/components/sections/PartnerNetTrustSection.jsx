import PlaceholderImage from '../ui/PlaceholderImage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function PartnerNetTrustSection({ content }) {
  return (
    <section id="zaufanie" className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="space-y-4">
          <SectionHeading eyebrow={content.subheadline} title={content.headline} />
          <p className="text-sm leading-relaxed text-slate-700">{content.body1}</p>
          <p className="text-sm leading-relaxed text-slate-700">{content.body2}</p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">B2B</span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">Subiekt nexo PRO</span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">On-premise</span>
          </div>
        </div>

        <PlaceholderImage
          title={content.logoPlaceholder.title}
          alt={content.logoPlaceholder.alt}
          description="Miejsce na finalne logo Partner-Net"
          ratio="3/2"
          className="border-slate-300 bg-white"
        />
      </div>
    </section>
  )
}

export default PartnerNetTrustSection
