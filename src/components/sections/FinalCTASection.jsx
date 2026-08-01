import Card from '../ui/Card.jsx'
import ContactForm from '../ui/ContactForm.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function FinalCTASection({ content }) {
  return (
    <section id="kontakt" className="section-shell relative space-y-8 p-6 md:p-12 animate-fade-in-up">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-blue/12 blur-[80px]" />
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.body} align="center" className="relative z-10" />
      {content.directContact ? (
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-cyan-200 bg-cyan-50/80 p-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-bold text-slate-950">{content.directContact.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{content.directContact.note}</p>
          </div>
          <a
            href={content.directContact.href}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 motion-reduce:transition-none"
          >
            {content.directContact.value}
          </a>
        </div>
      ) : null}
      <Card as="div" className="mx-auto max-w-3xl relative z-10">
        <ContactForm content={content} />
      </Card>
    </section>
  )
}

export default FinalCTASection
