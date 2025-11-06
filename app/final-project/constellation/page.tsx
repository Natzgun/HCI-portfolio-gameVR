"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
  id: string;
  name: string;
  profile: string;
  description: string;
  link: string;
  image: string | null;
}

interface Questionnaire {
  type: 'student' | 'teacher';
  sections?: {
    title: string;
    questions: string[];
  }[];
  questions?: string[];
}

const interviews: Interview[] = [
  {
    id: "A",
    name: "Participante A",
    profile: "Estudiante intermedio",
    description: "Motivado por la necesidad de acceder a información académica (investigación) y conectar con otros. Aprende principalmente por inmersión y consumo de medios.",
    link: "https://drive.google.com/file/d/10lceuvvAuO_BHuns6S67VVdFV03oa0b_/view?usp=drive_link",
    image: "/interviews/alonso.png",
  },
  {
    id: "B",
    name: "Participante B",
    profile: "Estudiante avanzado",
    description: "Alguien que ya es conversacionalmente fluido, pero que lucha por encontrar la palabra precisa y a menudo recurre a un vocabulario más simple del que posee pasivamente.",
    link: "https://drive.google.com/file/d/1ymVhodDsJ4Isb8L9-i3npGqpKtDB1Q-Y/view?usp=sharing",
    image: "/interviews/jose-paredes.png",
  },
  {
    id: "C",
    name: "Participante C",
    profile: "Estudiante con poca práctica comunicativa",
    description: "Usuario con nivel de inglés intermedio auto-percibido (más fuerte en lectura que en escucha o habla). Su principal método actual es la lectura, aunque antes hablaba más. Tiende a traducir mentalmente desde el español.",
    link: "https://drive.google.com/file/d/1NlJnEyfsQYuu460V8KB4BrKJlICffKzJ/view?usp=drive_link",
    image: null,
  },
  {
    id: "D",
    name: "Participante D",
    profile: "Docente de idiomas",
    description: "Docente de idiomas con experiencia enseñando inglés en diversos niveles. Actualmente cursando una maestría y especialización (CELTA). Aporta la perspectiva pedagógica sobre las dificultades y estrategias de los estudiantes.",
    link: "https://drive.google.com/file/d/1r7jcCdOTchutg33isQn9eQgs9R2bWGWR/view?usp=drive_link",
    image: "/interviews/valeria-hancco.png",
  },
];

const questionnaires: Questionnaire[] = [
  {
    type: 'student',
    sections: [
      {
        title: "Sección 1: El Contexto",
        questions: [
          "En una escala del 1 al 10, ¿cómo calificas tu habilidad para entender inglés (leyendo/escuchando)? ¿Y tu habilidad para hablarlo?",
          "¿Te pasa que reconoces una palabra al leer, pero días después, cuando quieres usarla, no la recuerdas?"
        ]
      },
      {
        title: "Sección 2: El \"Bloqueo\" y sus Causas",
        questions: [
          "¿Cómo percibes que es tu proceso de recuperación de lenguaje durante una conversación o redacción?",
          "Cuando olvidas una palabra ¿Cómo intentas recordar o reemplazarla? (¿usas una palabra más simple, relacionada, describes la idea?).",
          "Cuando hablas, ¿sientes que piensas en español y traduces, o las palabras fluyen directamente en inglés?",
          "¿Te confundes a menudo al elegir entre palabras con significados parecidos (como see, look y watch)?",
          "¿Sientes a veces que usas palabras \"fáciles\" (como \"good\") aunque sabes que existe una palabra más precisa (como \"outstanding\"), pero no te viene a la mente lo suficientemente rápido?"
        ]
      },
      {
        title: "Sección 3: El Impacto",
        questions: [
          "¿Cómo afecta esta experiencia a tu confianza general? ¿Evitas hablar en ciertas situaciones por miedo a bloquearte?"
        ]
      }
    ]
  },
  {
    type: 'teacher',
    questions: [
      "¿Qué falla en los métodos habituales de enseñar vocabulario que dificulta que los alumnos usen las palabras que aprenden?",
      "Cuando un alumno se 'bloquea' buscando una palabra, ¿qué habilidad clave crees que necesita desarrollar para encontrarla?",
      "¿Qué tipo de práctica ayudaría más a los alumnos a poder usar espontáneamente las palabras que ya entienden?",
      "¿Cómo afecta a los alumnos el traducir mentalmente o confundir palabras parecidas al comunicarse?",
      "En tu opinión, ¿cuál es la necesidad más importante para que los alumnos puedan usar activamente el vocabulario que ya conocen?"
    ]
  }
];

const keyNeeds = [
  {
    number: "1",
    description: "Los estudiantes necesitan desarrollar la capacidad de formular ideas directamente en inglés para mejorar la fluidez.",
  },
  {
    number: "2",
    description: "Se necesitan prácticas que fomenten la recuperación activa de palabras desde la memoria conectándolas con su significado y contexto.",
  },
  {
    number: "3",
    description: "La práctica constante es fundamental, independientemente de conocer las reglas gramaticales.",
  },
  {
    number: "4",
    description: "Existe la necesidad de métodos de aprendizaje que sean motivadores y atractivos para mantener el compromiso del estudiante.",
  }
];

const constellationData: ConstellationNode[] = [
  {
    id: "1",
    title: "Entrevistas & Cuestionarios",
    phase: "Investigación de Usuarios",
    x: 0.2,
    y: 0.3,
    description: "La fase inicial se centró en comprender las necesidades, motivaciones y frustraciones de los usuarios al aprender un nuevo idioma a través de entrevistas semi-estructuradas y cuestionarios específicos.",
    mechanics: [
      "4 entrevistas realizadas (3 estudiantes + 1 docente experto)",
      "Cuestionarios diferenciados por perfil",
      "Identificación de patrones de comportamiento",
      "Recopilación de puntos de dolor (pain points)",
      "Validación de hipótesis sobre aprendizaje de idiomas"
    ],
    status: 'completed',
    interviews: interviews,
  },
  {
    id: "1.5",
    title: "Necesidades Identificadas",
    phase: "Análisis de Hallazgos",
    x: 0.35,
    y: 0.2,
    description: "A partir de las entrevistas y cuestionarios, se identificaron 4 necesidades clave que guían el diseño de la solución.",
    mechanics: keyNeeds.map(need => `Need #${need.number}: ${need.description}`),
    status: 'completed'
  },
  {
    id: "2",
    title: "Real Life Testing",
    phase: "Validación",
    x: 0.5,
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
    x: 0.65,
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Reset slide when node changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [selectedNode])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedNode) return
      
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === 'Escape') {
        setSelectedNode(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedNode, currentSlide])

  // Get slides based on selected node
  const getSlides = () => {
    if (!selectedNode) return []
    
    const slides = []
    
    // Slide 1: Overview
    slides.push({
      id: 'overview',
      title: selectedNode.title,
      content: 'overview'
    })
    
    // Slide 2: Interviews (only for node 1)
    if (selectedNode.id === '1' && selectedNode.interviews) {
      slides.push({
        id: 'interviews',
        title: 'Entrevistas Realizadas',
        content: 'interviews'
      })
    }
    
    // Slide 3: Questionnaires (only for node 1)
    if (selectedNode.id === '1') {
      slides.push({
        id: 'questionnaires',
        title: 'Cuestionarios Aplicados',
        content: 'questionnaires'
      })
    }
    
    // Slide 2: Key Needs (only for node 1.5)
    if (selectedNode.id === '1.5') {
      slides.push({
        id: 'needs',
        title: 'Necesidades Clave del Usuario',
        content: 'needs'
      })
    }
    
    return slides
  }

  const slides = getSlides()
  const totalSlides = slides.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  // Reset slide when node changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [selectedNode])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedNode) return
      
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === 'Escape') {
        setSelectedNode(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedNode, nextSlide, prevSlide])

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
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black touch-none">
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
        <div className="absolute top-4 right-4 md:top-8 md:right-8 max-w-[90vw] sm:max-w-xs pointer-events-none animate-[fadeIn_0.5s_ease-in-out_0.2s_forwards] opacity-0">
          <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-3 md:p-4">
            <h3 className="text-base md:text-lg font-semibold text-blue-400 mb-2 md:mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Explora el Roadmap
            </h3>
            <p className="text-xs md:text-sm text-gray-300 mb-2 md:mb-3">
              Mueve el mouse cerca de las estrellas para revelar conexiones.
            </p>
            <p className="text-xs md:text-sm text-gray-300">
              Haz clic en los nodos azules y amarillos para ver detalles de cada fase.
            </p>
          </div>
        </div>
      )}

      {/* Selected Node Details - Center */}
      {selectedNode && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[fadeIn_0.3s_ease-in-out_forwards] p-4 md:p-8">
          <div 
            className="bg-black/80 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl p-4 md:p-8 max-w-full md:max-w-3xl lg:max-w-5xl w-full h-[85vh] md:h-[80vh] pointer-events-auto shadow-2xl flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4 md:mb-6 gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${selectedNode.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'} animate-pulse flex-shrink-0`} />
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white truncate">{slides[currentSlide]?.title || selectedNode.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-white transition-colors pointer-events-auto flex-shrink-0"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Slide Content - Scrollable area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Slide 1: Overview */}
              {slides[currentSlide]?.content === 'overview' && (
                <div className="animate-[fadeIn_0.3s_ease-in-out]">
                  <div className="mb-4">
                    <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-xs md:text-sm font-semibold">
                      {selectedNode.phase}
                    </span>
                    <span className={`ml-2 md:ml-3 inline-block px-3 md:px-4 py-1.5 md:py-2 ${
                      selectedNode.status === 'completed' 
                        ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                        : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
                    } border rounded-full text-xs md:text-sm font-semibold`}>
                      {selectedNode.status === 'completed' ? 'Completado' : 'En Progreso'}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                    {selectedNode.description}
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-3 md:mb-4">Puntos Clave</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {selectedNode.mechanics.map((mechanic, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3 text-gray-300">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0 mt-0.5 md:mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs md:text-base">{mechanic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Slide 2: Interviews */}
              {slides[currentSlide]?.content === 'interviews' && selectedNode.interviews && (
                <div className="animate-[fadeIn_0.3s_ease-in-out]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    {selectedNode.interviews.map((interview, index) => (
                      <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-3 md:gap-4 p-3 md:p-4">
                          {interview.image && (
                            <Image
                              src={interview.image}
                              alt={`Foto de ${interview.name}`}
                              width={40}
                              height={40}
                              className="rounded-full md:w-12 md:h-12"
                            />
                          )}
                          {!interview.image && (
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 font-bold text-base md:text-lg text-blue-400">
                              {interview.id}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm md:text-base text-white truncate">{interview.name}</CardTitle>
                            <p className="text-xs text-blue-400 font-semibold truncate">{interview.profile}</p>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{interview.description}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 md:p-4 pt-0">
                          <Button asChild className="w-full text-xs md:text-sm" size="sm" variant="outline">
                            <Link href={interview.link} target="_blank" rel="noopener noreferrer">
                              <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                              Ver Entrevista
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 3: Questionnaires */}
              {slides[currentSlide]?.content === 'questionnaires' && (
                <div className="animate-[fadeIn_0.3s_ease-in-out] space-y-4 md:space-y-6">
                  {/* Student Questionnaire */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
                      <CardTitle className="text-base md:text-lg text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span>Cuestionario para Estudiantes</span>
                        <span className="text-xs font-normal text-blue-400 bg-blue-500/20 px-2 md:px-3 py-1 rounded-full w-fit">
                          Participantes A, B y C
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6 pt-0">
                      {questionnaires[0].sections?.map((section, sIdx) => (
                        <div key={sIdx} className="pb-2 md:pb-3 border-b border-slate-700 last:border-0">
                          <h4 className="font-semibold text-blue-300 mb-2 text-xs md:text-sm">{section.title}</h4>
                          <ul className="space-y-1.5 md:space-y-2">
                            {section.questions.map((q, qIdx) => (
                              <li key={qIdx} className="text-xs text-slate-300 flex gap-2">
                                <span className="text-blue-400 flex-shrink-0">•</span>
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Teacher Questionnaire */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
                      <CardTitle className="text-base md:text-lg text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span>Cuestionario para Docente</span>
                        <span className="text-xs font-normal text-orange-400 bg-orange-500/20 px-2 md:px-3 py-1 rounded-full w-fit">
                          Participante D - Usuario Experto
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 md:p-6 pt-0">
                      <ul className="space-y-1.5 md:space-y-2">
                        {questionnaires[1].questions?.map((q, qIdx) => (
                          <li key={qIdx} className="text-xs text-slate-300 flex gap-2">
                            <span className="text-orange-400 flex-shrink-0">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Slide: Key Needs */}
              {slides[currentSlide]?.content === 'needs' && (
                <div className="animate-[fadeIn_0.3s_ease-in-out] space-y-3 md:space-y-4">
                  {keyNeeds.map((need) => (
                    <Card key={need.number} className="bg-slate-800/50 border-l-4 border-l-blue-500">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 font-bold text-base md:text-lg text-blue-400">
                            {need.number}
                          </div>
                          <div className="flex-1 pt-0.5 md:pt-1">
                            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                              <span className="font-semibold text-blue-400">Need #{need.number}: </span>
                              {need.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            {totalSlides > 1 && (
              <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 border-t border-gray-700 flex-shrink-0">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-colors text-blue-300 text-sm md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                {/* Slide Indicators */}
                <div className="flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                        index === currentSlide 
                          ? 'bg-blue-500 w-6 md:w-8' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Ir a slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-colors text-blue-300 text-sm md:text-base"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Slide counter */}
            <div className="text-center mt-2 text-xs md:text-sm text-gray-400 flex-shrink-0">
              <p className="flex items-center justify-center gap-2">
                <span>Slide {currentSlide + 1} de {totalSlides}</span>
                <span className="hidden sm:inline text-gray-500">• Usa ← → para navegar</span>
                <span className="sm:hidden text-gray-500">• Desliza para navegar</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend - Bottom Right */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 pointer-events-none animate-[fadeIn_0.5s_ease-in-out_0.4s_forwards] opacity-0">
        <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-3 md:p-4">
          <h4 className="text-xs md:text-sm font-semibold text-blue-400 mb-2 md:mb-3">Leyenda</h4>
          <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500" />
              <span className="text-gray-300">Fase Completada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-300">En Progreso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
