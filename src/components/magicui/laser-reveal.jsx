import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LaserReveal({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const barcodeValue = '5901234123457'

  useEffect(() => {
    // Laser kończy skanowanie po 1.8 sekundy
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, 1800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden flex items-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 z-[200] flex items-center justify-center px-4"
          >
            <div className="w-full max-w-6xl text-center">
              <div
                className="mx-auto h-[34vh] min-h-[180px] w-full rounded-md border border-slate-300/70 bg-white/45 shadow-[0_0_60px_rgba(15,23,42,0.08)]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.35), rgba(255,255,255,0.35)), repeating-linear-gradient(90deg, #0f172a 0 2px, transparent 2px 4px, #0f172a 4px 5px, transparent 5px 7px, #0f172a 7px 11px, transparent 11px 13px, #0f172a 13px 14px, transparent 14px 16px)',
                }}
              />
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
