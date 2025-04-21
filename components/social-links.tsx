"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Youtube, Send, Github } from "lucide-react"

export default function SocialLinks() {
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

  const socialLinks = [
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      url: "https://www.youtube.com/@thanhdo1110",
      description: "Tutorials and guides",
      color: "bg-gradient-to-r from-black to-black/80",
      borderColor: "border-red-500/40",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5" />,
      url: "https://t.me/dothanh1110",
      description: "Project updates",
      color: "bg-gradient-to-r from-black to-black/80",
      borderColor: "border-blue-500/40",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      name: "Telegram (CTDO)",
      icon: <Send className="w-5 h-5" />,
      url: "https://t.me/ctdotech",
      description: "Blog updates from ctdo.net",
      color: "bg-gradient-to-r from-black to-black/80",
      borderColor: "border-cyan-500/40",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/thanhdo1110",
      description: "Code repositories",
      color: "bg-gradient-to-r from-black to-black/80",
      borderColor: "border-purple-500/40",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
  ]

  return (
    <section ref={ref} className="relative h-full flex flex-col justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full"
      >
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300">
            CONNECT WITH ME
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} backdrop-blur-sm ${link.borderColor} border rounded-lg p-4 hover:shadow-md transition-all duration-300 flex items-center space-x-3 group`}
            >
              <div className={`p-2 rounded-md ${link.iconBg} ${link.iconColor}`}>{link.icon}</div>
              <div>
                <h3 className="text-lg font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
                  {link.name}
                </h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
