import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LaserReveal({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

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
