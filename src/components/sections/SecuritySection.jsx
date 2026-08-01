import SectionHeading from '../ui/SectionHeading.jsx'

function SecuritySection({ content }) {
  return (
    <section id="bezpieczenstwo" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.intro} />
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {content.items.map((item) => (
          <article key={item.title} className="rounded-xl border border-blue-100 bg-blue-50/40 p-5">
            <h3 className="text-base font-semibold text-brand-text">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SecuritySection
