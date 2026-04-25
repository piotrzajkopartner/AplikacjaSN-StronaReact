import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

const TERMINAL_LOGS = [
  { text: "Inicjalizacja modułu Poka-Yoke...", type: "system" },
  { text: "Nawiązywanie połączenia z Subiekt nexo PRO: OK", type: "system" },
  { text: "Pobieranie definicji dokumentów: WZ, PZ...", type: "system" },
  { text: "Skanowanie: SN-8A9X-2B11", type: "scan" },
  { text: "Walidacja w bazie danych... OK", type: "success" },
  { text: "Przypisano do: WZ 402/10/2025", type: "success" },
  { text: "Skanowanie: SN-99X-112B", type: "scan" },
  { text: "BŁĄD: Duplikat SN w systemie! Blokada operacji.", type: "error" },
  { text: "Oczekuję na interwencję operatora...", type: "warning" },
  { text: "Skanowanie zastępcze: SN-001-BETA", type: "scan" },
  { text: "Walidacja w bazie danych... OK", type: "success" },
  { text: "Przypisano do: WZ 402/10/2025", type: "success" },
  { text: "Skanowanie MAC: 00:1A:2B:3C", type: "scan" },
  { text: "Synchronizacja bazy zakończona pomyślnie.", type: "system" }
]

export function LiveTerminal({ className }) {
  const [logs, setLogs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    if (currentIndex >= TERMINAL_LOGS.length) {
      const timer = setTimeout(() => {
        setLogs([])
        setCurrentIndex(0)
      }, 5000)
      return () => clearTimeout(timer)
    }

    const currentLog = TERMINAL_LOGS[currentIndex]
    
    // Różne opóźnienia symulujące prawdziwy proces
    let delay = 600
    if (currentLog.type === 'scan') delay = 400
    if (currentLog.type === 'success') delay = 300
    if (currentLog.type === 'error') delay = 1200
    if (currentLog.type === 'system') delay = 500
    if (currentLog.type === 'warning') delay = 2000

    const timer = setTimeout(() => {
      setLogs(prev => [...prev, currentLog])
      setCurrentIndex(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className={cn("flex flex-col w-full h-[380px] rounded-2xl border border-slate-700/50 bg-[#0d1117] shadow-2xl shadow-[#00aeff]/20 overflow-hidden font-mono text-sm", className)}>
      {/* Mac OS Style Window Header */}
      <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-[#161b22]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-red-500/80 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-yellow-500/80 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-green-500/80 transition-colors" />
        </div>
        <div className="ml-4 text-xs text-slate-500 flex-1 text-center font-semibold tracking-wider opacity-70">
          partner-net@nexo-pro:~
        </div>
        <div className="w-12" /> {/* Spacer for centering */}
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="flex-1 p-5 overflow-y-auto scroll-smooth hide-scrollbar relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <AnimatePresence initial={false}>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "mb-2.5 flex leading-relaxed",
                log.type === 'system' && "text-slate-400",
                log.type === 'scan' && "text-[#00aeff] font-semibold",
                log.type === 'success' && "text-emerald-400",
                log.type === 'error' && "text-red-400 font-bold",
                log.type === 'warning' && "text-amber-400 italic"
              )}
            >
              <span className="mr-3 text-slate-600 select-none">{`>`}</span>
              <span className="tracking-wide">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Blinking Cursor */}
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2.5 h-4 bg-slate-400 ml-6 mt-1 rounded-sm"
        />
      </div>
    </div>
  )
}
