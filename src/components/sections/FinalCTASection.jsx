import Card from '../ui/Card.jsx'
import ContactForm from '../ui/ContactForm.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FinalCTASection({ content }) {
  return (
    <section id="kontakt" className="section-shell relative space-y-8 p-6 md:p-12 animate-fade-in-up">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-blue/12 blur-[80px]" />
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} align="center" className="relative z-10" />
      <Card as="div" className="mx-auto max-w-3xl relative z-10">
        <ContactForm content={content} />
      </Card>
    </section>
  )
}

export default FinalCTASection
