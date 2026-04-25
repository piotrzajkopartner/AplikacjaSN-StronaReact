import { Link } from 'react-router-dom'

function DemoPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">/demo - placeholder</h1>
      <p className="max-w-2xl text-slate-700">
        Ta podstrona jest tymczasowym placeholderem estetycznym. Finalne, interaktywne demo produktu
        zostanie przygotowane jako osobna aplikacja.
      </p>
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Placeholder przyszlych ekranow demo.
      </div>
      <Link
        to="/"
        className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
      >
        Wroc na strone glowna
      </Link>
    </section>
  )
}

export default DemoPage
