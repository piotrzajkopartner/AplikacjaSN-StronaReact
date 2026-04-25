import React, { useState, useEffect, useRef } from "react"
import { cn } from "../../lib/utils"

const TICKER_ITEMS = [
  'SN-8A9X-2B11', 'WZ 402/10/2025', 'MAC: 00:1A:2B:3C',
  'PZ 12/10/2025', 'SN-99X-112B', 'ID: 8841-A',
  'SN-772-XX1', 'WZ 403/10/2025', 'REV: B2.1',
  'SN-001-BETA', 'DOC-2025-99', 'MAC: FF:EE:DD:CC'
]

function generateRandomGarbage() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  className,
  ...props
}) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isScanning, setIsScanning] = useState(false)
  const [scannedValue, setScannedValue] = useState(TICKER_ITEMS[0])
  const [displayValue, setDisplayValue] = useState('')
  const containerRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      
      setIsScanning(true)
      window.dispatchEvent(new CustomEvent('sn-scanned', { detail: null }))

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      
      timeoutRef.current = setTimeout(() => {
        setIsScanning(false)
        const found = TICKER_ITEMS[Math.floor(Math.random() * TICKER_ITEMS.length)]
        setScannedValue(found)
        window.dispatchEvent(new CustomEvent('sn-scanned', { detail: found }))
      }, 150)
    }

    // Nasłuchiwanie na obiekcie window pozwala śledzić kursor nawet gdy jest nad tekstami czy przyciskami
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Efekt migania "garbarge data" podczas ruchu
  useEffect(() => {
    let interval;
    if (isScanning) {
      interval = setInterval(() => {
        setDisplayValue(generateRandomGarbage())
      }, 50)
    } else {
      setDisplayValue(scannedValue)
    }
    return () => clearInterval(interval)
  }, [isScanning, scannedValue])

  return (
    <div ref={containerRef} className={cn("absolute inset-0 h-full w-full overflow-hidden pointer-events-none", className)} {...props}>
      {/* Bazowa, delikatna siatka */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-50">
        <defs>
          <pattern id="grid-pattern-base" width={width} height={height} patternUnits="userSpaceOnUse">
            <rect width={width} height={height} className="fill-transparent stroke-slate-300" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-base)" />
      </svg>

      {/* Skaner (aktywna podświetlona siatka ujawniana przez maskę) */}
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          maskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`
        }}
      >
        <defs>
          <pattern id="grid-pattern-highlight" width={width} height={height} patternUnits="userSpaceOnUse">
            {/* Czerwony stroke symulujący wiązkę lasera siatkowego */}
            <rect width={width} height={height} className="fill-red-500/5 stroke-red-500/80 stroke-[1.5px]" />
            {/* Dodatkowy celownik (kropka) w środku każdego kwadratu */}
            <circle cx={width/2} cy={height/2} r="1.5" className="fill-red-500/80" />
            <path d={`M ${width/2 - 4} ${height/2} L ${width/2 + 4} ${height/2}`} className="stroke-red-500/60 stroke-[1px]" />
            <path d={`M ${width/2} ${height/2 - 4} L ${width/2} ${height/2 + 4}`} className="stroke-red-500/60 stroke-[1px]" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-highlight)" />
      </svg>
      
      {/* Plamka lasera dokładne pod kursorem */}
      <div 
        className="absolute rounded-full bg-red-500 shadow-[0_0_20px_6px_rgba(239,68,68,0.8)] pointer-events-none"
        style={{
          width: '6px',
          height: '6px',
          left: mousePos.x - 3,
          top: mousePos.y - 3,
          transition: 'opacity 0.2s',
          opacity: mousePos.x > 0 ? 1 : 0
        }}
      />

      {/* HUD Skanera (Head-Up Display) podążający za kursorem */}
      {mousePos.x > 0 && (
        <div 
          className="absolute z-50 pointer-events-none transition-all duration-75 ease-out"
          style={{
            left: mousePos.x + 24,
            top: mousePos.y + 24,
          }}
        >
          <div className={cn(
            "flex flex-col border p-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md shadow-2xl font-mono text-[11px] w-56 transition-colors duration-300",
            isScanning ? "border-red-500/50 text-red-400" : "border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          )}>
            <div className="flex justify-between items-center mb-1.5 border-b border-white/10 pb-1">
              <span className="opacity-80 font-semibold tracking-wider">
                {isScanning ? '[ SZUKANIE SN... ]' : '[ DOPASOWANO ]'}
              </span>
              <div className={cn("w-1.5 h-1.5 rounded-full", isScanning ? "bg-red-500 animate-pulse" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]")} />
            </div>
            <div className={cn(
              "text-base font-bold tracking-widest",
              isScanning ? "text-slate-300" : "text-white"
            )}>
              {displayValue}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
