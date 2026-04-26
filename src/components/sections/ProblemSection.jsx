import Card from '../ui/Card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function ProblemSection({ content }) {
  const cardMeta = [
    {
      label: 'Reklamacje',
      impact: 'Wpływ: dział serwisu i opieki klienta',
      topBar: 'from-rose-500 via-rose-400 to-amber-300',
      chip: 'border-rose-200 bg-rose-50 text-rose-700',
      dot: 'bg-rose-500',
      cardBg: 'from-white via-rose-50/40 to-white',
    },
    {
      label: 'Kompletacja',
      impact: 'Wpływ: magazyn i wydania towaru',
      topBar: 'from-amber-500 via-orange-400 to-rose-300',
      chip: 'border-amber-200 bg-amber-50 text-amber-700',
      dot: 'bg-amber-500',
      cardBg: 'from-white via-amber-50/40 to-white',
    },
    {
      label: 'Dokumenty',
      impact: 'Wpływ: biuro i dział handlowy',
      topBar: 'from-sky-500 via-cyan-400 to-teal-300',
      chip: 'border-sky-200 bg-sky-50 text-sky-700',
      dot: 'bg-sky-500',
      cardBg: 'from-white via-sky-50/40 to-white',
    },
  ]

  return (
    <section id="problem" className="space-y-6">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} description={content.intro} />

      <div className="grid gap-4 md:grid-cols-3">
        {content.cards.map((card, index) => {
          const meta = cardMeta[index % cardMeta.length]

          return (
            <Card
              key={card.title}
              className={`relative overflow-hidden border-slate-200/70 bg-gradient-to-b ${meta.cardBg} p-0`}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${meta.topBar}`} aria-hidden="true" />

              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${meta.chip}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
                    {meta.label}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Kluczowy koszt</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-700">{card.description}</p>
                <p className="border-t border-slate-200/80 pt-3 text-xs font-medium text-slate-500">{meta.impact}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default ProblemSection
