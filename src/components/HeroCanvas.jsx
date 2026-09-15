import { useEffect, useRef } from 'react'

/**
 * Hero 动态背景画布 —— 金色粒子流 + 互联光网
 * 黑金科技氛围；若 content.js 配置了 heroVideo，则由 <video> 覆盖本层
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let particles = []
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const COLORS = ['255, 210, 0', '255, 138, 0', '255, 236, 120']

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(110, Math.max(50, Math.floor((w * h) / 22000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -(0.12 + Math.random() * 0.42),
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: 0.25 + Math.random() * 0.55,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // 光晕底
      const g = ctx.createRadialGradient(w * 0.72, h * 0.32, 0, w * 0.72, h * 0.32, Math.max(w, h) * 0.55)
      g.addColorStop(0, 'rgba(255, 210, 0, 0.05)')
      g.addColorStop(1, 'rgba(255, 210, 0, 0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // 连线
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = dx * dx + dy * dy
          if (dist < 150 * 150) {
            const alpha = (1 - dist / (150 * 150)) * 0.16
            ctx.strokeStyle = `rgba(${p.c}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      // 粒子
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c}, ${p.a})`
        ctx.fill()
        // 微光
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c}, ${p.a * 0.08})`
        ctx.fill()
      }
    }

    const step = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -12) {
          p.y = h + 12
          p.x = Math.random() * w
        }
        if (p.x < -12) p.x = w + 12
        if (p.x > w + 12) p.x = -12
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    resize()
    if (reduced) {
      draw()
    } else {
      step()
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
