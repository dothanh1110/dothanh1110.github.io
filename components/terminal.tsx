"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Terminal() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fullText = `> Hello, I'm Đỗ Thành
> Born on 11/10/2007
> From Bắc Ninh, Vietnam
> I love finding bugs and exploring new technologies
> Check out my social links to connect with me!`

  const lines = fullText.split("\n")
  const textRef = useRef("")
  const lineIndexRef = useRef(0)
  const charIndexRef = useRef(0)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (!inView) {
      setText("")
      textRef.current = ""
      lineIndexRef.current = 0
      charIndexRef.current = 0
      return
    }

    const typeText = () => {
      if (lineIndexRef.current < lines.length) {
        const currentLine = lines[lineIndexRef.current]

        if (charIndexRef.current < currentLine.length) {
          textRef.current += currentLine[charIndexRef.current]
          setText(textRef.current)
          charIndexRef.current++
          setTimeout(typeText, Math.random() * 50 + 30)
        } else {
          textRef.current += "\n"
          setText(textRef.current)
          lineIndexRef.current++
          charIndexRef.current = 0
          setTimeout(typeText, 500)
        }
      }
    }

    setTimeout(typeText, 500)
  }, [inView, lines])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto my-8"
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-cyan-500/30 overflow-hidden">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-900 to-black border-b border-cyan-500/20">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto font-mono text-sm text-gray-400">terminal@dothanh1110</div>
        </div>
        <div className="p-4 font-mono text-sm md:text-base h-[180px]">
          <pre className="whitespace-pre-wrap text-gray-300">
            {text}
            <span
              className={`text-cyan-400 inline-block w-2.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            >
              ▋
            </span>
          </pre>
        </div>
      </div>
    </motion.div>
  )
}
