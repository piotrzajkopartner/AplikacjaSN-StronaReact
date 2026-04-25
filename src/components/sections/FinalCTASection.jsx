import Card from '../ui/Card.jsx'
import ContactForm from '../ui/ContactForm.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FinalCTASection({ content }) {
  return (
    <section id="kontakt" className="space-y-6 rounded-2xl bg-slate-100 p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} />
      <Card as="div">
        <ContactForm content={content} />
      </Card>
    </section>
  )
}

export default FinalCTASection
