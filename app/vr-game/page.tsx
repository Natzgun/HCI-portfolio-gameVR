"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

const timelineData = [
  {
    id: "1",
    title: "Aterrizaje de ideas e investigación",
    date: "Semana 1",
    phase: "Investigación",
    description:
      "En esta primera parte se hizo una lluvia de ideas para definir el concepto del juego, centrado en ser una herramienta para contextos terapéuticos. Se investigaron interacciones multimodales (gestos) y su aplicación en VR para el desarrollo de funciones ejecutivas.",
    achievements: [
      "Definición del problema: Dificultad en toma de decisiones y gestión de pensamientos catastróficos.",
      "Público objetivo: Adolescentes y adultos, para ser usado con acompañamiento profesional.",
      "Establecimiento de la tecnología: Unity, SteamVR y C#.",
      "Primeros bocetos de los niveles oníricos del juego.",
    ],
    status: "completed" as const,
    image: "/brainstorm.jpeg",
  },
  {
    id: "2",
    title: "Real Life Testing",
    date: "Semana 2",
    phase: "Real Life Testing",
    description:
      "El equipo desarrolló una experiencia similar a la idea inicial del videojuego en la vida real, para que diferentes usuarios la probaran y nos dieran feedback. Esta fase fue crucial para validar las mecánicas de interacción antes del desarrollo digital.",
    achievements: [
      "Creación de una experiencia física que simula las mecánicas del juego VR.",
      "Realización de pruebas con usuarios reales para obtener feedback temprano.",
      "Validación de conceptos de interacción gestual en un entorno controlado.",
      "Documentación en video de las sesiones de testing y entrevistas.",
    ],
    status: "completed" as const,
    image: "/rlTest.png",
    videoLink: "https://drive.google.com/file/d/1yHJyLESPWRFQpGZgvCItGC0C4YkvUKdr/view?usp=drivesdk",
    feedback: {
      general: {
        title: "Dirección del Proyecto",
        recommendations: [
          "Redefinir el enfoque hacia funciones ejecutivas como planificación y toma de decisiones.",
          "Implementar dificultad progresiva basada en demandas cognitivas crecientes."
        ]
      },
      level1: {
        title: "Tips para la Primera Escena (Nivel 1: El Jardín de los Senderos)",
        recommendations: [
          "Aumentar la tensión: Se sugiere añadir otros estímulos que evoquen miedo para hacer la experiencia más inmersiva.",
          "Empoderar al jugador: En lugar de nubes que se apartan, se recomienda dar al jugador herramientas de defensa. Esto le otorgará una mayor sensación de control sobre la situación."
        ]
      },
      level2: {
        title: "Tips para la Segunda Escena (Nivel 2: El Laberinto de Susurros)",
        recommendations: [
          "Fomentar la planificación: Es importante poner a disposición del jugador herramientas iniciales, pero también crear desafíos específicos para obtener más herramientas. Esto obliga al usuario a planificar cómo usar sus recursos y a buscar activamente mejorar sus capacidades para superar los obstáculos."
        ]
      }
    },
  },
  {
    id: "3",
    title: "Realización de maqueta y validación de la idea",
    date: "Semana 2",
    phase: "Diseño y Validación",
    description:
      "Se construyó un prototipo de baja fidelidad (maqueta) para reconstruir el escenario del videojuego. Se diseñó un laberinto físico donde el jugador es perseguido por una entidad, pero puede defenderse con objetos que encuentra durante el recorrido. Esta prueba de concepto permitió validar las mecánicas de supervivencia y obtener feedback temprano de usuarios reales ajenos al proyecto.",
    achievements: [
      "Construcción de un laberinto físico que simula el ambiente del juego.",
      "Implementación de mecánicas de persecución y supervivencia con entidades hostiles.",
      "Diseño de sistema de defensa mediante objetos encontrados en el laberinto.",
      "Validación del concepto de interacciones multimodales y tensión progresiva.",
      "Refinamiento de las mecánicas basado en observaciones de usuarios reales.",
    ],
    status: "completed" as const,
    image: "/maqueta.jpeg",
    videoLink: "https://drive.google.com/file/d/1YOwZN7ul7dXW16Q1vSBvgzXWf4TsYNlp/view?usp=drive_link",
    feedback: {
      general: {
        title: "Problemas Identificados en las Pruebas Iniciales",
        recommendations: [
          "Se identificaron varios problemas clave durante las pruebas iniciales, principalmente relacionados con los principios de Visibilidad y Feedback:"
        ]
      },
      level1: {
        title: "Falta de Claridad en los Objetivos",
        recommendations: [
          "No estaba claro cuál era la salida o el objetivo principal en las primeras versiones de los niveles."
        ]
      },
      level2: {
        title: "Elementos del Juego Confusos",
        recommendations: [
          "Los usuarios no entendían que las 'bolitas' eran en realidad obstáculos."
        ]
      },
      level3: {
        title: "Atmósfera Deficiente",
        recommendations: [
          "La música no lograba generar una sensación de suspenso o misterio, lo cual restaba impacto a la experiencia."
        ]
      },
      level4: {
        title: "Mecánicas sin Propósito Claro",
        recommendations: [
          "La idea de las nubes y las luces no parecía tener una conexión directa con la solución del problema central del juego."
        ]
      }
    },
  },
  {
    id: "4",
    title: "Prototipado y Desarrollo de Interacciones",
    date: "Semana 3-4",
    phase: "Desarrollo",
    description:
      "Se construyó un prototipo funcional en Unity para testear las mecánicas de interacción principales. El foco fue implementar el hand tracking para asegurar que las interacciones fueran naturales e intuitivas.",
    achievements: [
      "Desarrollo del hand tracking para manipular herramientas de luz y recolectar objetos.",
      "Creación del primer nivel: 'El Jardín de los Senderos que se Bifurcan'.",
      "Diseño de los estímulos de miedo y la sensación de control a través de herramientas de defensa.",
      "Implementación de mecánicas de movimiento corporal e interacción gestual.",
    ],
    status: "in-progress" as const,
    image: "/vr-prototype-development-unity-editor-interface.jpg",
  },
]

export default function VRGamePage() {
  const [selectedPhase, setSelectedPhase] = useState(timelineData[0])
  const [showFeedback, setShowFeedback] = useState(false)
  
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
      className="min-h-screen bg-background opacity-0 animate-[fadeIn_0.7s_ease-in-out_forwards] relative overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-black opacity-60" />

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
            zIndex: dragState.rockId === rock.id ? 5 : 1,
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

      <Navigation />

      {/* Interactive Roadmap */}
      <section className="py-12 opacity-0 translate-y-8 animate-[slideUp_1s_ease-out_0.5s_forwards]">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Game Description */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Gravity</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-white font-medium mb-6 drop-shadow-lg">
                  Una experiencia de realidad virtual de supervivencia espacial
                </p>
                <div className="text-left bg-card/95 backdrop-blur-md border border-border/70 rounded-lg p-6 mb-8 horror-glow shadow-2xl">
                  <h3 className="text-lg font-semibold text-white mb-4">Concepto Central</h3>
                  <p className="text-gray-100 leading-relaxed mb-4">
                    Una experiencia VR de <span className="text-blue-400 font-medium">supervivencia espacial</span> que utiliza interacciones multimodales 
                    (gestos, movimiento) para sumergir al jugador en una estación espacial en ruinas. El objetivo es escapar 
                    antes de quedarte sin oxígeno, usando rocas y escombros para moverte en gravedad cero.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Elementos de Juego:</h4>
                      <ul className="text-sm text-gray-200 space-y-1">
                        <li>• Física de gravedad cero</li>
                        <li>• Sistema de oxígeno limitado</li>
                        <li>• Mecánicas de propulsión con objetos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Audiencia Objetivo:</h4>
                      <ul className="text-sm text-gray-200 space-y-1">
                        <li>• Fanáticos de la ciencia ficción</li>
                        <li>• Jugadores de experiencias inmersivas</li>
                        <li>• Todas las edades (contenido familiar)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-2 border-border/50 bg-card/90 backdrop-blur-md horror-glow hover:border-primary/50 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 1 1 3 0m-3 6a1.5 1.5 0 0 0-3 0v2a7.5 7.5 0 0 0 15 0v-5a1.5 1.5 0 0 0-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 0 1 3 0v1m0 0V11m0-5.5a1.5 1.5 0 0 1 3 0v3m0 0V11" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">HAND TRACKING</h4>
                      <p className="text-sm text-gray-300">Agarra rocas y escombros para impulsarte</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-border/50 bg-card/90 backdrop-blur-md horror-glow hover:border-primary/50 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M16 12h.01" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">MOVIMIENTO CORPORAL</h4>
                      <p className="text-sm text-gray-300">Navega en gravedad cero</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-4">Proceso de Desarrollo</h3>
              <p className="text-muted-foreground">Selecciona una fase para ver los detalles</p>
            </div>

            {/* Graphical Maze Roadmap */}
            <div className="relative w-full h-96 mb-12 overflow-hidden rounded-lg bg-gradient-to-br from-background via-card/20 to-background border border-border/30">
              {/* Atmospheric particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="particle absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse" style={{left: '10%', top: '20%'}} />
                <div className="particle absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse animation-delay-500" style={{left: '80%', top: '30%'}} />
                <div className="particle absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse animation-delay-1000" style={{left: '60%', top: '70%'}} />
              </div>

              {/* SVG Path for the maze route */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                {/* Background grid pattern */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Main path connecting all phases */}
                <path
                  d="M 80 200 Q 160 100, 240 200 T 400 200 Q 480 300, 560 200"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  opacity="0.6"
                  filter="url(#glow)"
                  className="animate-pulse"
                />
                
                {/* Completed path segment */}
                <path
                  d="M 80 200 Q 160 100, 240 200 Q 320 300, 400 200"
                  fill="none"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth="4"
                  filter="url(#glow)"
                />
              </svg>

              {/* Phase Nodes */}
              {timelineData.map((phase, index) => {
                const positions = [
                  { x: '10%', y: '50%', transform: 'translate(-50%, -50%)' }, // Phase 1
                  { x: '30%', y: '50%', transform: 'translate(-50%, -50%)' }, // Phase 2
                  { x: '50%', y: '50%', transform: 'translate(-50%, -50%)' }, // Phase 3  
                  { x: '70%', y: '50%', transform: 'translate(-50%, -50%)' }, // Phase 4
                ]
                const position = positions[index] || positions[0]
                
                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhase(phase)}
                    className="absolute group transition-all duration-500 hover:scale-110"
                    style={{
                      left: position.x,
                      top: position.y,
                      transform: position.transform,
                    }}
                  >
                    {/* Node circle */}
                    <div className={`
                      relative w-20 h-20 rounded-full border-4 transition-all duration-300
                      ${selectedPhase.id === phase.id 
                        ? 'bg-primary border-primary shadow-2xl shadow-primary/50 scale-110' 
                        : phase.status === 'completed'
                          ? 'bg-chart-2/80 border-chart-2 shadow-lg shadow-chart-2/30'
                          : 'bg-yellow-500/80 border-yellow-500 shadow-lg shadow-yellow-500/30'
                      }
                      backdrop-blur-sm horror-glow
                    `}>
                      {/* Inner glow effect */}
                      <div className="absolute inset-2 rounded-full bg-gradient-radial from-white/20 to-transparent" />
                      
                      {/* Phase icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {phase.id === "1" && (
                          <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                        {phase.id === "2" && (
                          <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                          </svg>
                        )}
                        {phase.id === "3" && (
                          <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0.621 0 1.125-.504 1.125-1.125V9.375c0-.621.504-1.125 1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                          </svg>
                        )}
                        {phase.id === "4" && (
                          <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                          </svg>
                        )}
                      </div>

                      {/* Pulse animation for active */}
                      {selectedPhase.id === phase.id && (
                        <div className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
                      )}
                    </div>

                    {/* Phase label with improved hierarchy */}
                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                        {phase.phase}
                      </div>
                      <Badge 
                        variant={selectedPhase.id === phase.id ? "default" : "secondary"}
                        className="text-xs horror-glow"
                      >
                        {phase.date}
                      </Badge>
                    </div>

                    {/* Connection lines to next phase */}
                    {index < timelineData.length - 1 && (
                      <div className="absolute left-full top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20 transform -translate-y-1/2" />
                    )}
                  </button>
                )
              })}

              {/* Floating fog effect */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            </div>

            {/* Phase Content */}
            <div className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]" key={selectedPhase.id}>
              <Card className="border-0 bg-card/90 backdrop-blur-md horror-glow overflow-hidden">
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-2/5">
                    <img
                      src={selectedPhase.image}
                      alt={selectedPhase.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-3/5 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="horror-glow">
                        {selectedPhase.date}
                      </Badge>
                      <Badge variant={selectedPhase.status === 'completed' ? 'default' : 'secondary'}>
                        {selectedPhase.status === 'completed' ? 'Completado' : 'En Progreso'}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {selectedPhase.title}
                    </h3>
                    
                    <p className="text-lg font-medium text-primary mb-4">
                      {selectedPhase.phase}
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {selectedPhase.description}
                    </p>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Logros Clave:</h4>
                      <ul className="space-y-2">
                        {selectedPhase.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Interactive elements for phases with additional content */}
                      <div className="mt-6 space-y-4">
                        <div className="flex gap-3 flex-wrap">
                          {/* Video link for phases with videos */}
                          {selectedPhase.videoLink && (
                            <a
                              href={selectedPhase.videoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 horror-glow"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {selectedPhase.id === "2" ? "Ver Video de Entrevistas" : "Ver Video de la Maqueta"}
                            </a>
                          )}
                          
                          {/* Feedback button for phases with feedback */}
                          {selectedPhase.feedback && (
                            <button
                              onClick={() => setShowFeedback(!showFeedback)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 horror-glow"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.673 1.347 3.035 3.008 3.035 1.662 0 3.009-1.362 3.009-3.035C8.267 10.632 7.72 10 7.15 10c-.322 0-.63.073-.914.203a3.025 3.025 0 00-1.422 1.685c-.086.28-.13.576-.13.877z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c0-.621-.504-1.125-1.125-1.125H11.25a9 9 0 00-9-9z" />
                              </svg>
                              {showFeedback ? 'Ocultar Feedback' : 'Ver Feedback'}
                            </button>
                          )}
                        </div>
                        
                        {/* Expandable Feedback Section */}
                        {showFeedback && selectedPhase.feedback && (
                          <div className="p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-border/30 horror-glow">
                            <h5 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
                              </svg>
                              Feedback y Observaciones de la Fase
                            </h5>
                            
                            <div className="space-y-4">
                              {/* General Feedback */}
                              <div className="p-3 bg-background/50 rounded-lg border-l-4 border-primary/50">
                                <h6 className="font-semibold text-sm text-primary mb-2">{selectedPhase.feedback.general.title}</h6>
                                <ul className="space-y-2">
                                  {selectedPhase.feedback.general.recommendations.map((rec, index) => (
                                    <li key={index} className="text-sm text-foreground/80 leading-relaxed flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {/* Level 1 Feedback */}
                              <div className="p-3 bg-background/50 rounded-lg border-l-4 border-accent/50">
                                <h6 className="font-semibold text-sm text-accent mb-2">{selectedPhase.feedback.level1.title}</h6>
                                <ul className="space-y-2">
                                  {selectedPhase.feedback.level1.recommendations.map((rec, index) => (
                                    <li key={index} className="text-sm text-foreground/80 leading-relaxed flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {/* Level 2 Feedback */}
                              <div className="p-3 bg-background/50 rounded-lg border-l-4 border-chart-2/50">
                                <h6 className="font-semibold text-sm text-chart-2 mb-2">{selectedPhase.feedback.level2.title}</h6>
                                <ul className="space-y-2">
                                  {selectedPhase.feedback.level2.recommendations.map((rec, index) => (
                                    <li key={index} className="text-sm text-foreground/80 leading-relaxed flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}