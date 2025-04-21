"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = Math.min(120, window.innerWidth / 12) // More particles
    const maxDistance = 180 // Increased connection distance

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      pulseDirection: boolean
      pulseSpeed: number
      originalSize: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalSize = Math.random() * 2 + 0.8
        this.size = this.originalSize
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.pulseDirection = Math.random() > 0.5
        this.pulseSpeed = Math.random() * 0.02 + 0.01

        // Enhanced cyberpunk colors
        const colors = [
          "rgba(0, 255, 255, 0.6)", // Cyan
          "rgba(255, 0, 255, 0.6)", // Magenta
          "rgba(0, 255, 170, 0.6)", // Neon green
          "rgba(255, 0, 128, 0.6)", // Neon pink
          "rgba(128, 0, 255, 0.6)", // Purple
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Pulse size effect
        if (this.pulseDirection) {
          this.size += this.pulseSpeed
          if (this.size > this.originalSize * 1.5) {
            this.pulseDirection = false
          }
        } else {
          this.size -= this.pulseSpeed
          if (this.size < this.originalSize * 0.5) {
            this.pulseDirection = true
          }
        }

        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            const gradient = ctx!.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)

            gradient.addColorStop(0, particles[i].color.replace(/[^,]+(?=\))/, `${opacity * 0.6}`))
            gradient.addColorStop(1, particles[j].color.replace(/[^,]+(?=\))/, `${opacity * 0.6}`))

            ctx!.strokeStyle = gradient
            ctx!.lineWidth = Math.min(particles[i].size, particles[j].size) * 0.3
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      connectParticles()
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-40" />
}
