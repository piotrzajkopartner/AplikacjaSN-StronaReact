import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const MOCK_DATA = [
  'SN-8A9X-2B11',
  'WZ 402/10/2025',
  'MAC: 00:1A:2B:3C',
  'PZ 12/10/2025',
  'SN-99X-112B',
  'ID: 8841-A',
  'SN-772-XX1',
  'WZ 403/10/2025',
  'REV: B2.1',
  'SN-001-BETA',
  'DOC-2025-99',
  'MAC: FF:EE:DD:CC',
  'PZ 13/10/2025',
  'SN-B22-881',
  'SN-A1B2-C3D4',
  'WZ 405/10/2025',
  'MAC: 11:22:33:44',
  'ID: 9002-X'
]

// Duplikujemy dane aby animacja mogła płynnie kręcić się w nieskończoność
const TICKER_ITEMS = [...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA]

export function SNTicker({ className, direction = 'up', speed = 50 }) {
  return (
    <div className={cn("flex flex-col overflow-hidden select-none pointer-events-none opacity-50", className)} aria-hidden="true">
      <motion.div
        animate={{
          y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex flex-col gap-6 whitespace-nowrap"
      >
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} className="text-base sm:text-lg font-mono font-bold text-slate-200 tracking-widest uppercase">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
