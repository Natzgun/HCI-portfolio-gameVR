"use client"

import { useState, useEffect, useRef } from "react"

interface Rock {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function VRGamePage() {
  // Static background stars - only generated once
  const [backgroundStars] = useState<Star[]>(() =>
    Array.from({ length: 200 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  )

  // Space rocks physics system
  const [rocks, setRocks] = useState<Rock[]>(() => 
    Array.from({length: 12}, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5-95% to avoid edges
      y: Math.random() * 90 + 5,
      vx: (Math.random() - 0.5) * 0.2, // Small initial velocity
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 30 + 20, // 20-50px
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2
    }))
  )
  
  const [dragState, setDragState] = useState<{
    rockId: number | null;
    startPos: { x: number; y: number };
    currentPos: { x: number; y: number };
  }>({ rockId: null, startPos: { x: 0, y: 0 }, currentPos: { x: 0, y: 0 } })
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Physics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRocks(prev => prev.map(rock => ({
        ...rock,
        x: Math.max(2, Math.min(98, rock.x + rock.vx)),
        y: Math.max(2, Math.min(98, rock.y + rock.vy)),
        vx: rock.vx * 0.98, // Space friction
        vy: rock.vy * 0.98,
        rotation: rock.rotation + rock.rotationSpeed,
        rotationSpeed: rock.rotationSpeed * 0.99
      })))
    }, 16) // ~60fps
    
    return () => clearInterval(interval)
  }, [])

  // Rock throwing mechanics
  const handleRockMouseDown = (e: React.MouseEvent, rockId: number) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const startPos = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    }
    setDragState({ rockId, startPos, currentPos: startPos })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState.rockId === null) return
    
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const rawX = e.clientX - rect.left
    const rawY = e.clientY - rect.top
    
    // Limit drag distance to 100px maximum
    const dx = rawX - dragState.startPos.x
    const dy = rawY - dragState.startPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 100
    
    let limitedX = rawX
    let limitedY = rawY
    
    if (distance > maxDistance) {
      const ratio = maxDistance / distance
      limitedX = dragState.startPos.x + (dx * ratio)
      limitedY = dragState.startPos.y + (dy * ratio)
    }
    
    setDragState(prev => ({
      ...prev,
      currentPos: { x: limitedX, y: limitedY }
    }))
  }

  const handleMouseUp = () => {
    if (dragState.rockId === null) return
    
    const dx = dragState.currentPos.x - dragState.startPos.x
    const dy = dragState.currentPos.y - dragState.startPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Reduced force calculation for slower movement
    const force = Math.min(distance * 0.003, 0.3) // Max force of 0.3
    
    setRocks(prev => prev.map(rock => 
      rock.id === dragState.rockId 
        ? { 
            ...rock, 
            vx: dx * force * 0.03, // Reduced from 0.1 to 0.03
            vy: dy * force * 0.03,
            rotationSpeed: force * 2 // Reduced from 5 to 2
          }
        : rock
    ))
    
    setDragState({ rockId: null, startPos: { x: 0, y: 0 }, currentPos: { x: 0, y: 0 } })
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundStars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Floating Space Rocks */}
      {rocks.map((rock) => (
        <div
          key={rock.id}
          className="absolute space-rock cursor-grab hover:cursor-grab active:cursor-grabbing"
          style={{
            left: `${rock.x}%`,
            top: `${rock.y}%`,
            width: `${rock.size}px`,
            height: `${rock.size}px`,
            transform: `translate(-50%, -50%) rotate(${rock.rotation}deg)`,
            zIndex: dragState.rockId === rock.id ? 50 : 1,
          }}
          onMouseDown={(e) => handleRockMouseDown(e, rock.id)}
        >
          <div className="rock-body">
            <div className="rock-surface"></div>
            <div className="rock-highlight"></div>
            {dragState.rockId === rock.id && (
              <div className="rock-glow"></div>
            )}
          </div>
        </div>
      ))}

      {/* Drag Direction Arrow */}
      {dragState.rockId !== null && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: dragState.startPos.x,
            top: dragState.startPos.y,
          }}
        >
          <svg
            width="200"
            height="200"
            className="absolute"
            style={{
              left: '-100px',
              top: '-100px',
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#60a5fa"
                  stroke="#3b82f6"
                  strokeWidth="1"
                />
              </marker>
            </defs>
            <line
              x1="100"
              y1="100"
              x2={100 + (dragState.currentPos.x - dragState.startPos.x)}
              y2={100 + (dragState.currentPos.y - dragState.startPos.y)}
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              opacity="0.8"
            />
          </svg>
        </div>
      )}

      {/* Logo - Top Left */}
      <a 
        href="/" 
        className="absolute top-6 left-6 z-50 pointer-events-auto flex items-center space-x-2 transition-transform hover:scale-105"
      >
        <img 
          src="/worstg.png" 
          alt="Worst Generation Logo"
          className="h-8 w-auto drop-shadow-lg logo-glow scale-[0.7]"
        />
      </a>

      {/* Roadmap Link Button */}
      <a
        href="/roadmap"
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-blue-600/80 backdrop-blur-sm rounded-lg hover:bg-blue-500 hover:scale-105 transition-all text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/50 pointer-events-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ver Roadmap
      </a>

      {/* Small Constellation - Below Roadmap Button */}
      <div className="absolute top-20 right-6 z-30 pointer-events-none">
        <svg width="300" height="240" viewBox="0 0 150 120" style={{ transform: 'scaleY(-1)' }}>
          {/* Background stars */}
          {[...Array(15)].map((_, i) => (
            <circle
              key={`constellation-star-${i}`}
              cx={Math.random() * 150}
              cy={Math.random() * 120}
              r="0.5"
              fill="white"
              opacity={Math.random() * 0.4 + 0.3}
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          ))}
          
          {/* Connection lines */}
          <line x1="30" y1="50" x2="60" y2="30" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
          <line x1="60" y1="30" x2="90" y2="50" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
          <line x1="90" y1="50" x2="120" y2="30" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
          
          {/* Constellation nodes */}
          <circle cx="30" cy="50" r="4" fill="#60a5fa" className="animate-pulse" />
          <circle cx="60" cy="30" r="4" fill="#60a5fa" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <circle cx="90" cy="50" r="4" fill="#60a5fa" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <circle cx="120" cy="30" r="4" fill="#fbbf24" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        </svg>
      </div>

      {/* Game Title and Brief Description - Top Left */}
      <div className="absolute top-24 left-8 max-w-md pointer-events-none animate-[fadeIn_0.5s_ease-in-out_forwards] z-40">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
          Gravity
        </h1>
        <p className="text-lg text-blue-200 mb-6 drop-shadow-lg">
          Una experiencia de realidad virtual de supervivencia espacial
        </p>
        <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">Concepto</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Navega en una estación espacial en ruinas usando gravedad cero. 
            Escapa antes de quedarte sin oxígeno, impulsándote con rocas y escombros.
          </p>
          <h3 className="text-xl font-semibold text-blue-400 mb-3">Mecánicas Clave</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 1 1 3 0m-3 6a1.5 1.5 0 0 0-3 0v2a7.5 7.5 0 0 0 15 0v-5a1.5 1.5 0 0 0-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 0 1 3 0v1m0 0V11m0-5.5a1.5 1.5 0 0 1 3 0v3m0 0V11" />
              </svg>
              <span><strong>Hand Tracking:</strong> Agarra y lanza objetos con tus manos virtuales</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
              </svg>
              <span><strong>Movimiento Corporal:</strong> Física realista de gravedad cero</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Sistema de Oxígeno:</strong> Tiempo limitado añade tensión</span>
            </li>
          </ul>
        </div>
      </div>

      
    </div>
  )
}
