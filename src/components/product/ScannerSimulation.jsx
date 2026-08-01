import { useState } from 'react'
import { Check, Focus, Maximize, RotateCcw, ScanLine } from 'lucide-react'
import { mobileDemoData } from '../../content/mobileDemoData.js'

const barcodeBars = [
  [2, 42],
  [1, 34],
  [3, 46],
  [1, 38],
  [2, 48],
  [4, 36],
  [1, 44],
  [3, 40],
  [2, 48],
  [1, 32],
  [4, 46],
  [2, 38],
  [1, 48],
  [3, 35],
  [2, 44],
  [4, 40],
  [1, 46],
  [2, 34],
  [3, 48],
  [1, 39],
  [4, 45],
  [2, 36],
  [1, 48],
  [3, 41],
]

function ToggleGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
        {options.map(({ id, label: optionLabel, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={value === id}
            className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo-600 motion-reduce:transition-none ${
              value === id
                ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
  )
}

function CssBarcode() {
  return (
    <div className="flex h-12 items-end justify-center gap-[2px]" aria-hidden="true">
      {barcodeBars.map(([width, height], index) => (
        <span
          key={`${width}-${height}-${index}`}
          className="bg-slate-950"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      ))}
    </div>
  )
}

function clampScanCount(value, requiredQuantity) {
  if (!Number.isFinite(Number(value))) return 0
  return Math.min(requiredQuantity, Math.max(0, Math.trunc(Number(value))))
}

function ScannerSimulation({ className = '', scanCount: controlledScanCount, onScanCountChange }) {
  const [mode, setMode] = useState('single')
  const [target, setTarget] = useState('narrow')
  const [internalScanCount, setInternalScanCount] = useState(0)
  const requiredQuantity = mobileDemoData.product.requiredQuantity
  const isScanCountControlled = controlledScanCount !== undefined
  const scanCount = clampScanCount(
    isScanCountControlled ? controlledScanCount : internalScanCount,
    requiredQuantity,
  )
  const isComplete = scanCount === requiredQuantity
  const detectedSerial =
    scanCount > 0 ? mobileDemoData.product.serialNumbers[scanCount - 1] : null
  const status = mobileDemoData.pickingStates[scanCount]

  const simulateScan = () => {
    const nextCount = clampScanCount(scanCount + 1, requiredQuantity)
    if (!isScanCountControlled) setInternalScanCount(nextCount)
    onScanCountChange?.(nextCount)
  }

  const resetSimulation = () => {
    if (!isScanCountControlled) setInternalScanCount(0)
    onScanCountChange?.(0)
  }

  const liveMessage =
    scanCount === 0
      ? 'Skaner gotowy. Zebrano 0 z 2 sztuk.'
      : scanCount === 1
        ? `Rozpoznano ${mobileDemoData.product.serialNumbers[0]}. Zebrano 1 z 2 sztuk. Status: Częściowo.`
        : `Rozpoznano ${mobileDemoData.product.serialNumbers[1]}. Zebrano 2 z 2 sztuk. Status: Zebrane.`

  return (
    <section
      aria-label="Interaktywna symulacja skanera kodów"
      className={`overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_65px_rgba(15,23,42,0.10)] ${className}`.trim()}
    >
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <div className="relative min-h-[28rem] overflow-hidden bg-slate-900 p-4 sm:p-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:32px_32px]"
          />
          <div className="relative flex items-center justify-between gap-3 text-white">
            <div>
              <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                Symulacja bez kamery
              </p>
              <p className="mt-1 text-sm font-black">
                {mode === 'single' ? 'Skan pojedynczy' : 'Skan seryjny'}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-extrabold tabular-nums">
              {scanCount} / {requiredQuantity}
            </span>
          </div>

          <div className="relative mx-auto mt-8 flex min-h-72 max-w-md items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 p-8 shadow-inner sm:p-12">
            <div className="w-full rotate-[-2deg] rounded-lg bg-stone-200 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.35)] motion-safe:transition-transform motion-safe:duration-300">
              <div className="rounded-md border border-stone-300 bg-stone-50 p-4 text-center">
                <p className="text-[0.5625rem] font-black uppercase tracking-[0.18em] text-slate-500">
                  Towar demonstracyjny
                </p>
                <p className="mt-1 truncate text-xs font-extrabold text-slate-800">
                  {mobileDemoData.product.name}
                </p>
                <div className="mt-3 rounded border border-slate-200 bg-white px-2 py-2">
                  <CssBarcode />
                  <p className="mt-1 font-mono text-[0.5625rem] font-bold tracking-[0.1em] text-slate-700">
                    {mobileDemoData.product.serialNumbers[Math.min(scanCount, 1)]}
                  </p>
                </div>
              </div>
            </div>

            {target === 'narrow' ? (
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 top-1/2 h-20 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 transition-colors duration-300 motion-reduce:transition-none ${
                  scanCount > 0
                    ? 'border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.30)]'
                    : 'border-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.28)]'
                }`}
              >
                <span
                  className={`absolute inset-x-2 top-1/2 h-px ${scanCount > 0 ? 'bg-emerald-300' : 'bg-rose-300'}`}
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-6 rounded-2xl border-2 transition-colors duration-300 motion-reduce:transition-none sm:inset-8 ${
                  scanCount > 0
                    ? 'border-emerald-400 shadow-[0_0_28px_rgba(52,211,153,0.30)]'
                    : 'border-indigo-400 shadow-[0_0_28px_rgba(129,140,248,0.30)]'
                }`}
              >
                <span
                  className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ${
                    scanCount > 0
                      ? 'bg-emerald-300 ring-emerald-300/25'
                      : 'bg-indigo-300 ring-indigo-300/25'
                  }`}
                />
              </div>
            )}

            {scanCount > 0 ? (
              <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg motion-safe:animate-pulse">
                <Check aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Kod rozpoznany</span>
              </span>
            ) : null}
          </div>

          <div className="relative mt-4 min-h-14 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-center">
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.13em] text-slate-400">
              {detectedSerial ? 'Ostatnio rozpoznano' : 'Oczekiwanie na kod'}
            </p>
            <p className="mt-1 truncate font-mono text-xs font-bold text-white">
              {detectedSerial ?? 'SN-DEMO-••••••••'}
            </p>
          </div>
        </div>

        <div className="flex flex-col p-4 sm:p-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-indigo-600">
              Sterowanie demonstracją
            </p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
              Skanowanie dopasowane do zadania
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Symulacja działa lokalnie i nie prosi o dostęp do aparatu urządzenia.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <ToggleGroup
              label="Tryb skanowania"
              value={mode}
              onChange={setMode}
              options={[
                { id: 'single', label: mobileDemoData.scanner.singleModeLabel, icon: ScanLine },
                { id: 'series', label: mobileDemoData.scanner.seriesModeLabel, icon: null },
              ]}
            />
            <ToggleGroup
              label="Obszar odczytu"
              value={target}
              onChange={setTarget}
              options={[
                { id: 'narrow', label: mobileDemoData.scanner.narrowTargetLabel, icon: Focus },
                { id: 'full', label: mobileDemoData.scanner.fullTargetLabel, icon: Maximize },
              ]}
            />
          </div>

          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={`mt-5 rounded-xl border p-3 ${
              scanCount === 0
                ? 'border-rose-200 bg-rose-50'
                : scanCount === 1
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-emerald-200 bg-emerald-50'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                  Zebrano
                </p>
                <p className="mt-0.5 text-lg font-black tabular-nums text-slate-950">
                  {scanCount} / {requiredQuantity} szt.
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${
                  scanCount === 0
                    ? 'bg-rose-100 text-rose-700'
                    : scanCount === 1
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {status.status}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{liveMessage}</p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
            <button
              type="button"
              onClick={simulateScan}
              disabled={isComplete}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 motion-reduce:transition-none"
            >
              <ScanLine aria-hidden="true" className="h-4 w-4" />
              {isComplete ? 'Kompletacja zakończona' : 'Symuluj skan'}
            </button>
            <button
              type="button"
              onClick={resetSimulation}
              disabled={scanCount === 0}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset
            </button>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            {mode === 'single'
              ? 'Każde kliknięcie odpowiada jednemu zatwierdzonemu odczytowi.'
              : 'Kolejne poprawne kody trafiają do następnych wolnych pozycji serii.'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ScannerSimulation
