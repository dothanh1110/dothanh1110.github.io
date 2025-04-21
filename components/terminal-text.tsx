"use client"

import { useState, useEffect, useRef } from "react"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
}

export default function TerminalText({ text, typingSpeed = 50 }: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const hasTyped = useRef(false)

  // Handle cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Handle typing animation
  useEffect(() => {
    if (hasTyped.current) return

    let currentIndex = 0
    const textLength = text.length

    const typingInterval = setInterval(() => {
      if (currentIndex < textLength) {
        setDisplayText(text.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        hasTyped.current = true
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [text, typingSpeed])

  // Split text by newlines to render properly
  const lines = displayText.split("\n")

  return (
    <div className="whitespace-pre-wrap">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span>{line}</span>
          {isTyping && i === lines.length - 1 && cursorVisible && (
            <span className="inline-block bg-white w-[1px] h-[1.2em] ml-[1px] animate-pulse" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}
