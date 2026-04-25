"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "../../lib/utils"

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#e2e8f0", 
  gradientOpacity = 0.5,
}) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const handlePointerMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  const reset = useCallback(() => {
    const off = -gradientSize
    mouseX.set(off)
    mouseY.set(off)
  }, [mouseX, mouseY, gradientSize])

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <div className="bg-white absolute inset-px z-20 rounded-[inherit]" />

      <motion.div
        suppressHydrationWarning
        className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor},
              transparent 100%
            )
          `,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative z-40 h-full">{children}</div>
    </motion.div>
  )
}
