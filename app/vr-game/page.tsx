"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

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
    title: "Realización de maqueta y validación de la idea",
    date: "Semana 2",
    phase: "Diseño y Validación",
    description:
      "Se realizó una prueba de concepto ('live action') con usuarios reales ajenos al proyecto para recibir feedback temprano sobre las mecánicas propuestas, validar la idea y ajustar el diseño de interacción antes de la fase de desarrollo.",
    achievements: [
      "Validación del concepto de interacciones multimodales (gestos).",
      "Diseño de la narrativa a través de 3 niveles enfocados en funciones ejecutivas.",
      "Creación de storyboards para las interacciones clave del gameplay.",
      "Refinamiento de las mecánicas para incrementar la dificultad progresivamente.",
    ],
    status: "completed" as const,
    image: "/maqueta.jpeg",
  },
  {
    id: "3",
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

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-700 relative">
      <div
        className="page-background"
        style={{
          backgroundImage: "url('/dark-ethereal-vr-landscape-with-floating-geometric.jpg')",
        }}
      />

      <Navigation />

      {/* Interactive Roadmap */}
      <section className="py-12 animate-in slide-in-from-bottom duration-1000 delay-500">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Game Description */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Worst Nightmare</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-primary font-medium mb-6">
                  Una experiencia de realidad virtual inmersiva terapéutica
                </p>
                <div className="text-left bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 mb-8 horror-glow">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Concepto Central</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Una experiencia VR que utiliza <span className="text-primary font-medium">interacciones multimodales</span> (gestos, movimiento) 
                    para guiar al usuario a través de tres niveles oníricos. El objetivo es enfrentar y re-contextualizar 
                    sentimientos de ansiedad, soledad y el hábito de "terribilizar".
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Problemas que Aborda:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Dificultad para tomar decisiones</li>
                        <li>• Gestión de pensamientos catastróficos</li>
                        <li>• Ansiedad y soledad</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Usuarios Objetivo:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Pacientes en contextos terapéuticos</li>
                        <li>• Psicólogos y profesionales</li>
                        <li>• Adolescentes y adultos</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <Card className="border-0 bg-card/20 backdrop-blur-sm horror-glow">
                    <CardContent className="p-4 text-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary font-bold">✋</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Hand Tracking</h4>
                      <p className="text-xs text-muted-foreground">Gestos para apartar negatividad</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 bg-card/20 backdrop-blur-sm horror-glow">
                    <CardContent className="p-4 text-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary font-bold">🚶</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Movimiento Corporal</h4>
                      <p className="text-xs text-muted-foreground">Agacharse, echarse y esconderse</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">Proceso de Desarrollo</h3>
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
                  d="M 100 200 Q 200 100, 300 200 T 500 200 Q 600 300, 700 200"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  opacity="0.6"
                  filter="url(#glow)"
                  className="animate-pulse"
                />
                
                {/* Completed path segment */}
                <path
                  d="M 100 200 Q 200 100, 300 200"
                  fill="none"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth="4"
                  filter="url(#glow)"
                />
              </svg>

              {/* Phase Nodes */}
              {timelineData.map((phase, index) => {
                const positions = [
                  { x: '12.5%', y: '50%', transform: 'translate(-50%, -50%)' }, // Phase 1
                  { x: '37.5%', y: '50%', transform: 'translate(-50%, -50%)' }, // Phase 2  
                  { x: '62.5%', y: '50%', transform: 'translate(-50%, -50%)' }, // Phase 3
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
                      
                      {/* Phase number */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-white drop-shadow-lg">
                          {phase.id}
                        </span>
                      </div>

                      {/* Pulse animation for active */}
                      {selectedPhase.id === phase.id && (
                        <div className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
                      )}
                    </div>

                    {/* Phase label */}
                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                      <Badge 
                        variant={selectedPhase.id === phase.id ? "default" : "outline"}
                        className="mb-1 horror-glow"
                      >
                        {phase.date}
                      </Badge>
                      <div className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors">
                        {phase.phase}
                      </div>
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
            <div className="animate-in fade-in duration-500" key={selectedPhase.id}>
              <Card className="border-0 bg-card/50 backdrop-blur-sm horror-glow overflow-hidden">
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