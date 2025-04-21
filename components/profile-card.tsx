"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion"
import {
  Youtube,
  Send,
  Github,
  Calendar,
  MapPin,
  Sparkles,
  Code,
  Zap,
  BookOpen,
  Facebook,
  Globe,
  Server,
  ExternalLink,
  MessageSquare,
} from "lucide-react"
import repositories from "@/data/repositories.json"
import TerminalText from "./terminal-text"
import GitHubUserStats from "./github-user-stats"
import RepositoryList from "./repository-list"

export default function ProfileCard() {
  const [activeTab, setActiveTab] = useState("profile")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [websiteStatus, setWebsiteStatus] = useState({
    blog: true, // true = online, false = offline
    dev: true,
  })

  // Smooth spring animation for parallax effect
  const springConfig = { stiffness: 100, damping: 30 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  // Transform mouse position into subtle card movement
  const rotateX = useTransform(mouseY, [0, 1], [2, -2])
  const rotateY = useTransform(mouseX, [0, 1], [-2, 2])

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate normalized position (-1 to 1)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2)
      const normalizedY = (e.clientY - centerY) / (rect.height / 2)

      setMousePosition({ x: normalizedX, y: normalizedY })
      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const tabs = [
    { id: "profile", label: "Profile", icon: <Zap className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <Code className="w-4 h-4" /> },
    { id: "repos", label: "Repos", icon: <BookOpen className="w-4 h-4" /> },
    { id: "connect", label: "Connect", icon: <Send className="w-4 h-4" /> },
  ]

  const socialLinks = [
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      url: "https://www.youtube.com/@thanhdo1110",
      description: "Tutorials and guides",
      color: "from-red-500/10 to-red-900/10",
      borderColor: "border-red-500/40",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      hoverColor: "rgba(239, 68, 68, 0.2)",
    },
    {
      name: "Discord",
      icon: <MessageSquare className="w-5 h-5" />,
      url: "https://discord.gg/r3vCRDX3Z",
      description: "Join my Discord server",
      color: "from-indigo-500/10 to-indigo-900/10",
      borderColor: "border-indigo-500/40",
      iconBg: "bg-indigo-500/20",
      iconColor: "text-indigo-400",
      hoverColor: "rgba(99, 102, 241, 0.2)",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "https://www.facebook.com/thanhdo1110.ctdo/",
      description: "Personal updates",
      color: "from-blue-500/10 to-blue-900/10",
      borderColor: "border-blue-500/40",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      hoverColor: "rgba(59, 130, 246, 0.2)",
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5" />,
      url: "https://t.me/dothanh1110",
      description: "Project updates",
      color: "from-blue-500/10 to-blue-900/10",
      borderColor: "border-blue-500/40",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      hoverColor: "rgba(59, 130, 246, 0.2)",
    },
    {
      name: "Telegram (CTDO)",
      icon: <Send className="w-5 h-5" />,
      url: "https://t.me/ctdotech",
      description: "Blog updates from ctdo.net",
      color: "from-cyan-500/10 to-cyan-900/10",
      borderColor: "border-cyan-500/40",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
      hoverColor: "rgba(6, 182, 212, 0.2)",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/thanhdo1110",
      description: "Code repositories",
      color: "from-purple-500/10 to-purple-900/10",
      borderColor: "border-purple-500/40",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      hoverColor: "rgba(168, 85, 247, 0.2)",
    },
  ]

  // Calculate total stars and forks from repositories
  const totalStars = repositories.reduce((sum, repo) => sum + (repo.stars || 0), 0)
  const totalForks = repositories.reduce((sum, repo) => sum + (repo.forks || 0), 0)

  // Find most popular repository
  const mostPopularRepo = [...repositories].sort((a, b) => (b.stars || 0) - (a.stars || 0))[0]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        rotateX: rotateX,
        rotateY: rotateY,
        transition: { duration: 0.8, ease: "easeOut" },
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="w-full max-w-4xl backdrop-blur-[3px] rounded-2xl border border-cyan-500/30 overflow-hidden shadow-xl shadow-cyan-500/10"
    >
      {/* Header with cosmic glow - fully transparent background */}
      <div className="relative p-6 md:p-8 border-b border-cyan-500/20 overflow-hidden">
        {/* Animated cosmic glow border */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
        </div>

        {/* Holographic overlay - completely transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/0 backdrop-blur-[1px] z-0"></div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="mb-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Increased line height and padding to ensure diacritical marks are visible */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 cosmic-glow leading-relaxed pt-2">
                  Đỗ Thành <span className="text-pink-500">#</span>1110
                </h1>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-blue-900/5 to-cyan-900/5 rounded-lg border border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/20 inline-block group hover:shadow-cyan-500/40 transition-all duration-500 hover:scale-105">
                <p className="font-mono text-gray-300 flex items-center">
                  <motion.span
                    animate={{
                      opacity: [1, 0.5, 1],
                      textShadow: [
                        "0 0 5px rgba(0, 255, 255, 0.5)",
                        "0 0 20px rgba(0, 255, 255, 0.8)",
                        "0 0 5px rgba(0, 255, 255, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    className="text-cyan-500 mr-2"
                  >
                    $
                  </motion.span>
                  <span>Bug Finder </span>
                  <span className="text-cyan-400 mx-2">|</span>
                  <span>App Cracker </span>
                  <span className="text-cyan-400 mx-2">|</span>
                  <span>Explorer</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Website status indicators */}
          <div className="flex flex-col space-y-2">
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              href="https://ctdo.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-cyan-500/30 hover:bg-black/30 transition-all duration-300"
            >
              <div
                className={`w-2 h-2 rounded-full ${websiteStatus.blog ? "bg-green-500" : "bg-red-500"} animate-pulse`}
              ></div>
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300 font-mono">ctdo.net</span>
              <span className="text-xs text-gray-500">Blog</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </motion.a>

            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              href="https://ctdo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/30 hover:bg-black/30 transition-all duration-300"
            >
              <div
                className={`w-2 h-2 rounded-full ${websiteStatus.dev ? "bg-green-500" : "bg-red-500"} animate-pulse`}
              ></div>
              <Server className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300 font-mono">ctdo.dev</span>
              <span className="text-xs text-gray-500">API</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Tabs with cosmic glow effect */}
      <div className="flex border-b border-cyan-500/20 relative overflow-hidden">
        {/* Animated highlight for active tab */}
        <motion.div
          className="absolute h-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-b-2 border-cyan-500"
          initial={false}
          animate={{
            left: `${(tabs.findIndex((t) => t.id === activeTab) / tabs.length) * 100}%`,
            width: `${100 / tabs.length}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2 relative z-10 ${
              activeTab === tab.id ? "text-cyan-400" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <motion.span
              animate={
                activeTab === tab.id
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                      textShadow: [
                        "0 0 5px rgba(0, 255, 255, 0.5)",
                        "0 0 10px rgba(0, 255, 255, 0.8)",
                        "0 0 5px rgba(0, 255, 255, 0.5)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: activeTab === tab.id ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
            >
              {tab.icon}
            </motion.span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content with smooth transitions */}
      <div className="p-6 md:p-8 backdrop-blur-[1px] bg-black/5" style={{ height: "auto", minHeight: "430px" }}>
        <div ref={contentRef} className="h-full">
          <AnimatePresence initial={false} mode="wait">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="terminal-container bg-[#1e1e1e]/30 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-500">
                    <div className="flex items-center px-4 py-2 bg-gradient-to-r from-[#2d2d2d]/40 to-[#1e1e1e]/40 border-b border-gray-700/20">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-[8px] text-red-800 opacity-0 group-hover:opacity-100 transition-opacity">
                            ×
                          </span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center">
                          <span className="text-[8px] text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity">
                            −
                          </span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                          <span className="text-[8px] text-green-800 opacity-0 group-hover:opacity-100 transition-opacity">
                            +
                          </span>
                        </div>
                      </div>
                      <span className="mx-auto font-mono text-sm text-gray-400 group-hover:text-cyan-400 transition-colors duration-500">
                        terminal
                      </span>
                    </div>
                    <div className="p-4 font-mono text-sm md:text-base bg-[#1e1e1e]/20 h-[180px]">
                      <div className="text-white">
                        <div className="flex items-center text-gray-400 mb-1">
                          <span className="text-green-400">dothanh1110</span>
                          <span className="mx-1">@</span>
                          <span className="text-purple-400">ctdoteam</span>
                          <span className="mx-1">~</span>
                          <span className="text-cyan-400">$</span>
                        </div>
                        <div className="h-[140px] overflow-hidden">
                          <TerminalText
                            text={`Hello, I'm Đỗ Thành
Born on 11/10/2007
From Bắc Ninh, Vietnam
I love finding bugs and exploring new technologies
Check out my social links to connect with me!`}
                            typingSpeed={30}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="bg-gradient-to-r from-black/10 to-black/5 backdrop-blur-sm border border-pink-500/30 rounded-xl p-4 hover:shadow-md hover:shadow-pink-500/10 transition-all duration-500"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(236, 72, 153, 0.3)",
                              "0 0 20px rgba(236, 72, 153, 0.6)",
                              "0 0 0px rgba(236, 72, 153, 0.3)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                          className="p-2 rounded-md bg-pink-500/20 text-pink-400"
                        >
                          <Calendar className="w-5 h-5" />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-medium text-white">Birth Date</h3>
                          <p className="text-gray-400 font-mono">11/10/2007</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="bg-gradient-to-r from-black/10 to-black/5 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-500"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(6, 182, 212, 0.3)",
                              "0 0 20px rgba(6, 182, 212, 0.6)",
                              "0 0 0px rgba(6, 182, 212, 0.3)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                          className="p-2 rounded-md bg-cyan-500/20 text-cyan-400"
                        >
                          <MapPin className="w-5 h-5" />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-medium text-white">Location</h3>
                          <p className="text-gray-400 font-mono">Bắc Ninh, Việt Nam</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-gradient-to-r from-black/10 to-black/5 backdrop-blur-sm border border-purple-500/30 rounded-xl p-5 hover:shadow-md hover:shadow-purple-500/10 transition-all duration-500"
                >
                  <div className="flex items-start space-x-3">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(147, 51, 234, 0.3)",
                          "0 0 20px rgba(147, 51, 234, 0.6)",
                          "0 0 0px rgba(147, 51, 234, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      className="p-2 rounded-md bg-purple-500/20 text-purple-400"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Interests & Skills</h3>
                      <div className="text-gray-300 space-y-3">
                        <p className="flex items-center">
                          <span className="text-cyan-500 mr-2">▸</span> Finding bugs and security issues
                        </p>
                        <p className="flex items-center">
                          <span className="text-pink-500 mr-2">▸</span> Exploring miscellaneous technologies
                        </p>
                        <p className="flex items-center">
                          <span className="text-purple-500 mr-2">▸</span> Sharing knowledge through tutorials
                        </p>
                        <p className="flex items-center">
                          <span className="text-cyan-500 mr-2">▸</span> Cracking and modifying applications
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/10 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-5 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-500"
                >
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-cyan-400" />
                    About Me
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    I'm a young tech enthusiast passionate about exploring the digital world. My journey involves
                    finding bugs, cracking applications, and sharing my findings with others. I believe in continuous
                    learning and pushing the boundaries of what's possible in the tech space.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Repositories Tab - No animations */}
            {activeTab === "repos" && (
              <div key="repos" className="space-y-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <Github className="w-5 h-5 mr-2 text-cyan-400" />
                    <h2 className="text-xl font-bold text-white">GitHub Stats</h2>
                  </div>

                  <a
                    href="https://github.com/thanhdo1110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center"
                  >
                    View Profile <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                {/* GitHub Stats Card */}
                <div className="bg-gradient-to-r from-[#141321] to-[#1c1b29] rounded-xl border border-purple-500/30 p-5 mb-6">
                  <GitHubUserStats username="thanhdo1110" />
                </div>

                {/* GitHub Repositories */}
                <div className="mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-pink-400" />
                  <h2 className="text-xl font-bold text-white">Latest Repositories</h2>
                </div>

                <RepositoryList username="thanhdo1110" />
              </div>
            )}

            {/* Connect Tab - Simplified animations */}
            {activeTab === "connect" && (
              <div key="connect" className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${link.color} backdrop-blur-sm ${link.borderColor} border rounded-xl p-4 hover:shadow-md transition-all duration-300 flex items-center space-x-3 group block overflow-hidden`}
                    style={{ transform: "translateZ(0)" }}
                  >
                    <div className={`p-2 rounded-md ${link.iconBg} ${link.iconColor}`}>{link.icon}</div>
                    <div>
                      <h3 className="text-lg font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{link.description}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
