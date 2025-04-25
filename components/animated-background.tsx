"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor(window.innerWidth / 12))

    // Create floating elements
    const floatingElements: FloatingElement[] = []
    const numberOfFloatingElements = 8

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      pulse: boolean
      pulseSpeed: number
      maxOpacity: number
      minOpacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 4 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.opacity = Math.random() * 0.5 + 0.2
        this.pulse = Math.random() > 0.5
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        this.maxOpacity = Math.min(0.8, this.opacity + Math.random() * 0.3)
        this.minOpacity = Math.max(0.1, this.opacity - Math.random() * 0.2)

        // Use orange/brown colors from theme
        const colors = [
          "255, 127, 36", // orange
          "210, 105, 30", // chocolate
          "139, 69, 19", // brown
          "255, 140, 0", // dark orange
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Pulsating effect
        if (this.pulse) {
          if (this.opacity >= this.maxOpacity) this.pulseSpeed = -Math.abs(this.pulseSpeed)
          else if (this.opacity <= this.minOpacity) this.pulseSpeed = Math.abs(this.pulseSpeed)
          this.opacity += this.pulseSpeed
        }
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = `rgba(${this.color}, 0.5)`
      }
    }

    class FloatingElement {
      x: number
      y: number
      size: number
      angle: number
      rotationSpeed: number
      floatAmplitude: number
      floatSpeed: number
      initialY: number
      type: string
      opacity: number

      constructor() {
        this.size = Math.random() * 30 + 20
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.initialY = this.y
        this.angle = Math.random() * Math.PI * 2
        this.rotationSpeed = Math.random() * 0.002 - 0.001
        this.floatAmplitude = Math.random() * 30 + 10
        this.floatSpeed = Math.random() * 0.02 + 0.01
        this.opacity = Math.random() * 0.15 + 0.05

        const types = ["circle", "square", "triangle"]
        this.type = types[Math.floor(Math.random() * types.length)]
      }

      update() {
        this.angle += this.rotationSpeed
        this.y = this.initialY + Math.sin(Date.now() * this.floatSpeed) * this.floatAmplitude
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.fillStyle = `rgba(255, 127, 36, ${this.opacity})`
        ctx.strokeStyle = `rgba(255, 127, 36, ${this.opacity * 1.5})`
        ctx.lineWidth = 1

        switch (this.type) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, this.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            break
          case "square":
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
            ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size)
            break
          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -this.size / 2)
            ctx.lineTo(this.size / 2, this.size / 2)
            ctx.lineTo(-this.size / 2, this.size / 2)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            break
        }

        ctx.restore()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }

      for (let i = 0; i < numberOfFloatingElements; i++) {
        floatingElements.push(new FloatingElement())
      }
    }

    const connect = () => {
      const maxDistance = 150

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3
            ctx.strokeStyle = `rgba(255, 127, 36, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw floating elements behind particles
      for (let i = 0; i < floatingElements.length; i++) {
        floatingElements[i].update()
        floatingElements[i].draw()
      }

      // Draw and update particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connect()
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-70" />
}
