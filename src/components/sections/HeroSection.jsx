import Button from '../ui/Button.jsx'
import { InteractiveGridPattern } from '../magicui/interactive-grid-pattern.jsx'
import { WordPullUp } from '../magicui/word-pull-up.jsx'

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
      
      {/* Blurred background orbs for mesh gradient effect */}
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
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-slate-950 shadow-[0_34px_90px_rgba(15,23,42,0.22)]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">SN kontrola</span>
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Dokument WZ</p>
                  <p className="mt-3 text-3xl font-black tracking-tight text-white">1006</p>
                  <p className="mt-1 text-xs text-slate-400">Symbol produktu</p>
                  <div className="mt-5 space-y-2">
                    {['SN-PA-84291', 'SN-WZ-10482', 'SN-ZK-77520'].map((serial) => (
                      <div key={serial} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-slate-200">
                        <span>{serial}</span>
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-inner">
                  <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    <span>EAN scan</span>
                    <span className="text-brand-blue">Verified</span>
                  </div>
                  <div className="relative h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="absolute inset-x-5 top-7 flex h-16 items-end justify-between gap-1">
                      {Array.from({ length: 34 }).map((_, index) => (
                        <span key={index} className="w-1 bg-slate-950" style={{ height: `${28 + ((index * 17) % 38)}px` }} />
                      ))}
                    </div>
                    <div className="absolute inset-x-0 top-1/2 h-px bg-brand-blue shadow-[0_0_18px_4px_rgba(0,174,255,0.45)]" />
                    <p className="absolute bottom-4 left-5 font-mono text-xs tracking-[0.35em] text-slate-600">590 1006 84291</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {['0 duplikatów', '3 SN', '1 dokument'].map((item) => (
                      <div key={item} className="rounded-xl bg-slate-50 px-2 py-3 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
                        {item}
                      </div>
                    ))}
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
