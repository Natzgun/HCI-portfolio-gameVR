"use client"

import { useEffect, useRef, useState } from 'react'
import * as PIXI from 'pixi.js'

interface PixiInteractiveProps {
  artifact: 'particles' | 'gravity' | 'waves' | 'nebula' | 'wormhole' | 'constellation'
  width?: number
  height?: number
}

export function PixiInteractive({ artifact, width = 800, height = 400 }: PixiInteractiveProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<PIXI.Application | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    let mounted = true

    // Create Pixi Application
    const initApp = async () => {
      try {
        const app = new PIXI.Application()
        
        await app.init({
          width,
          height,
          backgroundAlpha: 0,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
        })

        if (!mounted || !canvasRef.current) {
          app.destroy(true, { children: true, texture: true })
          return
        }

        appRef.current = app
        canvasRef.current.appendChild(app.canvas as HTMLCanvasElement)
        
        // Initialize the selected artifact
        switch (artifact) {
          case 'particles':
            initParticleField(app)
            break
          case 'gravity':
            initGravityWell(app)
            break
          case 'waves':
            initWaveDistortion(app)
            break
          case 'nebula':
            initNebula(app)
            break
          case 'wormhole':
            initWormhole(app)
            break
          case 'constellation':
            initConstellation(app)
            break
        }
      } catch (error) {
        console.error('Error initializing Pixi app:', error)
      }
    }

    initApp()

    return () => {
      mounted = false
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true })
        appRef.current = null
      }
    }
  }, [artifact, width, height])

  // 1. Interactive Particle Field with Mouse Attraction
  const initParticleField = (app: PIXI.Application) => {
    const particles: any[] = []
    const particleCount = 200
    const container = new PIXI.Container()
    app.stage.addChild(container)

    let mouseX = width / 2
    let mouseY = height / 2

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const graphics = new PIXI.Graphics()
      graphics.circle(0, 0, 2)
      graphics.fill({ color: 0x60a5fa, alpha: 0.8 })
      
      const particle = {
        sprite: graphics,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        originalX: Math.random() * width,
        originalY: Math.random() * height,
      }
      
      graphics.x = particle.x
      graphics.y = particle.y
      container.addChild(graphics)
      particles.push(particle)
    }

    // Mouse interaction
    app.stage.eventMode = 'static'
    app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height)
    app.stage.on('pointermove', (e) => {
      mouseX = e.global.x
      mouseY = e.global.y
    })

    // Animation loop
    app.ticker.add(() => {
      particles.forEach(particle => {
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.5
          particle.vy += (dy / distance) * force * 0.5
        }

        // Return to original position
        particle.vx += (particle.originalX - particle.x) * 0.01
        particle.vy += (particle.originalY - particle.y) * 0.01
        
        // Apply velocity with damping
        particle.vx *= 0.95
        particle.vy *= 0.95
        
        particle.x += particle.vx
        particle.y += particle.vy
        
        particle.sprite.x = particle.x
        particle.sprite.y = particle.y
      })
    })
  }

  // 2. Gravity Well with Orbiting Objects
  const initGravityWell = (app: PIXI.Application) => {
    const container = new PIXI.Container()
    app.stage.addChild(container)

    const centerX = width / 2
    const centerY = height / 2

    // Central gravity well
    const well = new PIXI.Graphics()
    well.circle(0, 0, 30)
    well.fill({ color: 0x3b82f6 })
    well.x = centerX
    well.y = centerY
    container.addChild(well)

    // Create orbiting objects
    const orbiters: any[] = []
    for (let i = 0; i < 30; i++) {
      const graphics = new PIXI.Graphics()
      const size = Math.random() * 3 + 2
      graphics.circle(0, 0, size)
      graphics.fill({ color: 0x60a5fa, alpha: 0.8 })
      
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 150 + 50
      
      const orbiter = {
        sprite: graphics,
        angle,
        distance,
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        size
      }
      
      container.addChild(graphics)
      orbiters.push(orbiter)
    }

    let mouseX = centerX
    let mouseY = centerY

    app.stage.eventMode = 'static'
    app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height)
    app.stage.on('pointermove', (e) => {
      mouseX = e.global.x
      mouseY = e.global.y
    })

    app.ticker.add(() => {
      // Animate gravity well
      well.clear()
      well.circle(0, 0, 30 + Math.sin(Date.now() * 0.003) * 5)
      well.fill({ color: 0x3b82f6 })
      
      // Move well towards mouse
      well.x += (mouseX - well.x) * 0.05
      well.y += (mouseY - well.y) * 0.05

      orbiters.forEach(orbiter => {
        orbiter.angle += orbiter.speed
        
        const x = well.x + Math.cos(orbiter.angle) * orbiter.distance
        const y = well.y + Math.sin(orbiter.angle) * orbiter.distance
        
        orbiter.sprite.x = x
        orbiter.sprite.y = y
        
        // Trail effect
        orbiter.sprite.alpha = 0.6 + Math.sin(orbiter.angle * 2) * 0.4
      })
    })
  }

  // 3. Wave Distortion Effect
  const initWaveDistortion = (app: PIXI.Application) => {
    const container = new PIXI.Container()
    app.stage.addChild(container)

    const gridSize = 20
    const cols = Math.ceil(width / gridSize)
    const rows = Math.ceil(height / gridSize)
    const points: any[] = []

    // Create grid of points
    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const graphics = new PIXI.Graphics()
        graphics.circle(0, 0, 2)
        graphics.fill({ color: 0x60a5fa, alpha: 0.6 })
        
        const point = {
          sprite: graphics,
          x: x * gridSize,
          y: y * gridSize,
          originalX: x * gridSize,
          originalY: y * gridSize,
        }
        
        graphics.x = point.x
        graphics.y = point.y
        container.addChild(graphics)
        points.push(point)
      }
    }

    let mouseX = width / 2
    let mouseY = height / 2
    let time = 0

    app.stage.eventMode = 'static'
    app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height)
    app.stage.on('pointermove', (e) => {
      mouseX = e.global.x
      mouseY = e.global.y
    })

    app.ticker.add(() => {
      time += 0.05
      
      points.forEach((point, i) => {
        const dx = mouseX - point.originalX
        const dy = mouseY - point.originalY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        let offsetX = 0
        let offsetY = 0
        
        // Wave effect
        offsetX = Math.sin((point.originalY + time * 50) * 0.05) * 10
        offsetY = Math.cos((point.originalX + time * 50) * 0.05) * 10
        
        // Mouse ripple
        if (distance < 150) {
          const force = (150 - distance) / 150
          offsetX += Math.sin(distance * 0.1 - time) * force * 20
          offsetY += Math.cos(distance * 0.1 - time) * force * 20
        }
        
        point.sprite.x = point.originalX + offsetX
        point.sprite.y = point.originalY + offsetY
      })
    })
  }

  // 4. Nebula Cloud Effect
  const initNebula = (app: PIXI.Application) => {
    const container = new PIXI.Container()
    app.stage.addChild(container)

    const clouds: any[] = []
    
    for (let i = 0; i < 15; i++) {
      const graphics = new PIXI.Graphics()
      const size = Math.random() * 80 + 40
      
      const cloud = {
        sprite: graphics,
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: Math.random() > 0.5 ? 0x3b82f6 : 0x8b5cf6,
        alpha: Math.random() * 0.3 + 0.2
      }
      
      container.addChild(graphics)
      clouds.push(cloud)
    }

    app.ticker.add(() => {
      clouds.forEach(cloud => {
        cloud.sprite.clear()
        cloud.sprite.circle(0, 0, cloud.size)
        cloud.sprite.fill({ color: cloud.color, alpha: cloud.alpha })
        
        cloud.x += cloud.vx
        cloud.y += cloud.vy
        cloud.rotation += cloud.rotationSpeed
        
        // Wrap around
        if (cloud.x < -cloud.size) cloud.x = width + cloud.size
        if (cloud.x > width + cloud.size) cloud.x = -cloud.size
        if (cloud.y < -cloud.size) cloud.y = height + cloud.size
        if (cloud.y > height + cloud.size) cloud.y = -cloud.size
        
        cloud.sprite.x = cloud.x
        cloud.sprite.y = cloud.y
        cloud.sprite.rotation = cloud.rotation
      })
    })
  }

  // 5. Wormhole Effect
  const initWormhole = (app: PIXI.Application) => {
    const container = new PIXI.Container()
    app.stage.addChild(container)

    const centerX = width / 2
    const centerY = height / 2
    const rings: any[] = []

    for (let i = 0; i < 30; i++) {
      const graphics = new PIXI.Graphics()
      
      const ring = {
        sprite: graphics,
        radius: 10 + i * 15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (30 - i) * 0.001,
        thickness: 3,
        alpha: 1 - (i / 30) * 0.7
      }
      
      container.addChild(graphics)
      rings.push(ring)
    }

    let time = 0
    let mouseX = centerX
    let mouseY = centerY

    app.stage.eventMode = 'static'
    app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height)
    app.stage.on('pointermove', (e) => {
      mouseX = e.global.x
      mouseY = e.global.y
    })

    app.ticker.add(() => {
      time += 0.05
      
      rings.forEach((ring, i) => {
        ring.sprite.clear()
        ring.rotation += ring.rotationSpeed
        
        const pulseSize = Math.sin(time + i * 0.3) * 5
        const currentRadius = ring.radius + pulseSize
        
        ring.sprite.circle(0, 0, currentRadius)
        ring.sprite.stroke({ color: 0x60a5fa, width: ring.thickness, alpha: ring.alpha })
        
        ring.sprite.x = centerX + (mouseX - centerX) * (i / 30) * 0.3
        ring.sprite.y = centerY + (mouseY - centerY) * (i / 30) * 0.3
        ring.sprite.rotation = ring.rotation
      })
    })
  }

  // 6. Interactive Constellation
  const initConstellation = (app: PIXI.Application) => {
    const container = new PIXI.Container()
    app.stage.addChild(container)

    const stars: any[] = []
    const starCount = 50

    for (let i = 0; i < starCount; i++) {
      const graphics = new PIXI.Graphics()
      const size = Math.random() * 3 + 2
      graphics.circle(0, 0, size)
      graphics.fill({ color: 0xffffff, alpha: 0.8 })
      
      const star = {
        sprite: graphics,
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        twinkle: Math.random() * Math.PI * 2
      }
      
      graphics.x = star.x
      graphics.y = star.y
      container.addChild(graphics)
      stars.push(star)
    }

    // Lines container
    const linesGraphics = new PIXI.Graphics()
    container.addChild(linesGraphics)

    let mouseX = width / 2
    let mouseY = height / 2

    app.stage.eventMode = 'static'
    app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height)
    app.stage.on('pointermove', (e) => {
      mouseX = e.global.x
      mouseY = e.global.y
    })

    app.ticker.add((ticker) => {
      linesGraphics.clear()
      
      // Draw connections
      stars.forEach((star, i) => {
        // Twinkle effect
        star.twinkle += 0.05
        const alpha = 0.6 + Math.sin(star.twinkle) * 0.4
        star.sprite.alpha = alpha
        
        // Connect to nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j]
          const dx = star.x - other.x
          const dy = star.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 80) {
            const lineAlpha = (80 - distance) / 80 * 0.3
            linesGraphics.moveTo(star.x, star.y)
            linesGraphics.lineTo(other.x, other.y)
            linesGraphics.stroke({ color: 0x60a5fa, width: 1, alpha: lineAlpha })
          }
        }
        
        // Connect to mouse
        const dx = mouseX - star.x
        const dy = mouseY - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 120) {
          const lineAlpha = (120 - distance) / 120 * 0.5
          linesGraphics.moveTo(star.x, star.y)
          linesGraphics.lineTo(mouseX, mouseY)
          linesGraphics.stroke({ color: 0xfbbf24, width: 2, alpha: lineAlpha })
        }
      })
    })
  }

  return (
    <div 
      ref={canvasRef} 
      className="relative rounded-lg overflow-hidden border-2 border-border/30"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ width, height }}
    />
  )
}
