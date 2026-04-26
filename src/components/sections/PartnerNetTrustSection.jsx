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

        <a
          href={content.websiteUrl}
          target="_blank"
          rel="noreferrer"
          className="group block rounded-2xl border border-slate-300 bg-white p-4 transition hover:border-sky-400 hover:shadow-sm"
          aria-label={`Przejdź do strony ${content.websiteLabel}`}
        >
          <img
            src={content.logo.src}
            alt={content.logo.alt}
            className="aspect-[3/2] w-full rounded-xl object-contain"
            loading="lazy"
          />
          <p className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-sky-700">{content.websiteLabel}</p>
          <p className="text-xs text-slate-600">Dostawca rozwiązań IT, sieci i systemów zabezpieczeń dla firm.</p>
        </a>
      </div>
    </section>
  )
}

export default PartnerNetTrustSection
