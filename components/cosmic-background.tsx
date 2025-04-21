"use client"

import { useEffect, useRef } from "react"

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen with high DPI support
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Stars
    class Star {
      x: number
      y: number
      size: number
      color: string
      speed: number
      opacity: number
      opacityDirection: boolean
      twinkleSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speed = Math.random() * 0.05 + 0.01
        this.opacity = Math.random() * 0.8 + 0.2
        this.opacityDirection = Math.random() > 0.5
        this.twinkleSpeed = Math.random() * 0.01 + 0.005

        // Star colors
        const colors = [
          "#ffffff", // White
          "#fffacd", // Lemon chiffon
          "#e6e6fa", // Lavender
          "#b0e0e6", // Powder blue
          "#00ffff", // Cyan
          "#ff00ff", // Magenta
          "#ff69b4", // Hot pink
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Gentle pulsing opacity
        if (this.opacityDirection) {
          this.opacity += this.twinkleSpeed
          if (this.opacity >= 1) this.opacityDirection = false
        } else {
          this.opacity -= this.twinkleSpeed
          if (this.opacity <= 0.2) this.opacityDirection = true
        }

        // Slow vertical movement
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = 0
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx!.globalAlpha = this.opacity
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()

        // Add glow effect for larger stars
        if (this.size > 1.2) {
          ctx!.shadowBlur = 15
          ctx!.shadowColor = this.color
          ctx!.beginPath()
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx!.fill()
          ctx!.shadowBlur = 0
        }

        ctx!.globalAlpha = 1
      }
    }

    // Planets
    class Planet {
      x: number
      y: number
      radius: number
      color: string
      orbitRadius: number
      orbitSpeed: number
      orbitAngle: number
      hasRing: boolean
      ringColor: string
      ringWidth: number
      moons: Moon[]
      glowColor: string
      glowSize: number
      glowOpacity: number
      glowDirection: boolean
      texture: string

      constructor() {
        this.orbitRadius = Math.random() * (canvas.width * 0.4) + canvas.width * 0.1
        this.orbitAngle = Math.random() * Math.PI * 2
        this.orbitSpeed = Math.random() * 0.0005 + 0.0002

        // Center of orbit is center of screen
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        this.x = centerX + Math.cos(this.orbitAngle) * this.orbitRadius
        this.y = centerY + Math.sin(this.orbitAngle) * this.orbitRadius

        this.radius = Math.random() * 20 + 8

        // Planet colors
        const colors = [
          "#3498db", // Blue
          "#e74c3c", // Red
          "#f1c40f", // Yellow
          "#2ecc71", // Green
          "#9b59b6", // Purple
          "#1abc9c", // Turquoise
          "#e67e22", // Orange
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]

        // Glow effect
        this.glowColor = this.color
        this.glowSize = this.radius * 1.5
        this.glowOpacity = 0.3
        this.glowDirection = Math.random() > 0.5

        // Some planets have rings
        this.hasRing = Math.random() > 0.6
        this.ringColor = "#ffffff"
        this.ringWidth = this.radius * 0.4

        // Planet texture
        const textures = ["noise", "bands", "spots", "swirl"]
        this.texture = textures[Math.floor(Math.random() * textures.length)]

        // Moons
        this.moons = []
        const moonCount = Math.floor(Math.random() * 3)
        for (let i = 0; i < moonCount; i++) {
          this.moons.push(new Moon(this))
        }
      }

      update() {
        // Update orbit position
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        this.orbitAngle += this.orbitSpeed
        this.x = centerX + Math.cos(this.orbitAngle) * this.orbitRadius
        this.y = centerY + Math.sin(this.orbitAngle) * this.orbitRadius

        // Update glow effect
        if (this.glowDirection) {
          this.glowOpacity += 0.002
          if (this.glowOpacity >= 0.4) this.glowDirection = false
        } else {
          this.glowOpacity -= 0.002
          if (this.glowOpacity <= 0.1) this.glowDirection = true
        }

        // Update moons
        this.moons.forEach((moon) => moon.update(this.x, this.y))
      }

      draw() {
        // Draw orbit path (faintly)
        ctx!.strokeStyle = "rgba(255, 255, 255, 0.05)"
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.arc(canvas.width / 2, canvas.height / 2, this.orbitRadius, 0, Math.PI * 2)
        ctx!.stroke()

        // Draw glow effect
        ctx!.globalAlpha = this.glowOpacity
        ctx!.fillStyle = this.glowColor
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1

        // Draw ring if planet has one
        if (this.hasRing) {
          ctx!.strokeStyle = this.ringColor
          ctx!.lineWidth = this.ringWidth
          ctx!.globalAlpha = 0.3
          ctx!.beginPath()
          ctx!.ellipse(
            this.x,
            this.y,
            this.radius * 1.8,
            this.radius * 0.5,
            this.orbitAngle + Math.PI / 4,
            0,
            Math.PI * 2,
          )
          ctx!.stroke()
          ctx!.globalAlpha = 1
        }

        // Draw planet
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx!.fill()

        // Add texture to planet
        this.drawTexture()

        // Add some texture/shading to planet
        const gradient = ctx!.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius,
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx!.fill()

        // Draw moons
        this.moons.forEach((moon) => moon.draw())
      }

      drawTexture() {
        ctx!.save()
        ctx!.globalCompositeOperation = "overlay"
        ctx!.globalAlpha = 0.5

        switch (this.texture) {
          case "bands":
            // Horizontal bands
            for (let i = -this.radius; i < this.radius; i += this.radius / 3) {
              ctx!.fillStyle = i % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              ctx!.beginPath()
              ctx!.ellipse(
                this.x,
                this.y,
                this.radius,
                Math.abs(Math.cos(i / this.radius) * this.radius),
                0,
                0,
                Math.PI * 2,
              )
              ctx!.fill()
            }
            break
          case "spots":
            // Random spots
            for (let i = 0; i < 5; i++) {
              const spotX = this.x + (Math.random() - 0.5) * this.radius
              const spotY = this.y + (Math.random() - 0.5) * this.radius
              const spotRadius = this.radius * (Math.random() * 0.3 + 0.1)

              // Only draw spots that are within the planet
              const distance = Math.sqrt(Math.pow(spotX - this.x, 2) + Math.pow(spotY - this.y, 2))
              if (distance + spotRadius < this.radius) {
                ctx!.fillStyle = Math.random() > 0.5 ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
                ctx!.beginPath()
                ctx!.arc(spotX, spotY, spotRadius, 0, Math.PI * 2)
                ctx!.fill()
              }
            }
            break
          case "swirl":
            // Swirl pattern
            ctx!.translate(this.x, this.y)
            for (let i = 0; i < 3; i++) {
              ctx!.rotate(Math.PI / 6)
              ctx!.fillStyle = "rgba(255, 255, 255, 0.1)"
              ctx!.beginPath()
              ctx!.ellipse(0, 0, this.radius * 0.8, this.radius * 0.3, (i * Math.PI) / 3, 0, Math.PI * 2)
              ctx!.fill()
            }
            break
          case "noise":
          default:
            // Do nothing for noise texture (handled by gradient)
            break
        }

        ctx!.restore()
      }
    }

    // Moons
    class Moon {
      orbitRadius: number
      orbitSpeed: number
      orbitAngle: number
      radius: number
      color: string
      x: number
      y: number
      glowSize: number
      glowOpacity: number

      constructor(planet: Planet) {
        this.orbitRadius = planet.radius * (Math.random() * 1.5 + 1.5)
        this.orbitSpeed = Math.random() * 0.03 + 0.01
        this.orbitAngle = Math.random() * Math.PI * 2
        this.radius = planet.radius * (Math.random() * 0.3 + 0.1)
        this.color = "#aaaaaa"
        this.x = 0
        this.y = 0
        this.glowSize = this.radius * 1.5
        this.glowOpacity = 0.2
      }

      update(planetX: number, planetY: number) {
        this.orbitAngle += this.orbitSpeed
        this.x = planetX + Math.cos(this.orbitAngle) * this.orbitRadius
        this.y = planetY + Math.sin(this.orbitAngle) * this.orbitRadius
      }

      draw() {
        // Draw glow
        ctx!.globalAlpha = this.glowOpacity
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1

        // Draw moon
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx!.fill()

        // Add shading
        const gradient = ctx!.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius,
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Shooting stars
    class ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      active: boolean
      color: string
      tailLength: number
      width: number
      lifespan: number
      age: number

      constructor() {
        this.reset()
        // Start with random progress
        this.age = Math.random() * this.lifespan
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * (canvas.height / 2) // Start in top half
        this.length = Math.random() * 100 + 50
        this.speed = Math.random() * 10 + 5
        this.angle = Math.PI / 4 + (Math.random() * Math.PI) / 2 // Downward angle
        this.active = false
        this.color = "#ffffff"
        this.tailLength = Math.random() * 30 + 20
        this.width = Math.random() * 2 + 1
        this.lifespan = Math.random() * 100 + 50 // How long it lives
        this.age = 0
      }

      update() {
        if (!this.active) {
          // Random chance to activate
          if (Math.random() < 0.005) {
            this.active = true
            this.age = 0
          }
          return
        }

        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed
        this.age++

        // Deactivate if off screen or too old
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.age > this.lifespan) {
          this.active = false
          this.reset()
        }
      }

      draw() {
        if (!this.active) return

        // Calculate opacity based on age
        const opacity = Math.min(1, (this.lifespan - this.age) / 20)

        // Draw shooting star
        ctx!.save()
        ctx!.globalAlpha = opacity
        ctx!.strokeStyle = this.color
        ctx!.lineWidth = this.width
        ctx!.beginPath()
        ctx!.moveTo(this.x, this.y)
        ctx!.lineTo(this.x - Math.cos(this.angle) * this.tailLength, this.y - Math.sin(this.angle) * this.tailLength)
        ctx!.stroke()

        // Draw glow
        ctx!.shadowBlur = 10
        ctx!.shadowColor = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, 1, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
        ctx!.restore()
      }
    }

    // Aurora effect
    class Aurora {
      points: { x: number; y: number }[]
      color: string
      speed: number
      amplitude: number
      frequency: number
      phase: number
      opacity: number
      height: number
      width: number

      constructor() {
        this.width = canvas.width + 200
        this.height = Math.random() * 150 + 50
        this.points = []
        this.color = this.getRandomColor()
        this.speed = Math.random() * 0.02 + 0.01
        this.amplitude = Math.random() * 20 + 10
        this.frequency = Math.random() * 0.02 + 0.01
        this.phase = Math.random() * Math.PI * 2
        this.opacity = Math.random() * 0.3 + 0.1

        // Initialize points
        const pointCount = Math.floor(this.width / 20)
        for (let i = 0; i < pointCount; i++) {
          this.points.push({
            x: (i / (pointCount - 1)) * this.width - 100,
            y: 0,
          })
        }
      }

      getRandomColor() {
        const colors = [
          "rgba(0, 255, 255, 0.5)", // Cyan
          "rgba(0, 255, 128, 0.5)", // Green
          "rgba(128, 0, 255, 0.5)", // Purple
          "rgba(255, 0, 255, 0.5)", // Magenta
          "rgba(0, 128, 255, 0.5)", // Blue
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.phase += this.speed

        // Update y positions based on sine wave
        for (let i = 0; i < this.points.length; i++) {
          const x = this.points[i].x
          this.points[i].y = Math.sin(x * this.frequency + this.phase) * this.amplitude
        }
      }

      draw(y: number) {
        ctx!.save()
        ctx!.globalAlpha = this.opacity
        ctx!.translate(0, y)

        // Create gradient
        const gradient = ctx!.createLinearGradient(0, -this.height / 2, 0, this.height / 2)
        gradient.addColorStop(0, "transparent")
        gradient.addColorStop(0.5, this.color)
        gradient.addColorStop(1, "transparent")

        // Draw aurora
        ctx!.beginPath()
        ctx!.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length - 2; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2
          const yc = (this.points[i].y + this.points[i + 1].y) / 2
          ctx!.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc)
        }

        ctx!.quadraticCurveTo(
          this.points[this.points.length - 2].x,
          this.points[this.points.length - 2].y,
          this.points[this.points.length - 1].x,
          this.points[this.points.length - 1].y,
        )

        // Draw bottom half (mirror)
        for (let i = this.points.length - 2; i > 0; i--) {
          const xc = (this.points[i].x + this.points[i - 1].x) / 2
          const yc = (this.points[i].y + this.points[i - 1].y) / 2
          ctx!.quadraticCurveTo(this.points[i].x, -this.points[i].y, xc, -yc)
        }

        ctx!.closePath()
        ctx!.fillStyle = gradient
        ctx!.fill()
        ctx!.restore()
      }
    }

    // Initialize objects
    const stars: Star[] = []
    const starCount = Math.min(300, window.innerWidth / 5)
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    const planets: Planet[] = []
    const planetCount = 6
    for (let i = 0; i < planetCount; i++) {
      planets.push(new Planet())
    }

    const shootingStars: ShootingStar[] = []
    const shootingStarCount = 10
    for (let i = 0; i < shootingStarCount; i++) {
      shootingStars.push(new ShootingStar())
    }

    const auroras: Aurora[] = []
    const auroraCount = 3
    for (let i = 0; i < auroraCount; i++) {
      auroras.push(new Aurora())
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const bgGradient = ctx!.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, "rgba(10, 10, 30, 0.8)")
      bgGradient.addColorStop(1, "rgba(30, 10, 40, 0.8)")
      ctx!.fillStyle = bgGradient
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Draw auroras
      auroras.forEach((aurora, index) => {
        aurora.update()
        aurora.draw(canvas.height * (0.3 + index * 0.2))
      })

      // Draw stars
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      // Draw shooting stars
      shootingStars.forEach((star) => {
        star.update()
        star.draw()
      })

      // Draw planets
      planets.forEach((planet) => {
        planet.update()
        planet.draw()
      })
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
}
