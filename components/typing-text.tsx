"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  text: string
  className?: string
  typingSpeed?: number
  startDelay?: number
  cursorBlinking?: boolean
}

export default function TypingText({
  text,
  className = "",
  typingSpeed = 100,
  startDelay = 500,
  cursorBlinking = true,
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Start typing after delay
    timeout = setTimeout(() => {
      setIsTyping(true)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [startDelay])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const textLength = text.length

    const typingInterval = setInterval(() => {
      if (currentIndex < textLength) {
        setDisplayText(text.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [isTyping, text, typingSpeed])

  useEffect(() => {
    if (!cursorBlinking) return

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [cursorBlinking])

  // Use a display approach that properly handles newlines
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="whitespace-pre-wrap">{displayText}</span>
      {cursorVisible && (
        <span
          className="text-white opacity-80 absolute"
          style={{
            width: "1px",
            height: "1.2em",
            backgroundColor: "currentColor",
            display: "inline-block",
            marginLeft: "1px",
            animation: "none",
            top: "0.1em",
          }}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
