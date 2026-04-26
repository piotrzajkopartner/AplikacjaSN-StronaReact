import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

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
    // Overlay znika zaraz po zejściu lasera
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, 1630)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden flex items-end"
        >
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 0.96 }}
            animate={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.96 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 z-[200] flex items-center justify-center px-4"
          >
            <div className="w-full max-w-6xl text-center">
              <div className="mx-auto w-full max-w-[1100px] rounded-xl border border-slate-300/80 bg-white/90 px-4 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:px-8 md:py-8">
                <svg viewBox="0 0 117 94" className="h-[26vh] min-h-[160px] w-full" preserveAspectRatio="none" aria-hidden="true">
                  <rect x="0" y="0" width="117" height="94" fill="#ffffff" />
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
              <p className="mt-3 text-[clamp(0.95rem,1.8vw,1.2rem)] font-semibold tracking-[0.28em] text-slate-700">
                {barcodeValue}
              </p>
            </div>
          </motion.div>

          {/* Laser beam idący w dół */}
          <motion.div
            initial={{ top: '-5%' }}
            animate={{ top: '105%' }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[2px] bg-red-500 shadow-[0_0_25px_5px_rgba(239,68,68,0.9)] z-[201]"
          />
          
          {/* Maska - nieskanowany jeszcze obszar na dole */}
          <motion.div
            initial={{ height: '100%' }}
            animate={{ height: '0%' }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="w-full bg-white/90 backdrop-blur-md backdrop-grayscale relative flex items-center justify-center overflow-hidden"
          >
            {/* Opcjonalny efekt "szumu" lub pasków przed zeskanowaniem */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
