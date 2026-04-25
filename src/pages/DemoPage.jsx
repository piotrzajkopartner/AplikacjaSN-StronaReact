import Button from '../components/ui/Button.jsx'
import DemoAppShell from '../components/demo/DemoAppShell.jsx'
import { siteContent } from '../content/siteContent.js'

function DemoPage() {
  const { demoPage, demoApp } = siteContent

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">
            {demoPage.badge}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{demoPage.headline}</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">{demoPage.description}</p>
          <p className="mt-4 rounded-xl border border-white/20 bg-white/10 p-4 text-sm leading-relaxed text-blue-100">
            {demoPage.scopeDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to={demoPage.ctas.backHome.href} variant="secondary" className="border-white/35 bg-white/10 text-white hover:bg-white/20">
              {demoPage.ctas.backHome.label}
            </Button>
            <Button to={demoPage.ctas.contact.href} className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
              {demoPage.ctas.contact.label}
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <header>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{demoApp.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">{demoApp.description}</p>
        </header>

        <DemoAppShell content={demoApp} />
      </section>
    </div>
  )
}

export default DemoPage
