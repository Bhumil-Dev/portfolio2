import React, { useRef, useEffect } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let animId
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    // Particles
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: ['#6366f1', '#ec4899', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.6 + 0.2,
    }))

    // Floating shapes
    const shapes = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 60 + 30,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      floatOffset: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? '#6366f1' : '#ec4899',
      type: i % 3, // 0=triangle, 1=square, 2=hexagon
    }))

    let mouseX = W / 2
    let mouseY = H / 2
    const onMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMouse)

    const drawHex = (ctx, x, y, size, rotation) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (Math.PI / 3) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const drawTriangle = (ctx, x, y, size, rotation) => {
      ctx.beginPath()
      for (let i = 0; i < 3; i++) {
        const angle = rotation + (Math.PI * 2 / 3) * i - Math.PI / 2
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const drawSquare = (ctx, x, y, size, rotation) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.rect(-size / 2, -size / 2, size, size)
      ctx.restore()
    }

    let t = 0
    const draw = () => {
      animId = requestAnimationFrame(draw)
      t += 0.01

      ctx.clearRect(0, 0, W, H)

      // Draw shapes
      shapes.forEach((s) => {
        s.rotation += s.rotSpeed
        const floatY = s.y + Math.sin(t + s.floatOffset) * 15

        ctx.save()
        ctx.globalAlpha = 0.15
        ctx.strokeStyle = s.color
        ctx.lineWidth = 1.5

        if (s.type === 0) drawTriangle(ctx, s.x, floatY, s.size, s.rotation)
        else if (s.type === 1) drawSquare(ctx, s.x, floatY, s.size, s.rotation)
        else drawHex(ctx, s.x, floatY, s.size, s.rotation)

        ctx.stroke()
        ctx.restore()
      })

      // Draw particles
      particles.forEach((p) => {
        // Subtle mouse attraction
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.x += dx * 0.0008
          p.y += dy * 0.0008
        }

        p.x += p.dx
        p.y += p.dy

        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })

      // Draw connections
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = '#6366f1'
            ctx.globalAlpha = (1 - d / 100) * 0.15
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
