"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className="relative inline-block">
        <motion.span
          className={`inline-block ${
            isGlitching ? "opacity-100" : "opacity-0"
          } absolute top-0 left-0 text-pink-500 mix-blend-screen`}
          animate={
            isGlitching
              ? {
                  x: [0, -5, 5, -2, 0],
                  opacity: [0, 1, 0.5, 1, 0],
                }
              : {}
          }
          transition={{ duration: 0.2 }}
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
        >
          {text}
        </motion.span>
        <motion.span
          className={`inline-block ${
            isGlitching ? "opacity-100" : "opacity-0"
          } absolute top-0 left-0 text-cyan-500 mix-blend-screen`}
          animate={
            isGlitching
              ? {
                  x: [0, 5, -5, 2, 0],
                  opacity: [0, 1, 0.5, 1, 0],
                }
              : {}
          }
          transition={{ duration: 0.2 }}
          style={{ clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)" }}
        >
          {text}
        </motion.span>
        <span className={`inline-block relative ${isGlitching ? "text-transparent" : ""}`}>{text}</span>
      </div>
    </div>
  )
}
