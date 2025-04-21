"use client"
import GlitchText from "./glitch-text"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <div className="mb-4">
          <GlitchText text="@dothanh1110" className="text-5xl md:text-7xl font-bold tracking-tighter" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-cyan-400 text-xl md:text-2xl font-mono mb-8"
        >
          <span className="inline-block">
            Đỗ Thành <span className="text-pink-500">#</span>1110
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="px-6 py-3 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/20">
            <p className="font-mono text-gray-300">
              <span className="text-pink-500">$</span> Bug hunter <span className="text-cyan-400">|</span> Developer{" "}
              <span className="text-cyan-400">|</span> Explorer
            </p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
      >
        <div className="animate-bounce text-cyan-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
