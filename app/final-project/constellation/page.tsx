"use client"

import { useState, useEffect, useRef } from "react"
import * as PIXI from 'pixi.js'
import Link from "next/link"
import Image from "next/image"

// --- Interfaces de Datos ---

interface Moment {
  user: string;
  timestamps: string;
}

interface GalleryImage {
  src: string;
  alt: string;
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

interface ConstellationNode {
  id: string;
  title: string;
  phase: string;
  x: number;
  y: number;
  status: 'completed' | 'in-progress';
  image?: string;
  driveLink?: string;
  interviews?: Interview[];
  moments?: Moment[];
  galleryImages?: GalleryImage[];
  questionnaires?: Questionnaire[];
  needs?: { number: string; description: string }[];
}

// --- Datos ---

const interviews: Interview[] = [
  {
    id: "A",
    name: "Participante A",
    profile: "Estudiante intermedio",
    description: "Motivado por la necesidad de acceder a información académica. Aprende por inmersión.",
    link: "https://drive.google.com/file/d/10lceuvvAuO_BHuns6S67VVdFV03oa0b_/view?usp=drive_link",
    image: "/interviews/alonso.png",
  },
  {
    id: "B",
    name: "Participante B",
    profile: "Estudiante avanzado",
    description: "Fluido pero busca vocabulario preciso. A menudo recurre a palabras simples.",
    link: "https://drive.google.com/file/d/1ymVhodDsJ4Isb8L9-i3npGqpKtDB1Q-Y/view?usp=sharing",
    image: "/interviews/jose-paredes.png",
  },
  {
    id: "C",
    name: "Participante C",
    profile: "Poca práctica comunicativa",
    description: "Más fuerte en lectura. Tiende a traducir mentalmente desde el español.",
    link: "https://drive.google.com/file/d/1NlJnEyfsQYuu460V8KB4BrKJlICffKzJ/view?usp=drive_link",
    image: null,
  },
  {
    id: "D",
    name: "Participante D",
    profile: "Docente de idiomas",
    description: "Docente con experiencia (CELTA). Aporta perspectiva pedagógica.",
    link: "https://drive.google.com/file/d/1r7jcCdOTchutg33isQn9eQgs9R2bWGWR/view?usp=drive_link",
    image: "/interviews/valeria-hancco.png",
  },
];

const questionnaires: Questionnaire[] = [
  {
    type: 'student',
    sections: [
      {
        title: "El Contexto",
        questions: ["¿Calificación de habilidad (leer vs hablar)?", "¿Reconoces palabras al leer que olvidas al hablar?"]
      },
      {
        title: "El Bloqueo",
        questions: ["¿Proceso de recuperación de palabras?", "¿Piensas en español y traduces?", "¿Confusión entre palabras parecidas?"]
      }
    ]
  },
  {
    type: 'teacher',
    questions: [
      "¿Qué falla en los métodos habituales?",
      "¿Qué habilidad clave necesitan para no bloquearse?",
      "¿Cómo afecta la traducción mental?"
    ]
  }
];

const keyNeeds = [
  { number: "1", description: "Formular ideas directamente en inglés." },
  { number: "2", description: "Recuperación activa de palabras desde la memoria." },
  { number: "3", description: "Práctica constante independiente de la gramática." },
  { number: "4", description: "Métodos motivadores y atractivos." }
];

const constellationData: ConstellationNode[] = [
  {
    id: "1",
    title: "Needfinding",
    phase: "Síntesis",
    x: 0.15,
    y: 0.35,
    status: 'completed',
    image: "/necesidadesClave.png",
    driveLink: "https://drive.google.com/file/d/17ZNrFrJUtT8iwSYfazmRQl_PPpw4x8x9/view?usp=drive_link",
    needs: keyNeeds
  },
  {
    id: "2",
    title: "Entrevistas a Usuarios",
    phase: "Investigación",
    x: 0.30,
    y: 0.45,
    status: 'completed',
    image: "/usersInterview/camila.png", 
    driveLink: "https://drive.google.com/drive/folders/1T_zfrorHDMMI8hD1COQ7iWb4LN3ac70s?usp=sharing",
    interviews: interviews,
    questionnaires: questionnaires
  },
  {
    id: "3",
    title: "Analisis de Usuarios",
    phase: "Investigación",
    x: 0.45,
    y: 0.35,
    status: 'completed',
    image: "/analisisUsuarios.png", 
    driveLink: "https://drive.google.com/file/d/1_0365q8ntCHkjuMItLneDy2sU9OOS9Me/view?usp=drive_link",
    interviews: interviews,
    questionnaires: questionnaires
  },
  {
    id: "4",
    title: "Personas",
    phase: "Definición",
    x: 0.60,
    y: 0.45,
    status: 'completed',
    image: "/persona.png",
    driveLink: "https://drive.google.com/file/d/17U6ums5cjKiD3xhE1t_nIIRMRv40cxqo/view?usp=drive_link",
    moments: [
      { user: "Camila Yoselin", timestamps: "0:23 - 1:09 - 1:58" },
      { user: "Jose Paredes", timestamps: "0:53 - 1:46 - 2:27 - 3:00" },
      { user: "Kenny Borja", timestamps: "1:14 - 2:57 - 3:33" },
      { user: "C. Taipe", timestamps: "0:45 - 1:48 - 3:18" }
    ],
    galleryImages: [
      { src: "/usersInterview/abel.png", alt: "Entrevista Abel" },
      { src: "/usersInterview/camila.png", alt: "Entrevista Camila" },
      { src: "/usersInterview/leo.png", alt: "Entrevista Leo" },
      { src: "/usersInterview/taipe.png", alt: "Entrevista Taipe" }
    ]
  },
  {
    id: "5",
    title: "Analisis de Tareas",
    phase: "Descubrimiento",
    x: 0.75,
    y: 0.35,
    status: 'completed',
    image: "/analisisTareas.png",
    driveLink: "https://drive.google.com/file/d/17X0iZfZcpMIHtq4D4z13Q_V2kECJ79Ph/view?usp=sharing",
  },
  {
    id: "6",
    title: "Storyboard & Prototipo",
    phase: "Diseño Iterativo",
    x: 0.90,
    y: 0.45,
    status: 'completed',
    image: "/storyboard/Daily 1.jpeg",
    driveLink: "https://drive.google.com/drive/folders/1iGJkKfvJ_V8veCn3ZmvuIPrG3W08YrDk?usp=sharing",
    galleryImages: [
      { src: "/storyboard/Interaccion 1.jpeg", alt: "Interacción 1" },
      { src: "/storyboard/Interaccion 2.jpeg", alt: "Interacción 2" },
      { src: "/storyboard/Vocabulario 1.jpeg", alt: "Vocabulario 1" },
      { src: "/storyboard/Daily 1.jpeg", alt: "Daily 1" }
    ]
  },
  {
    id: "7",
    title: "Evaluacion con usuarios",
    phase: "Validación Física",
    x: 1.05,
    y: 0.35,
    status: 'in-progress',
    image: "/evalUser.png",
    driveLink: "https://drive.google.com/drive/folders/1dXREwZ5glTs1_-OPuvaZ2cW7R7whdqSs?usp=sharing"
  }
]

export default function FinalProjectPage() {
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

        const container = new PIXI.Container()
        app.stage.addChild(container)

        // Dragging Logic
        let isDragging = false
        let dragStartX = 0
        let containerStartX = 0
        const minX = -app.screen.width * 0.3
        const maxX = 0

        // Stars
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

        const linesGraphics = new PIXI.Graphics()
        container.addChild(linesGraphics)

        // Create Nodes and Cards
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
            pulsePhase: index * Math.PI * 0.5
          }
          
          // --- Node Interaction ---
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
          })
          
          container.addChild(graphics)
          
          // --- Floating Preview Card ---
          const isDown = index % 2 === 0
          let cardYOffset = isDown ? 80 : -250
          if (!isDown && y < 300) cardYOffset = 80
          if (isDown && y > app.screen.height - 300) cardYOffset = -250
          
          const cardContainer = new PIXI.Container()
          cardContainer.x = x
          cardContainer.y = y + cardYOffset
          
          const cardWidth = 260
          const cardHeight = 150 // Reduced height since description is gone
          const halfWidth = cardWidth / 2
          
          cardContainer.eventMode = 'static'
          cardContainer.cursor = 'pointer'
          cardContainer.hitArea = new PIXI.Rectangle(-halfWidth, 0, cardWidth, cardHeight)
          
          cardContainer.on('pointertap', () => setSelectedNode(nodeData))
          
          const cardBg = new PIXI.Graphics()
          cardBg.rect(-halfWidth, 0, cardWidth, cardHeight)
          cardBg.fill({ color: 0x000000, alpha: 0.8 })
          cardBg.stroke({ width: 2, color: nodeData.status === 'completed' ? 0x60a5fa : 0xfbbf24, alpha: 0.5 })
          cardContainer.addChild(cardBg)
          
          cardContainer.on('pointerover', () => {
            cardBg.clear()
            cardBg.rect(-halfWidth, 0, cardWidth, cardHeight)
            cardBg.fill({ color: 0x000000, alpha: 0.9 })
            cardBg.stroke({ width: 2, color: nodeData.status === 'completed' ? 0x93c5fd : 0xfcd34d, alpha: 0.8 })
          })
          cardContainer.on('pointerout', () => {
            cardBg.clear()
            cardBg.rect(-halfWidth, 0, cardWidth, cardHeight)
            cardBg.fill({ color: 0x000000, alpha: 0.8 })
            cardBg.stroke({ width: 2, color: nodeData.status === 'completed' ? 0x60a5fa : 0xfbbf24, alpha: 0.5 })
          })

          const titleText = new PIXI.Text({
            text: nodeData.title.length > 30 ? nodeData.title.substring(0, 28) + '...' : nodeData.title,
            style: {
              fontSize: 14,
              fill: 0xffffff,
              fontWeight: 'bold',
              wordWrap: true,
              wordWrapWidth: cardWidth - 20,
            }
          })
          titleText.x = -halfWidth + 10
          titleText.y = 10
          cardContainer.addChild(titleText)

          if (nodeData.image) {
            PIXI.Assets.load(nodeData.image).then((texture) => {
              if (cardContainer.destroyed) return;
              const imageSprite = new PIXI.Sprite(texture)
              imageSprite.width = cardWidth - 20
              imageSprite.height = 100 // Slightly taller since description is gone
              imageSprite.x = -halfWidth + 10
              imageSprite.y = 40
              
              const mask = new PIXI.Graphics()
              mask.rect(-halfWidth + 10, 40, cardWidth - 20, 100)
              mask.fill(0xffffff)
              imageSprite.mask = mask
              cardContainer.addChild(mask)
              cardContainer.addChild(imageSprite)
            }).catch(e => console.error("Error loading image", e))
          }

          // Description Text Removed Here

          container.addChild(cardContainer)
          nodes.push(node)
        })

        let mouseX = app.screen.width / 2
        let mouseY = app.screen.height / 2

        app.stage.eventMode = 'static'
        app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height)
        app.stage.cursor = 'grab'

        app.stage.on('pointerdown', (e) => {
          if (e.target !== app.stage) return; 
          
          isDragging = true
          dragStartX = e.global.x
          containerStartX = container.x
          app.stage.cursor = 'grabbing'
        })

        app.stage.on('pointerup', () => { isDragging = false; app.stage.cursor = 'grab' })
        app.stage.on('pointerupoutside', () => { isDragging = false; app.stage.cursor = 'grab' })

        app.stage.on('pointermove', (e) => {
          mouseX = e.global.x
          mouseY = e.global.y
          
          if (isDragging) {
            const dragDelta = e.global.x - dragStartX
            const newX = containerStartX + dragDelta
            const clampedX = Math.max(minX, Math.min(maxX, newX))
            container.x = clampedX
          }
        })

        app.ticker.add(() => {
          stars.forEach(star => {
            star.twinkle += star.twinkleSpeed
            star.sprite.alpha = 0.3 + Math.sin(star.twinkle) * 0.4
          })

          linesGraphics.clear()
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

          nodes.forEach(node => {
            node.pulsePhase += 0.02
            const pulse = Math.sin(node.pulsePhase) * 2
            node.currentSize += (node.targetSize - node.currentSize) * 0.1
            
            node.sprite.clear()
            if (node.data.status === 'completed') {
              node.sprite.circle(0, 0, node.currentSize + pulse + 5)
              node.sprite.fill({ color: 0x60a5fa, alpha: 0.2 })
            }
            node.sprite.circle(0, 0, node.currentSize + pulse)
            node.sprite.fill({ 
              color: node.data.status === 'completed' ? 0x3b82f6 : 0xfbbf24, 
              alpha: 0.9 
            })
            node.sprite.circle(0, 0, (node.currentSize + pulse) * 0.5)
            node.sprite.fill({ color: 0xffffff, alpha: 0.4 })
            node.sprite.x = node.x
            node.sprite.y = node.y
          })
        })

        const handleResize = () => {
          app.renderer.resize(window.innerWidth, window.innerHeight)
          nodes.forEach((node, index) => {
            node.x = constellationData[index].x * window.innerWidth
            node.y = constellationData[index].y * window.innerHeight
          })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)

      } catch (error) {
        console.error('Error initializing Pixi:', error)
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
      <div ref={canvasRef} className="absolute inset-0" />

      <Link
        href="/"
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-blue-600/80 backdrop-blur-sm rounded-lg hover:bg-blue-500 hover:scale-105 transition-all text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al Inicio
      </Link>

      {/* Modal - Click outside closes */}
      {selectedNode && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-auto z-50 p-6 bg-black/60 animate-[fadeIn_0.3s_ease-in-out_forwards]"
          onClick={() => setSelectedNode(null)}
        >
          <div 
            className="bg-black/90 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar"
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing
          >
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${selectedNode.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'} animate-pulse`} />
                <h2 className="text-2xl md:text-4xl font-bold text-white">{selectedNode.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-white transition-colors"
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

            {selectedNode.image && (
              <div className="mb-6 rounded-lg overflow-hidden border-2 border-blue-500/30 relative h-64 w-full">
                <Image 
                  src={selectedNode.image} 
                  alt={selectedNode.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Description Text Removed Here */}

            {/* Mechanics Section Removed Here */}

            {selectedNode.interviews && (
              <div className="mt-8 pt-8 border-t border-blue-500/30">
                <h3 className="text-2xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Entrevistas Realizadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedNode.interviews.map((interview, idx) => (
                    <div key={idx} className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg hover:bg-purple-500/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                         {interview.image ? (
                           <div className="relative w-10 h-10 rounded-full overflow-hidden">
                             <Image src={interview.image} alt={interview.name} fill className="object-cover" />
                           </div>
                         ) : (
                           <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center font-bold text-purple-300">{interview.id}</div>
                         )}
                         <div>
                           <h4 className="text-purple-300 font-bold">{interview.name}</h4>
                           <p className="text-xs text-gray-400">{interview.profile}</p>
                         </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-3">{interview.description}</p>
                      <a href={interview.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        Ver Entrevista <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.needs && (
              <div className="mt-8 pt-8 border-t border-blue-500/30">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-6">Necesidades Identificadas</h3>
                <div className="grid gap-4">
                  {selectedNode.needs.map((need, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-500">#{need.number}</div>
                      <p className="text-gray-300 pt-1">{need.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.moments && (
              <div className="mt-8 pt-8 border-t border-blue-500/30">
                <h3 className="text-2xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Momentos Clave
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedNode.moments.map((moment, idx) => (
                    <div key={idx} className="bg-green-500/10 border border-green-500/30 p-3 rounded flex justify-between items-center">
                      <span className="text-green-200 font-medium">{moment.user}</span>
                      <span className="font-mono text-xs bg-black/50 px-2 py-1 rounded text-gray-400">{moment.timestamps}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.questionnaires && (
              <div className="mt-8 pt-8 border-t border-blue-500/30">
                <h3 className="text-2xl font-semibold text-orange-400 mb-6">Cuestionarios Aplicados</h3>
                <div className="space-y-6">
                  {selectedNode.questionnaires.map((q, idx) => (
                    <div key={idx} className="bg-orange-500/10 border-l-4 border-orange-500 p-5 rounded-r-lg">
                      <h4 className="text-xl font-bold text-orange-300 mb-3 capitalize">Perfil: {q.type === 'student' ? 'Estudiante' : 'Docente'}</h4>
                      {q.sections ? (
                        q.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="mb-3">
                            <h5 className="font-semibold text-gray-200 text-sm mb-1">{sec.title}</h5>
                            <ul className="list-disc list-inside text-gray-400 text-sm pl-2">
                              {sec.questions.map((qs, qIdx) => <li key={qIdx}>{qs}</li>)}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <ul className="list-disc list-inside text-gray-400 text-sm pl-2">
                          {q.questions?.map((qs, qIdx) => <li key={qIdx}>{qs}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.galleryImages && (
              <div className="mt-8 pt-8 border-t border-blue-500/30">
                <h3 className="text-2xl font-semibold text-blue-300 mb-6">Galería de Proceso</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedNode.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 group cursor-pointer">
                      <Image 
                        src={img.src} 
                        alt={img.alt} 
                        fill 
                        className="object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium px-2 text-center">{img.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.driveLink && (
               <div className="mt-8 text-center">
                 <a 
                   href={selectedNode.driveLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/40"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                   Ver Documentación Completa en Drive
                 </a>
               </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}