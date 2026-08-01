import { useState } from 'react'
import {
  ArrowLeft,
  Box,
  Check,
  ChevronRight,
  FileText,
  Hash,
  MessageSquareText,
  RotateCcw,
  ScanLine,
  TriangleAlert,
} from 'lucide-react'
import { mobileDemoData } from '../../content/mobileDemoData.js'
import PhoneFrame from './PhoneFrame.jsx'

const validScreens = new Set(['documents', 'serials', 'picking'])

const documentStatusClasses = {
  'Do uzupełnienia': 'border-rose-200 bg-rose-50 text-rose-700',
  'W trakcie': 'border-amber-200 bg-amber-50 text-amber-700',
  Uzupełnione: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

const pickingStatusClasses = [
  'border-rose-200 bg-rose-50 text-rose-700',
  'border-amber-200 bg-amber-50 text-amber-700',
  'border-emerald-200 bg-emerald-50 text-emerald-700',
]

function clampPickingStep(value) {
  if (!Number.isFinite(Number(value))) return 0
  return Math.min(2, Math.max(0, Math.trunc(Number(value))))
}

function AppHeader({ title, onBack }) {
  return (
    <header className="flex min-h-14 items-center gap-3 bg-[#263b82] px-4 py-3 text-white shadow-sm">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="-ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
          aria-label="Wróć do listy dokumentów"
        >
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </button>
      ) : (
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-black ring-1 ring-white/15">
          SN
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold tracking-tight">{title}</p>
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-indigo-100">
          Tryb demonstracyjny
        </p>
      </div>
    </header>
  )
}

function DocumentsScreen({ onOpenDocument }) {
  return (
    <>
      <AppHeader title="Dokumenty" />
      <div className="space-y-3 p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.15em] text-indigo-600">
              Do uzupełnienia
            </p>
            <h2 className="mt-0.5 text-base font-black tracking-tight text-slate-900">
              Dokumenty magazynowe
            </h2>
          </div>
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-extrabold text-indigo-700">
            {mobileDemoData.documents.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {mobileDemoData.documents.map((document) => {
            const percentage = Math.round((document.progress / document.required) * 100)
            const isPrimaryDocument = document.id === mobileDemoData.document.id
            const cardContent = (
              <span className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <FileText aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-slate-900">
                        {document.number}
                      </span>
                      <span className="mt-0.5 block truncate text-xs font-medium text-slate-500">
                        {document.company}
                      </span>
                    </span>
                    {isPrimaryDocument ? (
                      <ChevronRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                    ) : null}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[0.625rem] font-extrabold ${documentStatusClasses[document.status]}`}
                    >
                      {document.status}
                    </span>
                    <span className="text-[0.6875rem] font-bold tabular-nums text-slate-600">
                      {document.progress} / {document.required} SN
                    </span>
                  </span>
                  <span
                    role="progressbar"
                    aria-label={`Postęp dokumentu ${document.number}`}
                    aria-valuemin={0}
                    aria-valuemax={document.required}
                    aria-valuenow={document.progress}
                    className="mt-2 block h-1.5 overflow-hidden rounded-full bg-slate-100"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-full rounded-full bg-indigo-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </span>
                </span>
              </span>
            )

            return isPrimaryDocument ? (
              <button
                key={document.id}
                type="button"
                onClick={onOpenDocument}
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-indigo-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transition-none"
                aria-label={`Otwórz dokument ${document.number}`}
              >
                {cardContent}
              </button>
            ) : (
              <article
                key={document.id}
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm"
              >
                {cardContent}
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}

function DocumentNavigation({ activeScreen, onChange }) {
  return (
    <nav aria-label="Widok dokumentu" className="grid grid-cols-2 border-b border-slate-200 bg-white p-1.5">
      {[
        { id: 'serials', label: 'Numery SN', icon: Hash },
        { id: 'picking', label: 'Kompletacja', icon: Box },
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={activeScreen === id}
          className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl px-2 text-xs font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo-600 motion-reduce:transition-none ${
            activeScreen === id
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
          }`}
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
          {label}
        </button>
      ))}
    </nav>
  )
}

function DocumentSummary() {
  return (
    <div className="border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-slate-900">{mobileDemoData.document.number}</p>
          <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
            {mobileDemoData.company.name}
          </p>
        </div>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[0.625rem] font-extrabold text-slate-600">
          {mobileDemoData.document.date}
        </span>
      </div>
    </div>
  )
}

function SerialsScreen({ serialStep, onBack, onNavigate, onAction }) {
  return (
    <>
      <AppHeader title="Szczegóły dokumentu" onBack={onBack} />
      <DocumentSummary />
      <DocumentNavigation activeScreen="serials" onChange={onNavigate} />
      <div className="space-y-3 p-3.5">
        <article className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
              <Box aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.12em] text-indigo-600">
                {mobileDemoData.product.symbol}
              </p>
              <h2 className="mt-0.5 text-sm font-black leading-snug text-slate-900">
                {mobileDemoData.product.name}
              </h2>
            </div>
          </div>

          <div className="mt-4 space-y-2" aria-label="Wprowadzone numery seryjne">
            {mobileDemoData.product.serialNumbers.map((serialNumber, index) => {
              const isEntered = index < serialStep

              return (
                <div
                  key={serialNumber}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
                    isEntered
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-dashed border-slate-300 bg-slate-50'
                  }`}
                >
                  <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    isEntered ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-slate-400'
                  }`}>
                    {isEntered ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span className={`min-w-0 flex-1 truncate text-[0.6875rem] font-bold ${
                    isEntered ? 'font-mono text-emerald-800' : 'text-slate-500'
                  }`}>
                    {isEntered ? serialNumber : 'Puste pole SN'}
                  </span>
                  <span className={`text-[0.625rem] font-black ${
                    isEntered ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {index + 1}/2
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
            <span className="text-xs font-bold text-slate-600">Numery SN</span>
            <strong className={`text-sm font-black tabular-nums ${
              serialStep === mobileDemoData.product.requiredQuantity
                ? 'text-emerald-700'
                : 'text-slate-700'
            }`}>
              {serialStep} / {mobileDemoData.product.requiredQuantity}
            </strong>
          </div>
        </article>

        <button
          type="button"
          onClick={() => onAction('scan-series')}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 motion-reduce:transition-none"
        >
          <ScanLine aria-hidden="true" className="h-4 w-4" />
          Skanuj serię
        </button>
      </div>
    </>
  )
}

function PickingScreen({ pickingStep, activeAction, onBack, onNavigate, onAction }) {
  const state = mobileDemoData.pickingStates[pickingStep]
  const serialCount = Math.min(pickingStep, mobileDemoData.product.serialNumbers.length)

  return (
    <>
      <AppHeader title="Szczegóły dokumentu" onBack={onBack} />
      <DocumentSummary />
      <DocumentNavigation activeScreen="picking" onChange={onNavigate} />
      <div className="space-y-3 p-3.5">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.12em] text-indigo-600">
                  {mobileDemoData.product.symbol}
                </p>
                <h2 className="mt-0.5 text-sm font-black leading-snug text-slate-900">
                  {mobileDemoData.product.name}
                </h2>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2 py-1 text-[0.625rem] font-extrabold ${pickingStatusClasses[pickingStep]}`}
              >
                {state.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[0.625rem] font-extrabold uppercase tracking-wide text-slate-500">
                  Zebrano
                </p>
                <p className="mt-1 text-lg font-black tabular-nums text-slate-900">
                  {state.pickedQuantity} / {mobileDemoData.product.requiredQuantity}
                </p>
                <p className="text-[0.625rem] font-semibold text-slate-500">szt.</p>
              </div>
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                <p className="text-[0.625rem] font-extrabold uppercase tracking-wide text-indigo-600">
                  Numery SN
                </p>
                <p className="mt-1 text-lg font-black tabular-nums text-indigo-900">
                  {serialCount} / {mobileDemoData.product.requiredQuantity}
                </p>
                <p className="text-[0.625rem] font-semibold text-indigo-600">uzupełnione</p>
              </div>
            </div>

            <div
              role="progressbar"
              aria-label="Postęp kompletacji pozycji"
              aria-valuemin={0}
              aria-valuemax={mobileDemoData.product.requiredQuantity}
              aria-valuenow={state.pickedQuantity}
              className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
            >
              <div
                aria-hidden="true"
                className={`h-full rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                  pickingStep === 0
                    ? 'bg-rose-500'
                    : pickingStep === 1
                      ? 'bg-amber-500'
                      : 'bg-emerald-600'
                }`}
                style={{ width: `${(state.pickedQuantity / mobileDemoData.product.requiredQuantity) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-600">{state.message}</p>
          </div>

          <div className="grid grid-cols-3 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => onAction('missing')}
              aria-pressed={activeAction === 'missing'}
              className={`inline-flex min-h-12 items-center justify-center gap-1 border-r border-slate-200 px-1 text-[0.6875rem] font-extrabold text-rose-700 transition-colors hover:bg-rose-50 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 motion-reduce:transition-none ${
                activeAction === 'missing' ? 'bg-rose-100 ring-2 ring-inset ring-rose-300' : ''
              }`}
            >
              <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5" />
              Brak
            </button>
            <button
              type="button"
              onClick={() => onAction('note')}
              aria-pressed={activeAction === 'note'}
              className={`inline-flex min-h-12 items-center justify-center gap-1 border-r border-slate-200 px-1 text-[0.6875rem] font-extrabold text-amber-700 transition-colors hover:bg-amber-50 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 motion-reduce:transition-none ${
                activeAction === 'note' ? 'bg-amber-100 ring-2 ring-inset ring-amber-300' : ''
              }`}
            >
              <MessageSquareText aria-hidden="true" className="h-3.5 w-3.5" />
              Notatka
            </button>
            <button
              type="button"
              onClick={() => onAction('reset')}
              className="inline-flex min-h-12 items-center justify-center gap-1 px-1 text-[0.6875rem] font-extrabold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 motion-reduce:transition-none"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </article>

        <button
          type="button"
          onClick={() => onAction('scan-item')}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 motion-reduce:transition-none"
        >
          <ScanLine aria-hidden="true" className="h-4 w-4" />
          Skanuj pozycję
        </button>
      </div>
    </>
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
  const [internalPickingStep, setInternalPickingStep] = useState(0)
  const [internalSerialStep, setInternalSerialStep] = useState(0)
  const [internalActiveAction, setInternalActiveAction] = useState(null)
  const [notice, setNotice] = useState('')
  const isScreenControlled = screen !== undefined
  const isPickingControlled = pickingStep !== undefined
  const isSerialControlled = serialStep !== undefined
  const isActiveActionControlled = activeAction !== undefined
  const activeScreen = isScreenControlled && validScreens.has(screen) ? screen : internalScreen
  const activePickingStep = clampPickingStep(
    isPickingControlled ? pickingStep : internalPickingStep,
  )
  const activeSerialStep = clampPickingStep(isSerialControlled ? serialStep : internalSerialStep)
  const visibleActiveAction = isActiveActionControlled ? activeAction : internalActiveAction

  const changeScreen = (nextScreen) => {
    if (!validScreens.has(nextScreen)) return
    if (!isScreenControlled) setInternalScreen(nextScreen)
    onScreenChange?.(nextScreen)
  }

  const handleAction = (action) => {
    if (action === 'reset') {
      if (!isPickingControlled) setInternalPickingStep(0)
      if (!isSerialControlled) setInternalSerialStep(0)
      if (!isActiveActionControlled) setInternalActiveAction(null)
      setNotice('Zresetowano demonstracyjny postęp pozycji.')
    } else if (action === 'missing') {
      if (!isActiveActionControlled) setInternalActiveAction('missing')
      setNotice('Zasymulowano demonstracyjny brak towaru.')
    } else if (action === 'note') {
      if (!isActiveActionControlled) setInternalActiveAction('note')
      setNotice('Zasymulowano demonstracyjną notatkę do pozycji.')
    } else if (action === 'scan-item') {
      if (!isPickingControlled) {
        setInternalPickingStep((currentStep) => Math.min(2, currentStep + 1))
      }
      if (!isActiveActionControlled) setInternalActiveAction(null)
      setNotice('Zasymulowano skan pozycji.')
    } else {
      if (!isSerialControlled) {
        setInternalSerialStep((currentStep) => Math.min(2, currentStep + 1))
      }
      setNotice('Zasymulowano skanowanie seryjne.')
    }
    onAction?.(action)
  }

  return (
    <PhoneFrame className={className}>
      <div
        inert={interactive ? undefined : ''}
        aria-hidden={interactive ? undefined : true}
        className="min-h-[36rem] bg-[#f4f6fa] text-slate-800"
      >
        {activeScreen === 'documents' ? (
          <DocumentsScreen onOpenDocument={() => changeScreen('serials')} />
        ) : activeScreen === 'serials' ? (
          <SerialsScreen
            serialStep={activeSerialStep}
            onBack={() => changeScreen('documents')}
            onNavigate={changeScreen}
            onAction={handleAction}
          />
        ) : (
          <PickingScreen
            pickingStep={activePickingStep}
            activeAction={visibleActiveAction}
            onBack={() => changeScreen('documents')}
            onNavigate={changeScreen}
            onAction={handleAction}
          />
        )}
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {notice}
        </p>
      </div>
    </PhoneFrame>
  )
}

export default MobileAppMockup
