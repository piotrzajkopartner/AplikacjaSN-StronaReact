import React, { useState, useEffect, useRef } from "react"
import { cn } from "../../lib/utils"

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  className,
  ...props
}) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    // Nasłuchiwanie na obiekcie window pozwala śledzić kursor nawet gdy jest nad tekstami czy przyciskami
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
    </div>
  )
}
