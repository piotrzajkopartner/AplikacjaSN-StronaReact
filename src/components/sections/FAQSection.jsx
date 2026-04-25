import Accordion from '../ui/Accordion.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FAQSection({ content }) {
  return (
    <section id="faq" className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />
      <Accordion items={content.items} />
    </section>
  )
}

export default FAQSection
