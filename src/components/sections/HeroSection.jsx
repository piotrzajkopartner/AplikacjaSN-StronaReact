import Button from '../ui/Button.jsx'
import { InteractiveGridPattern } from '../magicui/interactive-grid-pattern.jsx'
import { WordPullUp } from '../magicui/word-pull-up.jsx'

const heroDocuments = [
  {
    signature: 'WZ 337/MAG/26',
    customer: 'DELTA MONITORING S.A.',
    source: 'ZK 327/MAG/26',
    progress: 100,
    saved: '7 / 7',
    accent: 'bg-emerald-500',
    status: 'Gotowe',
    statusClass: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  {
    signature: 'PZ 034/MAG/26',
    customer: 'ALFA SYSTEMS SP. Z O.O.',
    source: 'Przyjecie magazynowe',
    progress: 48,
    saved: '6 / 14',
    accent: 'bg-orange-500',
    status: 'Do uzupelnienia',
    statusClass: 'bg-orange-50 text-orange-700 ring-orange-200',
  },
  {
    signature: 'ZK 331/MAG/26',
    customer: 'SIGMA INTEGRATOR',
    source: 'Powiazane WZ',
    progress: 0,
    saved: '0 / 4',
    accent: 'bg-rose-500',
    status: 'Brak SN',
    statusClass: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
]

function MiniProgress({ value }) {
  const color = value > 80 ? '#1e9a58' : value > 0 ? '#da8a1a' : '#d42f3b'

  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#e5edf7"
        strokeWidth="3.5"
      />
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke={color}
        strokeDasharray={`${value},100`}
        strokeLinecap="round"
        strokeWidth="3.5"
      />
      <text x="18" y="20.35" textAnchor="middle" className="fill-slate-700 text-[10px] font-black">
        {value}%
      </text>
    </svg>
  )
}

function HeroSection({ content }) {
  return (
    <section
      id="hero"
      className="surface-panel relative overflow-hidden rounded-[2rem] p-6 md:p-10 lg:p-12"
    >
      <InteractiveGridPattern
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] inset-0 absolute"
        width={40}
        height={40}
        squares={[40, 40]}
      />

      <div className="pointer-events-none absolute -right-16 -top-24 h-96 w-96 rounded-full bg-brand-blue/16 blur-[100px] animate-pulse-slow" />
      <div className="pointer-events-none absolute -bottom-20 left-12 h-80 w-80 rounded-full bg-sky-300/18 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

      <div className="relative grid gap-10 md:grid-cols-[1fr_0.92fr] md:items-center pointer-events-none">
        <div className="animate-fade-in-up pointer-events-auto">
          <p className="mb-5 inline-flex rounded-full border border-brand-blue/15 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-blue shadow-sm shadow-blue-100/80">
            {content.badge}
          </p>
          <WordPullUp className="text-left text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-6xl drop-shadow-none leading-[1.02]" words={content.headline} />
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg font-medium">{content.body}</p>

          <div className="mt-6 max-w-xl rounded-2xl border border-brand-blue/20 bg-gradient-to-r from-blue-50/90 to-white/70 p-4 shadow-sm shadow-blue-100/70 backdrop-blur-sm">
            <p className="text-sm font-semibold text-brand-blue">{content.pricingNote}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={content.primaryCta.href} variant="premium">
              {content.primaryCta.label}
            </Button>
            <Button to={content.secondaryCta.href} variant="secondary">
              {content.secondaryCta.label}
            </Button>
          </div>

          <p className="mt-5 text-sm font-medium text-brand-muted">{content.supportingNote}</p>
        </div>

        <div className="animate-fade-in-up pointer-events-auto lg:ml-4" style={{ animationDelay: '0.2s' }}>
          <div className="relative mx-auto max-w-xl transition-transform duration-700 hover:-translate-y-2">
            <div className="absolute -inset-5 rounded-[2rem] bg-brand-blue/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-[#f4f7fc] shadow-[0_34px_90px_rgba(15,23,42,0.18)]">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <span className="text-sm font-black text-[#4667f5]">SN</span>
                  </div>
                  <div>
                    <p className="text-sm font-black tracking-tight text-slate-900">Partner Numery Seryjne</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Kontrola SN w dokumentach</p>
                  </div>
                </div>
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">Bez duplikatow</span>
              </div>

              <div className="space-y-3 p-4">
                <div className="rounded-[14px] border border-[#dde6f2] bg-white p-3 shadow-[0_10px_30px_rgba(12,24,42,0.08)]">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#dde6f2] bg-white px-3 py-2">
                      <span className="text-sm text-slate-400">⌕</span>
                      <span className="text-xs font-semibold text-slate-500">Szukaj dokumentu lub SN...</span>
                    </div>
                    <button className="rounded-xl bg-[#4667f5] px-4 py-2 text-xs font-bold text-white shadow-[0_10px_30px_rgba(70,103,245,0.22)]">
                      Szukaj
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="rounded-[14px] border border-[#dde6f2] bg-[#edf2fa] p-1">
                    {['PZ', 'ZK', 'WZ'].map((type) => (
                      <span key={type} className={`inline-flex rounded-[10px] px-3 py-2 text-xs font-bold ${type === 'WZ' ? 'bg-[#161d2b] text-white shadow-sm' : 'text-slate-500'}`}>
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-[14px] border border-[#dde6f2] bg-[#edf2fa] p-1">
                    <span className="inline-flex rounded-[10px] bg-white px-3 py-2 text-xs font-bold text-[#2f4bcc] shadow-sm ring-1 ring-[#d8e2f3]">Do uzupelnienia</span>
                    <span className="inline-flex px-3 py-2 text-xs font-bold text-slate-500">Uzupelnione</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {heroDocuments.map((doc) => (
                    <div key={doc.signature} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-[0_10px_30px_rgba(12,24,42,0.08)]">
                      <div className={`absolute bottom-0 left-0 top-0 w-1 ${doc.accent}`} />
                      <div className="flex items-center justify-between gap-3 pl-2">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="rounded-md bg-indigo-50 p-1.5">
                            <MiniProgress value={doc.progress} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-sm font-bold leading-tight text-slate-800">{doc.signature}</h3>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ring-1 ${doc.statusClass}`}>{doc.status}</span>
                            </div>
                            <p className="truncate text-xs font-semibold text-[#4667f5]">{doc.customer}</p>
                            <div className="mt-1 flex items-center gap-2 text-[10px] font-medium text-slate-500">
                              <span>{doc.source}</span>
                              <span className="text-slate-300">|</span>
                              <span><strong className="text-slate-700">{doc.saved}</strong> SN</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-slate-300">›</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-[1fr_0.75fr]">
                  <div className="rounded-2xl border border-[#dde6f2] bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      <span>SerialEntry</span>
                      <span className="text-[#4667f5]">1001 Kamera IP 4MP</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['WZ-400005-1-001', 'WZ-400005-1-002', 'brak'].map((serial, index) => (
                        <div key={serial} className={`rounded-xl border px-2 py-2 text-[10px] font-bold ${index === 2 ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                          {serial}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex h-16 items-end justify-between gap-1">
                      {Array.from({ length: 24 }).map((_, index) => (
                        <span key={index} className="w-1 bg-slate-950" style={{ height: `${18 + ((index * 13) % 34)}px` }} />
                      ))}
                    </div>
                    <div className="absolute inset-x-0 top-1/2 h-px bg-brand-blue shadow-[0_0_18px_4px_rgba(0,174,255,0.45)]" />
                    <p className="mt-2 font-mono text-[10px] tracking-[0.24em] text-slate-500">590 1001 400005</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
