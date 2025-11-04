"use client"

import { useState, useEffect, useRef } from "react"
import * as PIXI from 'pixi.js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ConstellationNode {
  id: string;
  title: string;
  phase: string;
  x: number;
  y: number;
  description: string;
  mechanics: string[];
  status: 'completed' | 'in-progress';
  interviews?: Interview[];
}

interface Interview {
  name: string;
  description: string;
  link: string;
  image: string | null;
}

const interviews: Interview[] = [
  {
    name: "Jose Paredes",
    description: "Usuario inglés avanzado - viajes",
    link: "https://drive.google.com/file/d/1ymVhodDsJ4Isb8L9-i3npGqpKtDB1Q-Y/view?usp=sharing",
    image: "/interviews/jose-paredes.png",
  },
  {
    name: "Melany Medina",
    description: "Usuario nivel pre intermedio",
    link: "https://drive.google.com/file/d/1-4it0g_7-VpFXwFSzgSsN3Ju6FjSw5Rs/view?usp=sharing",
    image: "/interviews/melany-medina.png",
  },
  {
    name: "Alonso",
    description: "Usuario A",
    link: "https://drive.google.com/file/d/10lceuvvAuO_BHuns6S67VVdFV03oa0b_/view?usp=drive_link",
    image: "/interviews/alonso.png",
  },
  {
    name: "Walter",
    description: "Usuario C",
    link: "https://drive.google.com/file/d/1NlJnEyfsQYuu460V8KB4BrKJlICffKzJ/view?usp=drive_link",
    image: null, 
  },
  {
    name: "Valeria",
    description: "Usuario D",
    link: "https://drive.google.com/file/d/1r7jcCdOTchutg33isQn9eQgs9R2bWGWR/view?usp=drive_link",
    image: "/interviews/valeria-hancco.png",
  },
];

const constellationData: ConstellationNode[] = [
  {
    id: "1",
    title: "Entrevistas",
    phase: "Investigación de Usuarios",
    x: 0.2,
    y: 0.3,
    description: "La fase inicial se centró en comprender las necesidades, motivaciones y frustraciones de los usuarios al aprender un nuevo idioma a través de entrevistas semi-estructuradas.",
    mechanics: [
      "Identificación de patrones de comportamiento.",
      "Recopilación de puntos de dolor (pain points).",
      "Validación de hipótesis iniciales sobre el aprendizaje.",
      "Definición de perfiles de usuario (personas)."
    ],
    status: 'completed',
    interviews: interviews,
  },
  {
    id: "2",
    title: "Real Life Testing",
    phase: "Validación",
    x: 0.4,
    y: 0.5,
    description: "Pruebas físicas con usuarios para validar mecánicas de interacción antes del desarrollo digital.",
    mechanics: [
      "Laberinto físico simulando el juego",
      "Mecánicas de persecución y supervivencia",
      "Sistema de defensa con objetos",
      "Feedback de usuarios reales"
    ],
    status: 'completed'
  },
  {
    id: "3",
    title: "Prototipo",
    phase: "Diseño",
    x: 0.6,
    y: 0.3,
    description: "Maqueta de baja fidelidad para reconstruir el escenario y validar la experiencia de usuario.",
    mechanics: [
      "Construcción de ambiente físico",
      "Pruebas de iluminación y atmósfera",
      "Validación de interacciones multimodales",
      "Refinamiento basado en observaciones"
    ],
    status: 'completed'
  },
  {
    id: "4",
    title: "Desarrollo",
    phase: "Implementación",
    x: 0.8,
    y: 0.5,
    description: "Desarrollo del prototipo funcional en Unity con hand tracking y mecánicas de interacción.",
    mechanics: [
      "Implementación en Unity + SteamVR",
      "Hand tracking para recolección",
      "Movimiento corporal en VR",
      "Herramientas de luz y defensa"
    ],
    status: 'in-progress'
  }
]

export default function FinalProjectPage() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<PIXI.Application | null>(null)
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(true)

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

        // Container for all elements
        const container = new PIXI.Container()
        app.stage.addChild(container)

        // Create background stars
        for (let i = 0; i < 200; i++) {
          const graphics = new PIXI.Graphics()
          const size = Math.random() * 2 + 1
          graphics.circle(0, 0, size)
          graphics.fill({ color: 0xffffff, alpha: Math.random() * 0.7 + 0.3 })
          
          const star = {
            sprite: graphics,
            x: Math.random() * app.screen.width,
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

        // Create constellation nodes
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
          
          graphics.eventMode = 'static'
          graphics.cursor = 'pointer'
          graphics.hitArea = new PIXI.Circle(0, 0, 30)
          
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
            setShowInfo(true)
          })
          
          container.addChild(graphics)
          nodes.push(node)
        })

        let mouseX = app.screen.width / 2
        let mouseY = app.screen.height / 2

        app.stage.eventMode = 'static'
        app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height)
        app.stage.on('pointermove', (e) => {
          mouseX = e.global.x
          mouseY = e.global.y
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

          // Draw lines to mouse from nearby nodes
          nodes.forEach(node => {
            const dx = mouseX - node.x
            const dy = mouseY - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 200) {
              const alpha = (200 - distance) / 200 * 0.3
              linesGraphics.moveTo(node.x, node.y)
              linesGraphics.lineTo(mouseX, mouseY)
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

      {/* Game Title and Brief Description - Top Left
      {showInfo && !selectedNode && (
        <div className="absolute top-8 left-8 max-w-md pointer-events-none animate-[fadeIn_0.5s_ease-in-out_forwards]">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            LinguaConnect
          </h1>
          <p className="text-lg text-blue-200 mb-6 drop-shadow-lg">
            Una aplicación para conectar aprendices de idiomas
          </p>
          <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Concepto</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Una plataforma social que facilita la práctica de idiomas conectando a usuarios con hablantes nativos y otros aprendices a través de interacciones significativas.
            </p>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Mecánicas Clave</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 1 1 3 0m-3 6a1.5 1.5 0 0 0-3 0v2a7.5 7.5 0 0 0 15 0v-5a1.5 1.5 0 0 0-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 0 1 3 0v1m0 0V11m0-5.5a1.5 1.5 0 0 1 3 0v3m0 0V11" />
                </svg>
                <span><strong>Conexiones Significativas:</strong> Interactúa con hablantes nativos y aprendices</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
                </svg>
                <span><strong>Práctica Interactiva:</strong> Mejora tus habilidades lingüísticas en un entorno inmersivo</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Aprendizaje Personalizado:</strong> Contenido y conexiones adaptadas a tus necesidades</span>
              </li>
            </ul>
          </div>
        </div>
      )} */}

      {/* Instructions - Top Right */}
      {!selectedNode && (
        <div className="absolute top-8 right-8 max-w-xs pointer-events-none animate-[fadeIn_0.5s_ease-in-out_0.2s_forwards] opacity-0">
          <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Explora el Roadmap
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Mueve el mouse cerca de las estrellas para revelar conexiones.
            </p>
            <p className="text-sm text-gray-300">
              Haz clic en los nodos azules y amarillos para ver detalles de cada fase.
            </p>
          </div>
        </div>
      )}

      {/* Selected Node Details - Center */}
      {selectedNode && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[fadeIn_0.3s_ease-in-out_forwards]">
          <div className="bg-black/80 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl p-8 max-w-2xl pointer-events-auto shadow-2xl">
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

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            {selectedNode.id === '1' && selectedNode.interviews && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">Entrevistas Realizadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-2">
                  {selectedNode.interviews.map((interview, index) => (
                    <Card key={index} className="bg-slate-800/50 border-slate-700">
                      <CardHeader className="flex flex-row items-center gap-4 p-4">
                        {interview.image && (
                          <Image
                            src={interview.image}
                            alt={`Foto de ${interview.name}`}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <CardTitle className="text-base text-white">{interview.name}</CardTitle>
                          <p className="text-xs text-slate-400">{interview.description}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Button asChild className="w-full" size="sm">
                          <Link href={interview.link} target="_blank" rel="noopener noreferrer">
                            Ver Grabación
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Puntos Clave</h3>
            <ul className="space-y-3">
              {selectedNode.mechanics.map((mechanic, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base">{mechanic}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 italic">
                Haz clic fuera para explorar otros nodos de la constelación
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend - Bottom Right */}
      <div className="absolute bottom-8 right-8 pointer-events-none animate-[fadeIn_0.5s_ease-in-out_0.4s_forwards] opacity-0">
        <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-400 mb-3">Leyenda</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-300">Fase Completada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-300">En Progreso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
