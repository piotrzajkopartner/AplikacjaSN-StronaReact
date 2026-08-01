import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileText,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { mobileDemoData } from '../../content/mobileDemoData.js'

const documentStates = [
  {
    id: `${mobileDemoData.document.id}-empty`,
    progress: mobileDemoData.documents[0].progress,
    status: mobileDemoData.documents[0].status,
    accent: 'bg-red-500',
    card: 'border-red-100 bg-red-50/20',
    icon: 'bg-red-50 text-red-500',
    badge: 'border-red-200 bg-red-50 text-red-700',
    Icon: AlertCircle,
  },
  {
    id: `${mobileDemoData.document.id}-partial`,
    progress: mobileDemoData.pickingStates[1].pickedQuantity,
    status: mobileDemoData.documents[1].status,
    accent: 'bg-amber-500',
    card: 'border-amber-100 bg-amber-50/20',
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
    showProgress: true,
    showRelation: true,
  },
  {
    id: `${mobileDemoData.document.id}-complete`,
    progress: mobileDemoData.pickingStates[2].pickedQuantity,
    status: mobileDemoData.documents[2].status,
    accent: 'bg-emerald-500',
    card: 'border-emerald-100 bg-emerald-50/20',
    icon: 'bg-emerald-50 text-emerald-600',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Icon: CheckCircle2,
    showRelation: true,
  },
]

function DesktopAppMockup({ className = '' }) {
  const { company, document, product } = mobileDemoData

  return (
    <section
      aria-label="Demonstracyjny widok panelu webowego Partner Numery Seryjne"
      className={`overflow-hidden rounded-[1.35rem] border border-slate-200 bg-[#f6f7f9] [font-family:'Segoe_UI','Trebuchet_MS','Noto_Sans',sans-serif] shadow-[0_26px_70px_rgba(15,23,42,0.16)] ${className}`.trim()}
    >
      <header className="flex h-14 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:h-16 sm:px-5">
        <img
          src="/logo.svg"
          alt="Partner Numery Seryjne"
          className="h-8 w-auto max-w-[9rem] object-contain object-left sm:h-9 sm:max-w-[10.5rem]"
        />

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[0.625rem] font-semibold text-emerald-700 sm:inline-flex">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Licencja aktywna
          </span>
          <button
            type="button"
            aria-label="Pokaż kod QR"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 shadow-sm"
          >
            <QrCode aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="p-3 sm:p-4">
        <form
          role="search"
          aria-label="Wyszukiwanie dokumentów i numerów seryjnych"
          className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3"
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="desktop-demo-scope">
              Zakres wyszukiwania
            </label>
            <select
              id="desktop-demo-scope"
              defaultValue="all"
              className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 outline-none sm:w-28"
            >
              <option value="all">Wszystko</option>
            </select>

            <label className="relative min-w-0 flex-1" htmlFor="desktop-demo-search">
              <span className="sr-only">Szukaj dokumentu lub numeru seryjnego</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                id="desktop-demo-search"
                type="search"
                readOnly
                placeholder="Szukaj dokumentu lub SN..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>

            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#263b82] px-5 text-xs font-bold text-white shadow-sm"
            >
              Szukaj
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
              Dokumenty {document.type}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-[0.6875rem] text-slate-500 sm:text-xs">
              <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
              Ostatnia aktualizacja: 13:05:11
            </p>
          </div>

          <nav aria-label="Filtry dokumentów" className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-lg bg-slate-200/75 p-1" aria-label="Typ dokumentu">
              {['PZ', document.type, 'WZ'].map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={type === document.type}
                  className={`min-w-10 rounded-md px-2.5 py-1.5 text-[0.6875rem] font-bold ${
                    type === document.type
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-lg bg-slate-200/75 p-1" aria-label="Status dokumentu">
              <button
                type="button"
                aria-pressed="true"
                className="rounded-md bg-white px-2.5 py-1.5 text-[0.6875rem] font-bold text-[#263b82] shadow-sm"
              >
                Do uzupełnienia
              </button>
              <button
                type="button"
                aria-pressed="false"
                className="rounded-md px-2.5 py-1.5 text-[0.6875rem] font-semibold text-slate-600"
              >
                Uzupełnione
              </button>
            </div>

            <button
              type="button"
              aria-label="Odśwież listę dokumentów"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm"
            >
              <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </nav>
        </div>

        <div className="mx-auto mt-3 grid max-w-3xl grid-cols-1 gap-2">
          {documentStates.map((state) => {
            const percentage = Math.round((state.progress / product.requiredQuantity) * 100)
            const StatusIcon = state.Icon

            return (
              <article
                key={state.id}
                aria-label={`Dokument ${document.number}, status: ${state.status}`}
                className={`relative overflow-hidden rounded-lg border px-3 py-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.05)] ${state.card}`}
              >
                <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${state.accent}`} />

                <div className="flex items-center gap-3 pl-1">
                  {state.showProgress ? (
                    <div
                      role="progressbar"
                      aria-label={`Uzupełniono ${percentage}% numerów seryjnych`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={percentage}
                      className="relative h-10 w-10 shrink-0"
                    >
                      <svg aria-hidden="true" viewBox="0 0 36 36" className="h-10 w-10 -rotate-90">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.5"
                          fill="none"
                          pathLength="100"
                          stroke="#f59e0b"
                          strokeDasharray={`${percentage} 100`}
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[0.5625rem] font-bold tabular-nums text-amber-700">
                        {percentage}%
                      </span>
                    </div>
                  ) : (
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${state.icon}`}>
                      <StatusIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                      <div className="min-w-0">
                        <h3 className="truncate text-xs font-bold leading-5 text-slate-800 sm:text-sm">
                          {document.number}
                        </h3>
                        <p className="truncate text-[0.6875rem] font-medium text-[#263b82] sm:text-xs">
                          {company.name}{' '}
                          <span className="font-normal text-slate-400">({company.taxId})</span>
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.5625rem] font-bold ${state.badge}`}>
                        {state.status}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.625rem] text-slate-500 sm:text-[0.6875rem]">
                      <span>
                        Sym: <strong className="font-semibold text-slate-700">{document.type}</strong>
                      </span>
                      <span aria-hidden="true" className="text-slate-300">|</span>
                      <span>{document.date}</span>
                      <span aria-hidden="true" className="text-slate-300">|</span>
                      <span className="font-semibold tabular-nums text-slate-700">
                        {state.progress} / {product.requiredQuantity} SN
                      </span>
                      {state.showRelation ? (
                        <span className="ml-auto rounded border border-indigo-100 bg-indigo-50 px-1.5 py-0.5 font-semibold text-indigo-600">
                          FS: {document.salesDocument}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <FileText aria-hidden="true" className="hidden h-4 w-4 shrink-0 text-slate-300 sm:block" />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DesktopAppMockup
