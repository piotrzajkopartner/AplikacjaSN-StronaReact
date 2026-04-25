import Card from '../ui/Card.jsx'
import ContactForm from '../ui/ContactForm.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FinalCTASection({ content }) {
  return (
    <section id="kontakt" className="space-y-6 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-100 to-white p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} align="center" />
      <Card as="div" className="mx-auto max-w-3xl">
        <ContactForm content={content} />
      </Card>
    </section>
  )
}

export default FinalCTASection
