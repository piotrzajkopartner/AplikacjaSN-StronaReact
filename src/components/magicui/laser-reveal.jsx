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

export function LaserReveal({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const barcodeValue = useMemo(() => generateRealisticEan13(), [])
  const barcodeBits = useMemo(() => encodeEan13ToBits(barcodeValue), [barcodeValue])

  useEffect(() => {
    // Laser kończy skanowanie po 1.6 sekundy, barcode zanika chwilę po nim
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, 1740)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden flex items-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.99, 1, 1, 1], y: [10, 0, 0, -6] }}
            transition={{ duration: 1.74, ease: 'easeInOut', times: [0, 0.14, 0.92, 1] }}
            className="absolute inset-0 z-[200] flex items-center justify-center px-4"
          >
            <div className="w-full max-w-6xl text-center">
              <div className="mx-auto flex h-[34vh] min-h-[180px] w-full items-end justify-center gap-0.5 rounded-md border border-slate-300/70 bg-white/45 px-[6vw] pb-[11%] pt-[8%] shadow-[0_0_60px_rgba(15,23,42,0.08)]">
                {barcodeBits.split('').map((bit, index) => (
                  <span
                    key={`${bit}-${index}`}
                    className={bit === '1' ? 'bg-slate-900' : 'bg-transparent'}
                    style={{
                      width: 'min(0.42vw, 5px)',
                      height: isGuardBar(index) ? '100%' : '85%',
                      display: 'inline-block',
                    }}
                  />
                ))}
              </div>
              <p className="mt-4 text-[clamp(1rem,2.2vw,1.5rem)] font-semibold tracking-[0.35em] text-slate-700">
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
