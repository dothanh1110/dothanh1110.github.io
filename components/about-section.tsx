"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Sparkles } from "lucide-react"

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <section ref={ref} className="relative h-full flex flex-col justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full"
      >
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300">ABOUT ME</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-4">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black to-black/80 backdrop-blur-sm border border-cyan-500/40 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-md bg-cyan-500/20 text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Birth Date</h3>
                <p className="text-gray-400 font-mono">
                  <span className="text-pink-500">{">"}</span> 11/10/2007
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black to-black/80 backdrop-blur-sm border border-pink-500/40 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-md bg-pink-500/20 text-pink-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                <p className="text-gray-400 font-mono">
                  <span className="text-cyan-500">{">"}</span> Bắc Ninh, Việt Nam
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black to-black/80 backdrop-blur-sm border border-purple-500/40 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-md bg-purple-500/20 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Interests</h3>
                <div className="text-gray-400 font-mono space-y-1">
                  <p>
                    <span className="text-cyan-500">{">"}</span> Bug hunting and discovering tricks
                  </p>
                  <p>
                    <span className="text-pink-500">{">"}</span> Exploring miscellaneous technologies
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
