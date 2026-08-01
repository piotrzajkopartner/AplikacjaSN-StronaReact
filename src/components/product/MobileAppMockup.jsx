import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  Box,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Crosshair,
  FileText,
  Maximize2,
  Minus,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  ScanLine,
  Search,
  X,
} from 'lucide-react'
import { mobileDemoData } from '../../content/mobileDemoData.js'
import PhoneFrame from './PhoneFrame.jsx'

const validScreens = new Set(['documents', 'serials', 'picking'])
const requiredQuantity = mobileDemoData.product.requiredQuantity

const pickingMeta = {
  pending: {
    label: 'Do zebrania',
    card: 'border-slate-200 bg-white',
    pill: 'bg-slate-100 text-slate-700',
    dot: 'bg-slate-300',
  },
  partial: {
    label: 'Częściowo',
    card: 'border-orange-200 bg-orange-50/50',
    pill: 'bg-orange-100 text-orange-800',
    dot: 'bg-orange-500',
  },
  picked: {
    label: 'Zebrane',
    card: 'border-emerald-200 bg-emerald-50/50',
    pill: 'bg-emerald-100 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  missing: {
    label: 'Brak',
    card: 'border-red-200 bg-red-50/50',
    pill: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
  },
}

const actionLabels = {
  complete: 'Oznaczono pozycję jako kompletną.',
  decrement: 'Zmniejszono liczbę zebranych sztuk.',
  increment: 'Zwiększono liczbę zebranych sztuk.',
  missing: 'Oznaczono demonstracyjny brak towaru.',
  note: 'Dodano fikcyjną notatkę do pozycji.',
  refresh: 'Odświeżono lokalny widok danych DEMO.',
  reset: 'Wyzerowano demonstracyjny postęp pozycji.',
  save: 'Zapisano lokalnie demonstracyjne numery SN.',
  'scan-item': 'Dodano sztukę po demonstracyjnym odczycie.',
  'scan-search': 'Wstawiono demonstracyjny kod do wyszukiwarki.',
  'scan-serial': 'Uzupełniono demonstracyjne pole numeru SN.',
  'scan-series': 'Dodano numer w demonstracyjnym trybie seryjnym.',
}

function clampStep(value) {
  if (!Number.isFinite(Number(value))) return 0
  return Math.min(requiredQuantity, Math.max(0, Math.trunc(Number(value))))
}

function getPickingStatus(quantity, forcedStatus) {
  if (forcedStatus === 'missing') return 'missing'
  if (quantity <= 0) return 'pending'
  if (quantity >= requiredQuantity) return 'picked'
  return 'partial'
}

function BrandHeader() {
  return (
    <header className="border-b border-[#dde6f2] bg-white px-4 py-3 shadow-sm">
      <img
        src="/logo.svg"
        alt="Partner Numery Seryjne"
        className="h-9 w-auto max-w-full object-contain object-left"
      />
    </header>
  )
}

function SegmentGroup({ label, options, value, onChange, strong = false }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`grid rounded-xl border border-[#dde6f2] bg-[#edf2fa] p-1 ${
        options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
      }`}
    >
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`min-h-9 rounded-[0.6rem] px-2 text-[0.6875rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4667f5] motion-reduce:transition-none ${
              isActive
                ? strong
                  ? 'bg-[#161d2b] text-white shadow-sm'
                  : 'bg-white text-[#2f4bcc] shadow-sm ring-1 ring-[#d8e2f3]'
                : 'text-[#5e6b82] hover:text-[#161d2b]'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function DocumentsScreen({ onOpenDocument, onOpenScanner, announce }) {
  const [documentType, setDocumentType] = useState('ZK')
  const [documentStatus, setDocumentStatus] = useState('Do uzupełnienia')
  const [searchScope, setSearchScope] = useState('all')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('pl')
  const visibleDocuments = mobileDemoData.mobileDocuments.filter((document) => {
    if (document.type !== documentType || document.status !== documentStatus) return false
    if (!normalizedQuery) return true
    if (searchScope !== 'all' && searchScope !== document.type && searchScope !== 'sn') return false

    const searchable = searchScope === 'sn'
      ? mobileDemoData.product.serialNumbers.join(' ')
      : `${document.number} ${document.company} ${document.type}`
    return searchable.toLocaleLowerCase('pl').includes(normalizedQuery)
  })

  const submitSearch = (event) => {
    event.preventDefault()
    setSearchQuery(searchInput)
    announce(searchInput.trim() ? `Przefiltrowano dokumenty dla: ${searchInput.trim()}.` : 'Wyczyszczono wyszukiwanie.')
  }

  return (
    <>
      <BrandHeader />
      <main className="space-y-4 px-3.5 py-4">
        <form
          onSubmit={submitSearch}
          className="space-y-2 rounded-2xl border border-[#dde6f2] bg-white p-3.5 shadow-[0_10px_30px_rgba(12,24,42,0.08)]"
          aria-label="Wyszukiwanie dokumentów"
        >
          <label className="sr-only" htmlFor="mobile-demo-search-scope">Zakres wyszukiwania</label>
          <select
            id="mobile-demo-search-scope"
            value={searchScope}
            onChange={(event) => setSearchScope(event.target.value)}
            className="h-10 w-full rounded-xl border border-[#dde6f2] bg-white px-3 text-xs text-[#161d2b] outline-none focus:border-[#afc1f6] focus:ring-2 focus:ring-[#4667f5]/20"
          >
            <option value="all">Wszystko</option>
            <option value="sn">Numer SN</option>
            <option value="PZ">Dokument PZ</option>
            <option value="ZK">Dokument ZK</option>
            <option value="WZ">Dokument WZ</option>
          </select>
          <div className="relative">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <label className="sr-only" htmlFor="mobile-demo-document-search">Szukaj dokumentu lub numeru SN</label>
            <input
              id="mobile-demo-document-search"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Szukaj dokumentu lub SN..."
              className="h-10 w-full rounded-xl border border-[#dde6f2] bg-white pl-9 pr-10 text-xs text-[#161d2b] outline-none placeholder:text-slate-400 focus:border-[#afc1f6] focus:ring-2 focus:ring-[#4667f5]/20"
            />
            <button
              type="button"
              onClick={() => onOpenScanner({
                kind: 'search',
                mode: 'single',
                title: 'Skanuj kod do wyszukiwarki',
                onResult: (code) => {
                  setSearchInput(code)
                  setSearchQuery(code)
                },
              })}
              className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-[#4667f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
              aria-label="Skanuj kod do wyszukiwarki"
            >
              <Camera aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#4667f5] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#2f4bcc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4667f5]"
          >
            Szukaj
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#161d2b]">Dokumenty {documentType}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-[0.6875rem] text-[#6b7486]">
            <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
            Ostatnia aktualizacja: 14:42:00
          </p>
        </div>

        <div className="max-w-[13rem]">
          <SegmentGroup
            label="Typ dokumentu"
            value={documentType}
            onChange={(value) => {
              setDocumentType(value)
              setSearchQuery('')
              announce(`Wybrano dokumenty ${value}.`)
            }}
            strong
            options={['PZ', 'ZK', 'WZ'].map((type) => ({ value: type, label: type }))}
          />
        </div>
        <SegmentGroup
          label="Status dokumentu"
          value={documentStatus}
          onChange={(value) => {
            setDocumentStatus(value)
            announce(`Wybrano status: ${value}.`)
          }}
          options={[
            { value: 'Do uzupełnienia', label: 'Do uzupełnienia' },
            { value: 'Uzupełnione', label: 'Uzupełnione' },
          ]}
        />

        <div className="space-y-2" aria-live="polite">
          {visibleDocuments.length > 0 ? visibleDocuments.map((document) => {
            const percentage = document.required > 0
              ? Math.round((document.progress / document.required) * 100)
              : 100
            const isComplete = document.status === 'Uzupełnione'
            const isEmpty = document.progress === 0
            const accent = isComplete ? 'bg-emerald-500' : isEmpty ? 'bg-red-500' : 'bg-orange-500'
            const iconStyle = isComplete
              ? 'bg-emerald-50 text-emerald-600'
              : isEmpty
                ? 'bg-red-50 text-red-500'
                : 'bg-orange-50 text-orange-500'

            return (
              <button
                key={document.id}
                type="button"
                onClick={() => onOpenDocument(document)}
                className="group relative w-full overflow-hidden rounded-xl border border-[#dde6f2] bg-white p-2.5 pl-4 text-left shadow-[0_8px_24px_rgba(12,24,42,0.07)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4667f5] motion-reduce:transition-none"
                aria-label={`Otwórz dokument ${document.number}`}
              >
                <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
                <span className="flex items-center gap-2.5">
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}>
                    {isEmpty ? <AlertCircle className="h-4.5 w-4.5" /> : <FileText className="h-4.5 w-4.5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold leading-tight text-[#202939]">{document.number}</span>
                    <span className="mt-0.5 block truncate text-[0.6875rem] font-semibold text-[#4f46e5]">
                      {document.company} <span className="font-normal text-slate-400">({document.taxId})</span>
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[0.625rem] text-slate-500">
                      <span>Sym: <strong className="text-slate-700">{document.type}</strong></span>
                      <span className="text-slate-300">|</span>
                      <span>{document.date}</span>
                      <span className="text-slate-300">|</span>
                      <strong className={isComplete ? 'text-emerald-600' : isEmpty ? 'text-red-500' : 'text-orange-500'}>
                        {document.progress} / {document.required} <span className="text-slate-400">SN</span>
                      </strong>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    {!isEmpty && !isComplete ? (
                      <span className="text-[0.5625rem] font-bold text-orange-600">{percentage}%</span>
                    ) : null}
                    <ChevronRight aria-hidden="true" className="h-4 w-4 text-slate-300 group-hover:text-[#4667f5]" />
                  </span>
                </span>
              </button>
            )
          }) : (
            <div className="rounded-xl border border-dashed border-[#cbd7e8] bg-white/60 px-4 py-7 text-center text-xs text-slate-500">
              Brak dokumentów DEMO dla wybranych filtrów.
            </div>
          )}
        </div>
      </main>
    </>
  )
}

function DocumentHeader({ document, serialCount, activeScreen, onBack, onNavigate }) {
  const percentage = Math.round((serialCount / requiredQuantity) * 100)

  return (
    <>
      <BrandHeader />
      <div className="border-b border-[#dde6f2] bg-[#f4f7fc] px-3.5 pb-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-[#5e6b82] hover:text-[#4667f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Wróć do listy
        </button>
        <h2 className="mt-4 truncate text-xl font-bold tracking-tight text-[#161d2b]">{document.number}</h2>
        <p className="mt-1 truncate text-xs font-semibold text-[#4f46e5]">
          {document.company} <span className="ml-1 font-normal text-[#6b7486]">{document.taxId}</span>
        </p>
        <p className="mt-2 text-xs text-[#6b7486]">
          Data dokumentu: <strong className="text-[#3a4458]">{document.date}</strong>
        </p>
        <p className="mt-1 text-xs text-[#6b7486]">Wprowadzanie numerów seryjnych</p>
        <div
          role="progressbar"
          aria-label="Postęp uzupełniania numerów seryjnych"
          aria-valuemin={0}
          aria-valuemax={requiredQuantity}
          aria-valuenow={serialCount}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"
        >
          <div
            aria-hidden="true"
            className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-1 text-right text-[0.625rem] text-[#6b7486]">
          Wypełniono {serialCount} z {requiredQuantity} wymaganych numerów
        </p>
        <div className="mt-3">
          <SegmentGroup
            label="Tryb pracy z dokumentem"
            value={activeScreen}
            onChange={onNavigate}
            strong
            options={[
              { value: 'serials', label: 'Numery SN' },
              { value: 'picking', label: 'Kompletacja' },
            ]}
          />
        </div>
      </div>
    </>
  )
}

function SerialsScreen({ document, serialValues, onBack, onNavigate, onOpenScanner, onSave, onRefresh }) {
  const [productSearch, setProductSearch] = useState('')
  const normalizedSearch = productSearch.trim().toLocaleLowerCase('pl')
  const productVisible = !normalizedSearch
    || `${mobileDemoData.product.name} ${mobileDemoData.product.symbol}`.toLocaleLowerCase('pl').includes(normalizedSearch)

  return (
    <>
      <DocumentHeader
        document={document}
        serialCount={serialValues.filter(Boolean).length}
        activeScreen="serials"
        onBack={onBack}
        onNavigate={onNavigate}
      />
      <main className="space-y-3 px-3.5 py-3">
        <div className="relative">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label className="sr-only" htmlFor="mobile-demo-product-search">Szukaj towaru</label>
          <input
            id="mobile-demo-product-search"
            type="search"
            value={productSearch}
            onChange={(event) => setProductSearch(event.target.value)}
            placeholder="Szukaj towaru (nazwa, symbol)..."
            className="h-10 w-full rounded-xl border border-[#dde6f2] bg-white pl-9 pr-3 text-xs outline-none placeholder:text-slate-400 focus:border-[#afc1f6] focus:ring-2 focus:ring-[#4667f5]/20"
          />
        </div>
        <label className="flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-[#dde6f2] bg-[#edf2fa] px-3 text-xs text-[#3a4458]">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-slate-300 accent-[#4667f5] focus:ring-[#4667f5]"
          />
          Ukryj towary bez SN
        </label>

        {productVisible ? (
          <article className="rounded-2xl border border-[#dde6f2] bg-white p-3.5 shadow-[0_10px_30px_rgba(12,24,42,0.08)]">
            <div className="flex items-start gap-2 border-b border-slate-200 pb-3">
              <Box aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#655cf6]" />
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-xs font-bold leading-snug text-[#161d2b]">{mobileDemoData.product.name}</h3>
                <p className="mt-0.5 font-mono text-[0.6875rem] font-semibold text-slate-500">{mobileDemoData.product.symbol}</p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[0.625rem] font-bold text-slate-700">2 szt.</span>
              <button
                type="button"
                onClick={() => onOpenScanner({ kind: 'serial-series', mode: 'serial', title: 'Skanowanie seryjne' })}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-50 px-2 py-1.5 text-[0.625rem] font-bold text-[#4f46e5] hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
              >
                <ScanLine aria-hidden="true" className="h-3.5 w-3.5" />
                Skanuj serię
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {serialValues.map((serial, index) => (
                <div key={index} className="relative">
                  <label className="sr-only" htmlFor={`mobile-demo-serial-${index}`}>Numer seryjny {index + 1}</label>
                  <input
                    id={`mobile-demo-serial-${index}`}
                    type="text"
                    value={serial}
                    readOnly
                    onClick={() => onOpenScanner({
                      kind: 'serial-single',
                      mode: 'single',
                      targetIndex: index,
                      title: 'Skanuj numer seryjny',
                    })}
                    placeholder={`SN #${index + 1}`}
                    className={`h-10 w-full cursor-pointer rounded-xl border px-3 pr-10 font-mono text-[0.6875rem] outline-none focus:ring-2 focus:ring-[#4667f5]/20 ${
                      serial ? 'border-indigo-300 bg-indigo-50/40 text-indigo-900' : 'border-[#dde6f2] bg-white text-slate-700'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => onOpenScanner({
                      kind: 'serial-single',
                      mode: 'single',
                      targetIndex: index,
                      title: 'Skanuj numer seryjny',
                    })}
                    className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-indigo-50 text-[#4f46e5] hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
                    aria-label={`Skanuj numer seryjny ${index + 1}`}
                  >
                    {serial ? <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" /> : <Camera aria-hidden="true" className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          </article>
        ) : (
          <div className="rounded-xl border border-dashed border-[#cbd7e8] bg-white/60 px-4 py-7 text-center text-xs text-slate-500">
            Brak towarów spełniających kryteria wyszukiwania.
          </div>
        )}
      </main>
      <div className="sticky bottom-0 z-10 flex gap-2 border-t border-[#dde6f2] bg-white/95 px-3.5 py-2.5 backdrop-blur-sm">
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dde6f2] bg-white text-[#5e6b82] hover:text-[#4667f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
          aria-label="Odśwież dane"
        >
          <RefreshCw aria-hidden="true" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#4667f5] text-xs font-bold text-white shadow-sm hover:bg-[#2f4bcc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4667f5]"
        >
          <Save aria-hidden="true" className="h-4 w-4" />
          Zapisz
        </button>
      </div>
    </>
  )
}

function PickingScreen({
  document,
  serialCount,
  quantity,
  status,
  note,
  onBack,
  onNavigate,
  onOpenScanner,
  onPickingAction,
}) {
  const [filter, setFilter] = useState('open')
  const meta = pickingMeta[status]
  const showProduct = filter === 'all'
    || (filter === 'missing' && status === 'missing')
    || (filter === 'open' && status !== 'picked')

  return (
    <>
      <DocumentHeader
        document={document}
        serialCount={serialCount}
        activeScreen="picking"
        onBack={onBack}
        onNavigate={onNavigate}
      />
      <main className="space-y-3 px-3.5 py-3">
        <section className="rounded-2xl border border-[#dde6f2] bg-white p-3 shadow-[0_10px_30px_rgba(12,24,42,0.08)]">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[0.625rem] font-bold uppercase tracking-wide text-slate-500">Kompletacja towarów</p>
              <h3 className="mt-0.5 text-base font-bold text-[#161d2b]">Zebrano {quantity} / 2 szt.</h3>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => onOpenScanner({ kind: 'picking-general', mode: 'serial', title: 'Skanuj towar / SN w kompletacji' })}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#4667f5] text-white hover:bg-[#2f4bcc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4667f5]"
                aria-label="Uruchom skaner kompletacji"
              >
                <Camera aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onPickingAction('refresh')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#dde6f2] bg-white text-[#5e6b82] hover:text-[#4667f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
                aria-label="Odśwież kompletację"
              >
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            role="progressbar"
            aria-label="Ogólny postęp kompletacji"
            aria-valuemin={0}
            aria-valuemax={requiredQuantity}
            aria-valuenow={quantity}
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"
          >
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(quantity / requiredQuantity) * 100}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              { id: 'open', label: `Do zebrania (${status === 'picked' ? 0 : 1})` },
              { id: 'missing', label: `Braki (${status === 'missing' ? 1 : 0})` },
              { id: 'all', label: 'Wszystko (1)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={`min-h-9 rounded-xl px-1 text-[0.625rem] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5] ${
                  filter === item.id
                    ? 'bg-white text-[#2f4bcc] ring-1 ring-[#cddbf0]'
                    : 'bg-slate-50 text-[#5e6b82]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {showProduct ? (
          <article className={`rounded-2xl border p-3.5 shadow-sm ${meta.card}`}>
            <div className="flex items-start gap-2.5">
              <ClipboardCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#655cf6]" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-xs font-bold leading-snug text-[#161d2b]">{mobileDemoData.product.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.625rem] font-bold text-slate-600">
                        {mobileDemoData.product.symbol}
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.5625rem] font-black uppercase ${meta.pill}`}>
                        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenScanner({ kind: 'picking-item', mode: 'single', title: 'Skanuj kod dla pozycji' })}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[#4f46e5] hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
                    aria-label="Skanuj tę pozycję"
                  >
                    <Camera aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-[#d8e2f3] bg-[#edf2fa] p-2.5">
                    <p className="text-[0.5625rem] font-bold uppercase text-slate-500">Zebrano</p>
                    <p className="mt-0.5 text-base font-black text-[#161d2b]">{quantity} / 2 szt.</p>
                  </div>
                  <div className="rounded-xl border border-[#d8e2f3] bg-[#edf2fa] p-2.5">
                    <p className="text-[0.5625rem] font-bold uppercase text-slate-500">Numery SN</p>
                    <p className="mt-0.5 text-base font-black text-[#161d2b]">{serialCount} / 2 szt.</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-[2.5rem_1fr_2.5rem] gap-1.5">
                  <button
                    type="button"
                    onClick={() => onPickingAction('decrement')}
                    disabled={quantity <= 0}
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-[#dde6f2] bg-white text-[#5e6b82] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]"
                    aria-label="Zmniejsz liczbę zebranych sztuk"
                  >
                    <Minus aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <output className="flex h-10 items-center justify-center rounded-xl border border-[#dde6f2] bg-white text-sm font-black text-[#161d2b]" aria-live="polite">
                    {quantity}
                  </output>
                  <button
                    type="button"
                    onClick={() => onPickingAction('increment')}
                    disabled={quantity >= requiredQuantity}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-[#4667f5] text-white disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4667f5]"
                    aria-label="Zwiększ liczbę zebranych sztuk"
                  >
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  <button type="button" onClick={() => onPickingAction('complete')} className="inline-flex min-h-9 items-center justify-center gap-1 rounded-xl bg-emerald-600 px-2 text-[0.625rem] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600">
                    <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" /> Kompletne
                  </button>
                  <button type="button" onClick={() => onPickingAction('missing')} className="inline-flex min-h-9 items-center justify-center gap-1 rounded-xl bg-red-600 px-2 text-[0.625rem] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-600">
                    <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" /> Brak
                  </button>
                  <button type="button" onClick={() => onPickingAction('reset')} className="inline-flex min-h-9 items-center justify-center gap-1 rounded-xl border border-[#dde6f2] bg-white px-2 text-[0.625rem] font-bold text-[#3a4458] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]">
                    <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" /> Reset
                  </button>
                  <button type="button" onClick={() => onPickingAction('note')} className="inline-flex min-h-9 items-center justify-center rounded-xl border border-[#dde6f2] bg-white px-2 text-[0.625rem] font-bold text-[#3a4458] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4667f5]">
                    Notatka
                  </button>
                </div>
                {note ? (
                  <p className="mt-2 rounded-lg border border-[#dde6f2] bg-white/80 px-2.5 py-2 text-[0.625rem] leading-4 text-slate-600">
                    <strong>Notatka DEMO:</strong> {note}
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ) : (
          <div className="rounded-xl border border-dashed border-[#cbd7e8] bg-white/60 px-4 py-7 text-center text-xs text-slate-500">
            Brak pozycji dla wybranego filtra.
          </div>
        )}
      </main>
    </>
  )
}

function ScannerOverlay({ scanner, scanCount, onSimulate, onConfirm, onClose, onRescan }) {
  const [reticleMode, setReticleMode] = useState('narrow')
  const detectedCode = scanner.detectedCode
  const isSerial = scanner.mode === 'serial'

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black text-white" role="dialog" aria-modal="true" aria-label={scanner.title}>
      <div className="relative z-10 flex items-center justify-between gap-2 bg-black/80 p-3 backdrop-blur-sm">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-bold">{scanner.title}</h2>
          {isSerial ? <p className="mt-0.5 text-[0.625rem] font-semibold text-indigo-300">Tryb seryjny: zeskanowano {scanCount}</p> : null}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setReticleMode((current) => current === 'narrow' ? 'full' : 'narrow')}
            className={`inline-flex min-h-8 items-center gap-1 rounded-full px-2 text-[0.5625rem] font-bold ${reticleMode === 'narrow' ? 'bg-red-600' : 'bg-indigo-600'}`}
            aria-label="Zmień tryb wizjera"
          >
            {reticleMode === 'narrow' ? <Crosshair className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            {reticleMode === 'narrow' ? 'Wąski' : 'Pełny'}
          </button>
          <button type="button" onClick={onClose} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Zamknij skaner">
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,#202938_0%,#05070a_58%,#000_100%)]">
        <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px]" />
        {reticleMode === 'narrow' ? (
          <div className="relative h-16 w-[82%] rounded-xl border-2 border-red-500 shadow-[0_0_0_999px_rgba(0,0,0,0.42)]">
            <span className="absolute inset-x-3 top-1/2 h-0.5 -translate-y-1/2 bg-red-500 shadow-[0_0_10px_#ef4444]" />
            <Crosshair className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-red-300" />
          </div>
        ) : (
          <div className="h-52 w-52 rounded-2xl border-2 border-indigo-400 shadow-[0_0_0_999px_rgba(0,0,0,0.38)]" />
        )}
        <p className="absolute bottom-5 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-center text-[0.625rem] font-semibold text-white/80">
          Nakieruj celownik na kod kreskowy
        </p>
      </div>

      {!isSerial && detectedCode ? (
        <div className="space-y-2.5 border-t border-slate-800 bg-[#111827] p-3.5">
          <div className="text-center">
            <p className="text-[0.5625rem] font-bold uppercase tracking-wider text-slate-400">Wykryty kod</p>
            <p className="mt-1 break-all rounded-lg border border-slate-700 bg-slate-800 p-2 font-mono text-sm font-bold">{detectedCode}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={onRescan} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-slate-700 text-[0.6875rem] font-bold hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
              <RefreshCw aria-hidden="true" className="h-4 w-4" /> Skanuj ponownie
            </button>
            <button type="button" onClick={onConfirm} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-[0.6875rem] font-bold hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
              <Check aria-hidden="true" className="h-4 w-4" /> Zatwierdź
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-slate-800 bg-[#111827] p-3.5">
          <button
            type="button"
            onClick={onSimulate}
            disabled={isSerial && scanCount >= requiredQuantity}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#4667f5] px-3 text-xs font-bold text-white hover:bg-[#2f4bcc] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ScanLine aria-hidden="true" className="h-4 w-4" />
            Zasymuluj odczyt
          </button>
          {isSerial ? (
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[0.625rem] text-slate-400">Licznik: <strong className="text-emerald-400">{scanCount}</strong></span>
              <button type="button" onClick={onClose} className="rounded-lg bg-emerald-600 px-3 py-2 text-[0.6875rem] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                Zakończ ({scanCount})
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

function MobileAppMockup({
  screen,
  pickingStep,
  serialStep,
  activeAction,
  onScreenChange,
  onAction,
  interactive = true,
  className = '',
}) {
  const [internalScreen, setInternalScreen] = useState('documents')
  const [selectedDocumentId, setSelectedDocumentId] = useState(mobileDemoData.mobileDocuments[0].id)
  const [serialValues, setSerialValues] = useState(() => ['', ''])
  const [internalPickingQuantity, setInternalPickingQuantity] = useState(0)
  const [internalPickingStatus, setInternalPickingStatus] = useState('pending')
  const [note, setNote] = useState('')
  const [scanner, setScanner] = useState(null)
  const [scannerCount, setScannerCount] = useState(0)
  const [notice, setNotice] = useState('Lista dokumentów DEMO jest gotowa.')

  const isScreenControlled = screen !== undefined
  const isPickingControlled = pickingStep !== undefined
  const isSerialControlled = serialStep !== undefined
  const activeScreen = isScreenControlled && validScreens.has(screen) ? screen : internalScreen
  const controlledSerialCount = clampStep(serialStep)
  const visibleSerialValues = isSerialControlled
    ? mobileDemoData.product.serialNumbers.map((value, index) => index < controlledSerialCount ? value : '')
    : serialValues
  const pickingQuantity = isPickingControlled ? clampStep(pickingStep) : internalPickingQuantity
  const pickingStatus = activeAction === 'missing'
    ? 'missing'
    : isPickingControlled
      ? getPickingStatus(pickingQuantity)
      : internalPickingStatus
  const visibleNote = activeAction === 'note' && !note ? 'Sprawdzić opakowanie przed wydaniem.' : note
  const selectedDocument = mobileDemoData.mobileDocuments.find(({ id }) => id === selectedDocumentId)
    || mobileDemoData.mobileDocuments[0]

  const announce = (message) => setNotice(message)

  const changeScreen = (nextScreen) => {
    if (!validScreens.has(nextScreen)) return
    if (!isScreenControlled) setInternalScreen(nextScreen)
    setScanner(null)
    setNotice(nextScreen === 'documents' ? 'Wrócono do listy dokumentów.' : `Otwarto widok ${nextScreen === 'serials' ? 'Numery SN' : 'Kompletacja'}.`)
    onScreenChange?.(nextScreen)
  }

  const emitAction = (action, message = actionLabels[action]) => {
    if (message) setNotice(message)
    onAction?.(action, { screen: activeScreen, message })
  }

  const openDocument = (document) => {
    setSelectedDocumentId(document.id)
    const initialSerialCount = Math.min(document.progress, requiredQuantity)
    if (!isSerialControlled) {
      setSerialValues(
        mobileDemoData.product.serialNumbers.map((value, index) => (
          index < initialSerialCount ? value : ''
        )),
      )
    }
    if (!isPickingControlled) {
      setInternalPickingQuantity(initialSerialCount)
      setInternalPickingStatus(getPickingStatus(initialSerialCount))
    }
    setNote('')
    changeScreen('serials')
  }

  const openScanner = (configuration) => {
    setScanner({ ...configuration, detectedCode: null })
    setScannerCount(configuration.mode === 'serial'
      ? configuration.kind === 'serial-series'
        ? visibleSerialValues.filter(Boolean).length
        : pickingQuantity
      : 0)
    setNotice(`Otwarto skaner: ${configuration.title}.`)
    onAction?.('scanner-open', { screen: activeScreen, scanner: configuration.kind })
  }

  const updateSerialAt = (index, code, action = 'scan-serial') => {
    if (!isSerialControlled) {
      setSerialValues((current) => current.map((value, currentIndex) => currentIndex === index ? code : value))
    }
    emitAction(action)
  }

  const updatePicking = (nextQuantity, forcedStatus, action) => {
    const boundedQuantity = clampStep(nextQuantity)
    if (!isPickingControlled) {
      setInternalPickingQuantity(boundedQuantity)
      setInternalPickingStatus(getPickingStatus(boundedQuantity, forcedStatus))
    }
    emitAction(action)
  }

  const handlePickingAction = (action) => {
    if (action === 'increment') updatePicking(pickingQuantity + 1, null, action)
    else if (action === 'decrement') updatePicking(pickingQuantity - 1, null, action)
    else if (action === 'complete') updatePicking(requiredQuantity, 'picked', action)
    else if (action === 'missing') updatePicking(pickingQuantity, 'missing', action)
    else if (action === 'reset') {
      if (!isSerialControlled) setSerialValues(['', ''])
      setNote('')
      updatePicking(0, 'pending', action)
    } else if (action === 'note') {
      setNote('Odłożyć demonstracyjną pozycję do kontroli opakowania.')
      emitAction(action)
    } else emitAction(action)
  }

  const getSimulatedCode = () => {
    if (scanner.kind === 'search') return selectedDocument.number
    if (scanner.kind === 'serial-single') return mobileDemoData.product.serialNumbers[scanner.targetIndex]
    if (scanner.kind === 'serial-series') {
      return mobileDemoData.product.serialNumbers[Math.min(scannerCount, requiredQuantity - 1)]
    }
    return mobileDemoData.product.symbol
  }

  const applyScannerCode = (code) => {
    if (scanner.kind === 'search') {
      scanner.onResult?.(code)
      emitAction('scan-search')
      return
    }
    if (scanner.kind === 'serial-single') {
      updateSerialAt(scanner.targetIndex, code)
      return
    }
    if (scanner.kind === 'serial-series') {
      const emptyIndex = visibleSerialValues.findIndex((value) => !value)
      if (emptyIndex >= 0) updateSerialAt(emptyIndex, code, 'scan-series')
      return
    }
    updatePicking(pickingQuantity + 1, null, 'scan-item')
  }

  const simulateScan = () => {
    const code = getSimulatedCode()
    if (scanner.mode === 'serial') {
      applyScannerCode(code)
      setScannerCount((count) => Math.min(requiredQuantity, count + 1))
    } else {
      setScanner((current) => ({ ...current, detectedCode: code }))
      setNotice(`Wykryto demonstracyjny kod ${code}.`)
    }
  }

  const confirmScan = () => {
    const code = scanner.detectedCode
    applyScannerCode(code)
    setScanner(null)
  }

  return (
    <PhoneFrame className={className}>
      <div
        inert={interactive ? undefined : true}
        aria-hidden={interactive ? undefined : true}
        className="relative h-[39rem] overflow-hidden bg-[#f4f7fc] text-[#161d2b] [font-family:'Segoe_UI','Trebuchet_MS','Noto_Sans',sans-serif]"
      >
        <div className="h-full overflow-y-auto overscroll-contain">
          {activeScreen === 'documents' ? (
            <DocumentsScreen
              onOpenDocument={openDocument}
              onOpenScanner={openScanner}
              announce={announce}
            />
          ) : activeScreen === 'serials' ? (
            <SerialsScreen
              document={selectedDocument}
              serialValues={visibleSerialValues}
              onBack={() => changeScreen('documents')}
              onNavigate={changeScreen}
              onOpenScanner={openScanner}
              onSave={() => emitAction('save')}
              onRefresh={() => emitAction('refresh')}
            />
          ) : (
            <PickingScreen
              document={selectedDocument}
              serialCount={visibleSerialValues.filter(Boolean).length}
              quantity={pickingQuantity}
              status={pickingStatus}
              note={visibleNote}
              onBack={() => changeScreen('documents')}
              onNavigate={changeScreen}
              onOpenScanner={openScanner}
              onPickingAction={handlePickingAction}
            />
          )}
        </div>

        {scanner ? (
          <ScannerOverlay
            scanner={scanner}
            scanCount={scannerCount}
            onSimulate={simulateScan}
            onConfirm={confirmScan}
            onClose={() => setScanner(null)}
            onRescan={() => setScanner((current) => ({ ...current, detectedCode: null }))}
          />
        ) : null}

        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{notice}</p>
      </div>
    </PhoneFrame>
  )
}

export default MobileAppMockup
