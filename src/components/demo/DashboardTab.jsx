import { formatDate } from '../../lib/demo/formatters.js'

function DashboardTab({ content, dashboard, operations }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {content.kpis.map((kpi) => (
          <article key={kpi.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{kpi.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{dashboard[kpi.key]}</p>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <h3 className="text-lg font-semibold text-slate-900">{content.operationsTitle}</h3>
          <span className="text-xs text-slate-500">{content.operationsHint}</span>
        </header>
        <ul className="mt-3 space-y-3">
          {operations.map((operation) => (
            <li key={`${operation.serialCode}-${operation.date}-${operation.status}`} className="rounded-xl border border-slate-100 p-3">
              <p className="text-sm font-semibold text-slate-900">
                {operation.status} - {operation.serialCode}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {formatDate(operation.date)} | {operation.documentNumber}
              </p>
              <p className="mt-1 text-xs text-slate-500">{operation.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default DashboardTab
