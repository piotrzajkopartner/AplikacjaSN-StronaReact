import PlaceholderImage from '../ui/PlaceholderImage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function PartnerNetTrustSection({ content }) {
  return (
    <section id="zaufanie" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />
      <p className="text-slate-700">{content.body1}</p>
      <p className="text-slate-700">{content.body2}</p>
      <PlaceholderImage
        title={content.logoPlaceholder.title}
        alt={content.logoPlaceholder.alt}
        description="Miejsce na finalne logo dostawcy"
        ratio="3/1"
      />
    </section>
  )
}

export default PartnerNetTrustSection
