import { Check, FileText, Search } from 'lucide-react'
import { mobileDemoData } from '../../content/mobileDemoData.js'

const statusClasses = {
  'Do uzupełnienia': 'border-rose-200 bg-rose-50 text-rose-700',
  'W trakcie': 'border-amber-200 bg-amber-50 text-amber-700',
  Uzupełnione: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

function DesktopAppMockup({ className = '' }) {
  return (
    <section
      aria-label="Demonstracyjny widok panelu webowego Partner Numery Seryjne"
      className={`overflow-hidden rounded-[1.35rem] border border-slate-200 bg-slate-100 shadow-[0_26px_70px_rgba(15,23,42,0.16)] ${className}`.trim()}
    >
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-700 text-xs font-black text-white">
            SN
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-black tracking-tight text-slate-950">
              Panel dokumentów
            </h2>
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-indigo-600">
              Dane demonstracyjne
            </p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[0.625rem] font-extrabold text-emerald-700">
          Kontrola SN
        </span>
      </header>

      <div className="grid min-h-[22rem] grid-cols-[4.5rem_minmax(0,1fr)] sm:grid-cols-[7.5rem_minmax(0,1fr)]">
        <aside className="border-r border-slate-800 bg-slate-950 p-2.5 text-slate-300">
          <p className="px-2 py-2 text-[0.5625rem] font-black uppercase tracking-[0.18em] text-slate-500">
            Moduły
          </p>
          {['Dokumenty', 'Numery SN', 'Historia'].map((item, index) => (
            <div
              key={item}
              className={`mt-1 rounded-lg px-2 py-2 text-[0.625rem] font-bold sm:text-xs ${
                index === 0 ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              {item}
            </div>
          ))}
        </aside>

        <div className="min-w-0 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.14em] text-indigo-600">
                Lista robocza
              </p>
              <h3 className="mt-0.5 text-base font-black tracking-tight text-slate-950 sm:text-lg">
                Dokumenty magazynowe
              </h3>
            </div>
            <div className="flex min-h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-400 shadow-sm">
              <Search aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Szukaj dokumentu lub SN</span>
              <span className="sm:hidden">Szukaj</span>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {mobileDemoData.documents.map((document) => {
              const percentage = Math.round((document.progress / document.required) * 100)

              return (
                <article
                  key={document.id}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                      <FileText aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-black text-slate-900 sm:text-sm">
                            {document.number}
                          </p>
                          <p className="truncate text-[0.625rem] font-medium text-slate-500 sm:text-xs">
                            {document.company}
                          </p>
                        </div>
                        <span className={`w-fit rounded-full border px-2 py-0.5 text-[0.5625rem] font-extrabold ${statusClasses[document.status]}`}>
                          {document.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div
                          role="progressbar"
                          aria-label={`Postęp dokumentu ${document.number}`}
                          aria-valuemin={0}
                          aria-valuemax={document.required}
                          aria-valuenow={document.progress}
                          className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"
                        >
                          <div
                            aria-hidden="true"
                            className={`h-full rounded-full ${percentage === 100 ? 'bg-emerald-600' : 'bg-indigo-600'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="shrink-0 text-[0.625rem] font-black tabular-nums text-slate-600">
                          {document.progress}/{document.required} SN
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[0.625rem] font-bold text-emerald-800 sm:text-xs">
            <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            Statusy i postęp widoczne w panelu webowym
          </div>
        </div>
      </div>
    </section>
  )
}

export default DesktopAppMockup
