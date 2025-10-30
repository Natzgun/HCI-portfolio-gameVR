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
      {/* Sistema Solar de Fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sol */}
        <div 
          className="absolute w-32 h-32 rounded-full bg-gradient-radial from-yellow-300 via-orange-400 to-orange-600"
          style={{
            top: '15%',
            left: '10%',
            boxShadow: '0 0 80px rgba(251, 191, 36, 0.8), 0 0 120px rgba(251, 191, 36, 0.4)',
            animation: 'rotate-slow 60s linear infinite'
          }}
        >
          {/* Llamaradas solares */}
          <div className="absolute inset-0 rounded-full bg-yellow-200/30 animate-pulse"></div>
        </div>

        {/* Mercurio */}
        <div 
          className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600"
          style={{
            top: '12%',
            left: '20%',
            boxShadow: '0 0 10px rgba(156, 163, 175, 0.5)',
            animation: 'orbit-mercury 15s linear infinite'
          }}
        ></div>

        {/* Venus */}
        <div 
          className="absolute w-9 h-9 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300"
          style={{
            top: '25%',
            left: '25%',
            boxShadow: '0 0 15px rgba(253, 224, 71, 0.6)',
            animation: 'orbit-venus 20s linear infinite'
          }}
        ></div>

        {/* Tierra */}
        <div 
          className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-600"
          style={{
            top: '35%',
            left: '30%',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
            animation: 'orbit-earth 25s linear infinite'
          }}
        >
          {/* Luna de la Tierra */}
          <div className="absolute w-2 h-2 rounded-full bg-gray-300 -top-4 left-6"></div>
        </div>

        {/* Marte */}
        <div 
          className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-700"
          style={{
            top: '45%',
            left: '35%',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
            animation: 'orbit-mars 30s linear infinite'
          }}
        ></div>

        {/* Júpiter */}
        <div 
          className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 via-amber-300 to-orange-400"
          style={{
            top: '60%',
            left: '75%',
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
            animation: 'orbit-jupiter 40s linear infinite',
            background: 'linear-gradient(to bottom, #fed7aa 0%, #fdba74 25%, #fb923c 50%, #fdba74 75%, #fed7aa 100%)'
          }}
        >
          {/* Bandas de Júpiter */}
          <div className="absolute inset-0 rounded-full opacity-40">
            <div className="absolute w-full h-1 bg-amber-600 top-1/4"></div>
            <div className="absolute w-full h-1 bg-amber-700 top-1/2"></div>
            <div className="absolute w-full h-1 bg-amber-600 top-3/4"></div>
          </div>
        </div>

        {/* Saturno con anillos */}
        <div 
          className="absolute"
          style={{
            top: '20%',
            right: '15%',
            animation: 'orbit-saturn 50s linear infinite'
          }}
        >
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-amber-200"
            style={{
              boxShadow: '0 0 25px rgba(251, 191, 36, 0.4)'
            }}
          ></div>
          {/* Anillos de Saturno */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-6 rounded-full border-4 border-amber-300/60"
            style={{
              transform: 'translate(-50%, -50%) rotateX(75deg)',
              boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
            }}
          ></div>
        </div>

        {/* Urano */}
        <div 
          className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400"
          style={{
            top: '70%',
            left: '15%',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
            animation: 'orbit-uranus 55s linear infinite'
          }}
        ></div>

        {/* Neptuno */}
        <div 
          className="absolute w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
          style={{
            top: '80%',
            right: '25%',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            animation: 'orbit-neptune 60s linear infinite'
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-mercury {
          0% { transform: translate(0, 0); }
          25% { transform: translate(30px, -20px); }
          50% { transform: translate(60px, 0); }
          75% { transform: translate(30px, 20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-venus {
          0% { transform: translate(0, 0); }
          25% { transform: translate(40px, -30px); }
          50% { transform: translate(80px, 0); }
          75% { transform: translate(40px, 30px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-earth {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(50px, -40px) rotate(90deg); }
          50% { transform: translate(100px, 0) rotate(180deg); }
          75% { transform: translate(50px, 40px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes orbit-mars {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-40px, -30px); }
          50% { transform: translate(-80px, 0); }
          75% { transform: translate(-40px, 30px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-jupiter {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-60px, 40px); }
          50% { transform: translate(-120px, 0); }
          75% { transform: translate(-60px, -40px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-saturn {
          0% { transform: translate(0, 0); }
          25% { transform: translate(50px, 50px); }
          50% { transform: translate(100px, 0); }
          75% { transform: translate(50px, -50px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-uranus {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-50px, -40px); }
          50% { transform: translate(-100px, 0); }
          75% { transform: translate(-50px, 40px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-neptune {
          0% { transform: translate(0, 0); }
          25% { transform: translate(60px, -50px); }
          50% { transform: translate(120px, 0); }
          75% { transform: translate(60px, 50px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>

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

      {/* Roadmap Link Button - Luna Grande */}
      <a
        href="/roadmap"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-100 via-gray-200 to-gray-300 hover:from-yellow-200 hover:via-gray-100 hover:to-gray-200 transition-all duration-500 flex flex-col items-center justify-center shadow-2xl hover:shadow-yellow-200/50 pointer-events-auto group overflow-hidden hover:scale-110 animate-pulse-slow"
        style={{
          boxShadow: '0 0 60px rgba(255, 255, 200, 0.8), 0 0 120px rgba(255, 255, 200, 0.4), inset -15px -15px 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Cráteres de luna */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-6 w-6 h-6 rounded-full bg-gray-400/40"></div>
          <div className="absolute top-12 right-8 w-5 h-5 rounded-full bg-gray-400/30"></div>
          <div className="absolute bottom-8 left-10 w-7 h-7 rounded-full bg-gray-400/40"></div>
          <div className="absolute bottom-6 right-6 w-4 h-4 rounded-full bg-gray-400/35"></div>
          <div className="absolute top-20 left-16 w-3 h-3 rounded-full bg-gray-400/25"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center">
          <svg className="w-12 h-12 mb-2 text-gray-700 group-hover:text-gray-800 transition-colors animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span className="text-gray-800 font-bold text-base text-center leading-tight">¡Haz clic!<br/>Ver Roadmap</span>
        </div>
        
        {/* Brillo lunar animado */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Anillos de pulsación */}
        <div className="absolute inset-0 rounded-full border-4 border-yellow-300/50 animate-ping-slow"></div>
      </a>
      
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.95;
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

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
