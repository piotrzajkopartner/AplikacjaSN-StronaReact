import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

const SCAN_DURATION = 1.9
const OVERLAY_DISMISS_MS = 1960

const EAN_LEFT_ODD = {
  0: '0001101',
  1: '0011001',
  2: '0010011',
  3: '0111101',
  4: '0100011',
  5: '0110001',
  6: '0101111',
  7: '0111011',
  8: '0110111',
  9: '0001011',
}

const EAN_LEFT_EVEN = {
  0: '0100111',
  1: '0110011',
  2: '0011011',
  3: '0100001',
  4: '0011101',
  5: '0111001',
  6: '0000101',
  7: '0010001',
  8: '0001001',
  9: '0010111',
}

const EAN_RIGHT = {
  0: '1110010',
  1: '1100110',
  2: '1101100',
  3: '1000010',
  4: '1011100',
  5: '1001110',
  6: '1010000',
  7: '1000100',
  8: '1001000',
  9: '1110100',
}

const EAN_PARITY = {
  0: 'OOOOOO',
  1: 'OOEOEE',
  2: 'OOEEOE',
  3: 'OOEEEO',
  4: 'OEOOEE',
  5: 'OEEOOE',
  6: 'OEEEOO',
  7: 'OEOEOE',
  8: 'OEOEEO',
  9: 'OEEOEO',
}

function getEan13CheckDigit(base12) {
  const digits = base12.split('').map(Number)
  const sum = digits.reduce((acc, digit, idx) => acc + digit * (idx % 2 === 0 ? 1 : 3), 0)
  return (10 - (sum % 10)) % 10
}

function generateRealisticEan13() {
  const companyPart = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0')
  const base12 = `590${companyPart}`
  return `${base12}${getEan13CheckDigit(base12)}`
}

function encodeEan13ToBits(code) {
  const first = Number(code[0])
  const parity = EAN_PARITY[first]

  let bits = '101'
  for (let i = 1; i <= 6; i += 1) {
    const digit = code[i]
    bits += parity[i - 1] === 'O' ? EAN_LEFT_ODD[digit] : EAN_LEFT_EVEN[digit]
  }
  bits += '01010'
  for (let i = 7; i <= 12; i += 1) {
    bits += EAN_RIGHT[code[i]]
  }
  bits += '101'
  return bits
}

function isGuardBar(index) {
  return index < 3 || (index >= 45 && index <= 49) || index >= 92
}

function buildBarcodeBars(bits) {
  const quietZone = 11
  return bits.split('').reduce((acc, bit, index) => {
    if (bit === '1') {
      acc.push({
        x: quietZone + index,
        height: isGuardBar(index) ? 72 : 64,
      })
    }
    return acc
  }, [])
}

export function LaserReveal({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const barcodeValue = useMemo(() => generateRealisticEan13(), [])
  const barcodeBits = useMemo(() => encodeEan13ToBits(barcodeValue), [barcodeValue])
  const barcodeBars = useMemo(() => buildBarcodeBars(barcodeBits), [barcodeBits])

  const firstDigit = barcodeValue[0]
  const leftDigits = barcodeValue.slice(1, 7)
  const rightDigits = barcodeValue.slice(7)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, OVERLAY_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden bg-slate-950"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,174,255,0.18),transparent_38%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.92)_45%,rgba(2,6,23,0.98))]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(255,255,255,0.2)_4px)]" />

          <motion.div
            initial={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            animate={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.98 }}
            transition={{ duration: SCAN_DURATION, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-[200] flex items-center justify-center px-4"
          >
            <div className="w-full max-w-6xl text-center">
              <div className="relative mx-auto w-full max-w-[1040px] overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-white/[0.06] p-3 shadow-[0_28px_110px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl md:p-5">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)]" />
                <div className="absolute left-7 right-7 top-7 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
                <div className="relative rounded-[1.35rem] border border-white/15 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(226,232,240,0.92))] px-4 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75),0_18px_50px_rgba(8,47,73,0.22)] md:px-10 md:py-7">
                  <div className="mb-4 flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                    <span>Partner SN</span>
                    <span className="text-cyan-700">Live scan</span>
                  </div>
                  <svg viewBox="0 0 117 94" className="h-[25vh] min-h-[150px] w-full drop-shadow-[0_10px_24px_rgba(15,23,42,0.16)]" preserveAspectRatio="none" aria-hidden="true">
                  <rect x="0" y="0" width="117" height="94" rx="3" fill="#f8fafc" />
                  <rect x="3" y="5" width="111" height="78" rx="2" fill="none" stroke="#cbd5e1" strokeWidth="0.35" strokeDasharray="1.3 1.6" />
                  {barcodeBars.map((bar, idx) => (
                    <rect key={`${bar.x}-${idx}`} x={bar.x} y={8} width="1" height={bar.height} fill="#020617" />
                  ))}

                  <text x="4" y="90" fontSize="7" fill="#0f172a" fontFamily="monospace" letterSpacing="0.25">
                    {firstDigit}
                  </text>
                  {leftDigits.split('').map((digit, idx) => (
                    <text
                      key={`l-${idx}`}
                      x={18 + idx * 7}
                      y={90}
                      fontSize="7"
                      fill="#0f172a"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {digit}
                    </text>
                  ))}
                  {rightDigits.split('').map((digit, idx) => (
                    <text
                      key={`r-${idx}`}
                      x={64 + idx * 7}
                      y={90}
                      fontSize="7"
                      fill="#0f172a"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {digit}
                    </text>
                  ))}
                </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: '-12vh' }}
            animate={{ y: '112vh' }}
            transition={{ duration: SCAN_DURATION, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-0 top-0 z-[202] w-full"
          >
            <div className="h-px w-full bg-cyan-100/90 shadow-[0_0_12px_2px_rgba(34,211,238,0.9),0_0_48px_12px_rgba(14,165,233,0.55)]" />
            <div className="mx-auto h-16 w-[min(84rem,96vw)] -translate-y-8 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.28),rgba(34,211,238,0.11)_35%,transparent_72%)] blur-xl" />
            <div className="mx-auto -mt-16 h-24 w-[min(74rem,90vw)] bg-[linear-gradient(180deg,rgba(125,211,252,0.18),transparent)] blur-sm" />
          </motion.div>

          <motion.div
            initial={{ height: '100%' }}
            animate={{ height: '0%' }}
            transition={{ duration: SCAN_DURATION, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 z-[201] w-full overflow-hidden bg-slate-950/72 backdrop-blur-md"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
