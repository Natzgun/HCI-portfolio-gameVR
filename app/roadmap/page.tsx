"use client"

import { useState, useEffect, useRef } from "react"
import * as PIXI from 'pixi.js'
import Link from "next/link"

interface FeedbackSection {
  title: string;
  recommendations: string[];
}

interface Feedback {
  general?: FeedbackSection;
  level1?: FeedbackSection;
  level2?: FeedbackSection;
  level3?: FeedbackSection;
  level4?: FeedbackSection;
}

interface ConstellationNode {
  id: string;
  title: string;
  phase: string;
  x: number;
  y: number;
  date: string;
  description: string;
  achievements: string[];
  status: 'completed' | 'in-progress';
  image?: string;
  videoLink?: string;
  videos?: { title: string; url: string; embedId: string }[];
  feedback?: Feedback;
}

const constellationData: ConstellationNode[] = [
  {
    id: "1",
    title: "Aterrizaje de ideas e investigación",
    phase: "Investigación",
    date: "Semana 1",
    x: 0.15,
    y: 0.3,
    description: "Lluvia de ideas para definir el concepto del juego como herramienta terapéutica. Investigación de interacciones multimodales en VR.",
    achievements: [
      "Definición del problema: Dificultad en toma de decisiones",
      "Público objetivo: Adolescentes y adultos",
      "Tecnología: Unity, SteamVR y C#",
      "Primeros bocetos de niveles oníricos",
    ],
    status: 'completed',
    image: "/brainstorm.jpeg"
  },
  {
    id: "2",
    title: "Real Life Testing",
    phase: "Real Life Testing",
    date: "Semana 2",
    x: 0.32,
    y: 0.45,
    description: "Experiencia física para validar mecánicas de interacción antes del desarrollo digital con usuarios reales.",
    achievements: [
      "Experiencia física que simula mecánicas VR",
      "Pruebas con usuarios reales",
      "Validación de interacción gestual",
      "Documentación en video",
    ],
    status: 'completed',
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
    }
  },
  {
    id: "3",
    title: "Realización de maqueta y validación",
    phase: "Diseño y Validación",
    date: "Semana 2",
    x: 0.49,
    y: 0.3,
    description: "Prototipo de baja fidelidad. Laberinto físico con persecución y defensa mediante objetos encontrados.",
    achievements: [
      "Laberinto físico simulando el juego",
      "Mecánicas de persecución y supervivencia",
      "Sistema de defensa con objetos",
      "Refinamiento basado en observaciones",
    ],
    status: 'completed',
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
    }
  },
  {
    id: "4",
    title: "Prototipado y Desarrollo",
    phase: "Desarrollo",
    date: "Semana 3-4",
    x: 0.66,
    y: 0.45,
    description: "Prototipo funcional en Unity. Implementación de hand tracking para interacciones naturales e intuitivas.",
    achievements: [
      "Hand tracking para herramientas de luz",
      "Primer nivel: El Jardín de los Senderos",
      "Estímulos de miedo y control",
      "Movimiento corporal e interacción gestual",
    ],
    status: 'completed',
    image: "/vr-prototype-development-unity-editor-interface.jpg"
  },
  {
    id: "5",
    title: "Simulación del Juego",
    phase: "Demostración",
    date: "Semana 5",
    x: 0.83,
    y: 0.3,
    description: "Experiencia completa del juego VR en acción. Observa cómo las mecánicas, interacciones y atmósfera cobran vida.",
    achievements: [
      "Video demostrativo completo del gameplay",
      "Muestra de todas las mecánicas implementadas",
      "Experiencia inmersiva en realidad virtual",
      "Validación del concepto final",
    ],
    status: 'completed',
    image: "/game-simulation-thumbnail.png",
    videos: [
      {
        title: "Escenario: Victoria",
        url: "https://youtu.be/pg3VO4VGZ1Q",
        embedId: "pg3VO4VGZ1Q"
      },
      {
        title: "Escenario: Derrota",
        url: "https://youtu.be/54H9Fpn50_0",
        embedId: "54H9Fpn50_0"
      }
    ]
  }
]

export default function RoadmapPage() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<PIXI.Application | null>(null)
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let mounted = true
    const stars: any[] = []
    const nodes: any[] = []

    const initPixiApp = async () => {
      try {
        const app = new PIXI.Application()
        
        await app.init({
          width: window.innerWidth,
          height: window.innerHeight,
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

        // Container for all elements - will be draggable
        const container = new PIXI.Container()
        app.stage.addChild(container)

        // Dragging state
        let isDragging = false
        let dragStartX = 0
        let containerStartX = 0
        const minX = -app.screen.width * 0.3  // Can drag 30% to the left
        const maxX = 0

        // Create background stars - extend area for dragging
        const extendedWidth = app.screen.width * 1.5
        for (let i = 0; i < 300; i++) {
          const graphics = new PIXI.Graphics()
          const size = Math.random() * 2 + 1
          graphics.circle(0, 0, size)
          graphics.fill({ color: 0xffffff, alpha: Math.random() * 0.7 + 0.3 })
          
          const star = {
            sprite: graphics,
            x: Math.random() * extendedWidth - app.screen.width * 0.3,
            y: Math.random() * app.screen.height,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.01
          }
          
          graphics.x = star.x
          graphics.y = star.y
          container.addChild(graphics)
          stars.push(star)
        }

        // Lines container
        const linesGraphics = new PIXI.Graphics()
        container.addChild(linesGraphics)

        // Create constellation nodes with labels (Visibility principle)
        constellationData.forEach((nodeData, index) => {
          const graphics = new PIXI.Graphics()
          const x = nodeData.x * app.screen.width
          const y = nodeData.y * app.screen.height
          
          const node = {
            data: nodeData,
            sprite: graphics,
            x,
            y,
            baseSize: 15,
            currentSize: 15,
            targetSize: 15,
            glow: 0,
            pulsePhase: index * Math.PI * 0.5
          }
          
          // Affordance: Pointer cursor indicates clickability
          graphics.eventMode = 'static'
          graphics.cursor = 'pointer'
          graphics.hitArea = new PIXI.Circle(0, 0, 30)
          
          // Feedback: Visual response on hover
          graphics.on('pointerover', () => {
            setHoveredNode(nodeData.id)
            node.targetSize = 25
          })
          
          graphics.on('pointerout', () => {
            setHoveredNode(null)
            node.targetSize = 15
          })
          
          graphics.on('pointertap', () => {
            setSelectedNode(nodeData)
          })
          
          container.addChild(graphics)
          
          // Add info card as HTML overlay that moves with container
          const isDown = index % 2 === 0
          
          // Adjust card positioning to keep within screen bounds
          let cardYOffset = isDown ? 80 : -250 // Even cards (down) positioned higher from star
          // If node is too high or too low, adjust
          if (!isDown && y < 300) cardYOffset = 80 // If too high, put below
          if (isDown && y > app.screen.height - 300) cardYOffset = -250 // If too low, put above
          
          const cardContainer = new PIXI.Container()
          cardContainer.x = x
          cardContainer.y = y + cardYOffset
          
          // Card background - 90% width (259px instead of 288px)
          const cardWidth = 259
          const cardHeight = 180
          const halfWidth = cardWidth / 2
          const cardBg = new PIXI.Graphics()
          cardBg.rect(-halfWidth, 0, cardWidth, cardHeight)
          cardBg.fill({ color: 0x000000, alpha: 0.8 })
          cardBg.stroke({ width: 2, color: nodeData.status === 'completed' ? 0x60a5fa : 0xfbbf24, alpha: 0.5 })
          cardContainer.addChild(cardBg)
          
          // Make card clickable
          cardBg.eventMode = 'static'
          cardBg.cursor = 'pointer'
          cardBg.on('pointertap', () => setSelectedNode(nodeData))
          cardBg.on('pointerover', () => {
            cardBg.clear()
            cardBg.rect(-halfWidth, 0, cardWidth, cardHeight)
            cardBg.fill({ color: 0x000000, alpha: 0.9 })
            cardBg.stroke({ width: 2, color: nodeData.status === 'completed' ? 0x93c5fd : 0xfcd34d, alpha: 0.7 })
          })
          cardBg.on('pointerout', () => {
            cardBg.clear()
            cardBg.rect(-halfWidth, 0, cardWidth, cardHeight)
            cardBg.fill({ color: 0x000000, alpha: 0.8 })
            cardBg.stroke({ width: 2, color: nodeData.status === 'completed' ? 0x60a5fa : 0xfbbf24, alpha: 0.5 })
          })
          
          // Card title
          const titleText = new PIXI.Text({
            text: nodeData.title.length > 35 ? nodeData.title.substring(0, 32) + '...' : nodeData.title,
            style: {
              fontSize: 13,
              fill: 0xffffff,
              fontWeight: 'bold',
              wordWrap: true,
              wordWrapWidth: cardWidth - 20,
            }
          })
          titleText.x = -halfWidth + 10
          titleText.y = 10
          cardContainer.addChild(titleText)
          
          // Add image below title
          if (nodeData.image) {
            PIXI.Assets.load(nodeData.image).then((texture) => {
              const imageSprite = new PIXI.Sprite(texture)
              imageSprite.width = cardWidth - 20
              imageSprite.height = 90
              imageSprite.x = -halfWidth + 10
              imageSprite.y = 45
              cardContainer.addChild(imageSprite)
            })
          }
          
          // Description below image
          const descText = new PIXI.Text({
            text: nodeData.description.length > 60 ? nodeData.description.substring(0, 57) + '...' : nodeData.description,
            style: {
              fontSize: 10,
              fill: 0xd1d5db,
              wordWrap: true,
              wordWrapWidth: cardWidth - 20,
              lineHeight: 14,
            }
          })
          descText.x = -halfWidth + 10
          descText.y = 145
          cardContainer.addChild(descText)
          
          container.addChild(cardContainer)
          
          nodes.push(node)
        })

        let mouseX = app.screen.width / 2
        let mouseY = app.screen.height / 2

        // Setup dragging for the stage
        app.stage.eventMode = 'static'
        app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height)
        app.stage.cursor = 'grab'
        
        app.stage.on('pointerdown', (e) => {
          isDragging = true
          dragStartX = e.global.x
          containerStartX = container.x
          app.stage.cursor = 'grabbing'
        })
        
        app.stage.on('pointerup', () => {
          isDragging = false
          app.stage.cursor = 'grab'
        })
        
        app.stage.on('pointerupoutside', () => {
          isDragging = false
          app.stage.cursor = 'grab'
        })
        
        app.stage.on('pointermove', (e) => {
          mouseX = e.global.x
          mouseY = e.global.y
          
          if (isDragging) {
            const dragDelta = e.global.x - dragStartX
            const newX = containerStartX + dragDelta
            // Clamp the position
            const clampedX = Math.max(minX, Math.min(maxX, newX))
            container.x = clampedX
          }
        })

        // Animation loop
        app.ticker.add(() => {
          // Animate background stars
          stars.forEach(star => {
            star.twinkle += star.twinkleSpeed
            const alpha = 0.3 + Math.sin(star.twinkle) * 0.4
            star.sprite.alpha = alpha
          })

          // Clear and redraw lines
          linesGraphics.clear()

          // Draw constellation connections
          for (let i = 0; i < nodes.length - 1; i++) {
            const node1 = nodes[i]
            const node2 = nodes[i + 1]
            
            linesGraphics.moveTo(node1.x, node1.y)
            linesGraphics.lineTo(node2.x, node2.y)
            linesGraphics.stroke({ 
              color: node1.data.status === 'completed' ? 0x60a5fa : 0xfbbf24, 
              width: 2, 
              alpha: 0.6 
            })
          }

          // Draw lines to mouse from nearby nodes (account for container offset)
          nodes.forEach(node => {
            const dx = mouseX - (node.x + container.x)
            const dy = mouseY - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 200) {
              const alpha = (200 - distance) / 200 * 0.3
              linesGraphics.moveTo(node.x, node.y)
              linesGraphics.lineTo(mouseX - container.x, mouseY)
              linesGraphics.stroke({ color: 0x60a5fa, width: 1, alpha })
            }
          })

          // Animate nodes
          nodes.forEach(node => {
            node.pulsePhase += 0.02
            const pulse = Math.sin(node.pulsePhase) * 2
            
            // Smooth size transition
            node.currentSize += (node.targetSize - node.currentSize) * 0.1
            
            node.sprite.clear()
            
            // Outer glow ring
            if (node.data.status === 'completed') {
              node.sprite.circle(0, 0, node.currentSize + pulse + 5)
              node.sprite.fill({ color: 0x60a5fa, alpha: 0.2 })
            }
            
            // Main node
            node.sprite.circle(0, 0, node.currentSize + pulse)
            node.sprite.fill({ 
              color: node.data.status === 'completed' ? 0x3b82f6 : 0xfbbf24, 
              alpha: 0.9 
            })
            
            // Inner highlight
            node.sprite.circle(0, 0, (node.currentSize + pulse) * 0.5)
            node.sprite.fill({ color: 0xffffff, alpha: 0.4 })
            
            node.sprite.x = node.x
            node.sprite.y = node.y
          })
        })

        // Handle window resize
        const handleResize = () => {
          app.renderer.resize(window.innerWidth, window.innerHeight)
          
          // Reposition nodes
          nodes.forEach((node, index) => {
            node.x = constellationData[index].x * window.innerWidth
            node.y = constellationData[index].y * window.innerHeight
          })
        }

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
        }

      } catch (error) {
        console.error('Error initializing Pixi app:', error)
      }
    }

    initPixiApp()

    return () => {
      mounted = false
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true })
        appRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black">
      {/* Pixi Canvas */}
      <div ref={canvasRef} className="absolute inset-0" />

      {/* Logo - Top Left */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 pointer-events-auto flex items-center space-x-2 transition-transform hover:scale-105"
      >
        <img 
          src="/worstg.png" 
          alt="Worst Generation Logo"
          className="h-8 w-auto drop-shadow-lg logo-glow scale-[0.7]"
        />
      </Link>

      {/* Back to VR Game - Affordance: Arrow + hover state shows it's clickable */}
      <Link
        href="/vr-game"
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-blue-600/80 backdrop-blur-sm rounded-lg hover:bg-blue-500 hover:scale-105 transition-all text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        VR Game
      </Link>

      {/* Selected Node Details - Center */}
      {selectedNode && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[fadeIn_0.3s_ease-in-out_forwards] z-50 p-6">
          <div className="bg-black/90 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${selectedNode.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'} animate-pulse`} />
                <h2 className="text-4xl font-bold text-white">{selectedNode.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-white transition-colors pointer-events-auto"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-sm font-semibold">
                {selectedNode.phase}
              </span>
              <span className={`ml-3 inline-block px-4 py-2 ${
                selectedNode.status === 'completed' 
                  ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                  : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
              } border rounded-full text-sm font-semibold`}>
                {selectedNode.status === 'completed' ? 'Completado' : 'En Progreso'}
              </span>
            </div>

            {/* Image */}
            {selectedNode.image && (
              <div className="mb-6 rounded-lg overflow-hidden border-2 border-blue-500/30">
                <img 
                  src={selectedNode.image} 
                  alt={selectedNode.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Embedded Videos - YouTube Style */}
            {selectedNode.videos && selectedNode.videos.length > 0 && (
              <div className="mb-6 space-y-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Videos de Demostración
                </h3>
                {selectedNode.videos.map((video, index) => (
                  <div key={index} className="bg-black/40 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-xl font-semibold text-white mb-3">{video.title}</h4>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Video Link (for backward compatibility) */}
            {selectedNode.videoLink && !selectedNode.videos && (
              <a 
                href={selectedNode.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-600/80 hover:bg-blue-500 rounded-lg transition-colors text-white font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver Video
              </a>
            )}

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Logros Principales</h3>
            <ul className="space-y-3">
              {selectedNode.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base">{achievement}</span>
                </li>
              ))}
            </ul>

            {/* Feedback Section */}
            {selectedNode.feedback && (
              <div className="mt-8 pt-8 border-t-2 border-blue-500/30">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-6 flex items-center gap-2">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Feedback Recibido
                </h3>
                
                <div className="space-y-6">
                  {selectedNode.feedback.general && (
                    <div className="bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-lg">
                      <h4 className="text-xl font-bold text-blue-300 mb-3">{selectedNode.feedback.general.title}</h4>
                      <ul className="space-y-2">
                        {selectedNode.feedback.general.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-gray-300 pl-4 text-base leading-relaxed">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedNode.feedback.level1 && (
                    <div className="bg-purple-500/10 border-l-4 border-purple-500 p-5 rounded-r-lg">
                      <h4 className="text-xl font-bold text-purple-300 mb-3">{selectedNode.feedback.level1.title}</h4>
                      <ul className="space-y-2">
                        {selectedNode.feedback.level1.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-gray-300 pl-4 text-base leading-relaxed">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedNode.feedback.level2 && (
                    <div className="bg-green-500/10 border-l-4 border-green-500 p-5 rounded-r-lg">
                      <h4 className="text-xl font-bold text-green-300 mb-3">{selectedNode.feedback.level2.title}</h4>
                      <ul className="space-y-2">
                        {selectedNode.feedback.level2.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-gray-300 pl-4 text-base leading-relaxed">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedNode.feedback.level3 && (
                    <div className="bg-orange-500/10 border-l-4 border-orange-500 p-5 rounded-r-lg">
                      <h4 className="text-xl font-bold text-orange-300 mb-3">{selectedNode.feedback.level3.title}</h4>
                      <ul className="space-y-2">
                        {selectedNode.feedback.level3.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-gray-300 pl-4 text-base leading-relaxed">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedNode.feedback.level4 && (
                    <div className="bg-red-500/10 border-l-4 border-red-500 p-5 rounded-r-lg">
                      <h4 className="text-xl font-bold text-red-300 mb-3">{selectedNode.feedback.level4.title}</h4>
                      <ul className="space-y-2">
                        {selectedNode.feedback.level4.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-gray-300 pl-4 text-base leading-relaxed">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
