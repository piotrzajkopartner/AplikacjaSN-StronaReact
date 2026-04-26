import Button from '../components/ui/Button.jsx'
import { siteContent } from '../content/siteContent.js'
import DemoAppShell from '../features/demo/DemoAppShell.jsx'

function DemoPage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white md:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">
            {siteContent.demoPage.badge}
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{siteContent.demoPage.headline}</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">{siteContent.demoPage.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/" variant="secondary" className="border-white/35 bg-white/10 text-white hover:bg-white/20">
              Wroc na strone glowna
            </Button>
            <Button to="/#kontakt" className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
              Przejdz do kontaktu
            </Button>
          </div>
        </div>
      </section>

      <DemoAppShell />
    </div>
  )
}

export default DemoPage
